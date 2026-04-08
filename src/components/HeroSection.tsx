"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { IHeroSection } from "@/interfaces";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ name, slogan, buttonText }: IHeroSection) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set perspective for 3D effects
      gsap.set(".pilates-elements-container", {
        perspective: 1000,
      });

      gsap.set(".pilates-element", {
        transformStyle: "preserve-3d",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Logo badge entrance
      tl.fromTo(".hero-badge", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });

      // Main title
      tl.fromTo(".hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.4");

      // Slogan
      tl.fromTo(
        ".hero-slogan",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );

      // CTA Button
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6 },
        "-=0.3"
      );

      // Decorative line
      tl.fromTo(
        ".deco-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        "-=1"
      );

      // 3D entrance for pilates elements - subtle and elegant
      tl.fromTo(
        ".pilates-element",
        {
          opacity: 0,
          rotateX: -40,
          rotateY: 20,
          z: -100,
          scale: 0.9,
        },
        {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1,
          duration: 1.2,
          stagger: {
            each: 0.12,
            from: "random",
          },
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Parallax on scroll
      gsap.to(".hero-content", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".pilates-elements-container", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #2D3A4A 0%, #1E2832 100%)",
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(209, 176, 70, 0.08) 0%, transparent 50%)",
        }}
      />

      {/* Main Content */}
      <div className="hero-content relative z-10 max-w-6xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-3 mb-8">
            <div
              className="w-10 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
            />
            <span
              className="text-sm tracking-[0.3em] uppercase font-light"
              style={{ color: "#D1B046" }}
            >
              {name}
            </span>
            <div
              className="w-10 h-[1px]"
              style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
            />
          </div>

          {/* Main Title */}
          <h1
            className="hero-title text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 leading-tight"
            style={{ color: "#F5F5F5" }}
          >
            {slogan.split(",").map((part, idx) => (
              <span key={idx} className="block">
                {idx === 0 ? (
                  <span style={{ color: "#D1B046", fontWeight: 300 }}>{part}</span>
                ) : (
                  part
                )}
              </span>
            ))}
          </h1>

          {/* Decorative Line */}
          <div
            className="deco-line w-24 h-[2px] mb-8 mx-auto lg:mx-0"
            style={{
              background: "linear-gradient(90deg, #D1B046, transparent)",
              transformOrigin: "left center",
            }}
          />

          {/* Slogan */}
          <p
            className="hero-slogan text-lg md:text-xl font-light mb-10 max-w-md mx-auto lg:mx-0"
            style={{ color: "rgba(245, 245, 245, 0.7)" }}
          >
            Excelência em cuidado, tecnologia e resultados. Sua jornada de recuperação começa aqui.
          </p>

          {/* CTA */}
          <button
            className="hero-cta group relative px-10 py-4 overflow-hidden transition-all duration-500"
            style={{
              background: "transparent",
              border: "1px solid #D1B046",
              color: "#D1B046",
            }}
            onClick={() => {
              document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                background: "#D1B046",
                color: "#1E2832",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                background: "transparent",
                color: "#D1B046",
                duration: 0.3,
              });
            }}
          >
            <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
              {buttonText}
            </span>
          </button>
        </div>

        {/* Right - Pilates Elements with 3D perspective */}
        <div className="pilates-elements-container flex-1 relative h-[400px] lg:h-[500px] w-full max-w-lg">
          {/* Silhouette of person on reformer */}
          <div className="pilates-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg width="280" height="200" viewBox="0 0 280 200" fill="none" className="opacity-90">
              {/* Background shape */}
              <ellipse cx="140" cy="100" rx="120" ry="80" fill="#D1B046" opacity="0.15" />
              {/* Person silhouette doing pilates */}
              <path
                d="M180 60C180 53.4 174.6 48 168 48C161.4 48 156 53.4 156 60C156 66.6 161.4 72 168 72C174.6 72 180 66.6 180 60Z"
                fill="#D1B046"
                opacity="0.8"
              />
              <path
                d="M168 76C158 76 150 84 150 94V120L130 140H110C106 140 102 144 102 148C102 152 106 156 110 156H138L160 134V120L180 100V94C180 84 172 76 168 76Z"
                fill="#D1B046"
                opacity="0.8"
              />
              {/* Reformer base */}
              <rect x="60" y="155" width="160" height="8" rx="4" fill="#D1B046" opacity="0.6" />
              <rect x="70" y="163" width="4" height="20" rx="2" fill="#D1B046" opacity="0.4" />
              <rect x="206" y="163" width="4" height="20" rx="2" fill="#D1B046" opacity="0.4" />
            </svg>
          </div>

          {/* Pilates Ball - Top Right */}
          <div className="pilates-element absolute top-8 right-8 lg:right-0">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="35" fill="url(#ballGradient)" opacity="0.9" />
              <ellipse cx="30" cy="30" rx="12" ry="8" fill="white" opacity="0.2" />
              <defs>
                <linearGradient id="ballGradient" x1="10" y1="10" x2="70" y2="70">
                  <stop stopColor="#E8D5A3" />
                  <stop offset="1" stopColor="#C9A961" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Small Pilates Ball - Bottom Left */}
          <div className="pilates-element absolute bottom-16 left-4 lg:left-0">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <circle cx="25" cy="25" r="22" fill="url(#ballGradient2)" opacity="0.85" />
              <ellipse cx="18" cy="18" rx="8" ry="5" fill="white" opacity="0.15" />
              <defs>
                <linearGradient id="ballGradient2" x1="5" y1="5" x2="45" y2="45">
                  <stop stopColor="#E07A5F" />
                  <stop offset="1" stopColor="#C15A40" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Yoga Mat */}
          <div className="pilates-element absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <svg width="160" height="40" viewBox="0 0 160 40" fill="none">
              <rect x="0" y="8" width="160" height="24" rx="2" fill="#5B7B9A" opacity="0.8" />
              <rect x="4" y="12" width="152" height="16" rx="1" fill="#4A6A89" opacity="0.6" />
            </svg>
          </div>

          {/* Dumbbell */}
          <div className="pilates-element absolute bottom-20 right-12 lg:right-4">
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
              <rect x="20" y="10" width="20" height="4" rx="1" fill="#8B8B8B" opacity="0.8" />
              <rect x="0" y="4" width="8" height="16" rx="2" fill="#6B6B6B" opacity="0.9" />
              <rect x="8" y="6" width="6" height="12" rx="1" fill="#5B5B5B" opacity="0.9" />
              <rect x="52" y="4" width="8" height="16" rx="2" fill="#6B6B6B" opacity="0.9" />
              <rect x="46" y="6" width="6" height="12" rx="1" fill="#5B5B5B" opacity="0.9" />
            </svg>
          </div>

          {/* Resistance Band */}
          <div className="pilates-element absolute top-20 left-8">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
              <path
                d="M8 5C8 5 32 20 32 30C32 40 8 55 8 55"
                stroke="#C15A40"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
                fill="none"
              />
              <circle cx="8" cy="5" r="4" fill="#C15A40" opacity="0.8" />
              <circle cx="8" cy="55" r="4" fill="#C15A40" opacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
