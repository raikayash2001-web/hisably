"use client";

import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content: "Hi! I’m HISABLY AI. Ask me about calculations, finance concepts, developer questions, or everyday tasks.",
};

export default function AiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "AI request failed.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="ai-page">
      <div className="container">
        <div className="ai-hero">
          <span className="eyebrow">● HISABLY AI</span>
          <h1>Ask. Calculate. Understand.</h1>
          <p>Powered by NVIDIA Nemotron 3.5 Lightning through OpenRouter.</p>
        </div>

        <section className="ai-card" aria-label="HISABLY AI chat">
          <div className="ai-status">
            <span className="ai-dot" />
            <span>Nemotron 3.5 Lightning</span>
            <span className="ai-free">Free endpoint</span>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div className={`ai-message ${message.role}`} key={`${message.role}-${index}`}>
                <div className="ai-bubble">{message.content}</div>
              </div>
            ))}
            {loading && (
              <div className="ai-message assistant">
                <div className="ai-bubble ai-typing">Thinking…</div>
              </div>
            )}
          </div>

          <form className="ai-form" onSubmit={sendMessage}>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask HISABLY AI anything…"
              rows={2}
              maxLength={12000}
              disabled={loading}
              aria-label="Message"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              {loading ? "Thinking…" : "Send"}
            </button>
          </form>

          <p className="ai-note">
            Free model endpoints are rate-limited. Do not send passwords, payment details, confidential business data, or other sensitive personal information.
          </p>
        </section>
      </div>
    </main>
  );
}
