export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import axios from "axios";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const axiosErr = (e: any) => (e?.response?.data ? JSON.stringify(e.response.data) : String(e));

const isLongLivedTokenHeuristic = (token?: string) =>
  typeof token === "string" && token.length > 150;

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }
  if (!code) {
    return NextResponse.json({ error: "Código não encontrado." }, { status: 400 });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { instagramAccessToken: true },
    });

    let access_token: string | undefined = existingUser?.instagramAccessToken ?? undefined;
    if (isLongLivedTokenHeuristic(access_token)) {
      try {
        const refreshRes = await axios.get("https://graph.instagram.com/refresh_access_token", {
          params: {
            grant_type: "ig_refresh_token",
            access_token,
          },
        });
        access_token = refreshRes.data.access_token;
        console.log("[IG] refresh_access_token OK");
      } catch (e) {
        console.warn("[IG] refresh_access_token falhou:", axiosErr(e));
        access_token = undefined;
      }
    } else {
      access_token = undefined;
    }

    if (!access_token) {
      try {
        const tokenRes = await axios.post(
          "https://api.instagram.com/oauth/access_token",
          new URLSearchParams({
            client_id: process.env.INSTAGRAM_CLIENT_ID!,
            client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
            grant_type: "authorization_code",
            redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
            code,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("[IG] short-lived token recebido:", tokenRes.data.access_token);

        try {
          const exchangeRes = await axios.get("https://graph.instagram.com/access_token", {
            params: {
              grant_type: "ig_exchange_token",
              client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
              access_token: tokenRes.data.access_token,
            },
          });

          access_token = exchangeRes.data.access_token;
          console.log("[IG] exchange (short->long) OK");
        } catch (e) {
          console.warn("[IG] exchange falhou, usando token curto como fallback:", axiosErr(e));
          access_token = tokenRes.data.access_token; // fallback
        }
      } catch (e) {
        console.error("[IG] exchange falhou:", axiosErr(e));
        return NextResponse.json(
          {
            error: "Falha ao obter token do Instagram.",
            details: axiosErr(e),
          },
          { status: 500 }
        );
      }
    }

    // 3) Buscar dados básicos do usuário (Basic Display não tem profile_picture_url)
    let userData: { id: string; username: string; account_type?: string; media_count?: number };
    try {
      const userRes = await axios.get("https://graph.instagram.com/me", {
        params: {
          fields: "id,username,account_type,media_count",
          access_token,
        },
      });
      userData = userRes.data;
    } catch (e) {
      console.error("[IG] GET /me falhou:", axiosErr(e));
      return NextResponse.json(
        { error: "Falha ao obter dados do Instagram (me).", details: axiosErr(e) },
        { status: 500 }
      );
    }

    await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        instagramAccessToken: access_token!,
        instagramUsername: userData.username,
        instagramAccountType: userData.account_type ?? null,
      },
    });

    const base = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : req.url;

    return NextResponse.redirect(new URL("/dashboard/admin/users", base));
  } catch (e) {
    console.error("[IG] Erro inesperado:", axiosErr(e));
    return NextResponse.json(
      {
        error: "Erro ao autenticar ou atualizar o Instagram.",
        details: axiosErr(e),
      },
      { status: 500 }
    );
  }
}
