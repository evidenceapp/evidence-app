export const runtime = "nodejs";
import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

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

  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      username: true,
      role: true,
      instagramUsername: true,
    },
  });

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (decoded.role === "admin") {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "admin",
        },
      },
      select: {
        id: true,
        username: true,
        instagramUsername: true,
      },
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

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: "user",
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
    return NextResponse.json({ error: "Você não pode excluir um administrador." }, { status: 403 });
  }

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const decoded = getToken(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, username, password, instagramUsername } = body;

  // Users can only update their own profile, admins can update anyone
  if (decoded.role !== "admin" && decoded.userId !== id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updateData: Record<string, string> = {};

  if (username) updateData.username = username;
  if (password) updateData.password = await bcrypt.hash(password, 10);
  if (instagramUsername) updateData.instagramUsername = instagramUsername;

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "No data to update" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: id || decoded.userId },
    data: updateData,
  });

  return NextResponse.json({ success: true });
}
