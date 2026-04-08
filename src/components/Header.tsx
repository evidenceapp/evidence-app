"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";

import { INavLink } from "@/interfaces";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navLinks: INavLink[] = [
    { name: "Home", href: "home" },
    { name: "Sobre", href: "sobre" },
    { name: "Galeria", href: "galeria" },
    { name: "Equipe", href: "equipe" },
    { name: "Feedback", href: "feedback" },
    { name: "Ciência", href: "ciencia" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      ".header-content",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? "rgba(30, 40, 50, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(209, 176, 70, 0.1)" : "none",
      }}
    >
      <div className="header-content max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleScroll("home");
          }}
          className="flex items-center gap-3 group"
        >
          <span
            className="text-xl font-light tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ color: "#D1B046" }}
          >
            FisioWellness
          </span>
          <span
            className="text-xl font-extralight tracking-[0.1em] transition-colors duration-300"
            style={{ color: "#F5F5F5" }}
          >
            Evidence
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link: INavLink) => (
            <a
              key={link.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScroll(link.href);
                setActiveLink(link.href);
              }}
              className="nav-link relative px-5 py-2 text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300 group"
              style={{
                color: activeLink === link.href ? "#D1B046" : "rgba(245, 245, 245, 0.7)",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                const line = target.querySelector(".hover-line") as HTMLElement;

                if (activeLink !== link.href) {
                  gsap.to(target, { color: "#F5F5F5", duration: 0.3 });
                }

                gsap.fromTo(
                  line,
                  { width: "0%", left: "50%", x: "-50%" },
                  { width: "60%", duration: 0.4, ease: "power2.out" }
                );
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                const line = target.querySelector(".hover-line") as HTMLElement;

                if (activeLink !== link.href) {
                  gsap.to(target, { color: "rgba(245, 245, 245, 0.7)", duration: 0.3 });
                }

                gsap.to(line, { width: "0%", duration: 0.3, ease: "power2.in" });
              }}
            >
              {link.name}
              {/* Active indicator */}
              <span
                className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[1px] transition-all duration-300"
                style={{
                  width: activeLink === link.href ? "20px" : "0px",
                  backgroundColor: "#D1B046",
                }}
              />
              {/* Hover line */}
              <span
                className="hover-line absolute left-1/2 bottom-0 h-[1px] pointer-events-none"
                style={{
                  width: "0%",
                  backgroundColor: "rgba(245, 245, 245, 0.5)",
                  transform: "translateX(-50%)",
                }}
              />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleScroll("agendamento");
          }}
          className="hidden lg:block px-6 py-2 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300"
          style={{
            border: "1px solid #D1B046",
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
          Agendar
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 transition-colors duration-300"
          style={{ color: "#D1B046" }}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          backgroundColor: "rgba(30, 40, 50, 0.98)",
          backdropFilter: "blur(10px)",
        }}
      >
        <nav className="flex flex-col px-8 py-6 gap-1">
          {navLinks.map((link: INavLink) => (
            <a
              key={link.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScroll(link.href);
                setActiveLink(link.href);
                setIsOpen(false);
              }}
              className="px-4 py-3 text-sm tracking-[0.15em] uppercase font-light transition-all duration-300"
              style={{
                color: activeLink === link.href ? "#D1B046" : "rgba(245, 245, 245, 0.7)",
                borderLeft:
                  activeLink === link.href ? "2px solid #D1B046" : "2px solid transparent",
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("agendamento");
              setIsOpen(false);
            }}
            className="mt-4 mx-4 px-6 py-3 text-center text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300"
            style={{
              border: "1px solid #D1B046",
              color: "#D1B046",
            }}
          >
            Agendar Consulta
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
