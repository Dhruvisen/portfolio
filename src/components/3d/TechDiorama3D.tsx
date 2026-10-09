"use client";

/**
 * TechDiorama3D Component
 * -----------------------------------------------------------------------------
 * 3D Isometric Tech Diorama for Developer Portfolio Landing Page.
 *
 * Aesthetics:
 * - Matte minimalist clay texture mixed with frosted glass (glassmorphism) and subtle metallic accents.
 * - Dark charcoal (#121214) backdrop with soft lavender and emerald/cyan ambient highlights.
 *
 * Focal Points:
 * 1. Central workstation with ultra-wide curved screen showing an abstract neural network graph.
 * 2. Floating server rack / database cubes with glowing circuit lines.
 * 3. Small details: Potted bonsai plant, coffee cup emitting soft steam, ambient glowing spheres.
 *
 * States & Interactions:
 * - State 1 (Base): Subtle floating animation on secondary props.
 * - State 2 (Mouse Move): 3D parallax tilt following cursor position.
 * - State 3 (Click on Monitor): Camera zooms into monitor frame showing project case studies.
 */

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { X, ExternalLink, Cpu, Layers, Sparkles } from "lucide-react";
import { projects } from "@/data/portfolio";

// =============================================================================
// MATERIALS & COLOR PALETTE DEFINITION (DARK BLUE & DARK YELLOW / CYBER GOLD)
// =============================================================================

const COLORS = {
  bg: "#080d1a",           // Deep Midnight Blue Backdrop
  clayDark: "#0f172a",     // Dark Navy Slate Clay Base
  clayMedium: "#1e293b",   // Cobalt Slate Clay
  clayLight: "#334155",    // Steel Blue Clay
  clayDesk: "#0b132b",     // Deep Navy Desk Surface
  clayPot: "#1c2541",      // Dark Sapphire Pot
  clayFoliage: "#34d399",  // Emerald Plant Accent
  clayCup: "#fef08a",      // Warm Amber Cream Cup
  metallic: "#fbbf24",     // Cyber Gold Metallic Trim
  darkMetal: "#1e293b",    // Dark Slate Metal
  cyan: "#f59e0b",         // Cyber Dark Yellow / Amber Primary Glow
  lavender: "#38bdf8",     // Electric Sapphire Blue Highlight
  emerald: "#fbbf24",      // Golden Accent Glow
  goldPrimary: "#f59e0b",  // Dark Yellow / Gold Emissive
  goldDark: "#d97706",     // Amber Gold Shadow Emissive
  screenBg: "#050814",     // Obsidian Midnight Screen
};

// =============================================================================
// SUB-COMPONENTS FOR DIORAMA FOCAL POINTS
// =============================================================================

/**
 * 1. Base Isometric Platform with Clay Edge & Metallic Trim
 */
