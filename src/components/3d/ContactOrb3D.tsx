"use client";

/**
 * ContactOrb3D Component
 * -----------------------------------------------------------------------------
 * A 3D AI glowing element featuring nested rotating torus rings and a pulsing
 * plasma sphere core. Positioned alongside contact details.
 */

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ContactMesh() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.5;
      outerRingRef.current.rotation.y += delta * 0.8;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x -= delta * 0.7;
      innerRingRef.current.rotation.z += delta * 0.6;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Outer Neon Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Neon Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.3, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2.0}
          roughness={0.1}
        />
      </mesh>

      {/* Plasma Core Orb */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 2]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#8b5cf6"
          emissiveIntensity={2.2}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function ContactOrb3D() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "220px",
        borderRadius: "16px",
        overflow: "hidden",
        background: "rgba(15, 23, 42, 0.4)",
        border: "1px solid rgba(99, 102, 241, 0.25)",
        marginTop: "1rem",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color="#22d3ee" />
        <ContactMesh />
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          pointerEvents: "none",
        }}
      >
        ✦ Neural Signal Active
      </div>
    </div>
  );
}
