import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { galeryImages } from "../mocks/index";

gsap.registerPlugin(ScrollTrigger);

const Galery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector(".showroom-title"),
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );

    gsap.fromTo(
      section.querySelector(".showroom-description"),
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      }
    );

    const images = section.querySelectorAll(".gallery-image");

    images.forEach((img, i) => {
      const fromX = i % 2 === 0 ? -50 : 50;
      const fromY = i % 3 === 0 ? -50 : 50;

      gsap.fromTo(
        img,
        { autoAlpha: 0, x: fromX, y: fromY, scale: 0.95 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        }
      );
    });

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        className="relative w-full px-6 py-20"
        style={{ backgroundColor: "#4a4a4a" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="showroom-title text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: "#f9f9f9" }}
          >
            Galeria
          </h2>
          <p
            className="showroom-description text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
            style={{ color: "#f9f9f9" }}
          >
            Conheça nossa estrutura e momentos que vivenciamos com nossos pacientes.
          </p>

          <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {galeryImages.map((src, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl shadow-md group cursor-pointer ${
                  index % 5 === 0 ? "row-span-2" : ""
                } gallery-image`}
                onClick={() => setSelectedImage(src)}
              >
                <Image
                  src={src}
                  alt={`Galeria ${index + 1}`}
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/40"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Visualização ampliada"
            className="max-w-[80%] max-h-[80%] rounded-lg shadow-xl transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Galery;