function IsometricPlatform() {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Main Clay Stage Base */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.5, 0.5, 8]} />
        <meshStandardMaterial
          color={COLORS.clayDark}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Top Glassmorphic Grid Surface */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[4.15, 4.15, 0.02, 8]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.25}
          transmission={0.4}
          opacity={0.8}
          transparent
          reflectivity={0.9}
        />
      </mesh>

      {/* Metallic Outer Accent Ring */}
      <mesh position={[0, -0.01, 0]}>
        <torusGeometry args={[4.22, 0.04, 16, 8]} />
        <meshStandardMaterial
          color={COLORS.metallic}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Glowing Circumference Accent */}
      <mesh position={[0, -0.06, 0]}>
        <torusGeometry args={[4.25, 0.015, 16, 8]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

/**
 * Screen Neural Network Content (Abstract Graph on Monitor)
 */
function ScreenNeuralGraph({ isHovered }: { isHovered: boolean }) {
  const pointsRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { nodes, lineGeometry } = useMemo(() => {
    const nodeArr: THREE.Vector3[] = [];
    const numNodes = 18;

    for (let i = 0; i < numNodes; i++) {
      const x = (Math.random() - 0.5) * 2.8;
      const y = (Math.random() - 0.5) * 1.1;
      const z = (Math.random() - 0.5) * 0.2;
      nodeArr.push(new THREE.Vector3(x, y, z));
    }

    const linePositions: number[] = [];
    for (let i = 0; i < nodeArr.length; i++) {
      for (let j = i + 1; j < nodeArr.length; j++) {
        if (nodeArr[i].distanceTo(nodeArr[j]) < 1.1) {
          linePositions.push(
            nodeArr[i].x, nodeArr[i].y, nodeArr[i].x,
            nodeArr[j].x, nodeArr[j].y, nodeArr[j].z
          );
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    return { nodes: nodeArr, lineGeometry: geom };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.001;
      });
    }
  });

  return (
    <group position={[0, 0, 0.05]}>
      {/* Screen Dark Background Panel */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3.2, 1.35]} />
        <meshBasicMaterial color={COLORS.screenBg} />
      </mesh>

      {/* Screen Neural Network Graph Nodes */}
      <group ref={pointsRef}>
        {nodes.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? COLORS.cyan : idx % 3 === 1 ? COLORS.lavender : COLORS.emerald}
              emissive={idx % 3 === 0 ? COLORS.cyan : idx % 3 === 1 ? COLORS.lavender : COLORS.emerald}
              emissiveIntensity={isHovered ? 2.5 : 1.8}
            />
          </mesh>
        ))}
      </group>

      {/* Graph Line Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={isHovered ? "#fbbf24" : "#f59e0b"}
          transparent
          opacity={0.7}
        />
      </lineSegments>

      {/* Code Text UI Graphic Simulation */}
      <mesh position={[-1.1, 0.45, 0.01]}>
        <planeGeometry args={[0.6, 0.12]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.8} />
      </mesh>
      <mesh position={[-1.2, -0.45, 0.01]}>
        <planeGeometry args={[0.4, 0.08]} />
        <meshBasicMaterial color={COLORS.lavender} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/**
 * 2. Central Workstation Component with Curved Ultrawide Monitor
 */
function CentralWorkstation({
  onMonitorClick,
  onMonitorHover,
  isMonitorHovered,
}: {
  onMonitorClick: () => void;
  onMonitorHover: (hovered: boolean) => void;
  isMonitorHovered: boolean;
}) {
  return (
    <group position={[0, 0, 0]}>
      {/* Desk Surface (Clay Texture) */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.1, 1.8]} />
        <meshStandardMaterial
          color={COLORS.clayDesk}
          roughness={0.85}
          metalness={0.08}
        />
      </mesh>

      {/* Metallic Edge Trim on Desk */}
      <mesh position={[0, 0.75, 0.91]}>
        <boxGeometry args={[3.42, 0.02, 0.03]} />
        <meshStandardMaterial
          color={COLORS.metallic}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Desk Metallic Legs */}
      {[
        [-1.5, 0.35, -0.7],
        [1.5, 0.35, -0.7],
        [-1.5, 0.35, 0.7],
        [1.5, 0.35, 0.7],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 16]} />
          <meshStandardMaterial
            color={COLORS.darkMetal}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Keyboard & Trackpad */}
      <mesh position={[0, 0.76, 0.45]}>
        <boxGeometry args={[0.9, 0.02, 0.3]} />
        <meshStandardMaterial
          color={COLORS.clayLight}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Ultrawide Curved Monitor Stand */}
      <mesh position={[0, 0.95, -0.4]}>
        <cylinderGeometry args={[0.04, 0.06, 0.4, 16]} />
        <meshStandardMaterial
          color={COLORS.metallic}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.76, -0.4]}>
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial
          color={COLORS.darkMetal}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Ultrawide Curved Monitor Main Body (INTERACTIVE CLICK TARGET) */}
      <group
        position={[0, 1.45, -0.35]}
        onClick={(e) => {
          e.stopPropagation();
          onMonitorClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          onMonitorHover(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          onMonitorHover(false);
        }}
      >
        {/* Curved Outer Frame (Frosted Glass / Clay mix) */}
        <mesh castShadow>
          <boxGeometry args={[3.4, 1.5, 0.12]} />
          <meshStandardMaterial
            color={isMonitorHovered ? "#1e293b" : COLORS.clayDark}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>

        {/* Outer Emissive Halo Border */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[3.46, 1.56, 0.02]} />
          <meshStandardMaterial
            color={isMonitorHovered ? COLORS.cyan : COLORS.lavender}
            emissive={isMonitorHovered ? COLORS.cyan : COLORS.lavender}
            emissiveIntensity={isMonitorHovered ? 2.0 : 0.8}
          />
        </mesh>

        {/* Curved Display Screen Face */}
        <ScreenNeuralGraph isHovered={isMonitorHovered} />

        {/* Hover Hint Overlay Label */}
        {isMonitorHovered && (
          <mesh position={[0, 0.9, 0.1]}>
            <planeGeometry args={[1.6, 0.3]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.85} />
          </mesh>
        )}
      </group>
    </group>
  );
}

