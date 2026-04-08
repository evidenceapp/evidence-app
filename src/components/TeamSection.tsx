"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";

import { teamMembers } from "../mocks/index";
import TeamCard from "./TeamCard";

gsap.registerPlugin(ScrollTrigger);

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const columnsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const columns = useMemo(() => {
    const fixedNames = ["Caio Mendes", "Hugo Eduardo", "Hugo Rodrigues"];

    const fixed = fixedNames
      .map((name) => teamMembers.find((m) => m.name === name))
      .filter(Boolean);

    const remaining = teamMembers.filter((m) => !fixedNames.includes(m.name));

    const col1 = [fixed[0] || null];
    const col2 = [fixed[1] || null];
    const col3 = [fixed[2] || null];

    remaining.forEach((member, index) => {
      if (index % 3 === 0) col1.push(member);
      else if (index % 3 === 1) col2.push(member);
      else col3.push(member);
    });

    return { fixed, remaining, grid: [col1, col2, col3] };
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const columnsContainer = columnsContainerRef.current;
    if (!section || !columnsContainer) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".team-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      const cards = columnsContainer.querySelectorAll(".team-card");

      cards.forEach((card, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const delay = (row + col) * 0.1;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: isMobile ? "top 90%" : "top 70%",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="relative py-24 md:py-32 text-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #2D3A4A 0%, #1E2832 50%, #2D3A4A 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          top: "-200px",
          left: "-200px",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-100px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="team-header mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-12 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-light"
              style={{ color: "#D1B046" }}
            >
              Profissionais
            </span>
            <div
              className="w-12 h-[1px]"
              style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
            />
          </div>

          <h2
            className="text-4xl md:text-5xl font-extralight mb-4"
            style={{ color: "#F5F5F5" }}
          >
            Nossa{" "}
            <span style={{ color: "#D1B046", fontWeight: 300 }}>Equipe</span>
          </h2>

          <p
            className="text-base md:text-lg font-light max-w-xl mx-auto"
            style={{ color: "rgba(245, 245, 245, 0.6)" }}
          >
            Conheça os profissionais dedicados ao seu bem-estar e recuperação.
          </p>
        </div>

        {/* Team Grid */}
        <div ref={columnsContainerRef}>
          {isMobile ? (
            <div className="flex flex-col gap-8 items-center">
              {[...columns.fixed, ...columns.remaining].map((member, index) =>
                member ? (
                  <div key={`mobile-${index}`} className="team-card flex justify-center">
                    <TeamCard {...member} />
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {columns.grid.map((col, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-8 items-center ${i === 1 ? "md:mt-16" : ""}`}
                >
                  {col.map(
                    (member, index) =>
                      member && (
                        <div
                          key={`col-${i}-${index}`}
                          className="team-card flex justify-center"
                        >
                          <TeamCard {...member} />
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
