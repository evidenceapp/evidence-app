"use client";

import { useEffect, useState } from "react";
import { IPost, IUserPostsProps } from "@/interfaces";
import { extractVideoId } from "@/utils";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { faCheck, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserPosts = ({ userId }: IUserPostsProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/admin/posts?userId=${userId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };
    fetchPosts();
  }, [userId]);

  const createPost = async () => {
    if (!editingContent.trim()) return;

    await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editingContent, userId }),
    });

    setEditingContent("");
    location.reload();
  };

  const deletePost = async (id: string) => {
    await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
    location.reload();
  };

  const startEditing = (post: IPost) => {
    setEditingPostId(post.id);
    setEditingContent(post.content);
  };

  const saveEdit = async () => {
    if (!editingPostId || !editingContent.trim()) return;

    await fetch("/api/admin/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingPostId, content: editingContent }),
    });

    setEditingPostId(null);
    setEditingContent("");
    location.reload();
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border border-gray-200">
      <div className="space-y-3 mb-6 w-full">
        <CKEditor
          editor={ClassicEditor}
          data={editingContent}
          onChange={(event, editor) => setEditingContent(editor.getData())}
        />
        <button
          onClick={createPost}
          className="flex items-center justify-center gap-2 bg-[#D1B046] hover:bg-yellow-500 text-[#4a4a4a] font-semibold px-4 py-2 rounded-full shadow transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-fit mx-auto mt-3"
        >
          <FontAwesomeIcon icon={faPlus} />
          Criar Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-xl border border-gray-200 bg-[#fdfdfd] shadow flex flex-col justify-between"
          >
            {editingPostId === post.id ? (
              <>
                <CKEditor
                  editor={ClassicEditor}
                  data={editingContent}
                  onChange={(event, editor) => setEditingContent(editor.getData())}
                />
                <button
                  onClick={saveEdit}
                  className="w-full mt-3 py-2 rounded-lg font-semibold shadow transition-transform transform hover:scale-105 bg-[#D1B046] text-[#4a4a4a]"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Salvar Alterações
                </button>
              </>
            ) : (
              <>
                <div
                  className="prose max-w-none text-sm overflow-y-auto"
                  style={{ maxHeight: "300px" }}
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(
                      /<oembed url="(.*?)"><\/oembed>/g,
                      (_, url) =>
                        `<iframe style="width: 100%; aspect-ratio: 16/9; border-radius: 0.5rem;" src="https://www.youtube.com/embed/${extractVideoId(
                          url
                        )}" frameborder="0" allowfullscreen></iframe>`
                    ),
                  }}
                />
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => startEditing(post)}
                    className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110 hover:cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110 hover:cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
