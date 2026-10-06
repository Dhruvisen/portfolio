"use client";

/**
 * ProjectTiltCard Component
 * -----------------------------------------------------------------------------
 * Enhances project cards with hardware-accelerated 3D depth, dynamic mouse tilt,
 * specular lighting reflections, and neon border glow.
 */

import { useRef, useState, useEffect, ReactNode } from "react";

interface ProjectTiltCardProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function ProjectTiltCard({ children, onClick }: ProjectTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-12deg to +12deg)
    const rotateX = ((mouseY / height) - 0.5) * -16;
    const rotateY = ((mouseX / width) - 0.5) * 16;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`
    );

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease"
          : "transform 0.5s ease-out, box-shadow 0.5s ease",
        transformStyle: "preserve-3d",
        position: "relative",
        borderRadius: "16px",
        height: "100%",
        cursor: "pointer",
        boxShadow: isHovered
          ? "0 20px 40px rgba(99, 102, 241, 0.25), 0 0 20px rgba(34, 211, 238, 0.15)"
          : "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Specular 3D Glare Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          pointerEvents: "none",
          zIndex: 5,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          opacity: glarePos.opacity,
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </div>
  );
}
