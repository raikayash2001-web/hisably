import { NextResponse } from "next/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "nvidia/nemotron-3.5-lightning:free";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service is not configured. Add OPENROUTER_API_KEY to the deployment environment." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const safeMessages: Message[] = messages
      .filter(
        (message: unknown): message is Message =>
          typeof message === "object" &&
          message !== null &&
          "role" in message &&
          "content" in message &&
          ((message as Message).role === "user" || (message as Message).role === "assistant") &&
          typeof (message as Message).content === "string"
      )
      .slice(-20)
      .map((message) => ({
        role: message.role,
        content: message.content.trim().slice(0, 12000),
      }))
      .filter((message) => message.content.length > 0);

    if (safeMessages.length === 0 || safeMessages[safeMessages.length - 1].role !== "user") {
      return NextResponse.json({ error: "Please send a user message." }, { status: 400 });
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://hisably.com",
        "X-OpenRouter-Title": "HISABLY AI",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are HISABLY AI, a concise and helpful assistant. Give accurate, practical answers. When a calculation is needed, show the key steps. Do not claim to have browsed the web unless web tools are actually enabled.",
          },
          ...safeMessages,
        ],
        temperature: 0.4,
        max_tokens: 1200,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const providerMessage =
        typeof data?.error?.message === "string" ? data.error.message : "OpenRouter request failed.";
      return NextResponse.json({ error: providerMessage }, { status: response.status });
    }

    const content = data?.choices?.[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "The AI returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({
      message: content,
      model: data?.model ?? MODEL,
      usage: data?.usage ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the AI service. Please try again." },
      { status: 500 }
    );
  }
}
