"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import AdminDash from "@/components/dashboard/Admin";
import UserDash from "@/components/dashboard/User";
import { IUser as User } from "@/interfaces";
import Loading from "@/app/Loading";

gsap.registerPlugin(ScrollTrigger);
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".user-animate");
      elements.forEach((el: any, idx) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: idx * 0.1,
            ease: "power3.out",
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

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();
      if (data.currentUser) setCurrentUser(data.currentUser);
      if (data.users) setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const isAdmin = currentUser?.role === "admin";

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#f9f9f9", color: "#4a4a4a" }}
    >
      <div
        className="max-w-md w-full p-8 rounded-xl shadow-2xl user-animate"
        style={{ backgroundColor: "#ffffff", border: "1px solid #dcdcdc" }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#D1B046" }}>
          Gerenciamento de Usuários
        </h1>

        {currentUser ? isAdmin ? null : <UserDash {...currentUser} /> : <Loading />}

        {isAdmin && <AdminDash usersList={users} />}
      </div>
    </section>
  );
}
