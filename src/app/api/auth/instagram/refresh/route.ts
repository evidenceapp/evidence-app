import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import axios from "axios";

const prisma = new PrismaClient();

export async function GET() {
  const user = await prisma.user.findFirst({
    where: { instagramAccessToken: { not: null } },
    select: { id: true, instagramAccessToken: true },
  });

  if (!user || !user.instagramAccessToken) {
    return NextResponse.json(
      { error: "No user with Instagram token found." },
      { status: 404 }
    );
  }

  try {
    const refreshRes = await axios.get(
      "https://graph.instagram.com/refresh_access_token",
      {
        params: {
          grant_type: "ig_refresh_token",
          access_token: user.instagramAccessToken,
        },
      }
    );

    const { access_token, expires_in } = refreshRes.data;

    await prisma.user.update({
      where: { id: user.id },
      data: { instagramAccessToken: access_token },
    });

    return NextResponse.json({
      message: "Instagram token refreshed successfully.",
      expires_in,
    });
  } catch (error: any) {
    console.error(error.response?.data || error);
    return NextResponse.json(
      { error: "Failed to refresh Instagram token." },
      { status: 500 }
    );
  }
}
