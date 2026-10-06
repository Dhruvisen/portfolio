"use client";

/**
 * Hero Component
 * -----------------------------------------------------------------------------
 * Displays the main introduction hero section for Dhruvi Senjaliya.
 * Features an interactive 3D Neural Network background (NeuralNetwork3D) made of
 * glowing nodes & connecting lines that rotate and respond to mouse movement,
 * and a streaming typewriter tagline effect.
 */

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Download, Mail, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { personal } from "@/data/portfolio";

// Dynamically import the 3D Neural Network canvas (SSR disabled for WebGL performance)
const NeuralNetwork3D = dynamic(() => import("@/components/3d/NeuralNetwork3D"), {
  ssr: false,
});

export default function Hero() {
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Streaming typewriter animation effect for the tagline
  useEffect(() => {
    const fullText = personal.tagline;
    let charIndex = 0;

    const timer = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedTagline(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "var(--nav-height)",
      }}
    >
      {/* Background image overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
          zIndex: 0,
        }}
      />

      {/* Futuristic Radial Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* 
        -----------------------------------------------------------------------
        3D ELEMENT #1: Hero 3D Neural Network
        Interactive R3F canvas featuring glowing nodes, data connections & mouse parallax
        -----------------------------------------------------------------------
      */}
      <NeuralNetwork3D />

      <div className="container-width" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ maxWidth: "760px" }}>
          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "100px",
              background: "rgba(99, 102, 241, 0.08)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              marginBottom: "1.75rem",
            }}
          >
            <span className="status-dot" />
            <span
              style={{
                fontSize: "0.78rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
                color: "var(--accent-secondary)",
              }}
            >
              Open to opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            <span className="gradient-text-subtle">{personal.name}</span>
          </h1>

          {/* Title */}
          <div
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
              fontWeight: 600,
              color: "var(--accent-primary)",
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span>{personal.title}</span>
            <span style={{ color: "var(--border-hover)", fontWeight: 300 }}>·</span>
            <span style={{ color: "var(--accent-violet)", fontSize: "0.95em" }}>
              LLMs · RAG · Agentic AI
            </span>
          </div>

          {/* Streaming Typewriter Tagline */}
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "600px",
              marginBottom: "1.5rem",
              minHeight: "3.5rem",
            }}
          >
            {displayedTagline}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                backgroundColor: "var(--accent-primary)",
                marginLeft: "4px",
                verticalAlign: "middle",
                animation: isTypingComplete
                  ? "blink 1.2s infinite"
                  : "none",
                opacity: isTypingComplete ? 0.5 : 1,
              }}
            />
          </p>

          {/* Meta Details */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              <Briefcase size={14} style={{ color: "var(--accent-primary)" }} />
              <span>Hexylon Analytics, Ahmedabad</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
              }}
            >
              <MapPin size={14} style={{ color: "var(--accent-primary)" }} />
              <span>{personal.location}</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              id="hero-github-cta"
            >
              <GithubIcon size={15} />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              id="hero-linkedin-cta"
            >
              <LinkedinIcon size={15} />
              LinkedIn
            </a>
            <a
              href={personal.resumeUrl}
              download
              className="btn-secondary"
              id="hero-resume-cta"
            >
              <Download size={15} />
              Resume
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary"
              id="hero-contact-cta"
              style={{ border: "none" }}
            >
              <Mail size={15} />
              Contact
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient transition fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--bg-primary))",
          zIndex: 2,
        }}
      />

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
