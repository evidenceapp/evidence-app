"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    number: "01",
    title: "Avaliação Completa",
    subtitle: "Diagnóstico Personalizado",
    description:
      "Análise detalhada do seu histórico, exames e condição atual. Identificamos a origem do problema para criar um plano de tratamento sob medida.",
    highlight: "Precisão no diagnóstico",
    stat: "98%",
    statLabel: "de precisão",
  },
  {
    number: "02",
    title: "Plano de Tratamento",
    subtitle: "Estratégia Individualizada",
    description:
      "Desenvolvemos um protocolo exclusivo baseado em evidências científicas, combinando técnicas manuais, exercícios e tecnologia.",
    highlight: "100% personalizado",
    stat: "100%",
    statLabel: "personalizado",
  },
  {
    number: "03",
    title: "Reabilitação Ativa",
    subtitle: "Cuidado Especializado",
    description:
      "Sessões com profissionais experientes, acompanhamento próximo e ajustes constantes para garantir sua evolução contínua.",
    highlight: "Recuperação 3x mais rápida",
    stat: "3x",
    statLabel: "mais rápido",
  },
  {
    number: "04",
    title: "Performance",
    subtitle: "Além da Recuperação",
    description:
      "Não paramos na reabilitação. Trabalhamos para que você alcance um nível de saúde e performance superior ao que tinha antes.",
    highlight: "Resultado duradouro",
    stat: "99%",
    statLabel: "satisfação",
  },
];

