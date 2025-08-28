import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          username: true,
          instagramUsername: true,
          instagramProfilePictureUrl: true,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}
