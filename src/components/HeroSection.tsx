"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { IHeroSection } from "@/interfaces";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ name, slogan, buttonText }: IHeroSection) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Logo badge entrance
      tl.fromTo(".hero-badge", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 });

      // Mobile logo entrance
      tl.fromTo(
        ".hero-mobile-logo",
        { opacity: 0, scale: 0.9, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7 },
        "-=0.45"
      );

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

      // 3D Image entrance and float animation
      tl.fromTo(
        ".hero-3d-image",
        { opacity: 0, scale: 0.9, rotateY: -10, rotateX: 5 },
        { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, duration: 0.8 },
        "-=0.5"
      );

      // Continuous floating animation for 3D image
      gsap.to(".hero-3d-image", {
        y: -25,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Subtle rotation for 3D effect
      gsap.to(".hero-3d-image", {
        rotateY: 3,
        rotateX: -1,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Parallax on scroll for text content
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

      // Parallax on scroll for 3D image
      gsap.to(".hero-3d-image", {
        y: -80,
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

          <div className="hero-mobile-logo lg:hidden relative mx-auto mb-8 h-28 w-28">
            <div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(245, 245, 245, 0.08) 0%, rgba(35, 48, 60, 0.6) 100%)",
                border: "1px solid rgba(209, 176, 70, 0.24)",
                boxShadow: "0 18px 40px rgba(10, 20, 30, 0.28)",
                backdropFilter: "blur(10px)",
              }}
            />
            <div
              className="absolute inset-x-4 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent)",
              }}
            />
            <div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(circle at 50% 18%, rgba(209, 176, 70, 0.16) 0%, transparent 58%)",
              }}
            />
            <Image
              src="/logo-def.png"
              alt="Logo"
              fill
              sizes="112px"
              priority
              className="object-contain p-4 drop-shadow-[0_10px_24px_rgba(10,20,30,0.3)]"
            />
          </div>

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

          <div
            className="deco-line w-24 h-[2px] mb-8 mx-auto lg:mx-0"
            style={{
              background: "linear-gradient(90deg, #D1B046, transparent)",
              transformOrigin: "left center",
            }}
          />

          <p
            className="hero-slogan text-lg md:text-xl font-light mb-10 max-w-md mx-auto lg:mx-0"
            style={{ color: "rgba(245, 245, 245, 0.7)" }}
          >
            Excelência em cuidado, tecnologia e resultados. Sua jornada de recuperação começa aqui.
          </p>

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

        <div 
          className="hero-3d-image relative hidden h-[500px] w-full max-w-2xl flex-1 items-center justify-center lg:flex lg:h-[600px]"
          style={{
            perspective: "1000px",
          }}
        >
          <Image
            src="/logo-def.png"
            alt="Logo"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
