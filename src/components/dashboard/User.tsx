"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import gsap from "gsap";
import { toast } from "react-toastify";

import { IUser } from "@/interfaces";

const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024;

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Falha ao ler a imagem."));
    };
    reader.onerror = () => reject(new Error("Falha ao ler a imagem."));
    reader.readAsDataURL(file);
  });

const UserDash = (user: IUser | null) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instagramUsername: "",
  });
  const [instagramDirty, setInstagramDirty] = useState(false);
  const [avatarDirty, setAvatarDirty] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.instagramProfilePictureUrl || "/images/default-avatar.svg");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAvatarPreview(user?.instagramProfilePictureUrl || "/images/default-avatar.svg");
  }, [user?.instagramProfilePictureUrl]);

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      toast.error("Selecione um arquivo de imagem válido.");
      return;
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      event.target.value = "";
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }

    try {
      const imageDataUrl = await fileToDataUrl(file);
      setAvatarPreview(imageDataUrl);
      setAvatarDirty(true);
    } catch {
      toast.error("Não foi possível carregar a imagem.");
    } finally {
      event.target.value = "";
    }
  };

  const updateProfile = async () => {
    if (!formData.username && !formData.password && !instagramDirty && !avatarDirty) return;
    setIsLoading(true);

    // Build update data
    const updateData: Record<string, string | undefined> = {
      id: user?.id,
    };

    if (formData.username) updateData.username = formData.username;
    if (formData.password) updateData.password = formData.password;
    if (instagramDirty) {
      const cleanUsername = formData.instagramUsername.replace("@", "").trim();
      updateData.instagramUsername = cleanUsername;
    }
    if (avatarDirty) updateData.instagramProfilePictureUrl = avatarPreview;

    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Não foi possível atualizar o perfil.");
        return;
      }

      setFormData({ username: "", password: "", instagramUsername: "" });
      setInstagramDirty(false);
      setAvatarDirty(false);
      toast.success("Dados atualizados com sucesso!");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(209, 176, 70, 0.2)",
    color: "#F5F5F5",
    borderRadius: "2px",
  };

  const profilePictureUrl = avatarPreview || "/images/default-avatar.svg";

  return (
    <>
      {/* Instagram Profile */}
      {(user?.instagramUsername || user?.instagramProfilePictureUrl) && (
        <div className="flex flex-col items-center mb-8 user-animate">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden mb-4"
            style={{ border: "3px solid #D1B046" }}
          >
            <Image
              src={profilePictureUrl || "/default-avatar.png"}
              alt="Instagram Avatar"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <p
            className="text-lg font-light flex items-center gap-2"
            style={{ color: "#F5F5F5" }}
          >
            <svg className="w-5 h-5" style={{ color: "#D1B046" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {user?.instagramUsername ? `@${user.instagramUsername}` : "Foto de perfil"}
          </p>
        </div>
      )}

      {/* Edit Profile Form */}
      <div className="space-y-4 user-animate">
        <h2
          className="text-sm tracking-[0.15em] uppercase font-light mb-4"
          style={{ color: "rgba(245, 245, 245, 0.7)" }}
        >
          Editar Perfil
        </h2>

        {/* Instagram Username */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4" style={{ color: "#D1B046" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder={user?.instagramUsername ? `@${user.instagramUsername}` : "Seu @ do Instagram"}
            value={formData.instagramUsername}
            onChange={(e) => {
              setInstagramDirty(true);
              setFormData({ ...formData, instagramUsername: e.target.value });
            }}
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

        <div className="space-y-3">
          <div>
            <p
              className="text-xs tracking-[0.12em] uppercase font-light mb-3"
              style={{ color: "rgba(245, 245, 245, 0.55)" }}
            >
              Foto de Perfil
            </p>
            <label
              className="flex items-center justify-between gap-4 px-4 py-4 cursor-pointer transition-all duration-300"
              style={inputStyles}
            >
              <span className="text-sm font-light" style={{ color: "rgba(245, 245, 245, 0.75)" }}>
                {avatarDirty ? "Nova imagem selecionada" : "Enviar imagem do seu dispositivo"}
              </span>
              <span className="text-xs tracking-[0.16em] uppercase" style={{ color: "#D1B046" }}>
                Upload
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <p className="text-xs font-light" style={{ color: "rgba(245, 245, 245, 0.45)" }}>
            Formatos de imagem aceitos. Tamanho máximo: 5MB.
          </p>
        </div>

        {/* Username */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={user?.username ? user.username : "Novo username"}
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

        {/* Password */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4" style={{ color: "#D1B046" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type="password"
            placeholder="Nova senha"
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
          onClick={updateProfile}
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
              Atualizando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
              </svg>
              Atualizar Perfil
            </>
          )}
        </button>

        {user?.instagramUsername && (
          <button
            onClick={() => router.push("/dashboard/admin/posts")}
            className="w-full py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 mt-4"
            style={{
              border: "1px solid rgba(245, 245, 245, 0.2)",
              color: "rgba(245, 245, 245, 0.7)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(245, 245, 245, 0.5)",
                color: "#F5F5F5",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(245, 245, 245, 0.2)",
                color: "rgba(245, 245, 245, 0.7)",
                duration: 0.3,
              });
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Ir para Meus Posts
          </button>
        )}
      </div>
    </>
  );
};

export default UserDash;
