"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the 404 number
      gsap.fromTo(
        ".not-found-number",
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Animate the content
      gsap.fromTo(
        ".not-found-content",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        }
      );

      // Animate decorative lines
      gsap.fromTo(
        ".decorative-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
        }
      );

      // Subtle floating animation for the glow
      gsap.to(".glow-element", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      {/* Decorative glow elements */}
      <div
        className="glow-element absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.15) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
        }}
      />
      <div
        className="glow-element absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          bottom: "-150px",
          left: "-150px",
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute top-8 left-8 w-16 h-16 pointer-events-none"
        style={{
          borderLeft: "1px solid rgba(209, 176, 70, 0.3)",
          borderTop: "1px solid rgba(209, 176, 70, 0.3)",
        }}
      />
      <div
        className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none"
        style={{
          borderRight: "1px solid rgba(209, 176, 70, 0.3)",
          borderBottom: "1px solid rgba(209, 176, 70, 0.3)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* 404 Number */}
        <div className="not-found-number relative mb-6">
          <h1
            className="text-[150px] md:text-[200px] font-extralight leading-none tracking-tight"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(209, 176, 70, 0.4)",
            }}
          >
            404
          </h1>
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: "#D1B046" }}
          >
            <h1 className="text-[150px] md:text-[200px] font-extralight leading-none tracking-tight opacity-20">
              404
            </h1>
          </div>
        </div>

        {/* Decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div
            className="decorative-line w-16 h-[1px] origin-right"
            style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
          />
          <svg
            className="w-5 h-5"
            style={{ color: "#D1B046" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div
            className="decorative-line w-16 h-[1px] origin-left"
            style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
          />
        </div>

        {/* Text content */}
        <div className="not-found-content space-y-6">
          <h2
            className="text-2xl md:text-3xl font-extralight"
            style={{ color: "#F5F5F5" }}
          >
            Pagina nao encontrada
          </h2>

          <p
            className="text-base font-light leading-relaxed max-w-md mx-auto"
            style={{ color: "rgba(245, 245, 245, 0.6)" }}
          >
            A pagina que voce esta procurando pode ter sido removida, teve seu nome alterado ou esta temporariamente indisponivel.
          </p>

          {/* Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 mt-4 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            style={{
              border: "1px solid #D1B046",
              color: "#D1B046",
              background: "transparent",
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar ao inicio
          </Link>
        </div>
      </div>

      {/* Bottom decorative text */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase font-light"
        style={{ color: "rgba(245, 245, 245, 0.2)" }}
      >
        Instituto FisioWellness Evidence
      </div>
    </div>
  );
}
