"use client";

/**
 * Projects Component
 * -----------------------------------------------------------------------------
 * Displays Dhruvi's AI projects (Agentic ERP Platform, CodeBase RAG, Pathology Report AI Extractor, etc.).
 * Integrated with 3D ELEMENT #4: ProjectTiltCard - hardware-accelerated 3D tilt cards
 * with dynamic perspective depth, mouse light reflections, neon glow, and smooth modal transitions.
 */

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { projects } from "@/data/portfolio";
import ProjectTiltCard from "@/components/3d/ProjectTiltCard";

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-hover)",
          borderRadius: "20px",
          padding: "2rem",
          maxWidth: "720px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <span className="category-pill" style={{ marginBottom: "0.5rem", display: "inline-block" }}>
              {project.category}
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.375rem" }}>
              {project.name}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.375rem" }}>
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-card)",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              flexShrink: 0,
              marginLeft: "1rem",
            }}
          >
            ✕
          </button>
        </div>

        {/* Problem & Solution */}
        {project.problem && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
              Problem
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {project.problem}
            </p>
          </div>
        )}
        {project.solution && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
              Solution
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {project.solution}
            </p>
          </div>
        )}

        {/* Architecture */}
        {project.architecture && project.architecture.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent-primary)", marginBottom: "0.875rem" }}>
              Architecture
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                alignItems: "center",
                padding: "1.25rem",
                background: "var(--bg-secondary)",
                borderRadius: "12px",
                border: "1px solid var(--border-card)",
              }}
            >
              {project.architecture.map((step, i) => (
                <div key={step.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "var(--accent-secondary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.label}
                  </div>
                  {i < project.architecture.length - 1 && (
                    <ArrowRight size={12} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agents */}
        {project.agents && project.agents.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
              Agents
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.agents.map((a) => (
                <span key={a} className="tech-badge" style={{ background: "rgba(167,139,250,0.1)", borderColor: "rgba(167,139,250,0.25)", color: "var(--accent-violet)" }}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        {project.tools && project.tools.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
              Tools & Integrations
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tools.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
            Technologies
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.technologies.map((t) => (
              <span key={t} className="tech-badge">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border-card)" }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <GithubIcon size={14} /> View on GitHub
            </a>
          )}
          {!project.github && (
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontFamily: "'JetBrains Mono', monospace",
                padding: "0.625rem 0",
              }}
            >
              {project.status === "Production (Bluepixel)" || project.status === "Production"
                ? "Production — private repository"
                : project.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 
        -----------------------------------------------------------------------
        3D ELEMENT #4: Project 3D Tilt Card
        Wraps project card in hardware-accelerated 3D perspective tilt physics
        -----------------------------------------------------------------------
      */}
      <ProjectTiltCard onClick={() => setOpen(true)}>
        <div
          className="glass-card"
          style={{
            padding: "1.5rem",
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top category & github icon */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.875rem" }}>
            <span className="category-pill">{project.category}</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="GitHub repository"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-card)",
                    color: "var(--text-secondary)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-card)";
                  }}
                >
                  <GithubIcon size={13} />
                </a>
              )}
              {project.highlight && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "100px",
                    background: "rgba(99,102,241,0.15)",
                    color: "var(--accent-primary)",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  Featured
                </span>
              )}
            </div>
          </div>

          <h3
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: "0.83rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: "1.25rem",
              flex: 1,
            }}
          >
            {project.tagline}
          </p>

          {/* Tech badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "1rem" }}>
            {project.technologies.slice(0, 5).map((t) => (
              <span key={t} className="tech-badge" style={{ fontSize: "0.68rem" }}>
                {t}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="tech-badge" style={{ fontSize: "0.68rem" }}>
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* View details CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--accent-primary)",
            }}
          >
            View details
            <ArrowRight size={13} />
          </div>
        </div>
      </ProjectTiltCard>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const displayed = showAll ? projects : featured;

  return (
    <section id="projects" className="section-padding">
      <div className="container-width">
        <div className="reveal-on-scroll" style={{ marginBottom: "3rem", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
          <div>
            <span className="section-tag">Projects</span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
              What I&apos;ve{" "}
              <span className="gradient-text">Built</span>
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Hover cards for 3D tilt depth. Click any card to explore full architecture & details.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {displayed.map((p) => (
            <div key={p.id} className="reveal-on-scroll">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        {rest.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              className="btn-secondary"
              onClick={() => setShowAll(!showAll)}
              style={{ margin: "0 auto" }}
            >
              {showAll ? (
                <>
                  <ChevronUp size={15} /> Show fewer
                </>
              ) : (
                <>
                  <ChevronDown size={15} /> Show all {projects.length} projects
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
