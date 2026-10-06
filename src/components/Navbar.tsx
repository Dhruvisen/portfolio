"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { personal } from "@/data/portfolio";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Architecture", href: "#architecture" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(sec);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "var(--nav-height)",
          transition: "all 0.3s ease",
          background: scrolled
            ? "var(--bg-glass)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--border-card)"
            : "1px solid transparent",
        }}
        className={scrolled ? "nav-backdrop" : ""}
      >
        <div className="container-width" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button
            onClick={() => handleNav("#home")}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: "1rem",
              color: "var(--text-primary)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "var(--accent-primary)" }}>{"<"}</span>
            <span>Dhruvi</span>
            <span style={{ color: "var(--accent-primary)" }}>{">"}</span>
          </button>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color:
                    active === link.href.replace("#", "")
                      ? "var(--accent-primary)"
                      : "var(--text-secondary)",
                  transition: "color 0.2s ease, background 0.2s ease",
                }}
                className={active === link.href.replace("#", "") ? "nav-item-active" : ""}
                onMouseEnter={(e) => {
                  if (active !== link.href.replace("#", "")) {
                    (e.target as HTMLButtonElement).style.color = "var(--text-primary)";
                    (e.target as HTMLButtonElement).style.background = "var(--bg-card)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== link.href.replace("#", "")) {
                    (e.target as HTMLButtonElement).style.color = "var(--text-secondary)";
                    (e.target as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Social icons (desktop) */}
            <div className="hidden md:flex" style={{ gap: "0.25rem", display: "flex" }}>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  color: "var(--text-secondary)",
                  transition: "color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                <GithubIcon size={17} />
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
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  color: "var(--text-secondary)",
                  transition: "color 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                <LinkedinIcon size={17} />
              </a>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hover)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--accent-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-card)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
              }}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="flex md:hidden"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--nav-height)",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40,
            background: "var(--bg-primary)",
            borderTop: "1px solid var(--border-card)",
            overflowY: "auto",
          }}
          className="nav-backdrop md:hidden"
        >
          <div className="container-width" style={{ paddingTop: "1.5rem", paddingBottom: "2rem" }}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.875rem 0",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--border-card)",
                  color:
                    active === link.href.replace("#", "")
                      ? "var(--accent-primary)"
                      : "var(--text-secondary)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                <GithubIcon size={15} /> GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                <LinkedinIcon size={15} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
