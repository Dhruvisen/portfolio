"use client";

/**
 * SceneBackground Component
 * -----------------------------------------------------------------------------
 * Provides a global subtle particle field / data-stream background effect across
 * the application. Designed for low GPU footprint, 60fps target, and high readability.
 */

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particleCount = isMobile ? 120 : 350;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);

    const c1 = new THREE.Color("#6366f1"); // Neon Indigo
    const c2 = new THREE.Color("#22d3ee"); // Neon Cyan
    const c3 = new THREE.Color("#a78bfa"); // Neon Purple

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const colorChoice = Math.random();
      const color = colorChoice < 0.4 ? c1 : colorChoice < 0.8 ? c2 : c3;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sz[i] = Math.random() * 0.15 + 0.05;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow ambient upward particle flow
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      array[i * 3 + 1] += delta * 0.4;
      if (array[i * 3 + 1] > 20) {
        array[i * 3 + 1] = -20;
      }
    }
    posAttr.needsUpdate = true;

    // Subtle drift with scroll
    const scrollY = window.scrollY || 0;
    pointsRef.current.rotation.y = scrollY * 0.0003;
    pointsRef.current.rotation.x = scrollY * 0.0001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function SceneBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <DataParticles />
      </Canvas>
    </div>
  );
}
