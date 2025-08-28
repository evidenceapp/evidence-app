"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { items } from "../mocks/index";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

const MetricsShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const lastItem = lastItemRef.current;

    if (!section || !container || !lastItem) return;

    const scrollDistance = lastItem.offsetLeft + lastItem.offsetWidth + 160 - window.innerWidth;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${lastItem.offsetLeft - (window.innerWidth - lastItem.offsetWidth)}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      animation: gsap.to(container, {
        x: () => -scrollDistance,
        ease: "none",
        overwrite: true,
      }),
    });

    arrowRefs.current.forEach((arrow) => {
      if (arrow) {
        gsap.to(arrow, {
          y: -8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          duration: 1,
        });
      }
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-700"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-center mt-14 text-neutral-50">
        Impacto da nossa Clínica
      </h2>
      <p className="text-sm md:text-lg text-center mt-6 max-w-xl mx-auto text-neutral-50">
        Conheça os resultados e indicadores que destacam nosso cuidado e compromisso com a sua
        saúde.
      </p>

      <div
        ref={containerRef}
        className="relative flex w-[250vw] md:w-[300vw] space-x-6 md:space-x-8 px-6 md:px-16 py-20 md:py-32 items-center"
      >
        {items.map(({ title, description, image }, index) => (
          <div key={index} className="flex items-center space-x-6">
            <Card
              title={title}
              description={description}
              image={image}
              isLast={index === items.length - 1}
              lastItemRef={lastItemRef}
            />

            {index !== items.length - 1 && (
              <div
                ref={(el) => {
                  if (el) arrowRefs.current[index] = el;
                }}
                className="flex justify-center items-center min-w-[20px]"
              >
                <FontAwesomeIcon icon={faArrowRight} size="lg" style={{ color: "#D1B046" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsShowcase;
