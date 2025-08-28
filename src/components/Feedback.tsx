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
    cardsRef.current.forEach((card) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
          onComplete: () => {
            const stars = card.querySelectorAll(".star-fill");
            stars.forEach((star, i) => {
              if (i < parseInt(star.getAttribute("data-index") || "0")) {
                gsap.to(star, {
                  width: "100%",
                  duration: 0.15,
                  delay: i * 0.05,
                  ease: "power1.out",
                });
              }
            });
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="feedback"
      ref={sectionRef}
      className="py-24 overflow-hidden relative"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6" style={{ color: "#4a4a4a" }}>
          O Que Nossos Clientes Dizem
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-16" style={{ color: "#6d6d6d" }}>
          Confira alguns depoimentos reais de pessoas que confiaram em nosso trabalho.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 relative z-10">
        {testimonials.slice(0, 4).map((t, index) => (
          <a
            key={index}
            href={t.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full border-4 border-[#D1B046] mb-4 shadow-lg relative">
              <Image
                src={t.image}
                alt={t.alt}
                fill
                sizes="96px"
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex mb-3 space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="relative w-5 h-5">
                  <svg
                    className="absolute top-0 left-0 w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.036 3.175a1 1 0 00.95.69h3.356c.969 0 1.371 1.24.588 1.81l-2.716 1.973a1 1 0 00-.364 1.118l1.036 3.175c.3.921-.755 1.688-1.538 1.118l-2.716-1.973a1 1 0 00-1.176 0l-2.716 1.973c-.783.57-1.838-.197-1.539-1.118l1.037-3.175a1 1 0 00-.365-1.118L2.172 8.602c-.783-.57-.38-1.81.588-1.81h3.356a1 1 0 00.951-.69l1.036-3.175z" />
                  </svg>
                  <svg
                    className="absolute top-0 left-0 h-5 text-[#D1B046] overflow-hidden star-fill"
                    style={{
                      width: i < t.stars ? "0%" : "0%",
                      transition: "width 0.3s ease",
                    }}
                    data-index={t.stars.toString()}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.036 3.175a1 1 0 00.95.69h3.356c.969 0 1.371 1.24.588 1.81l-2.716 1.973a1 1 0 00-.364 1.118l1.036 3.175c.3.921-.755 1.688-1.538 1.118l-2.716-1.973a1 1 0 00-1.176 0l-2.716 1.973c-.783.57-1.838-.197-1.539-1.118l1.037-3.175a1 1 0 00-.365-1.118L2.172 8.602c-.783-.57-.38-1.81.588-1.81h3.356a1 1 0 00.951-.69l1.036-3.175z" />
                  </svg>
                </div>
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">{`"${t.feedback}"`}</p>
            <p className="font-semibold" style={{ color: "#D1B046" }}>
              {t.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Feedback;
