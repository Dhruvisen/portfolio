"use client";
import { Mail, Download, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { personal, education, certifications } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-card)",
        background: "var(--bg-secondary)",
      }}
    >
      {/* Education & Certifications strip */}
      <div className="section-padding" style={{ paddingBottom: "2rem" }}>
        <div className="container-width">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
            }}
          >
            {/* Education */}
            <div>
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent-primary)",
                  marginBottom: "1.125rem",
                }}
              >
                Education
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {education.map((ed) => (
                  <div key={ed.degree}>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginBottom: "2px",
                      }}
                    >
                      {ed.degree}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                      {ed.institution}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {ed.location} · {ed.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Hackathons */}
            <div>
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent-primary)",
                  marginBottom: "1.125rem",
                }}
              >
                Certifications & Achievements
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: "0.7rem",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        marginTop: "2px",
                        background:
                          cert.type === "hackathon"
                            ? "rgba(167,139,250,0.1)"
                            : "rgba(99,102,241,0.1)",
                        color:
                          cert.type === "hackathon"
                            ? "var(--accent-violet)"
                            : "var(--accent-secondary)",
                        border: `1px solid ${
                          cert.type === "hackathon"
                            ? "rgba(167,139,250,0.25)"
                            : "rgba(99,102,241,0.2)"
                        }`,
                      }}
                    >
                      {cert.type === "hackathon" ? "HK" : "CERT"}
                    </span>
                    <div>
                      <div style={{ fontSize: "0.83rem", fontWeight: 500, color: "var(--text-secondary)" }}>
                        {cert.title}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {cert.issuer}
                        {cert.detail ? ` · ${cert.detail}` : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="glow-line" />

      {/* Bottom bar */}
      <div className="container-width" style={{ padding: "1.25rem 1.5rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Left: Name + role */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--text-primary)",
              }}
            >
              {personal.name}
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {personal.title}
            </div>
          </div>

          {/* Center: Links */}
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                color: "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              <GithubIcon size={14} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                color: "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              <LinkedinIcon size={14} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                color: "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              <Mail size={14} />
            </a>
            <a
              href={personal.resumeUrl}
              download
              aria-label="Download Resume"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                color: "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              <Download size={14} />
            </a>
          </div>

          {/* Right: Copyright */}
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            © {year} {personal.name}. All rights reserved.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          footer .container-width > div:first-child > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
