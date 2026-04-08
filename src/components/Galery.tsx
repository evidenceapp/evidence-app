"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { galeryMedia } from "../mocks/index";

gsap.registerPlugin(ScrollTrigger);

const Galery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".gallery-header",
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

      // Media items reveal animation - cascade from top-left
      const items = section.querySelectorAll(".gallery-item");
      items.forEach((item, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const delay = (row + col) * 0.08;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.8,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: delay,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            },
          }
        );
      });
    }, section);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMedia(null);
        setIsVideo(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      ctx.revert();
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        className="relative w-full py-24 md:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #2D3A4A 0%, #1E2832 100%)",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
            top: "-200px",
            left: "-100px",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
            bottom: "-150px",
            right: "-100px",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-8">
          {/* Header */}
          <div className="gallery-header text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-12 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
              />
              <span
                className="text-xs tracking-[0.3em] uppercase font-light"
                style={{ color: "#D1B046" }}
              >
                Nossa Estrutura
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
              Galeria
            </h2>

            <p
              className="text-base md:text-lg font-light max-w-xl mx-auto"
              style={{ color: "rgba(245, 245, 245, 0.6)" }}
            >
              Conheça nossa estrutura e momentos que vivenciamos com nossos pacientes.
            </p>
          </div>

          {/* Gallery Grid - No gaps, uniform grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galeryMedia.map(({ src, type }, index) => (
              <div
                key={index}
                className="gallery-item relative overflow-hidden cursor-pointer group aspect-square"
                style={{
                  borderRadius: "2px",
                }}
                onClick={() => {
                  setSelectedMedia(src);
                  setIsVideo(type === "video");
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget.querySelector(".media-overlay"), {
                    opacity: 1,
                    duration: 0.3,
                  });
                  gsap.to(e.currentTarget.querySelector(".media-content"), {
                    scale: 1.08,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(209, 176, 70, 0.5)",
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget.querySelector(".media-overlay"), {
                    opacity: 0,
                    duration: 0.3,
                  });
                  gsap.to(e.currentTarget.querySelector(".media-content"), {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(209, 176, 70, 0.15)",
                    duration: 0.3,
                  });
                }}
              >
                {/* Border frame */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none transition-colors duration-300"
                  style={{
                    border: "1px solid rgba(209, 176, 70, 0.15)",
                  }}
                />

                {/* Media content */}
                {type === "image" ? (
                  <Image
                    src={src}
                    alt={`Galeria ${index + 1}`}
                    fill
                    className="media-content object-cover"
                  />
                ) : (
                  <video
                    src={src}
                    className="media-content w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                )}

                {/* Hover overlay */}
                <div
                  className="media-overlay absolute inset-0 z-20 flex items-center justify-center opacity-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(30, 40, 50, 0.2) 0%, rgba(30, 40, 50, 0.7) 100%)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(209, 176, 70, 0.15)",
                      border: "1px solid rgba(209, 176, 70, 0.5)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {type === "video" ? (
                      <svg
                        className="w-5 h-5 ml-0.5"
                        fill="#D1B046"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="#D1B046"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Video indicator */}
                {type === "video" && (
                  <div
                    className="absolute bottom-3 right-3 z-10 px-2 py-1 text-[10px] tracking-[0.1em] uppercase"
                    style={{
                      background: "rgba(30, 40, 50, 0.8)",
                      color: "#D1B046",
                      borderRadius: "1px",
                    }}
                  >
                    Vídeo
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{
            background: "rgba(10, 20, 30, 0.95)",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => {
            setSelectedMedia(null);
            setIsVideo(false);
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center transition-all duration-300"
            style={{
              border: "1px solid rgba(209, 176, 70, 0.3)",
              color: "#D1B046",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(209, 176, 70, 0.8)",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(209, 176, 70, 0.3)",
                duration: 0.3,
              });
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Media container */}
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <video
                src={selectedMedia}
                className="max-w-[90vw] max-h-[85vh]"
                style={{
                  border: "1px solid rgba(209, 176, 70, 0.2)",
                }}
                controls
                autoPlay
              />
            ) : (
              <Image
                src={selectedMedia}
                alt="Visualização ampliada"
                width={800}
                height={600}
                className="max-w-[90vw] max-h-[85vh] object-contain"
                style={{
                  border: "1px solid rgba(209, 176, 70, 0.2)",
                }}
              />
            )}
          </div>

          {/* Instructions */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(245, 245, 245, 0.4)" }}
          >
            Pressione ESC ou clique fora para fechar
          </div>
        </div>
      )}
    </>
  );
};

export default Galery;
