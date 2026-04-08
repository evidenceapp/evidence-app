"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { toast } from "react-toastify";
import { ILoginForm } from "@/interfaces";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background glow animation
      gsap.to(".login-glow", {
        opacity: 0.2,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Form entrance animation
      gsap.fromTo(
        ".login-card",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Stagger form elements
      gsap.fromTo(
        ".login-animate",
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
  }, []);

  const onSubmit = async (data: ILoginForm) => {
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        setErrorMessage(resData.error || "Erro ao realizar login.");
        toast.error("Ocorreu um erro. Por favor, tente novamente.");
        return;
      }
      router.push("/dashboard/admin/users");
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro inesperado, tente novamente.");
    }
  };

  const inputStyles = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(209, 176, 70, 0.2)",
    color: "#F5F5F5",
    borderRadius: "2px",
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="login-glow absolute w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.15) 0%, transparent 70%)",
          top: "-200px",
          right: "-200px",
        }}
      />
      <div
        className="login-glow absolute w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          bottom: "-150px",
          left: "-150px",
        }}
      />

      {/* Login card */}
      <div
        className="login-card relative max-w-md w-full p-10"
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
        <div className="login-animate text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-8 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-light"
              style={{ color: "#D1B046" }}
            >
              Acesso
            </span>
            <div
              className="w-8 h-[1px]"
              style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
            />
          </div>
          <h2
            className="text-3xl font-extralight"
            style={{ color: "#F5F5F5" }}
          >
            Área <span style={{ color: "#D1B046", fontWeight: 300 }}>Restrita</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username field */}
          <div className="login-animate">
            <label
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase mb-3 font-light"
              style={{ color: "rgba(245, 245, 245, 0.7)" }}
            >
              <svg className="w-4 h-4" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Usuário
            </label>
            <input
              type="text"
              {...register("username", { required: "Usuário é obrigatório." })}
              placeholder="Seu usuário"
              className="w-full px-5 py-4 text-sm font-light transition-all duration-300 focus:outline-none"
              style={inputStyles}
              onFocus={(e) => {
                gsap.to(e.target, {
                  borderColor: "rgba(209, 176, 70, 0.5)",
                  duration: 0.3,
                });
              }}
              onBlur={(e) => {
                gsap.to(e.target, {
                  borderColor: "rgba(209, 176, 70, 0.2)",
                  duration: 0.3,
                });
              }}
            />
            {errors.username && (
              <p className="mt-2 text-xs" style={{ color: "#E07A5F" }}>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="login-animate">
            <label
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase mb-3 font-light"
              style={{ color: "rgba(245, 245, 245, 0.7)" }}
            >
              <svg className="w-4 h-4" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Senha
            </label>
            <input
              type="password"
              {...register("password", { required: "Senha é obrigatória." })}
              placeholder="Sua senha"
              className="w-full px-5 py-4 text-sm font-light transition-all duration-300 focus:outline-none"
              style={inputStyles}
              onFocus={(e) => {
                gsap.to(e.target, {
                  borderColor: "rgba(209, 176, 70, 0.5)",
                  duration: 0.3,
                });
              }}
              onBlur={(e) => {
                gsap.to(e.target, {
                  borderColor: "rgba(209, 176, 70, 0.2)",
                  duration: 0.3,
                });
              }}
            />
            {errors.password && (
              <p className="mt-2 text-xs" style={{ color: "#E07A5F" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="login-animate pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{
                border: "1px solid #D1B046",
                color: "#D1B046",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
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
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div
              className="text-center py-3 px-4 mt-2"
              style={{
                background: "rgba(224, 122, 95, 0.1)",
                border: "1px solid rgba(224, 122, 95, 0.3)",
              }}
            >
              <p className="text-xs font-light" style={{ color: "#E07A5F" }}>
                {errorMessage}
              </p>
            </div>
          )}
        </form>

        {/* Back to home link */}
        <div className="login-animate mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-light transition-all duration-300"
            style={{ color: "rgba(245, 245, 245, 0.5)" }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                color: "#D1B046",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                color: "rgba(245, 245, 245, 0.5)",
                duration: 0.3,
              });
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao site
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
