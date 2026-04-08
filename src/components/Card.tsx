"use client";

import Image from "next/image";
import { useState } from "react";
import { gsap } from "gsap";
import { ICard } from "@/interfaces";

const Card = ({ title, description, image, icon: Icon, isLast, lastItemRef }: ICard) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={isLast ? lastItemRef : null}
      className="relative w-64 md:w-80 h-80 md:h-96 overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(209, 176, 70, 0.2)",
        borderRadius: "2px",
      }}
      onMouseEnter={(e) => {
        setHover(true);
        gsap.to(e.currentTarget, {
          borderColor: "rgba(209, 176, 70, 0.5)",
          y: -8,
          duration: 0.4,
          ease: "power2.out",
        });
      }}
      onMouseLeave={(e) => {
        setHover(false);
        gsap.to(e.currentTarget, {
          borderColor: "rgba(209, 176, 70, 0.2)",
          y: 0,
          duration: 0.4,
        });
      }}
    >
      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-20"
        style={{
          borderTop: "1px solid rgba(209, 176, 70, 0.4)",
          borderLeft: "1px solid rgba(209, 176, 70, 0.4)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-20"
        style={{
          borderBottom: "1px solid rgba(209, 176, 70, 0.4)",
          borderRight: "1px solid rgba(209, 176, 70, 0.4)",
        }}
      />

      {/* Default state */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 py-6 transition-all duration-500 ${
          hover ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {image ? (
          <div
            className="relative w-20 h-20 mb-6"
            style={{
              filter: "drop-shadow(0 4px 12px rgba(209, 176, 70, 0.2))",
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          Icon && (
            <Icon
              size={80}
              className="mb-6"
              style={{ color: "#D1B046" }}
            />
          )
        )}
        <h2
          className="text-lg md:text-xl font-light text-center tracking-wide"
          style={{ color: "#F5F5F5" }}
        >
          {title}
        </h2>
      </div>

      {/* Hover state */}
      <div
        className={`absolute inset-0 flex items-center justify-center px-8 transition-all duration-500 ${
          hover ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{
          background: "linear-gradient(145deg, #D1B046 0%, #B89B3E 100%)",
        }}
      >
        <p
          className="text-xs md:text-sm leading-relaxed text-center font-light"
          style={{ color: "#1E2832" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
