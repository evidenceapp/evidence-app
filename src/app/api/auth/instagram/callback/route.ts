import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import axios from "axios";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  // const token = req.cookies.get("token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/dashboard/login", req.url));
  // }

  // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

  if (!code) {
    return NextResponse.json(
      { error: "Código não encontrado." },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: "cmcxne8s20000izj44kbop4ce" },
      select: { instagramAccessToken: true },
    });

    let access_token: string;

    if (existingUser?.instagramAccessToken) {
      const refreshRes = await axios.get(
        "https://graph.instagram.com/refresh_access_token",
        {
          params: {
            grant_type: "ig_refresh_token",
            access_token: existingUser.instagramAccessToken,
          },
        }
      );
      access_token = refreshRes.data.access_token;
    } else {
      const tokenRes = await axios.post(
        "https://api.instagram.com/oauth/access_token",
        new URLSearchParams({
          client_id: process.env.INSTAGRAM_CLIENT_ID!,
          client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
          grant_type: "authorization_code",
          redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
          code,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const exchangeRes = await axios.get(
        "https://graph.instagram.com/access_token",
        {
          params: {
            grant_type: "ig_exchange_token",
            client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
            access_token: tokenRes.data.access_token,
          },
        }
      );

      access_token = exchangeRes.data.access_token;
    }
    const userRes = await axios.get(
      `https://graph.instagram.com/me?fields=id,username,account_type,profile_picture_url&access_token=${access_token}`
    );

    await prisma.user.update({
      where: { id: "cmcxne8s20000izj44kbop4ce" },
      data: {
        instagramAccessToken: access_token,
        instagramUsername: userRes.data.username,
        instagramProfilePictureUrl: userRes.data.profile_picture_url,
        instagramAccountType: userRes.data.account_type,
      },
    });

    return NextResponse.redirect(
      new URL(
        "/dashboard/admin/users",
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/"
          : req.url
      )
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao autenticar ou atualizar o Instagram." },
      { status: 500 }
    );
  }
}

// try {
//   const tokenRes = await axios.post(
//     "https://api.instagram.com/oauth/access_token",
//     new URLSearchParams({
//       client_id: process.env.INSTAGRAM_CLIENT_ID!,
//       client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
//       grant_type: "authorization_code",
//       redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
//       code,
//     }),
//     {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     }
//   );

//   const { access_token } = tokenRes.data;

//   // Buscar dados do usuário
//   const userRes = await axios.get(
//     `https://graph.instagram.com/me?fields=id,username,account_type,profile_picture_url&access_token=${access_token}`
//   );

//   // Recuperar o usuário logado pelo token
//   // const token = req.cookies.get("token")?.value;
//   // if (!token) {
//   //   return NextResponse.redirect(new URL("/dashboard/login", req.url));
//   // }

//   // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

//   // Atualizar o usuário no banco
//   await prisma.user.update({
//     //   where: { id: decoded.userId },
//     where: { id: "cmcxne8s20000izj44kbop4ce" },
//     data: {
//       instagramAccessToken: access_token,
//       instagramUsername: userRes.data.username,
//       instagramProfilePictureUrl: userRes.data.profile_picture_url,
//       instagramAccountType: userRes.data.account_type,
//     },
//   });

//   return NextResponse.redirect(
//     new URL(
//       "/dashboard/admin/users",
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000/"
//         : req.url
//     )
//   );
// } catch (error: any) {
//   console.error(error.response?.data || error);
//   return NextResponse.json(
//     { error: "Erro ao autenticar com o Instagram." },
//     { status: 500 }
//   );
// }
// }
