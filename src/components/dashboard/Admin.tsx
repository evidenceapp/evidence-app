"use client";

import Image from "next/image";
import { useState } from "react";
import gsap from "gsap";

import { IUser } from "@/interfaces";

interface AdminDashProps {
  usersList: IUser[];
  onRefresh: () => Promise<void>;
}

const AdminDash = ({ usersList, onRefresh }: AdminDashProps) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async () => {
    if (!formData.username || !formData.password) return;
    setIsLoading(true);
    await fetch("/api/admin/users", {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        role: "user",
      }),
    });
    setFormData({ username: "", password: "" });
    await onRefresh();
    setIsLoading(false);
  };

  const deleteUser = async (id: string, role: string) => {
    if (role === "admin") {
      alert("Você não pode excluir um administrador.");
      return;
    }
    setIsLoading(true);
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    await onRefresh();
    setIsLoading(false);
  };

  const inputStyles = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(209, 176, 70, 0.2)",
    color: "#F5F5F5",
    borderRadius: "2px",
  };

  return (
    <>
      {/* Create User Form */}
      <div className="space-y-4 user-animate">
        <h2
          className="text-sm tracking-[0.15em] uppercase font-light mb-4"
          style={{ color: "rgba(245, 245, 245, 0.7)" }}
        >
          Cadastrar Usuário
        </h2>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Novo usuário"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full pl-12 pr-5 py-4 text-sm font-light transition-all duration-300 focus:outline-none"
            style={inputStyles}
            onFocus={(e) => {
              gsap.to(e.target, { borderColor: "rgba(209, 176, 70, 0.5)", duration: 0.3 });
            }}
            onBlur={(e) => {
              gsap.to(e.target, { borderColor: "rgba(209, 176, 70, 0.2)", duration: 0.3 });
            }}
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-12 pr-5 py-4 text-sm font-light transition-all duration-300 focus:outline-none"
            style={inputStyles}
            onFocus={(e) => {
              gsap.to(e.target, { borderColor: "rgba(209, 176, 70, 0.5)", duration: 0.3 });
            }}
            onBlur={(e) => {
              gsap.to(e.target, { borderColor: "rgba(209, 176, 70, 0.2)", duration: 0.3 });
            }}
          />
        </div>

        <button
          onClick={createUser}
          disabled={isLoading}
          className="w-full py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
          style={{
            border: "1px solid #D1B046",
            color: "#D1B046",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              gsap.to(e.currentTarget, {
                backgroundColor: "#D1B046",
                color: "#1E2832",
                duration: 0.3,
              });
            }
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              backgroundColor: "transparent",
              color: "#D1B046",
              duration: 0.3,
            });
          }}
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
              </svg>
              Criar usuário
            </>
          )}
        </button>
      </div>

      {/* Users List */}
      <div className="mt-8 user-animate">
        <h2
          className="text-sm tracking-[0.15em] uppercase font-light mb-4"
          style={{ color: "rgba(245, 245, 245, 0.7)" }}
        >
          Usuários Cadastrados
        </h2>

        <ul className="space-y-3">
          {usersList &&
            usersList.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-4 transition-all duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(209, 176, 70, 0.1)",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(209, 176, 70, 0.3)",
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(209, 176, 70, 0.1)",
                    duration: 0.3,
                  });
                }}
              >
                <div className="flex items-center gap-3">
                  {user.instagramUsername ? (
                    <div
                      className="relative w-10 h-10 rounded-full overflow-hidden"
                      style={{ border: "2px solid rgba(209, 176, 70, 0.4)" }}
                    >
                      <Image
                        src={user.instagramProfilePictureUrl || "/images/default-avatar.svg"}
                        alt={user.username}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(209, 176, 70, 0.1)",
                        border: "1px solid rgba(209, 176, 70, 0.3)",
                      }}
                    >
                      <svg className="w-5 h-5" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <span
                      className="text-sm font-light block"
                      style={{ color: "#F5F5F5" }}
                    >
                      {user.username}
                    </span>
                    {user.instagramUsername && (
                      <span
                        className="text-xs"
                        style={{ color: "#D1B046" }}
                      >
                        @{user.instagramUsername}
                      </span>
                    )}
                  </div>
                </div>

                {user.role !== "admin" && (
                  <button
                    onClick={() => deleteUser(user.id, user.role)}
                    disabled={isLoading}
                    className="w-8 h-8 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                    style={{ color: "rgba(224, 122, 95, 0.6)" }}
                    onMouseEnter={(e) => {
                      if (!isLoading) {
                        gsap.to(e.currentTarget, { color: "#E07A5F", duration: 0.3 });
                      }
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { color: "rgba(224, 122, 95, 0.6)", duration: 0.3 });
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDash;
