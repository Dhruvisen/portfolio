"use client";

/**
 * Skills Component
 * -----------------------------------------------------------------------------
 * Displays Dhruvi's technical expertise across AI, ML, LLMs, RAG, Databases, and tools.
 * Integrated with 3D ELEMENT #3: SkillsOrbiter3D - an orbiting 3D sphere cluster with
 * category filtering and interactive hover badges.
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import { skills } from "@/data/portfolio";

// Dynamically import 3D Skills Orbiter canvas (SSR disabled)
const SkillsOrbiter3D = dynamic(() => import("@/components/3d/SkillsOrbiter3D"), {
  ssr: false,
});

const categoryColors: Record<string, string> = {
  "Generative AI & LLMs": "#6366f1",
  "Frameworks & Orchestration": "#a78bfa",
  "AI / ML": "#22d3ee",
  "Languages & Backend": "#f472b6",
  "Data & Databases": "#fb923c",
  "Libraries & Tools": "#34d399",
  "Platforms & Visualization": "#fbbf24",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Object.keys(skills);

  return (
    <section
      id="skills"
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, transparent, rgba(99,102,241,0.02) 50%, transparent)",
      }}
    >
      <div className="container-width">
        <div className="reveal-on-scroll" style={{ marginBottom: "2rem" }}>
          <span className="section-tag">Skills</span>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
            Technical{" "}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Explore skills in 3D or filter by technical category below.
          </p>
        </div>

        {/* 
          -----------------------------------------------------------------------
          3D ELEMENT #3: Floating 3D Skill Spheres Orbiting Cluster
          R3F canvas displaying Python, PyTorch, LangChain, RAG, LLMs orbiting in 3D
          -----------------------------------------------------------------------
        */}
        <div className="reveal-on-scroll">
          <SkillsOrbiter3D activeCategory={activeCategory} />
        </div>

        {/* Category filters */}
        <div
          className="reveal-on-scroll"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              padding: "5px 14px",
              borderRadius: "100px",
              fontSize: "0.8rem",
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              background:
                activeCategory === null ? "var(--accent-primary)" : "var(--bg-card)",
              color: activeCategory === null ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${activeCategory === null ? "var(--accent-primary)" : "var(--border-card)"}`,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              style={{
                padding: "5px 14px",
                borderRadius: "100px",
                fontSize: "0.8rem",
                fontWeight: 600,
                background:
                  activeCategory === cat
                    ? `${categoryColors[cat]}20`
                    : "var(--bg-card)",
                color:
                  activeCategory === cat
                    ? categoryColors[cat]
                    : "var(--text-secondary)",
                border: `1px solid ${
                  activeCategory === cat
                    ? `${categoryColors[cat]}50`
                    : "var(--border-card)"
                }`,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Skills Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {categories
            .filter((cat) => activeCategory === null || activeCategory === cat)
            .map((cat) => (
              <div
                key={cat}
                className="glass-card reveal-on-scroll"
                style={{ padding: "1.375rem" }}
              >
                {/* Category header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "1.125rem",
                    paddingBottom: "0.75rem",
                    borderBottom: `1px solid ${categoryColors[cat] ?? "var(--border-card)"}25`,
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: categoryColors[cat] ?? "var(--accent-primary)",
                      boxShadow: `0 0 8px ${categoryColors[cat] ?? "var(--accent-primary)"}60`,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "0.83rem",
                      fontWeight: 700,
                      color: categoryColors[cat] ?? "var(--accent-primary)",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {cat}
                  </h3>
                </div>

                {/* Skills List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {(skills as Record<string, Array<{ name: string; level: string }>>)[cat].map(
                    (skill) => (
                      <div key={skill.name}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 500,
                              color: "var(--text-secondary)",
                            }}
                          >
                            {skill.name}
                          </span>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontFamily: "'JetBrains Mono', monospace",
                              color: "var(--text-muted)",
                              fontWeight: 500,
                            }}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div
                          style={{
                            height: "3px",
                            borderRadius: "100px",
                            background: "var(--bg-secondary)",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            className={`skill-level-${skill.level.toLowerCase()}`}
                            style={{
                              height: "100%",
                              borderRadius: "100px",
                              transition: "width 0.6s ease",
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
