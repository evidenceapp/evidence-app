import { useRouter } from "next/navigation";
import { useState } from "react";

import { IUser } from "@/interfaces";
import {
  faLock,
  faPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminDash = ({ usersList }: { usersList: IUser[] }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const createUser = async () => {
    if (!formData.username || !formData.password) return;
    await fetch("/api/admin/users", {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        role: "user",
      }),
    });
    setFormData({ username: "", password: "" });

    router.refresh();
  };

  const deleteUser = async (id: string, role: string) => {
    if (role === "admin") {
      alert("Você não pode excluir um administrador.");
      return;
    }
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    router.refresh();
  };
  return (
    <>
      <div className="space-y-4 user-animate">
        <h2 className="text-lg font-semibold mb-2">Cadastrar Usuário</h2>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} style={{ color: "#D1B046" }} />
          <input
            type="text"
            placeholder="Novo usuário"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
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
            placeholder="Senha"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #dcdcdc",
            }}
          />
        </div>
        <button
          onClick={createUser}
          className="w-full flex justify-center items-center gap-2 py-3 rounded-lg font-semibold shadow-md"
          style={{ backgroundColor: "#D1B046", color: "#4a4a4a" }}
        >
          <FontAwesomeIcon icon={faPlus} />
          Criar usuário
        </button>
      </div>

      <div className="mt-8 user-animate">
        <ul className="space-y-2">
          {usersList &&
            usersList.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-2 rounded-lg border"
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #dcdcdc",
                }}
              >
                <div className="flex items-center space-x-2">
                  {user.instagramProfilePictureUrl && (
                    <img
                      src={user.instagramProfilePictureUrl}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span>
                    {user.username}
                    {user.instagramUsername && (
                      <>
                        {" "}
                        <strong>@{user.instagramUsername}</strong>
                      </>
                    )}
                  </span>
                </div>
                {user.role !== "admin" && (
                  <button
                    onClick={() => deleteUser(user.id, user.role)}
                    className="text-red-600 hover:underline hover:cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
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
