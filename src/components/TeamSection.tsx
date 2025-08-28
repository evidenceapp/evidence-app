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
      gsap.fromTo(
        section.querySelector(".team-title"),
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        }
      );

      gsap.fromTo(
        section.querySelector(".team-description"),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        }
      );

      const cards = columnsContainer.querySelectorAll(".team-card");

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 40, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.25,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: isMobile ? "top 90%" : "top 75%",
            toggleActions: "play none none reset",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="equipe"
      ref={sectionRef}
      className="py-20 text-center overflow-hidden"
      style={{ backgroundColor: "#4a4a4a" }}
    >
      <h2 className="team-title text-4xl font-bold mb-4" style={{ color: "#D1B046" }}>
        Nossa Equipe
      </h2>
      <p className="team-description text-lg max-w-xl mx-auto mb-16" style={{ color: "#f9f9f9" }}>
        Conheça as pessoas por trás do nosso trabalho.
      </p>

      <div ref={columnsContainerRef} className="px-4 max-w-6xl mx-auto">
        {isMobile ? (
          <div className="flex flex-col gap-6 items-center">
            {[...columns.fixed, ...columns.remaining].map((member, index) =>
              member ? (
                <div key={`mobile-${index}`} className="team-card w-full flex justify-center">
                  <TeamCard {...member} />
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {columns.grid.map((col, i) => (
              <div
                key={i}
                className={`flex flex-col gap-6 items-center ${i === 1 ? "md:mt-12" : ""}`}
              >
                {col.map(
                  (member, index) =>
                    member && (
                      <div
                        key={`col-${i}-${index}`}
                        className="team-card w-full flex justify-center"
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
    </section>
  );
};

export default TeamSection;
