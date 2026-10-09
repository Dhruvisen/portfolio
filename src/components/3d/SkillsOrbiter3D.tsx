"use client";

/**
 * SkillsOrbiter3D Component
 * -----------------------------------------------------------------------------
 * Interactive 3D orbiting skill cluster featuring glowing tech spheres (Python,
 * PyTorch, RAG, Vector DBs, etc.). Responds to mouse hover with node
 * expansion, emissive glow, and high-performance WebGL 3D text sprites.
 * Compatible with React 19 & Next.js 16 without root unmount warnings.
 */

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skills } from "@/data/portfolio";

const categoryColors: Record<string, string> = {
  "Generative AI & LLMs": "#6366f1",
  "Frameworks & Orchestration": "#a78bfa",
  "AI / ML": "#22d3ee",
  "Languages & Backend": "#f472b6",
  "Data & Databases": "#fb923c",
  "Libraries & Tools": "#34d399",
  "Platforms & Visualization": "#fbbf24",
};

interface SkillNode {
  name: string;
  category: string;
  level: string;
  pos: [number, number, number];
  basePos: [number, number, number];
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
}

// Generate dynamic 2D canvas texture for crisp WebGL 3D labels
function createLabelTexture(
  text: string,
  color: string,
  isHovered: boolean,
  level: string
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 70;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, 300, 70);

    // Pill background
    const x = 8, y = 8, w = 284, h = 54, r = 24;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();

    ctx.fillStyle = isHovered ? color : "rgba(15, 23, 42, 0.9)";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = isHovered ? 3 : 1.5;
    ctx.stroke();

    // Text Label
    ctx.fillStyle = isHovered ? "#0f172a" : "#ffffff";
    ctx.font = "bold 20px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const labelText = isHovered ? `${text} • ${level}` : text;
    ctx.fillText(labelText, 150, 35);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function SkillSphere({
  skill,
  activeCategory,
  onHover,
  hoveredSkill,
}: {
  skill: SkillNode;
  activeCategory: string | null;
  onHover: (name: string | null) => void;
  hoveredSkill: string | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hoveredSkill === skill.name;
  const isHighlighted =
    activeCategory === null || activeCategory === skill.category;

  // Memoize canvas text textures for performance
  const texture = useMemo(
    () => createLabelTexture(skill.name, skill.color, isHovered, skill.level),
    [skill.name, skill.color, isHovered, skill.level]
  );

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Orbit motion
    skill.orbitAngle += delta * skill.orbitSpeed * (isHovered ? 0.2 : 1);
    const r = skill.orbitRadius;
    meshRef.current.position.x = Math.cos(skill.orbitAngle) * r;
    meshRef.current.position.z = Math.sin(skill.orbitAngle) * r;
    meshRef.current.position.y =
      skill.basePos[1] + Math.sin(state.clock.elapsedTime * 1.5 + skill.orbitAngle) * 0.3;

    // Smooth hover scale transition
    const targetScale = isHovered ? 1.4 : isHighlighted ? 1.0 : 0.6;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    );
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={skill.pos}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(skill.name);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 2.0 : isHighlighted ? 0.9 : 0.2}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={isHighlighted ? 1 : 0.3}
        />

        {/* 3D WebGL Label Sprite attached over sphere */}
        <sprite position={[0, 0.65, 0]} scale={[2.2, 0.52, 1]}>
          <spriteMaterial
            map={texture}
            transparent
            opacity={isHighlighted ? 1 : 0.3}
            depthTest={false}
          />
        </sprite>
      </mesh>
    </group>
  );
}

function SkillCluster({ activeCategory }: { activeCategory: string | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Extract skills from portfolio data into 3D positions
  const skillNodes = useMemo(() => {
    const nodes: SkillNode[] = [];
    let index = 0;

    Object.entries(skills).forEach(([category, skillList]) => {
      const catColor = categoryColors[category] || "#6366f1";
      skillList.forEach((skill) => {
        const phi = Math.acos(-1 + (2 * index) / 32);
        const theta = Math.sqrt(32 * Math.PI) * phi;

        const radius = 3.5 + (index % 3) * 0.8;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = (Math.random() - 0.5) * 3.5;
        const z = radius * Math.sin(theta) * Math.sin(phi);

        nodes.push({
          name: skill.name,
          category,
          level: skill.level,
          pos: [x, y, z],
          basePos: [x, y, z],
          color: catColor,
          orbitRadius: Math.sqrt(x * x + z * z),
          orbitSpeed: (0.15 + Math.random() * 0.2) * (index % 2 === 0 ? 1 : -1),
          orbitAngle: Math.atan2(z, x),
        });
        index++;
      });
    });

    return nodes;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && !hoveredSkill) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Glowing AI Nucleus */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={2.0}
          wireframe
        />
      </mesh>

      {/* Orbiting Skill Nodes */}
      {skillNodes.map((skill) => (
        <SkillSphere
          key={skill.name}
          skill={skill}
          activeCategory={activeCategory}
          onHover={setHoveredSkill}
          hoveredSkill={hoveredSkill}
        />
      ))}
    </group>
  );
}

export default function SkillsOrbiter3D({
  activeCategory,
}: {
  activeCategory: string | null;
}) {
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
        height: "450px",
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        background: "rgba(15, 23, 42, 0.4)",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        marginBottom: "2rem",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#22d3ee" />
        <SkillCluster activeCategory={activeCategory} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: "12px",
          right: "16px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          pointerEvents: "none",
          background: "rgba(0,0,0,0.5)",
          padding: "4px 10px",
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        ❖ 3D Interactive Skill Cluster
      </div>
    </div>
  );
}
