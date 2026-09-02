import { NextResponse } from "next/server"

export async function POST(request) {
  const { answer } = await request.json()
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId || typeof answer !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: `💌 Answer received: ${answer}` }),
  })

  return NextResponse.json({ ok: response.ok }, { status: response.ok ? 200 : 502 })
}