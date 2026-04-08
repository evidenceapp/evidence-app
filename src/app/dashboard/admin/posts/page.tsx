"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Loading from "@/app/Loading";
import { IUser as User } from "@/interfaces";

const UserPosts = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm font-light tracking-wide">Carregando editor...</span>
      </div>
    </div>
  ),
});

export default function PostsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();
      if (data.currentUser) setCurrentUser(data.currentUser);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!currentUser || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".posts-glow", {
        opacity: 0.2,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".posts-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".posts-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power3.out" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <main
      ref={pageRef}
      className="min-h-screen relative overflow-hidden py-12 px-6"
      style={{
        background: "linear-gradient(135deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="posts-glow fixed w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.15) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
        }}
      />
      <div
        className="posts-glow fixed w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          bottom: "-150px",
          left: "-150px",
        }}
      />

      {/* Header */}
      <div className="posts-header w-full max-w-4xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div
            className="w-12 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
          />
          <svg className="w-6 h-6" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <div
            className="w-12 h-[1px]"
            style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
          />
        </div>

        <h1
          className="text-3xl md:text-4xl font-extralight mb-3"
          style={{ color: "#F5F5F5" }}
        >
          Olá, <span style={{ color: "#D1B046", fontWeight: 300 }}>{currentUser.username}</span>
        </h1>

        <p
          className="text-base font-light"
          style={{ color: "rgba(245, 245, 245, 0.6)" }}
        >
          Que tal compartilhar suas ideias incríveis hoje?
        </p>
      </div>

      {/* Back link */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <a
          href="/dashboard/admin/users"
          className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-light transition-all duration-300"
          style={{ color: "rgba(245, 245, 245, 0.5)" }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { color: "#D1B046", duration: 0.3 });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { color: "rgba(245, 245, 245, 0.5)", duration: 0.3 });
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao Dashboard
        </a>
      </div>

      {/* Content */}
      <div className="posts-content w-full max-w-4xl mx-auto">
        <UserPosts userId={currentUser.id} />
      </div>
    </main>
  );
}
