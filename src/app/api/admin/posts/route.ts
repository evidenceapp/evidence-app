export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const posts = await prisma.post.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { content } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const userId = body.userId || req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      content,
      authorId: userId,
    },
  });

  return NextResponse.json({ post });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, content } = body;

  if (!id || !content) {
    return NextResponse.json({ error: "ID and content are required" }, { status: 400 });
  }

  const updated = await prisma.post.update({
    where: { id },
    data: { content },
  });

  return NextResponse.json({ post: updated });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  await prisma.post.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
