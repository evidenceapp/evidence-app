"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const autoAnimateIntervalsRef = useRef<Record<string, NodeJS.Timeout>>({});
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 300);
    };

    setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-animate simplificado para mobile
  const startAutoAnimate = useCallback(
    (id: string) => {
      if (!isMobile) return;

      const interval = setInterval(() => {
        const card = document.getElementById(`card-${id}`);
        if (!card) return;

        card.classList.add("auto-reveal");
        setTimeout(() => {
          card.classList.remove("auto-reveal");
        }, 1500);
      }, 4000);

      autoAnimateIntervalsRef.current[id] = interval;
    },
    [isMobile]
  );

  useEffect(() => {
    if (isMobile && isVisible) {
      items.forEach((item) => startAutoAnimate(item.id));
    } else {
      Object.values(autoAnimateIntervalsRef.current).forEach(clearInterval);
      autoAnimateIntervalsRef.current = {};
    }

    return () => {
      Object.values(autoAnimateIntervalsRef.current).forEach(clearInterval);
    };
  }, [isMobile, isVisible, items, startAutoAnimate]);

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
                className="text-base md:text-lg font-light max-w-2xl mx-auto"
                style={{ color: "rgba(245, 245, 245, 0.65)" }}
              >
                {description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  id={`card-${item.id}`}
                  className="infra-card group relative overflow-hidden cursor-pointer w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
                  style={{
                    aspectRatio: "1 / 1.2",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(209, 176, 70, 0.18)",
                    borderRadius: "10px",
                    boxShadow: "0 12px 30px rgba(10, 20, 30, 0.25)",
                    contain: "layout style paint",
                  }}
                >
                  {/* Sketch Image - Base Layer */}
                  {isVisible && (
                    <Image
                      src={item.sketch}
                      alt={`${item.title} sketch`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      loading={index < 2 ? "eager" : "lazy"}
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                    />
                  )}

                  {/* Reveal Layer - Color Image */}
                  <div className="reveal-layer absolute inset-0 pointer-events-none">
                    {isVisible && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        loading={index < 2 ? "eager" : "lazy"}
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      />
                    )}
                  </div>

                  {/* Title Overlay */}
                  <div className="title-overlay absolute bottom-0 left-0 right-0 p-6">
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

      <style jsx>{`
        .infra-card {
          transition: transform 0.3s ease;
        }

        .infra-card:hover {
          transform: translateY(-4px);
        }

        .reveal-layer {
          clip-path: circle(0% at 100% 100%);
          transition: clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (min-width: 768px) {
          .infra-card:hover .reveal-layer {
            clip-path: circle(150% at 100% 100%);
          }

          .infra-card:hover .title-overlay {
            opacity: 1;
          }
        }

        .infra-card.auto-reveal .reveal-layer {
          clip-path: circle(150% at 100% 100%);
        }

        .infra-card.auto-reveal .title-overlay {
          opacity: 1;
        }

        .title-overlay {
          opacity: 0;
          background: linear-gradient(
            180deg,
            rgba(30, 40, 50, 0.05) 0%,
            rgba(30, 40, 50, 0.82) 100%
          );
          transition: opacity 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default InfrastructureSection;
