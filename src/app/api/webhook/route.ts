import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Verificação do webhook aprovada.");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("❌ Verificação falhou.");
  return new NextResponse("Falha na verificação", { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("📥 Evento recebido do webhook:", JSON.stringify(body, null, 2));

  return new NextResponse("Evento recebido", { status: 200 });
}
