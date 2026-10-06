"use client";

/**
 * ScrollController Component
 * -----------------------------------------------------------------------------
 * Integrates GSAP ScrollTrigger to smoothly move camera perspective and section
 * depth animations as the user scrolls through Hero, About, Experience, Projects,
 * Skills, Architecture, GitHub, and Contact sections.
 */

import { useEffect } from "react";
import gsap from "gsap";

export default function ScrollController() {
  useEffect(() => {
    let scrollTriggerModule: any = null;

    const setupGSAP = async () => {
      if (typeof window === "undefined") return;

      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        scrollTriggerModule = ScrollTrigger;

        const sections = [
          "#home",
          "#about",
          "#experience",
          "#projects",
          "#skills",
          "#architecture",
          "#github",
          "#contact",
        ];

        sections.forEach((secId) => {
          const el = document.querySelector(secId);
          if (!el) return;

          // Reveal section elements smoothly on scroll
          const targets = el.querySelectorAll(".reveal-on-scroll, .glass-card");
          if (targets.length > 0) {
            gsap.fromTo(
              targets,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      } catch (e) {
        console.error("ScrollTrigger init error:", e);
      }
    };

    setupGSAP();

    return () => {
      if (scrollTriggerModule) {
        scrollTriggerModule.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return null;
}
