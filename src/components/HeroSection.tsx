import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { IHeroSection } from "@/interfaces";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ name, slogan, backgroundImage }: IHeroSection) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".hero-animate");
      elements.forEach((el: any, idx) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: idx * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`w-full flex flex-col lg:flex-row justify-center items-center py-24 px-6 hero relative text-center lg:text-left h-[600px]`}
      style={{
        backgroundColor: "#f9f9f9",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl space-y-4">
        <div className="flex flex-col gap-4 max-w-xl">
          <h3
            className="text-lg font-medium tracking-widest uppercase hero-animate"
            style={{ color: "#D1B046" }}
          >
            {name}
          </h3>
          <h2
            className="text-5xl font-bold leading-tight hero-animate"
            style={{ color: "#4a4a4a" }}
          >
            {slogan}
          </h2>

          <p className="text-lg md:text-xl text-[#4a4a4a] max-w-md hero-animate">
            Porque cada detalhe importa na sua saúde.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
