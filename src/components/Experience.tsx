"use client";
import { MapPin, Calendar, Building2 } from "lucide-react";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(99,102,241,0.03) 50%, transparent)",
        }}
      >
        <div className="container-width">
          <div className="reveal-on-scroll" style={{ marginBottom: "3rem" }}>
            <span className="section-tag">Experience</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Professional{" "}
              <span className="gradient-text">Journey</span>
            </h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div
              style={{
                position: "absolute",
                left: "20px",
                top: "48px",
                bottom: "0",
                width: "1px",
                background:
                  "linear-gradient(to bottom, var(--accent-primary), transparent)",
                zIndex: 0,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="reveal-on-scroll"
                  style={{
                    display: "flex",
                    gap: "2rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Timeline dot */}
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: idx === 0
                          ? "var(--accent-primary)"
                          : "var(--bg-card)",
                        border: "2px solid var(--accent-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: idx === 0 ? "var(--glow-accent)" : "none",
                      }}
                    >
                      <Building2
                        size={16}
                        style={{
                          color: idx === 0 ? "#fff" : "var(--accent-primary)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass-card" style={{ flex: 1, padding: "1.75rem" }}>
                    {/* Header */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.25rem" }}>
                          <h3
                            style={{
                              fontSize: "1.15rem",
                              fontWeight: 700,
                              color: "var(--text-primary)",
                            }}
                          >
                            {exp.company}
                          </h3>
                          {idx === 0 && (
                            <span
                              style={{
                                fontSize: "0.7rem",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 600,
                                padding: "2px 8px",
                                borderRadius: "100px",
                                background: "rgba(34, 197, 94, 0.1)",
                                color: "#22c55e",
                                border: "1px solid rgba(34, 197, 94, 0.25)",
                              }}
                            >
                              Current
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent-primary)" }}>
                          {exp.role}
                        </p>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          <Calendar size={12} />
                          {exp.duration}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          <MapPin size={12} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        marginBottom: "1.25rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          style={{
                            display: "flex",
                            gap: "10px",
                            fontSize: "0.875rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              flexShrink: 0,
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: "var(--accent-primary)",
                              marginTop: "8px",
                            }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {exp.technologies.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
