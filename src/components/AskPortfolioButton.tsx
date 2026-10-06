"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What AI projects has she built?",
  "What is her RAG experience?",
  "What technologies does she use?",
  "Tell me about the Agentic ERP project.",
];

export default function AskPortfolioButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Dhruvi's AI portfolio assistant powered by NVIDIA Llama 3.1 Nemotron. Ask me anything about her experience, projects, or skills. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.content ?? "Sorry, I couldn't get a response. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError("Failed to get a response. Please try again.");
      // Remove the user message if failed
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Ask my portfolio"
          id="ask-portfolio-btn"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0.7rem 1.25rem",
            borderRadius: "100px",
            background: "var(--accent-primary)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 600,
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget).style.transform = "translateY(-2px)";
            (e.currentTarget).style.boxShadow = "0 8px 30px rgba(99, 102, 241, 0.55)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget).style.transform = "translateY(0)";
            (e.currentTarget).style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.4)";
          }}
        >
          <MessageSquare size={15} />
          Ask my portfolio
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Portfolio AI assistant"
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 60,
            width: "min(400px, calc(100vw - 2rem))",
            background: "var(--bg-card)",
            border: "1px solid var(--border-hover)",
            borderRadius: "20px",
            boxShadow: "0 12px 50px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            maxHeight: "560px",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "0.875rem 1.25rem",
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Bot size={15} style={{ color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>
                  Ask my portfolio
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  nvidia/llama-3.1-nemotron-70b
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "8px",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <X size={13} />
            </button>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              padding: "5px 12px",
              background: "rgba(99,102,241,0.06)",
              borderBottom: "1px solid var(--border-card)",
              fontSize: "0.67rem",
              color: "var(--text-muted)",
              fontFamily: "'JetBrains Mono', monospace",
              flexShrink: 0,
            }}
          >
            ⚡ Grounded in Dhruvi&apos;s verified portfolio data only
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background:
                      msg.role === "user"
                        ? "rgba(99,102,241,0.2)"
                        : "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.3))",
                    border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {msg.role === "user" ? (
                    <User size={11} style={{ color: "var(--accent-primary)" }} />
                  ) : (
                    <Bot size={11} style={{ color: "var(--accent-primary)" }} />
                  )}
                </div>

                {/* Bubble */}
                <div
                  style={{
                    padding: "0.6rem 0.9rem",
                    borderRadius:
                      msg.role === "user"
                        ? "14px 14px 4px 14px"
                        : "14px 14px 14px 4px",
                    background:
                      msg.role === "user"
                        ? "var(--accent-primary)"
                        : "var(--bg-secondary)",
                    border: msg.role === "user" ? "none" : "1px solid var(--border-card)",
                    fontSize: "0.83rem",
                    color: msg.role === "user" ? "#fff" : "var(--text-secondary)",
                    lineHeight: 1.65,
                    maxWidth: "82%",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.3))",
                    border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={11} style={{ color: "var(--accent-primary)" }} />
                </div>
                <div
                  style={{
                    padding: "0.6rem 0.9rem",
                    borderRadius: "14px 14px 14px 4px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-card)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                  Thinking...
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: "8px",
                  background: "rgba(248, 113, 113, 0.1)",
                  border: "1px solid rgba(248, 113, 113, 0.3)",
                  fontSize: "0.78rem",
                  color: "#f87171",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            {/* Suggested questions (show only on fresh start) */}
            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: "2px",
                  }}
                >
                  Try asking:
                </p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      textAlign: "left",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      background: "rgba(99,102,241,0.06)",
                      border: "1px solid rgba(99,102,241,0.15)",
                      color: "var(--accent-secondary)",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget).style.background = "rgba(99,102,241,0.12)";
                      (e.currentTarget).style.borderColor = "rgba(99,102,241,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget).style.background = "rgba(99,102,241,0.06)";
                      (e.currentTarget).style.borderColor = "rgba(99,102,241,0.15)";
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid var(--border-card)",
              display: "flex",
              gap: "0.5rem",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder='Ask about experience, projects, skills...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              aria-label="Ask a question"
              style={{
                flex: 1,
                padding: "0.625rem 0.875rem",
                borderRadius: "10px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-card)",
                color: "var(--text-primary)",
                fontSize: "0.83rem",
                fontFamily: "'Inter', sans-serif",
                outline: "none",
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "var(--border-hover)";
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = "var(--border-card)";
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background:
                  input.trim() && !loading ? "var(--accent-primary)" : "var(--bg-secondary)",
                border: "1px solid var(--border-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                color: input.trim() && !loading ? "#fff" : "var(--text-muted)",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {loading ? (
                <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Send size={13} />
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
