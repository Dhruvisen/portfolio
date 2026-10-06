"use client";

/**
 * NeuralNetwork3D Component
 * -----------------------------------------------------------------------------
 * Displays a 3D AI-themed neural network with glowing nodes, dynamic connecting
 * lines, and interactive mouse parallax. Designed with R3F & Three.js for 60fps
 * low-poly performance.
 */

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Low-poly & mobile optimized node count
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nodeCount = isMobile ? 35 : 70;

  // Generate nodes across layers to simulate a multi-layer Neural Network
  const { nodes, lineGeometry, lineColors } = useMemo(() => {
    const nodesArr: Array<{
      position: [number, number, number];
      basePos: [number, number, number];
      size: number;
      speed: number;
      phase: number;
      layer: number;
    }> = [];

    const layers = 5;
    const layerWidth = isMobile ? 12 : 20;
    const layerHeight = isMobile ? 8 : 12;

    for (let i = 0; i < nodeCount; i++) {
      const layer = Math.floor(Math.random() * layers);
      const x = (layer / (layers - 1) - 0.5) * layerWidth;
      const y = (Math.random() - 0.5) * layerHeight;
      const z = (Math.random() - 0.5) * 6;

      nodesArr.push({
        position: [x, y, z],
        basePos: [x, y, z],
        size: Math.random() * 0.12 + 0.08,
        speed: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        layer,
      });
    }

    // Build connections between nearby nodes
    const linePositions: number[] = [];
    const colors: number[] = [];
    const maxDist = isMobile ? 3.5 : 4.5;

    const color1 = new THREE.Color("#6366f1"); // Indigo
    const color2 = new THREE.Color("#22d3ee"); // Cyan
    const color3 = new THREE.Color("#a78bfa"); // Purple

    for (let i = 0; i < nodesArr.length; i++) {
      for (let j = i + 1; j < nodesArr.length; j++) {
        const p1 = nodesArr[i].position;
        const p2 = nodesArr[j].position;

        const dx = p1[0] - p2[0];
        const dy = p1[1] - p2[1];
        const dz = p1[2] - p2[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          linePositions.push(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
          const mixColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
          colors.push(mixColor.r, mixColor.g, mixColor.b);
          colors.push(mixColor.r, mixColor.g, mixColor.b);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    return { nodes: nodesArr, lineGeometry: geometry, lineColors: colors };
  }, [nodeCount, isMobile]);

  // Track mouse movement for subtle 3D tilt & rotation
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow ambient rotation
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.15,
      delta * 2
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      groupRef.current.rotation.y + mouseRef.current.x * 0.005,
      delta * 2
    );

    // Animate line pulse intensity
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Line Connections */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          linewidth={1}
        />
      </lineSegments>

      {/* 3D Glowing Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <icosahedronGeometry args={[node.size, 1]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#6366f1" : "#22d3ee"}
            emissive={i % 2 === 0 ? "#4f46e5" : "#0891b2"}
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NeuralNetwork3D() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
  }, []);

  if (reducedMotion) {
    return null; // Gracefully handle accessibility preferred motion
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#22d3ee" />
        <NeuralNetworkMesh />
      </Canvas>
    </div>
  );
}
