import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".footer-animate");
      elements.forEach((el: any, idx) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: idx * 0.2,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const specialties = [
    "Fisioterapia Ortopédica",
    "Reabilitação Desportiva",
    "Pilates",
    "RPG",
    "Drenagem Linfática",
  ];

  return (
    <footer
      ref={footerRef}
      className="py-12 px-6 bg-[#2b2b2b] text-[#f9f9f9] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Esquerda */}
        <div className="footer-animate flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-[#D1B046]">Evidence</h3>
          <p className="text-[#f9f9f9]">Saúde, Reabilitação e Performance.</p>
        </div>

        {/* Centro */}
        <div className="footer-animate">
          <h4 className="text-lg font-semibold text-[#D1B046] mb-2">Especialidades</h4>
          <ul className="space-y-1">
            {specialties.map((item, idx) => (
              <li key={idx} className="text-[#f9f9f9]">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Direita */}
        <div className="footer-animate flex flex-col gap-3">
          <h4 className="text-lg font-semibold text-[#D1B046]">Contato e Localização</h4>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Av.+Araguari,+1900+-+1%C2%B0+andar+-+Osvaldo+Rezende,+Uberl%C3%A2ndia+-+MG,+38400-464"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#f9f9f9] hover:text-[#D1B046] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Av. Araguari, 1900 - 1° andar - Osvaldo Rezende, Uberlândia - MG, 38400-464</span>
          </a>
          <a
            href="https://wa.me/553496820404"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#f9f9f9] hover:text-[#D1B046] transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faPhone} />
            <span>(34) 9682-0404</span>
          </a>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/evidenceinstitutoclinico/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 text-[#D1B046]"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://web.facebook.com/evidenceinstituto"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 text-[#D1B046]"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://wa.me/553496820404"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 text-[#D1B046]"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-[#f9f9f9] footer-animate">
        © {new Date().getFullYear()} Evidence Instituto Clínico. Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
