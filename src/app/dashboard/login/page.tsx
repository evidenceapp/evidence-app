"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "react-toastify";
import { ILoginForm } from "@/interfaces";

gsap.registerPlugin(ScrollTrigger);



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
      const elements = gsap.utils.toArray(".login-animate");

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

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#f9f9f9", color: "#4a4a4a" }}
    >
      <div
        className="max-w-md w-full p-8 rounded-xl shadow-2xl login-animate"
        style={{ backgroundColor: "#ffffff", border: "1px solid #dcdcdc" }}
      >
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#D1B046" }}
        >
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="login-animate">
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} style={{ color: "#D1B046" }} />
                Usuário
              </div>
            </label>
            <input
              type="text"
              {...register("username", { required: "Usuário é obrigatório." })}
              placeholder="Seu usuário"
              className="w-full px-4 py-3 rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #dcdcdc",
                color: "#4a4a4a",
              }}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="login-animate">
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} style={{ color: "#D1B046" }} />
                Senha
              </div>
            </label>
            <input
              type="password"
              {...register("password", { required: "Senha é obrigatória." })}
              placeholder="Sua senha"
              className="w-full px-4 py-3 rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: "#f9f9f9",
                border: "1px solid #dcdcdc",
                color: "#4a4a4a",
              }}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed login-animate"
            style={{ backgroundColor: "#D1B046", color: "#4a4a4a" }}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  spin
                  className="h-5 w-5"
                />
                Entrando...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faRightToBracket} />
                Entrar
              </>
            )}
          </button>

          {errorMessage && (
            <p className="mt-4 text-center text-red-500 text-sm">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
