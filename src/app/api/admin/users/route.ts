import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

const prisma = new PrismaClient();

async function fetchInstagramProfile(accessToken: string) {
  try {
    const res = await axios.get(
      `https://graph.instagram.com/me?fields=id,username,account_type,profile_picture_url&access_token=${accessToken}`
    );
    return res.data;
  } catch (error) {
    console.error(
      "Erro ao buscar dados do Instagram:",
      (error as any).response?.data || error
    );
    return null;
  }
}

function getToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const decoded = getToken(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let currentUser = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      username: true,
      role: true,
      instagramUsername: true,
      instagramProfilePictureUrl: true,
      instagramAccountType: true,
      instagramAccessToken: true,
    },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // if (currentUser.instagramAccessToken) {
  //   const instaData = await fetchInstagramProfile(
  //     currentUser.instagramAccessToken
  //   );
  //   console.log(instaData);
  // }

  //   if (instaData) {
  //     // Verifica se precisa atualizar para evitar writes desnecessários
  //     if (
  //       instaData.username !== currentUser.instagramUsername ||
  //       instaData.profile_picture_url !==
  //         currentUser.instagramProfilePictureUrl ||
  //       instaData.account_type !== currentUser.instagramAccountType
  //     ) {
  //       await prisma.user.update({
  //         where: { id: decoded.userId },
  //         data: {
  //           instagramUsername: instaData.username,
  //           instagramProfilePictureUrl: instaData.profile_picture_url,
  //           instagramAccountType: instaData.account_type,
  //         },
  //       });

  //       // Atualiza currentUser local para refletir alterações
  //       currentUser = {
  //         ...currentUser,
  //         instagramUsername: instaData.username,
  //         instagramProfilePictureUrl: instaData.profile_picture_url,
  //         instagramAccountType: instaData.account_type,
  //       };
  //     }
  //   }
  // }

  if (decoded.role === "admin") {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "admin",
        },
      },
      select: { id: true, username: true, instagramProfilePictureUrl: true, instagramUsername: true },
    });
    return NextResponse.json({ users, currentUser });
  }

  return NextResponse.json({ currentUser });
}

export async function POST(req: NextRequest) {
  const decoded = getToken(req);
  if (!decoded || decoded.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username, password, role } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: "user", // Força sempre como user
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const decoded = getToken(req);
  if (!decoded || decoded.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const userToDelete = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });

  if (!userToDelete) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (userToDelete.role === "admin") {
    return NextResponse.json(
      { error: "Você não pode excluir um administrador." },
      { status: 403 }
    );
  }

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
