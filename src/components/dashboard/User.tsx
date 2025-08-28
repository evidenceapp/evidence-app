import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { IUser } from "@/interfaces";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLock, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const UserDash = (user: IUser | null) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const updateProfile = async () => {
    if (!formData.username && !formData.password) return;
    await fetch("/api/admin/users", {
      method: "PUT",
      body: JSON.stringify({
        id: user?.id,
        username: formData.username,
        password: formData.password,
      }),
    });
    setFormData({ username: "", password: "" });
    toast.success("Dados atualizados com sucesso!");
    router.refresh();
  };

  return (
    <>
      {user?.instagramUsername && (
        <div className="flex flex-col items-center mb-6 user-animate">
          {user.instagramProfilePictureUrl && (
            <Image
              src={user.instagramProfilePictureUrl}
              alt="Instagram Avatar"
              width={24}
              height={24}
              className="rounded-full w-24 h-24 object-cover border-4 border-[#D1B046] mb-2"
            />
          )}
          <p className="text-lg font-semibold flex items-center gap-2">
            <FontAwesomeIcon icon={faInstagram} style={{ color: "#D1B046" }} />@
            {user.instagramUsername}
          </p>
          {user.instagramAccountType && (
            <p className="text-sm text-gray-600">Tipo de conta: {user.instagramAccountType}</p>
          )}
        </div>
      )}

      {!user?.instagramUsername && (
        <a
          href="/api/auth/instagram"
          className="mb-6 bg-[#D1B046] text-[#4a4a4a] px-4 py-2 rounded-lg shadow font-semibold hover:bg-yellow-500 transition user-animate text-center block"
        >
          <FontAwesomeIcon icon={faInstagram} className="mr-2" />
          Conectar com Instagram
        </a>
      )}

      <div className="space-y-4 user-animate">
        <h2 className="text-lg font-semibold mb-2">Editar seu perfil</h2>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} style={{ color: "#D1B046" }} />
          <input
            type="text"
            placeholder="Novo username"
            value={formData.username || user?.username || ""}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #dcdcdc",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLock} style={{ color: "#D1B046" }} />
          <input
            type="password"
            placeholder="Nova senha"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #dcdcdc",
            }}
          />
        </div>
        <button
          onClick={updateProfile}
          className="w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold shadow-md transition-transform duration-200 transform hover:scale-105 hover:bg-yellow-500 bg-[#D1B046] text-[#4a4a4a] cursor-pointer"
        >
          <FontAwesomeIcon icon={faUser} />
          Atualizar Perfil
        </button>
        {user && user.instagramAccountType && (
          <button
            onClick={() => router.push("/dashboard/admin/posts")}
            className="w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold shadow-md transition-transform duration-200 transform hover:scale-105 hover:bg-yellow-500 bg-[#D1B046] text-[#4a4a4a] cursor-pointer mt-4"
          >
            <FontAwesomeIcon icon={faPlus} />
            Ir para Meus Posts
          </button>
        )}
      </div>
    </>
  );
};

export default UserDash;
