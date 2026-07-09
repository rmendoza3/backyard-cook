"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Message = { role: "user" | "model"; content: string };

type InquiryDraft = {
  name?: string;
  email?: string;
  event_date?: string;
  headcount?: string;
  fulfillment?: string;
  message?: string;
};

const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || "http://localhost:3001/api/chat";

const GREETING: Message = {
  role: "model",
  content: "Hey! Ask me about the menu, pickup, or delivery — I can help you put together an order.",
};

function buildContactUrl(draft: InquiryDraft) {
  const params = new URLSearchParams();
  if (draft.name) params.set("name", draft.name);
  if (draft.email) params.set("email", draft.email);
  if (draft.event_date) params.set("event_date", draft.event_date);
  if (draft.headcount) params.set("headcount", draft.headcount);
  if (draft.fulfillment) params.set("fulfillment", draft.fulfillment);
  if (draft.message) params.set("message", draft.message);
  return `/contact?${params.toString()}`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState<InquiryDraft | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setHasOpenedOnce(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, draft]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(BOT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, sessionId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
      setSessionId(data.sessionId);

      if (data.inquiryDraft) {
        setDraft(data.inquiryDraft);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "Something went wrong. Please try again, or reach out directly." },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="widget-container">
      {isOpen && (
        <div className="widget-panel">
          <div className="widget-header">
            <div className="widget-header-brand">
              <Image src="/images/BackyardCookLogo.png" alt="" width={32} height={32} className="widget-header-avatar" />
              <p className="widget-title">Ask Backyard Cook</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="widget-close" aria-label="Close chat">✕</button>
          </div>

          <div className="widget-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "widget-row widget-row-user" : "widget-row widget-row-model"}>
                {msg.role === "model" && (
                  <Image src="/images/BackyardCookLogo.png" alt="" width={24} height={24} className="widget-avatar" />
                )}
                <div className={msg.role === "user" ? "widget-bubble widget-bubble-user" : "widget-bubble widget-bubble-model"}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="widget-row widget-row-model">
                <Image src="/images/BackyardCookLogo.png" alt="" width={24} height={24} className="widget-avatar" />
                <div className="widget-bubble widget-bubble-model widget-typing">
                  <span className="widget-dot" />
                  <span className="widget-dot" />
                  <span className="widget-dot" />
                </div>
              </div>
            )}

            {draft && (
              <div className="widget-draft-summary">
                <p className="widget-draft-title">Ready to send this over?</p>
                <p className="widget-draft-text">{draft.message}</p>
                {draft.headcount && <p className="widget-draft-meta">Headcount: {draft.headcount}</p>}
                {draft.fulfillment && (
                  <p className="widget-draft-meta">{draft.fulfillment === "delivery" ? "Delivery" : "Pickup"}</p>
                )}
                <a href={buildContactUrl(draft)} className="widget-draft-link">
                  Review &amp; Send on Contact Page →
                </a>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="widget-form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="widget-input"
              disabled={isLoading}
            />
            <button type="submit" className="widget-send" disabled={isLoading}>Send</button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? "widget-toggle" : hasOpenedOnce ? "widget-toggle" : "widget-toggle widget-toggle-pulse"}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          "✕"
        ) : (
          <Image src="/images/BackyardCookLogo.png" alt="" width={32} height={32} className="widget-toggle-icon" />
        )}
      </button>
    </div>
  );
}