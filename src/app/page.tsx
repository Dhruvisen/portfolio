"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/3d/LoadingScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Architecture from "@/components/Architecture";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";

// Dynamically import 3D background & scroll controller (SSR disabled)
const SceneBackground = dynamic(() => import("@/components/3d/SceneBackground"), {
  ssr: false,
});
const ScrollController = dynamic(() => import("@/components/3d/ScrollController"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* 3D Loading Screen with progress bar */}
      <LoadingScreen />

      {/* Global 3D Ambient Particle Field Background */}
      <SceneBackground />

      {/* GSAP 3D Scroll Transition Controller */}
      <ScrollController />

      {/* Main Content Sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Architecture />
      <GitHubSection />
      <Contact />
    </>
  );
}
