"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { testimonials } from "../mocks/index";

gsap.registerPlugin(ScrollTrigger);

const Feedback = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".feedback-header",
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="feedback"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-100px",
        }}
      />

      {/* Large quote decoration */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 text-[200px] font-serif leading-none pointer-events-none select-none"
        style={{ color: "rgba(209, 176, 70, 0.03)" }}
      >
        "
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="feedback-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-12 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-light"
              style={{ color: "#D1B046" }}
            >
              Depoimentos
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
            O que nossos{" "}
            <span style={{ color: "#D1B046", fontWeight: 300 }}>pacientes</span>{" "}
            dizem
          </h2>

          <p
            className="text-base md:text-lg font-light max-w-xl mx-auto"
            style={{ color: "rgba(245, 245, 245, 0.6)" }}
          >
            Histórias reais de pessoas que confiaram em nosso trabalho.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.slice(0, 4).map((t, index) => (
            <a
              key={index}
              href={t.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative p-8 transition-all duration-500"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(209, 176, 70, 0.15)",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: "rgba(209, 176, 70, 0.4)",
                  scale: 1.02,
                  duration: 0.4,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: "rgba(209, 176, 70, 0.15)",
                  scale: 1,
                  duration: 0.4,
                });
              }}
            >
              {/* Quote icon */}
              <div
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
                style={{
                  color: "rgba(209, 176, 70, 0.2)",
                }}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4"
                    fill={i < t.stars ? "#D1B046" : "rgba(209, 176, 70, 0.2)"}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.036 3.175a1 1 0 00.95.69h3.356c.969 0 1.371 1.24.588 1.81l-2.716 1.973a1 1 0 00-.364 1.118l1.036 3.175c.3.921-.755 1.688-1.538 1.118l-2.716-1.973a1 1 0 00-1.176 0l-2.716 1.973c-.783.57-1.838-.197-1.539-1.118l1.037-3.175a1 1 0 00-.365-1.118L2.172 8.602c-.783-.57-.38-1.81.588-1.81h3.356a1 1 0 00.951-.69l1.036-3.175z" />
                  </svg>
                ))}
              </div>

              {/* Feedback text */}
              <p
                className="text-base md:text-lg font-light leading-relaxed mb-8"
                style={{ color: "rgba(245, 245, 245, 0.8)" }}
              >
                "{t.feedback}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="relative w-14 h-14 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid rgba(209, 176, 70, 0.4)",
                  }}
                >
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "#F5F5F5" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs tracking-[0.1em] uppercase"
                    style={{ color: "rgba(209, 176, 70, 0.7)" }}
                  >
                    Paciente
                  </p>
                </div>

                {/* Google icon */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 text-xs"
                    style={{
                      border: "1px solid rgba(209, 176, 70, 0.3)",
                      color: "rgba(209, 176, 70, 0.7)",
                    }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Ver avaliação
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div
                className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(209, 176, 70, 0.3)",
                  borderLeft: "1px solid rgba(209, 176, 70, 0.3)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(209, 176, 70, 0.3)",
                  borderRight: "1px solid rgba(209, 176, 70, 0.3)",
                }}
              />
            </a>
          ))}
        </div>

        {/* CTA to see more reviews */}
        <div className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/mb6UpkH9FaRA6tpe9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 text-xs tracking-[0.15em] uppercase font-light transition-all duration-300"
            style={{
              border: "1px solid rgba(209, 176, 70, 0.4)",
              color: "#D1B046",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                backgroundColor: "#D1B046",
                color: "#1E2832",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                backgroundColor: "transparent",
                color: "#D1B046",
                duration: 0.3,
              });
            }}
          >
            Ver todas as avaliações
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
