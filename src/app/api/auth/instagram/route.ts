import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.INSTAGRAM_CLIENT_ID!;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI!;

  const authUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;

  return NextResponse.redirect(authUrl);
}
