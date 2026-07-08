"use client";

import { useState, useRef, useEffect } from "react";

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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [draft, setDraft] = useState<InquiryDraft | null>(null);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
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
        setSendStatus("idle");
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

  async function submitDraft(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    setSendStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (!res.ok) throw new Error("failed");

      setSendStatus("sent");
    } catch {
      setSendStatus("error");
    }
  }

  return (
    <div className="widget-container">
      {isOpen && (
        <div className="widget-panel">
          <div className="widget-header">
            <p className="widget-title">Ask Backyard Cook</p>
            <button onClick={() => setIsOpen(false)} className="widget-close" aria-label="Close chat">✕</button>
          </div>

          <div className="widget-messages">
            {messages.length === 0 && (
              <p className="widget-empty">
                Ask about the menu, pickup, or delivery.
                <br />
                <span className="widget-disclosure">
                  Conversations may be reviewed to improve this assistant. See our{" "}
                  <a href="/privacy" className="widget-disclosure-link">Privacy Policy</a>.
                </span>
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "widget-bubble widget-bubble-user" : "widget-bubble widget-bubble-model"}>
                {msg.content}
              </div>
            ))}
            {isLoading && <div className="widget-bubble widget-bubble-model">Typing...</div>}

            {draft && (
              <form onSubmit={submitDraft} className="widget-draft-form">
                <p className="widget-draft-title">Review your inquiry</p>

                <label className="widget-draft-field">
                  <span>Name</span>
                  <input
                    value={draft.name || ""}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="widget-draft-input"
                  />
                </label>

                <label className="widget-draft-field">
                  <span>Email</span>
                  <input
                    value={draft.email || ""}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    className="widget-draft-input"
                  />
                </label>

                <label className="widget-draft-field">
                  <span>Date</span>
                  <input
                    value={draft.event_date || ""}
                    onChange={(e) => setDraft({ ...draft, event_date: e.target.value })}
                    className="widget-draft-input"
                  />
                </label>

                <label className="widget-draft-field">
                  <span>Headcount</span>
                  <input
                    value={draft.headcount || ""}
                    onChange={(e) => setDraft({ ...draft, headcount: e.target.value })}
                    className="widget-draft-input"
                  />
                </label>

                <label className="widget-draft-field">
                  <span>Pickup or delivery</span>
                  <select
                    value={draft.fulfillment || "pickup"}
                    onChange={(e) => setDraft({ ...draft, fulfillment: e.target.value })}
                    className="widget-draft-input"
                  >
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </label>

                <label className="widget-draft-field">
                  <span>Order details</span>
                  <textarea
                    value={draft.message || ""}
                    onChange={(e) => setDraft({ ...draft, message: e.target.value })}
                    className="widget-draft-input"
                    rows={3}
                  />
                </label>

                <button type="submit" className="widget-draft-submit" disabled={sendStatus === "sending"}>
                  {sendStatus === "sending" ? "Sending..." : "Send Inquiry"}
                </button>

                {sendStatus === "sent" && <p className="widget-draft-success">Sent! We'll follow up soon.</p>}
                {sendStatus === "error" && <p className="widget-draft-error">Something went wrong. Try again.</p>}
              </form>
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

      <button onClick={() => setIsOpen(!isOpen)} className="widget-toggle" aria-label="Toggle chat">
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}