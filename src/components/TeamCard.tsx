"use client";

import React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ITeamCardProps as TeamCardProps } from "@/interfaces";

const TeamCard: React.FC<TeamCardProps> = ({ name, description, instagram, image }) => {
  return (
    <div
      className="relative w-64 h-96 overflow-hidden group"
      style={{
        borderRadius: "2px",
        border: "1px solid rgba(209, 176, 70, 0.2)",
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          borderColor: "rgba(209, 176, 70, 0.5)",
          duration: 0.3,
        });
        gsap.to(e.currentTarget.querySelector(".card-image"), {
          scale: 1.08,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(e.currentTarget.querySelector(".card-overlay"), {
          opacity: 0.85,
          duration: 0.3,
        });
        gsap.to(e.currentTarget.querySelector(".instagram-link"), {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          borderColor: "rgba(209, 176, 70, 0.2)",
          duration: 0.3,
        });
        gsap.to(e.currentTarget.querySelector(".card-image"), {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(e.currentTarget.querySelector(".card-overlay"), {
          opacity: 0.6,
          duration: 0.3,
        });
        gsap.to(e.currentTarget.querySelector(".instagram-link"), {
          opacity: 0,
          y: 10,
          duration: 0.3,
        });
      }}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 200px, 256px"
        loading="lazy"
        className="card-image object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="card-overlay absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 30%, rgba(30, 40, 50, 0.95) 100%)",
          opacity: 0.6,
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
        style={{
          borderTop: "1px solid rgba(209, 176, 70, 0.4)",
          borderLeft: "1px solid rgba(209, 176, 70, 0.4)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
        style={{
          borderBottom: "1px solid rgba(209, 176, 70, 0.4)",
          borderRight: "1px solid rgba(209, 176, 70, 0.4)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 w-full text-center px-5 pb-6 pt-20 z-10">
        <h3
          className="text-base font-medium mb-1 tracking-wide"
          style={{ color: "#F5F5F5" }}
        >
          {name}
        </h3>
        <p
          className="text-xs font-light tracking-[0.1em] uppercase mb-3"
          style={{ color: "rgba(209, 176, 70, 0.8)" }}
        >
          {description}
        </p>
        <a
          href={`https://instagram.com/${instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link inline-flex items-center gap-2 text-xs tracking-wide transition-colors duration-300"
          style={{
            color: "rgba(245, 245, 245, 0.6)",
            opacity: 0,
            transform: "translateY(10px)",
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          {instagram}
        </a>
      </div>
    </div>
  );
};

export default TeamCard;