/**
 * 3. Floating Database Cubes / Server Racks with Glowing Circuit Lines
 */
function FloatingDatabaseCluster() {
  const clusterRef = useRef<THREE.Group>(null);
  const cube1Ref = useRef<THREE.Mesh>(null);
  const cube2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (clusterRef.current) {
      clusterRef.current.position.y = Math.sin(t * 1.2) * 0.1;
      clusterRef.current.rotation.y = t * 0.15;
    }
    if (cube1Ref.current) {
      cube1Ref.current.rotation.x = t * 0.3;
      cube1Ref.current.rotation.z = t * 0.2;
    }
    if (cube2Ref.current) {
      cube2Ref.current.rotation.y = -t * 0.4;
    }
  });

  return (
    <group ref={clusterRef} position={[-2.4, 1.8, -0.8]}>
      {/* Outer Glassmorphic Database Core Cube */}
      <mesh ref={cube1Ref}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshPhysicalMaterial
          color={COLORS.cyan}
          transmission={0.85}
          roughness={0.15}
          transparent
          opacity={0.7}
          ior={1.4}
        />
      </mesh>

      {/* Internal Glowing Circuit Nucleus */}
      <mesh ref={cube2Ref}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={2.5}
          wireframe
        />
      </mesh>

      {/* Orbital Glowing Circuit Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.85, 0.015, 16, 32]} />
        <meshStandardMaterial
          color={COLORS.emerald}
          emissive={COLORS.emerald}
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Floating Server Stack Cube Below */}
      <group position={[0, -1.0, 0]}>
        <mesh>
          <boxGeometry args={[0.6, 0.5, 0.6]} />
          <meshStandardMaterial
            color={COLORS.clayDark}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        {/* Glowing Server Status Indicator Lights */}
        {[0.12, 0, -0.12].map((y, i) => (
          <mesh key={i} position={[0.31, y, 0.15]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color={i === 0 ? COLORS.emerald : i === 1 ? COLORS.cyan : COLORS.lavender}
              emissive={i === 0 ? COLORS.emerald : i === 1 ? COLORS.cyan : COLORS.lavender}
              emissiveIntensity={2.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * 4. Potted Bonsai Plant Detail
 */
function BonsaiPlant() {
  return (
    <group position={[1.4, 0.75, 0.5]}>
      {/* Matte Clay Pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.12, 0.3, 16]} />
        <meshStandardMaterial
          color={COLORS.clayPot}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Bonsai Stylized Stem */}
      <mesh position={[0.02, 0.4, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.03, 0.05, 0.3, 8]} />
        <meshStandardMaterial
          color="#451a03"
          roughness={0.95}
        />
      </mesh>

      {/* Geometric Clay Foliage Clusters */}
      <mesh position={[-0.05, 0.58, 0]}>
        <dodecahedronGeometry args={[0.18, 1]} />
        <meshStandardMaterial
          color={COLORS.clayFoliage}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <mesh position={[0.12, 0.52, 0.05]}>
        <dodecahedronGeometry args={[0.13, 1]} />
        <meshStandardMaterial
          color={COLORS.emerald}
          roughness={0.85}
        />
      </mesh>
    </group>
  );
}

/**
 * 5. Coffee Cup Emitting Soft Animated Steam
 */
function CoffeeCupWithSteam() {
  const steamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (steamRef.current) {
      steamRef.current.children.forEach((child, i) => {
        child.position.y += 0.003;
        child.scale.addScalar(0.002);
        if (child.position.y > 0.45) {
          child.position.y = 0.1;
          child.scale.set(1, 1, 1);
        }
      });
    }
  });

  return (
    <group position={[-1.2, 0.75, 0.5]}>
      {/* Ceramic Mug */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.24, 16]} />
        <meshStandardMaterial
          color={COLORS.clayCup}
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* Mug Handle */}
      <mesh position={[-0.11, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.02, 8, 16]} />
        <meshStandardMaterial
          color={COLORS.clayCup}
          roughness={0.8}
        />
      </mesh>

      {/* Rising Steaming Particles */}
      <group ref={steamRef} position={[0, 0.15, 0]}>
        {[
          [-0.02, 0.1, 0],
          [0.02, 0.2, 0.01],
          [0.0, 0.3, -0.01],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={0.9}
              opacity={0.4}
              transparent
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * 6. Ambient Glowing Spheres Bobbing Gently Up and Down
 */
function AmbientGlowingSpheres() {
  const spheresRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (spheresRef.current) {
      spheresRef.current.children.forEach((sphere, i) => {
        sphere.position.y = (sphere.userData.baseY || 0) + Math.sin(t * 1.5 + i) * 0.15;
      });
    }
  });

  const spheresData = [
    { pos: [2.8, 2.2, -1.2], color: COLORS.lavender, size: 0.18 },
    { pos: [-3.0, 1.2, 1.2], color: COLORS.cyan, size: 0.15 },
    { pos: [3.2, 0.8, 1.5], color: COLORS.emerald, size: 0.12 },
    { pos: [-1.8, 2.8, -1.8], color: COLORS.lavender, size: 0.2 },
  ];

  return (
    <group ref={spheresRef}>
      {spheresData.map((item, idx) => (
        <mesh
          key={idx}
          position={item.pos as [number, number, number]}
          userData={{ baseY: item.pos[1] }}
        >
          <sphereGeometry args={[item.size, 16, 16]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.color}
            emissiveIntensity={2.0}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// =============================================================================
// CAMERA CONTROLLER & PARALLAX MANAGER (STATE 2 & STATE 3)
// =============================================================================

function DioramaCameraController({
  isZoomed,
  mousePos,
}: {
  isZoomed: boolean;
  mousePos: { x: number; y: number };
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    // Target camera positions
    // Base State / Parallax State: Isometric perspective [7, 6, 7] looking at [0, 0.8, 0]
    // Zoomed State (Click on Monitor): Direct closeup on monitor frame [0, 1.45, 1.5]
    const targetPos = isZoomed
      ? new THREE.Vector3(0, 1.45, 1.5)
      : new THREE.Vector3(
          7 + mousePos.x * 0.8,
          6 + mousePos.y * 0.5,
          7 - mousePos.x * 0.4
        );

    const targetLookAt = isZoomed
      ? new THREE.Vector3(0, 1.45, -0.35)
      : new THREE.Vector3(0, 0.6, 0);

    camera.position.lerp(targetPos, delta * 3.5);
    camera.lookAt(targetLookAt);
  });

  return null;
}

// =============================================================================
// MAIN TECH DIORAMA CANVAS & CASE STUDY OVERLAY COMPONENT
// =============================================================================

export default function TechDiorama3D() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMonitorHovered, setIsMonitorHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Parallax Tilt Cursor Event Listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "580px",
        borderRadius: "24px",
        overflow: "hidden",
        background: COLORS.bg,
        border: "1px solid rgba(167, 139, 250, 0.15)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        marginBottom: "2rem",
      }}
    >
      {/* R3F WebGL 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [7, 6, 7], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.6} color="#38bdf8" />
        <directionalLight
          position={[6, 10, 5]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Vibrant Dark Yellow / Amber & Sapphire Highlights */}
        <pointLight position={[-5, 4, 3]} intensity={2.0} color="#f59e0b" />
        <pointLight position={[5, 6, -3]} intensity={1.8} color="#38bdf8" />
        <pointLight position={[0, 2, 2]} intensity={1.5} color="#fbbf24" />

        {/* Camera Smooth Interpolation & Mouse Parallax Controller */}
        <DioramaCameraController isZoomed={isZoomed} mousePos={mousePos} />

        {/* Isometric Diorama Scene Objects */}
        <group>
          <IsometricPlatform />
          <CentralWorkstation
            onMonitorClick={() => setIsZoomed(true)}
            onMonitorHover={setIsMonitorHovered}
            isMonitorHovered={isMonitorHovered}
          />
          <FloatingDatabaseCluster />
          <BonsaiPlant />
          <CoffeeCupWithSteam />
          <AmbientGlowingSpheres />
        </group>
      </Canvas>

      {/* Base State UI Instruction Badge */}
      {!isZoomed && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(18, 18, 20, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(167, 139, 250, 0.3)",
            padding: "8px 18px",
            borderRadius: "100px",
            color: COLORS.lavender,
            fontSize: "0.82rem",
            fontFamily: "'JetBrains Mono', monospace",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <Sparkles size={14} style={{ color: COLORS.cyan }} />
          <span>Click Ultra-wide Monitor to view Case Studies • Move cursor for Parallax</span>
        </div>
      )}

      {/* STATE 3 OVERLAY: Monitor Zoomed Case Studies Modal */}
      {isZoomed && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(9, 9, 11, 0.88)",
            backdropFilter: "blur(16px)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            padding: "24px",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          {/* Top Bar with Reset View Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              paddingBottom: "12px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Cpu size={20} style={{ color: COLORS.cyan }} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  color: "#fff",
                  fontSize: "1rem",
                }}
              >
                Workstation Monitor • Project Case Studies
              </span>
            </div>

            <button
              onClick={() => setIsZoomed(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.85rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(245, 158, 11, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(245, 158, 11, 0.15)")
              }
            >
              <X size={15} />
              Reset Diorama View
            </button>
          </div>

          {/* Case Studies Content Container */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: "20px",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {/* Project List Sidebar */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                overflowY: "auto",
              }}
            >
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    background:
                      activeProjectIdx === idx
                        ? "rgba(245, 158, 11, 0.2)"
                        : "rgba(255, 255, 255, 0.03)",
                    border:
                      activeProjectIdx === idx
                        ? "1px solid rgba(245, 158, 11, 0.5)"
                        : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: activeProjectIdx === idx ? "#fff" : "var(--text-secondary)",
                      marginBottom: "4px",
                    }}
                  >
                    {proj.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: COLORS.cyan,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {proj.category}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Case Study Details Panel */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "20px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "3px 10px",
                      borderRadius: "100px",
                      background: "rgba(34, 211, 238, 0.15)",
                      color: COLORS.cyan,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {projects[activeProjectIdx].category}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "12px",
                  }}
                >
                  {projects[activeProjectIdx].name}
                </h3>
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {projects[activeProjectIdx].description}
                </p>

                {/* Tech Stack Pills */}
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      marginBottom: "8px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    TECHNOLOGY STACK
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {projects[activeProjectIdx].technologies.map((tag: string) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.75rem",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          background: "rgba(167, 139, 250, 0.1)",
                          border: "1px solid rgba(167, 139, 250, 0.2)",
                          color: COLORS.lavender,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div style={{ display: "flex", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {projects[activeProjectIdx].github && (
                  <a
                    href={projects[activeProjectIdx].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ fontSize: "0.85rem", padding: "8px 16px" }}
                  >
                    View Source Code
                  </a>
                )}
                {projects[activeProjectIdx].demo && (
                  <a
                    href={projects[activeProjectIdx].demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: "0.85rem", padding: "8px 16px" }}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
