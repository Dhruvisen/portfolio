"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHidden(true), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 10);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0d14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.4s ease, visibility 0.4s ease",
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? "none" : "all",
      }}
    >
      {/* 3D Wireframe Cube Loader */}
      <div
        style={{
          width: "60px",
          height: "60px",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "cubeRotate 3s infinite linear",
          marginBottom: "1.5rem",
        }}
      >
        <div className="cube-face cube-front" />
        <div className="cube-face cube-back" />
        <div className="cube-face cube-right" />
        <div className="cube-face cube-left" />
        <div className="cube-face cube-top" />
        <div className="cube-face cube-bottom" />
      </div>

      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "var(--accent-primary, #6366f1)",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
        }}
      >
        INITIALIZING 3D ENGINE... {Math.min(progress, 100)}%
      </div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: "220px",
          height: "4px",
          background: "rgba(99, 102, 241, 0.15)",
          borderRadius: "100px",
          overflow: "hidden",
          border: "1px solid rgba(99, 102, 241, 0.3)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, #6366f1, #22d3ee)",
            boxShadow: "0 0 10px #6366f1",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes cubeRotate {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        .cube-face {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 1.5px solid rgba(99, 102, 241, 0.6);
          background: rgba(99, 102, 241, 0.05);
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.3) inset;
        }
        .cube-front {
          transform: translateZ(30px);
        }
        .cube-back {
          transform: rotateY(180deg) translateZ(30px);
        }
        .cube-right {
          transform: rotateY(90deg) translateZ(30px);
        }
        .cube-left {
          transform: rotateY(-90deg) translateZ(30px);
        }
        .cube-top {
          transform: rotateX(90deg) translateZ(30px);
        }
        .cube-bottom {
          transform: rotateX(-90deg) translateZ(30px);
        }
      `}</style>
    </div>
  );
}
