"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface InfrastructureItem {
  id: string;
  title: string;
  sketch: string | StaticImageData;
  image: string | StaticImageData;
}

interface InfrastructureSectionProps {
  description: string;
  items: InfrastructureItem[];
}

const InfrastructureSection = ({ description, items }: InfrastructureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const revealLayerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isMobileRef = useRef(false);
  const autoAnimateTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const scheduleAutoAnimate = useCallback((id: string) => {
    if (autoAnimateTimeoutsRef.current[id]) {
      clearTimeout(autoAnimateTimeoutsRef.current[id]);
    }

    const layer = revealLayerRefs.current[id];
    if (!layer) return;

    gsap.killTweensOf([layer]);
    gsap.to(layer, {
      clipPath: "circle(150% at 100% 100%)",
      duration: 0.4,
      ease: "power2.out",
    });

    autoAnimateTimeoutsRef.current[id] = setTimeout(() => {
      gsap.killTweensOf([layer]);
      gsap.to(layer, {
        clipPath: "circle(0% at 100% 100%)",
        duration: 0.35,
        ease: "power2.in",
      });

      autoAnimateTimeoutsRef.current[id] = setTimeout(() => {
        scheduleAutoAnimate(id);
      }, 2500);
    }, 1800);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".infra-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        ".infra-description",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        ".infra-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".infra-grid",
            start: "top 80%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
      if (isMobileRef.current) {
        items.forEach((item) => {
          scheduleAutoAnimate(item.id);
        });
      } else {
        Object.values(autoAnimateTimeoutsRef.current).forEach((timeout) => clearTimeout(timeout));
        autoAnimateTimeoutsRef.current = {};
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkMobile);
      Object.values(autoAnimateTimeoutsRef.current).forEach((timeout) => clearTimeout(timeout));
    };
  }, [items, scheduleAutoAnimate]);

  const handleCardMouseEnter = (id: string) => {
    if (isMobileRef.current) return;

    const layer = revealLayerRefs.current[id];
    if (!layer) return;

    gsap.killTweensOf([layer]);
    gsap.to(layer, {
      clipPath: "circle(150% at 100% 100%)",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = (id: string) => {
    if (isMobileRef.current) return;

    const layer = revealLayerRefs.current[id];
    if (!layer) return;

    gsap.killTweensOf([layer]);
    gsap.to(layer, {
      clipPath: "circle(0% at 100% 100%)",
      duration: 0.35,
      ease: "power2.in",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-4 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative px-1 sm:px-2">
          <div
            className="pointer-events-none mb-8 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(209, 176, 70, 0.2) 18%, rgba(209, 176, 70, 0.42) 50%, rgba(209, 176, 70, 0.2) 82%, transparent 100%)",
            }}
          />

          <div className="relative px-4 py-2 md:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p
                className="infra-description text-base md:text-lg font-light max-w-2xl mx-auto"
                style={{ color: "rgba(245, 245, 245, 0.65)" }}
              >
                {description}
              </p>
            </div>

            <div className="infra-grid flex flex-wrap justify-center gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="infra-card group relative overflow-hidden cursor-pointer transition-all duration-500 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
                  style={{
                    aspectRatio: "1 / 1.2",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(209, 176, 70, 0.18)",
                    borderRadius: "10px",
                    boxShadow: "0 12px 30px rgba(10, 20, 30, 0.25)",
                  }}
                  onMouseEnter={() => handleCardMouseEnter(item.id)}
                  onMouseLeave={() => handleCardMouseLeave(item.id)}
                >
                  <Image
                    src={item.sketch}
                    alt={`${item.title} sketch`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />

                  <div
                    ref={(el) => {
                      revealLayerRefs.current[item.id] = el;
                    }}
                    className="pointer-events-none absolute inset-0"
                    style={{
                      clipPath: "circle(0% at 100% 100%)",
                      WebkitClipPath: "circle(0% at 100% 100%)",
                      transform: "translateZ(0)",
                      willChange: "clip-path",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} ambiente`}
                      fill
                      sizes="(max-width: 1080px) 100vw, (max-width: 1920px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span className="sr-only">{item.title}</span>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(30, 40, 50, 0.05) 0%, rgba(30, 40, 50, 0.82) 100%)",
                    }}
                  >
                    <h3 className="text-xl font-light" style={{ color: "#F5F5F5" }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
