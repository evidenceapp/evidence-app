import React from "react";
import Image from "next/image";
import { ITeamCardProps as TeamCardProps } from "@/interfaces";

const TeamCard: React.FC<TeamCardProps> = ({ name, description, instagram, image }) => {
  return (
    <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-lg group">
      <Image
        src={image}
        alt={name}
        fill
        priority={true}
        sizes="256px"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60"></div>
      <div className="absolute bottom-6 w-full text-center px-4 text-white z-10">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-300">{description}</p>
        <a
          href={`https://instagram.com/${instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 mt-1 hover:underline"
        >
          {instagram}
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