// Elegant Walking Figure Component
const WalkingFigure = ({ progress }: { progress: number }) => {
  // Posture improves with progress
  const bodyTilt = 20 - progress * 20; // starts hunched, becomes upright
  const caneOpacity = 1 - progress * 1.5; // cane fades away
  const armSwing = Math.sin(progress * Math.PI * 8) * 10; // walking motion

  return (
    <svg viewBox="0 0 40 50" className="w-full h-full" style={{ overflow: "visible" }}>
      {/* Glow under feet when recovered */}
      {progress > 0.7 && (
        <ellipse
          cx="20"
          cy="48"
          rx="8"
          ry="2"
          fill="#D1B046"
          opacity={(progress - 0.7) * 2}
          style={{ filter: "blur(2px)" }}
        />
      )}

      {/* Main figure group */}
      <g
        style={{
          transformOrigin: "20px 48px",
          transform: `rotate(${-bodyTilt}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Head */}
        <circle cx="20" cy="8" r="5" fill="#D1B046" opacity={0.8 + progress * 0.2} />

        {/* Body */}
        <line
          x1="20"
          y1="13"
          x2="20"
          y2="28"
          stroke="#D1B046"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.8 + progress * 0.2}
        />

        {/* Left arm */}
        <line
          x1="20"
          y1="16"
          x2={12 + armSwing * 0.3}
          y2={22 - progress * 5}
          stroke="#D1B046"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.7 + progress * 0.3}
        />

        {/* Right arm */}
        <line
          x1="20"
          y1="16"
          x2={28 - armSwing * 0.3}
          y2={22 - progress * 5}
          stroke="#D1B046"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.7 + progress * 0.3}
        />

        {/* Left leg */}
        <line
          x1="20"
          y1="28"
          x2={15 + armSwing * 0.2}
          y2="42"
          stroke="#D1B046"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* Right leg */}
        <line
          x1="20"
          y1="28"
          x2={25 - armSwing * 0.2}
          y2="42"
          stroke="#D1B046"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* Cane (fades with progress) */}
        {caneOpacity > 0 && (
          <line
            x1="12"
            y1="20"
            x2="8"
            y2="42"
            stroke="#D1B046"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={Math.max(0, caneOpacity) * 0.6}
          />
        )}
      </g>

      {/* Pain indicator (fades with progress) */}
      {progress < 0.5 && (
        <g opacity={(0.5 - progress) * 2}>
          <circle cx="30" cy="32" r="4" fill="#E07A5F" opacity="0.4">
            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="30" cy="32" r="2" fill="#E07A5F" opacity="0.7" />
        </g>
      )}

      {/* Victory sparkles when recovered */}
      {progress > 0.85 && (
        <g opacity={(progress - 0.85) * 6}>
          <circle cx="10" cy="5" r="1" fill="#D1B046" />
          <circle cx="30" cy="3" r="1" fill="#D1B046" />
          <circle cx="6" cy="15" r="0.8" fill="#D1B046" />
          <circle cx="34" cy="12" r="0.8" fill="#D1B046" />
        </g>
      )}
    </svg>
  );
};

const HorizontalRoadmap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(-1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const progress = progressRef.current;

    if (!section || !container) return;

    const totalScroll = container.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Floating decorative elements
      gsap.to(".float-element", {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      });

      // Horizontal scroll animation
      const scrollTween = gsap.to(container, {
        x: () => -totalScroll,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        animation: scrollTween,
        onUpdate: (self) => {
          if (progress) {
            gsap.to(progress, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
            });
          }

          // Update scroll progress for figure animation
          setScrollProgress(self.progress);

          // Update active card based on scroll progress
          const cardIndex = Math.floor(self.progress * journeySteps.length);
          setActiveCard(Math.min(cardIndex, journeySteps.length - 1));
        },
      });

      // Header entrance
      gsap.fromTo(
        ".roadmap-header",
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

      // Cards entrance with 3D effect
      gsap.fromTo(
        ".journey-card",
        {
          opacity: 0,
          rotateY: -15,
          x: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate connection lines
      gsap.fromTo(
        ".connection-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div
          className="float-element absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(209, 176, 70, 0.15) 0%, transparent 70%)",
            top: "-200px",
            left: "10%",
          }}
        />
        <div
          className="float-element absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
            bottom: "-100px",
            right: "20%",
          }}
        />

        {/* Geometric shapes */}
        <div
          className="float-element absolute w-32 h-32 border border-[#D1B046]/10 rotate-45"
          style={{ top: "15%", right: "10%" }}
        />
        <div
          className="float-element absolute w-20 h-20 border border-[#D1B046]/10 rotate-12"
          style={{ bottom: "20%", left: "5%" }}
        />
        <div
          className="float-element absolute w-2 h-2 rounded-full bg-[#D1B046]/30"
          style={{ top: "30%", left: "15%" }}
        />
        <div
          className="float-element absolute w-3 h-3 rounded-full bg-[#D1B046]/20"
          style={{ top: "60%", right: "25%" }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(209, 176, 70, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(209, 176, 70, 0.5) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Header Section */}
      <div className="roadmap-header relative z-10 pt-24 pb-8 px-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase font-light"
            style={{ color: "#D1B046" }}
          >
            Sua Jornada
          </span>
          <div
            className="w-12 h-[1px]"
            style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
          />
        </div>

        <h2 className="text-4xl md:text-5xl font-extralight mb-4" style={{ color: "#F5F5F5" }}>
          Como cuidamos de <span style={{ color: "#D1B046", fontWeight: 300 }}>você</span>
        </h2>

        <p
          className="text-base md:text-lg font-light max-w-xl"
          style={{ color: "rgba(245, 245, 245, 0.6)" }}
        >
          Uma abordagem completa e personalizada, do diagnóstico à alta performance.
        </p>
      </div>

      {/* Progress Bar with Walking Figure */}
      <div className="relative z-10 px-8 max-w-6xl mx-auto mb-8">
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-3">
          {journeySteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 transition-all duration-500"
              style={{
                opacity: activeCard >= idx ? 1 : 0.3,
              }}
            >
              <div
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: activeCard >= idx ? "#D1B046" : "rgba(209, 176, 70, 0.3)",
                  boxShadow: activeCard === idx ? "0 0 10px rgba(209, 176, 70, 0.5)" : "none",
                }}
              />
              <span
                className="hidden md:block text-xs tracking-[0.1em] uppercase transition-colors duration-500"
                style={{
                  color: activeCard >= idx ? "#D1B046" : "rgba(245, 245, 245, 0.3)",
                }}
              >
                {step.number}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar with walking figure */}
        <div className="relative">
          {/* Track */}
          <div
            className="h-[2px] w-full relative"
            style={{ backgroundColor: "rgba(209, 176, 70, 0.15)" }}
          >
            {/* Filled progress */}
            <div
              ref={progressRef}
              className="h-full absolute top-0 left-0"
              style={{
                width: "0%",
                background: "linear-gradient(90deg, #D1B046, rgba(209, 176, 70, 0.5))",
                boxShadow: "0 0 20px rgba(209, 176, 70, 0.3)",
              }}
            />
          </div>

          {/* Walking figure - moves along the bar */}
          <div
            className="absolute -top-10 w-8 h-12 transition-all duration-100 ease-out"
            style={{
              left: `calc(${scrollProgress * 100}% - 16px)`,
            }}
          >
            <WalkingFigure progress={scrollProgress} />
          </div>

          {/* Start label */}
          <div
            className="absolute -bottom-6 left-0 text-[10px] tracking-[0.1em] uppercase transition-opacity duration-500"
            style={{
              color: scrollProgress < 0.1 ? "#D1B046" : "rgba(245, 245, 245, 0.3)",
            }}
          >
            Início
          </div>

          {/* End label */}
          <div
            className="absolute -bottom-6 right-0 text-[10px] tracking-[0.1em] uppercase transition-opacity duration-500"
            style={{
              color: scrollProgress > 0.9 ? "#D1B046" : "rgba(245, 245, 245, 0.3)",
            }}
          >
            Recuperado
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="relative flex items-start gap-8 md:gap-12 px-8 md:px-16"
        style={{ width: "fit-content", perspective: "1000px" }}
      >
        {journeySteps.map((step, index) => (
          <div
            key={index}
            className="journey-card flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[550px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="card-inner relative h-[420px] md:h-[450px] p-8 md:p-10 flex flex-col justify-between transition-all duration-500 group overflow-hidden"
              style={{
                background:
                  activeCard === index
                    ? "linear-gradient(145deg, rgba(209, 176, 70, 0.08) 0%, rgba(255,255,255,0.02) 100%)"
                    : "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                border:
                  activeCard === index
                    ? "1px solid rgba(209, 176, 70, 0.4)"
                    : "1px solid rgba(209, 176, 70, 0.15)",
                borderRadius: "2px",
                boxShadow:
                  activeCard === index
                    ? "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px rgba(209, 176, 70, 0.1)"
                    : "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  borderColor: "rgba(209, 176, 70, 0.5)",
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 50px rgba(209, 176, 70, 0.15)",
                  duration: 0.4,
                  ease: "power2.out",
                });
                gsap.to(e.currentTarget.querySelector(".card-glow"), {
                  opacity: 1,
                  duration: 0.4,
                });
                gsap.to(e.currentTarget.querySelector(".stat-value"), {
                  scale: 1.1,
                  duration: 0.4,
                  ease: "back.out(1.5)",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  borderColor:
                    activeCard === index ? "rgba(209, 176, 70, 0.4)" : "rgba(209, 176, 70, 0.15)",
                  boxShadow:
                    activeCard === index
                      ? "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px rgba(209, 176, 70, 0.1)"
                      : "0 10px 30px rgba(0, 0, 0, 0.2)",
                  duration: 0.4,
                });
                gsap.to(e.currentTarget.querySelector(".card-glow"), {
                  opacity: 0,
                  duration: 0.4,
                });
                gsap.to(e.currentTarget.querySelector(".stat-value"), {
                  scale: 1,
                  duration: 0.4,
                });
              }}
            >
              {/* Card Glow Effect */}
              <div
                className="card-glow absolute inset-0 pointer-events-none opacity-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(209, 176, 70, 0.1) 0%, transparent 60%)",
                }}
              />

              {/* Step Number & Stat */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex flex-col">
                  <span
                    className="text-7xl md:text-8xl font-extralight leading-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(209, 176, 70, 0.3) 0%, rgba(209, 176, 70, 0.1) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Stat Badge */}
                <div className="text-right">
                  <div
                    className="stat-value text-3xl md:text-4xl font-light mb-1 transition-transform"
                    style={{ color: "#D1B046" }}
                  >
                    {step.stat}
                  </div>
                  <div
                    className="text-xs tracking-[0.1em] uppercase"
                    style={{ color: "rgba(245, 245, 245, 0.5)" }}
                  >
                    {step.statLabel}
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              {index < journeySteps.length - 1 && (
                <div
                  className="connection-line hidden md:block absolute top-1/2 -right-6 md:-right-8 w-8 md:w-12 h-[1px]"
                  style={{
                    background: "linear-gradient(90deg, #D1B046, rgba(209, 176, 70, 0.2))",
                    transformOrigin: "left center",
                  }}
                />
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center relative z-10">
                <span
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: "#D1B046" }}
                >
                  {step.subtitle}
                </span>

                <h3 className="text-2xl md:text-3xl font-light mb-4" style={{ color: "#F5F5F5" }}>
                  {step.title}
                </h3>

                <p
                  className="text-sm md:text-base font-light leading-relaxed"
                  style={{ color: "rgba(245, 245, 245, 0.6)" }}
                >
                  {step.description}
                </p>
              </div>

              {/* Highlight Badge */}
              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 transition-all duration-300"
                  style={{
                    background: "rgba(209, 176, 70, 0.1)",
                    border: "1px solid rgba(209, 176, 70, 0.2)",
                    borderRadius: "1px",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: "#D1B046",
                      boxShadow: "0 0 6px rgba(209, 176, 70, 0.5)",
                    }}
                  />
                  <span className="text-xs tracking-[0.1em] uppercase" style={{ color: "#D1B046" }}>
                    {step.highlight}
                  </span>
                </div>
              </div>

              {/* Corner Accents */}
              <div
                className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(209, 176, 70, 0.3)",
                  borderLeft: "1px solid rgba(209, 176, 70, 0.3)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(209, 176, 70, 0.3)",
                  borderRight: "1px solid rgba(209, 176, 70, 0.3)",
                }}
              />
            </div>
          </div>
        ))}

        {/* Final CTA Card */}
        <div className="journey-card flex-shrink-0 w-[85vw] md:w-[450px] lg:w-[500px] mr-16">
          <div
            className="relative h-[420px] md:h-[450px] p-8 md:p-10 flex flex-col items-center justify-center text-center overflow-hidden group"
            style={{
              background:
                "linear-gradient(145deg, rgba(209, 176, 70, 0.12) 0%, rgba(209, 176, 70, 0.03) 100%)",
              border: "1px solid rgba(209, 176, 70, 0.3)",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 60px rgba(209, 176, 70, 0.2)",
                duration: 0.4,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: "none",
                duration: 0.4,
              });
            }}
          >
            {/* Animated Background Glow */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(209, 176, 70, 0.15) 0%, transparent 60%)",
              }}
            />

            <span
              className="relative z-10 text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "#D1B046" }}
            >
              Comece sua jornada
            </span>

            <h3
              className="relative z-10 text-3xl md:text-4xl font-extralight mb-6 leading-tight"
              style={{ color: "#F5F5F5" }}
            >
              Pronto para
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #D1B046, #E8D5A3)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 300,
                }}
              >
                transformar
              </span>
              <br />
              sua saúde?
            </h3>

            <p
              className="relative z-10 text-sm font-light mb-8 max-w-xs"
              style={{ color: "rgba(245, 245, 245, 0.6)" }}
            >
              Agende sua avaliação e descubra como podemos ajudar você.
            </p>

            <button
              className="relative z-10 px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 overflow-hidden group"
              style={{
                border: "1px solid #D1B046",
                color: "#D1B046",
                background: "transparent",
              }}
              onClick={() => {
                document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  backgroundColor: "#D1B046",
                  color: "#1E2832",
                  scale: 1.05,
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  backgroundColor: "transparent",
                  color: "#D1B046",
                  scale: 1,
                  duration: 0.3,
                });
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Agendar avaliação
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>

            {/* Corner Accents */}
            <div
              className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
              style={{
                borderTop: "1px solid rgba(209, 176, 70, 0.4)",
                borderLeft: "1px solid rgba(209, 176, 70, 0.4)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
              style={{
                borderBottom: "1px solid rgba(209, 176, 70, 0.4)",
                borderRight: "1px solid rgba(209, 176, 70, 0.4)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        className="absolute bottom-8 right-8 flex items-center gap-3 transition-opacity duration-500"
        style={{ color: "rgba(245, 245, 245, 0.4)" }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Arraste</span>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HorizontalRoadmap;
