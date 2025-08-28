import Image from "next/image";
import { useState } from "react";

import { ICard } from "@/interfaces";

const Card = ({ title, description, image, isLast, lastItemRef }: ICard) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={isLast ? lastItemRef : null}
      className="relative w-64 md:w-80 h-80 md:h-96 rounded-3xl overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-2 shadow-lg bg-neutral-50"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 py-6 transition-all duration-500 ${
          hover ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <Image src={image} alt={title} width={80} height={80} className="object-contain mb-4" />
        <h2 className="text-lg md:text-2xl font-bold text-center text-neutral-700">{title}</h2>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center px-6 transition-all duration-500 ${
          hover ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{ backgroundColor: "#D1B046", color: "#4a4a4a" }}
      >
        <p className="text-xs md:text-base leading-relaxed text-center">{description}</p>
      </div>
    </div>
  );
};

export default Card;
