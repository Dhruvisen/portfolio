"use client";
import { Brain, Cpu, Database, Code2, Workflow } from "lucide-react";
import { personal } from "@/data/portfolio";

const pillars = [
  {
    icon: Brain,
    label: "Generative AI & LLMs",
    desc: "Building systems with large language models, RAG pipelines, and fine-tuned models for domain-specific tasks.",
  },
  {
    icon: Workflow,
    label: "Agentic AI Systems",
    desc: "Designing multi-agent orchestration with LangChain/LangGraph — agents that reason, use tools, and complete complex workflows.",
  },
  {
    icon: Code2,
    label: "Backend Engineering",
    desc: "Production API systems with FastAPI and Django, connecting AI capabilities to real-world applications.",
  },
  {
    icon: Database,
    label: "Data & Vector Stores",
    desc: "Working with SQL databases, Redis, and vector databases (Qdrant, ChromaDB, pgvector) for grounded AI retrieval.",
  },
  {
    icon: Cpu,
    label: "NLP & Computer Vision",
    desc: "Applied NLP with NLTK and transformers, computer vision with OpenCV, OCR with Tesseract, and face recognition.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-width">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="reveal-on-scroll">
            <span className="section-tag">About</span>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              I build AI systems that{" "}
              <span className="gradient-text">work in production</span>
            </h2>
          </div>

          <div
            className="reveal-on-scroll"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            <p className="prose-bio">
              I&apos;m an AI/ML Developer with hands-on experience building complete intelligent systems — 
              not just model experiments. At{" "}
              <strong style={{ color: "var(--text-primary)" }}>Hexylon Analytics</strong>, I design and 
              integrate multi-agent architectures into enterprise ERP workflows: orchestrating specialized 
              agents that handle HR queries, purchase order creation, OCR-based document processing, and 
              browser automation — all powered by LLMs.
            </p>
            <p className="prose-bio">
              My work spans the full AI stack:{" "}
              <strong style={{ color: "var(--text-primary)" }}>RAG pipelines</strong> with vector databases, 
              <strong style={{ color: "var(--text-primary)" }}> LLM fine-tuning</strong> for domain tasks, 
              <strong style={{ color: "var(--text-primary)" }}> agentic orchestration</strong> with LangChain 
              and LangGraph, and production backends with FastAPI and Django. I care about building systems 
              that are reliable, maintainable, and useful — not just technically impressive.
            </p>
            <p className="prose-bio">
              I&apos;ve also worked on NLP text processing, computer vision with OpenCV, face recognition for 
              attendance systems, and speech AI — integrating and fine-tuning TTS models like Orpheus and Veena.
            </p>
          </div>

          {/* Pillars */}
          <div
            className="reveal-on-scroll"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {pillars.map((p) => (
              <div
                key={p.label}
                className="glass-card"
                style={{ padding: "1.25rem" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(99, 102, 241, 0.1)",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.875rem",
                  }}
                >
                  <p.icon size={18} style={{ color: "var(--accent-primary)" }} />
                </div>
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {p.label}
                </h3>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.65, color: "var(--text-muted)" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
