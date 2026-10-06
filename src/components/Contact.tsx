"use client";

/**
 * Contact Component
 * -----------------------------------------------------------------------------
 * Contact section with email, LinkedIn, GitHub, Location, status badge, and contact form.
 * Integrated with 3D ELEMENT #6: ContactOrb3D - a 3D rotating dual neon ring with
 * pulsing plasma core orb positioned alongside contact details.
 */

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { personal } from "@/data/portfolio";

// Dynamically import 3D Contact Orb canvas (SSR disabled)
const ContactOrb3D = dynamic(() => import("@/components/3d/ContactOrb3D"), {
  ssr: false,
});

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [loading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required.";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    background: "var(--bg-secondary)",
    border: "1px solid var(--border-card)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.2s ease",
    outline: "none",
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: "#6366f1",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "dhruvi-senjaliya",
      href: personal.linkedin,
      color: "#0077b5",
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "@Dhruvisen",
      href: personal.github,
      color: "#e2e8f0",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personal.location,
      href: null,
      color: "#22d3ee",
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-width">
        <div className="reveal-on-scroll" style={{ marginBottom: "3rem", textAlign: "center" }}>
          <span className="section-tag" style={{ justifyContent: "center" }}>
            Contact
          </span>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700 }}>
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              marginTop: "0.75rem",
              maxWidth: "500px",
              margin: "0.75rem auto 0",
            }}
          >
            Have an AI/ML problem to solve, or want to discuss an opportunity? I&apos;d love to hear from you.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className="reveal-on-scroll"
        >
          {/* Left: Contact Info + 3D Contact Orb */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {contactLinks.map((link) => (
              <div
                key={link.label}
                className="glass-card"
                style={{ padding: "1.125rem" }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <link.icon size={16} style={{ color: link.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>
                        {link.label}
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                        {link.value}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <link.icon size={16} style={{ color: link.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "2px" }}>
                        {link.label}
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)" }}>
                        {link.value}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Status */}
            <div
              style={{
                padding: "1rem",
                background: "rgba(34, 197, 94, 0.06)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span className="status-dot" />
              <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                Available for full-time roles & freelance projects
              </span>
            </div>

            {/* 
              -------------------------------------------------------------------
              3D ELEMENT #6: Contact 3D Rotating Ring & Plasma Core Orb
              R3F interactive canvas embedded next to contact details
              -------------------------------------------------------------------
            */}
            <ContactOrb3D />
          </div>

          {/* Right: Contact Form */}
          <div className="glass-card" style={{ padding: "1.75rem" }}>
            {status === "sent" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  gap: "1rem",
                  textAlign: "center",
                  minHeight: "280px",
                }}
              >
                <CheckCircle2 size={40} style={{ color: "#22c55e" }} />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Message prepared!
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Your email client should have opened. Looking forward to connecting!
                </p>
                <button className="btn-secondary" onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{
                        ...inputStyle,
                        borderColor: errors.name ? "#f87171" : "var(--border-card)",
                      }}
                      onFocus={(e) => {
                        if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "var(--border-hover)";
                      }}
                      onBlur={(e) => {
                        if (!errors.name) (e.target as HTMLInputElement).style.borderColor = "var(--border-card)";
                      }}
                    />
                    {errors.name && (
                      <p style={{ fontSize: "0.75rem", color: "#f87171", marginTop: "4px" }}>{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{
                        ...inputStyle,
                        borderColor: errors.email ? "#f87171" : "var(--border-card)",
                      }}
                      onFocus={(e) => {
                        if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "var(--border-hover)";
                      }}
                      onBlur={(e) => {
                        if (!errors.email) (e.target as HTMLInputElement).style.borderColor = "var(--border-card)";
                      }}
                    />
                    {errors.email && (
                      <p style={{ fontSize: "0.75rem", color: "#f87171", marginTop: "4px" }}>{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "120px",
                        borderColor: errors.message ? "#f87171" : "var(--border-card)",
                      }}
                      onFocus={(e) => {
                        if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "var(--border-hover)";
                      }}
                      onBlur={(e) => {
                        if (!errors.message) (e.target as HTMLTextAreaElement).style.borderColor = "var(--border-card)";
                      }}
                    />
                    {errors.message && (
                      <p style={{ fontSize: "0.75rem", color: "#f87171", marginTop: "4px" }}>{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Send size={14} />
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 680px) {
          #contact .container-width > div:last-child > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
