"use client";
import { useState } from "react";
import { architectureSteps } from "@/data/portfolio";

export default function Architecture() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="architecture"
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, transparent, rgba(99,102,241,0.03) 50%, transparent)",
      }}
    >
      <div className="container-width">
        <div className="reveal-on-scroll" style={{ marginBottom: "3rem", textAlign: "center" }}>
          <span className="section-tag" style={{ justifyContent: "center" }}>
            How I Build
          </span>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
            AI System{" "}
            <span className="gradient-text">Architecture</span>
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              marginTop: "0.75rem",
              maxWidth: "520px",
              margin: "0.75rem auto 0",
            }}
          >
            I build complete AI systems — not just models. Click each layer to understand how I approach each component.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="reveal-on-scroll" style={{ maxWidth: "700px", margin: "0 auto" }}>
          {/* Flow */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {architectureSteps.map((step, i) => (
              <div key={step.id}>
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  aria-expanded={active === i}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    borderRadius: "12px",
                    background:
                      active === i
                        ? `${step.color}15`
                        : "var(--bg-card)",
                    border: `1px solid ${
                      active === i ? `${step.color}40` : "var(--border-card)"
                    }`,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== i) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = `${step.color}30`;
                      (e.currentTarget as HTMLButtonElement).style.background = `${step.color}08`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== i) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-card)";
                      (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-card)";
                    }
                  }}
                >
                  {/* Step number */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: `${step.color}20`,
                      border: `1px solid ${step.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: step.color,
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Label */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: active === i ? step.color : "var(--text-primary)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginTop: "2px",
                      }}
                    >
                      {step.sublabel}
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: active === i ? step.color : "var(--text-muted)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {active === i ? "▲" : "▼"}
                  </div>
                </button>

                {/* Expanded description */}
                {active === i && (
                  <div
                    style={{
                      marginTop: "2px",
                      padding: "1rem 1.25rem",
                      background: `${step.color}08`,
                      border: `1px solid ${step.color}20`,
                      borderRadius: "12px",
                      borderTop: "none",
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                )}

                {/* Connector arrow */}
                {i < architectureSteps.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "2px 0",
                    }}
                  >
                    <div
                      style={{
                        width: "1px",
                        height: "16px",
                        background: `linear-gradient(to bottom, ${step.color}60, ${architectureSteps[i + 1].color}60)`,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Technologies */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1.25rem",
              background: "var(--bg-card)",
              borderRadius: "14px",
              border: "1px solid var(--border-card)",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                color: "var(--accent-primary)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.875rem",
              }}
            >
              Primary Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[
                "Python",
                "LangChain",
                "LlamaIndex",
                "FastAPI",
                "RAG",
                "Qdrant",
                "ChromaDB",
                "PostgreSQL/pgvector",
                "MySQL",
                "Redis",
                "Tesseract OCR",
                "Playwright",
                "OpenCV",
                "NLTK",
              ].map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
