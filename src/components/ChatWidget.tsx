"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
    role: "user" | "model";
    content: string;
};

const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || "http://localhost:3001/api/chat";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

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
                        <p className="widget-title">Ask Backyard Cook</p>
                        <button onClick={() => setIsOpen(false)} className="widget-close" aria-label="Close chat">
                            ✕
                        </button>
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
                        <button type="submit" className="widget-send" disabled={isLoading}>
                            Send
                        </button>
                    </form>
                </div>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="widget-toggle" aria-label="Toggle chat">
                {isOpen ? "✕" : "💬"}
            </button>
        </div>
    );
}