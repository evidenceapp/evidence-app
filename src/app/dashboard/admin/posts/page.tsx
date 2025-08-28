"use client";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

const UserPosts = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
  loading: () => <p>Carregando editor...</p>,
});
import Loading from "@/app/Loading";
import { IUser as User } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";

export default function PostsPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();
      if (data.currentUser) setCurrentUser(data.currentUser);
    };
    fetchUser();
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] text-[#4a4a4a]">
        <Loading />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 sm:p-8 bg-[#f9f9f9] text-[#4a4a4a]">
      <div className="w-full max-w-3xl text-center mb-8 space-y-2 px-4">
        <FontAwesomeIcon icon={faPenFancy} className="text-4xl text-[#D1B046] animate-bounce" />
        <h1 className="text-2xl sm:text-3xl font-bold">
          Olá <span className="text-[#D1B046]">{currentUser.username}</span>,
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          Que tal compartilhar suas ideias incríveis hoje?
        </p>
      </div>

      <div className="w-full px-4">
        <UserPosts userId={currentUser.id} />
      </div>
    </main>
  );
}
