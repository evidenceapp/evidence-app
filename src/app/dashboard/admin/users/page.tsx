"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

import AdminDash from "@/components/dashboard/Admin";
import UserDash from "@/components/dashboard/User";
import { IUser as User } from "@/interfaces";
import Loading from "@/app/Loading";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const fetchUsers = useCallback(async () => {
    const res = await fetch("/api/admin/users", { cache: "no-store" });
    const data = await res.json();
    if (data.currentUser) setCurrentUser(data.currentUser);
    if (data.users) setUsers(data.users);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background glow animation
      gsap.to(".dashboard-glow", {
        opacity: 0.2,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Card entrance
      gsap.fromTo(
        ".dashboard-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Stagger elements
      gsap.fromTo(
        ".user-animate",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [currentUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const isAdmin = currentUser?.role === "admin";

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="dashboard-glow absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.15) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
        }}
      />
      <div
        className="dashboard-glow absolute w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          bottom: "-150px",
          left: "-150px",
        }}
      />

      {/* Dashboard card */}
      <div
        className="dashboard-card relative max-w-lg w-full p-10"
        style={{
          background: "linear-gradient(145deg, rgba(45, 58, 74, 0.6) 0%, rgba(30, 40, 50, 0.8) 100%)",
          border: "1px solid rgba(209, 176, 70, 0.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Corner accents */}
        <div
          className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
          style={{
            borderTop: "1px solid rgba(209, 176, 70, 0.4)",
            borderLeft: "1px solid rgba(209, 176, 70, 0.4)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
          style={{
            borderBottom: "1px solid rgba(209, 176, 70, 0.4)",
            borderRight: "1px solid rgba(209, 176, 70, 0.4)",
          }}
        />

        {/* Header */}
        <div className="user-animate text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-8 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-light"
              style={{ color: "#D1B046" }}
            >
              Dashboard
            </span>
            <div
              className="w-8 h-[1px]"
              style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
            />
          </div>
          <h1
            className="text-2xl md:text-3xl font-extralight"
            style={{ color: "#F5F5F5" }}
          >
            Gerenciamento de{" "}
            <span style={{ color: "#D1B046", fontWeight: 300 }}>Usuários</span>
          </h1>
        </div>

        {/* Content */}
        {currentUser ? (
          isAdmin ? (
            <AdminDash usersList={users} onRefresh={fetchUsers} />
          ) : (
            <UserDash {...currentUser} />
          )
        ) : (
          <div className="flex justify-center py-8">
            <Loading />
          </div>
        )}

        {/* Back link */}
        <div className="user-animate mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(209, 176, 70, 0.1)" }}>
          <Link
            href="/"
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
            Voltar ao site
          </Link>
        </div>
      </div>
    </section>
  );
}
