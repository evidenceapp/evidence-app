import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skip = Number(searchParams.get("skip") || 0);
  const take = Number(searchParams.get("take") || 8);

  const total = await prisma.post.count();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          username: true,
          instagramUsername: true,
          instagramProfilePictureUrl: true,
        },
      },
    },
    skip,
    take,
  });

  const hasMore = skip + take < total;

  return NextResponse.json({
    posts,
    total,
    skip,
    take,
    hasMore,
  });
}
