"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const specialties = [
    "Fisioterapia Ortopédica",
    "Reabilitação Desportiva",
    "Pilates Clínico",
    "RPG",
    "Quiropraxia",
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/evidenceinstitutoclinico/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://web.facebook.com/evidenceinstituto",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/553497150404",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E2832 0%, #151D24 100%)",
      }}
    >
      {/* Decorative line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(209, 176, 70, 0.3), transparent)",
        }}
      />

      <div className="footer-content relative z-10 max-w-6xl mx-auto px-8 py-16 md:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="footer-col">
            <div className="mb-6">
              <span
                className="text-xl font-light tracking-[0.1em]"
                style={{ color: "#D1B046" }}
              >
                FisioWellness
              </span>
              <span
                className="text-xl font-extralight tracking-[0.05em] ml-2"
                style={{ color: "#F5F5F5" }}
              >
                Evidence
              </span>
            </div>

            <p
              className="text-sm font-light leading-relaxed mb-6"
              style={{ color: "rgba(245, 245, 245, 0.6)" }}
            >
              Excelência em cuidado, tecnologia e resultados. Sua jornada de recuperação e performance começa aqui.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300"
                  style={{
                    border: "1px solid rgba(209, 176, 70, 0.3)",
                    color: "rgba(209, 176, 70, 0.7)",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      borderColor: "#D1B046",
                      color: "#D1B046",
                      scale: 1.05,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      borderColor: "rgba(209, 176, 70, 0.3)",
                      color: "rgba(209, 176, 70, 0.7)",
                      scale: 1,
                      duration: 0.3,
                    });
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Specialties Column */}
          <div className="footer-col">
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: "#D1B046" }}
            >
              Especialidades
            </h4>

            <ul className="space-y-3">
              {specialties.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm font-light"
                  style={{ color: "rgba(245, 245, 245, 0.6)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ color: "#D1B046" }}
            >
              Contato
            </h4>

            <div className="space-y-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Av.+Araguari,+1900+-+1%C2%B0+andar+-+Osvaldo+Rezende,+Uberl%C3%A2ndia+-+MG,+38400-464"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm font-light transition-colors duration-300 group"
                style={{ color: "rgba(245, 245, 245, 0.6)" }}
              >
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-300"
                  style={{ color: "rgba(209, 176, 70, 0.7)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="group-hover:text-[#D1B046] transition-colors duration-300">
                  Av. Araguari, 1900 - 1° andar<br />
                  Osvaldo Rezende, Uberlândia - MG
                </span>
              </a>

              <a
                href="https://wa.me/553497150404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-light transition-colors duration-300 group"
                style={{ color: "rgba(245, 245, 245, 0.6)" }}
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 transition-colors duration-300"
                  style={{ color: "rgba(209, 176, 70, 0.7)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="group-hover:text-[#D1B046] transition-colors duration-300">
                  (34) 9682-0404
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8"
          style={{
            borderTop: "1px solid rgba(209, 176, 70, 0.1)",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-xs font-light tracking-wide"
              style={{ color: "rgba(245, 245, 245, 0.4)" }}
            >
              © {new Date().getFullYear()} Instituto FisioWellness Evidence. Todos os direitos reservados.
            </p>

            <a
              href="/privacy-policy"
              className="text-xs tracking-[0.1em] uppercase transition-colors duration-300"
              style={{ color: "rgba(209, 176, 70, 0.6)" }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { color: "#D1B046", duration: 0.3 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { color: "rgba(209, 176, 70, 0.6)", duration: 0.3 });
              }}
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
