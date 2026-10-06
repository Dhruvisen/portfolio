"use client";
import { ExternalLink, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { githubRepos } from "@/data/portfolio";
import { personal } from "@/data/portfolio";

const langColors: Record<string, string> = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
};

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000 / 60 / 60 / 24);
  if (diff === 0) return "today";
  if (diff < 30) return `${diff}d ago`;
  if (diff < 365) return `${Math.floor(diff / 30)}mo ago`;
  return `${Math.floor(diff / 365)}y ago`;
}

export default function GitHubSection() {
  return (
    <section id="github" className="section-padding">
      <div className="container-width">
        <div
          className="reveal-on-scroll"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <span className="section-tag">GitHub</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              Open Source{" "}
              <span className="gradient-text">Work</span>
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Curated repositories from{" "}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--accent-primary)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                @Dhruvisen
              </a>
            </p>
          </div>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <GithubIcon size={14} />
            View all repositories
            <ExternalLink size={11} />
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {githubRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card reveal-on-scroll"
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                textDecoration: "none",
              }}
            >
              {/* Repo name */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <GithubIcon size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--accent-primary)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {repo.name}
                  </span>
                </div>
                <ExternalLink size={13} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: "2px" }} />
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.83rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {repo.description || "No description provided."}
              </p>

              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid var(--border-card)",
                }}
              >
                {repo.language && (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background:
                          langColors[repo.language] ?? "var(--accent-primary)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {repo.language}
                    </span>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }}>
                  <Calendar size={11} style={{ color: "var(--text-muted)" }} />
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                    {timeAgo(repo.updatedAt)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub contribution note */}
        <div
          className="reveal-on-scroll"
          style={{
            marginTop: "2rem",
            padding: "1.25rem 1.5rem",
            background: "var(--bg-card)",
            borderRadius: "12px",
            border: "1px solid var(--border-card)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <GithubIcon size={16} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "2px" }}>
              Most production work is in private repositories
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              The Agentic ERP platform and enterprise AI systems at Hexylon Analytics are proprietary. 
              The repositories above represent personal open-source projects and explorations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
