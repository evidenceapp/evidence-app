"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { IPost, IUserPostsProps } from "@/interfaces";
import TiptapEditor from "@/components/TiptapEditor";
import { extractVideoId } from "@/utils";

const UserPosts = ({ userId }: IUserPostsProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editingContent, userId }),
    });

    setEditingContent("");
    setIsLoading(false);
    location.reload();
  };

  const deletePost = async (id: string) => {
    setIsLoading(true);
    await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
    setIsLoading(false);
    location.reload();
  };

  const startEditing = (post: IPost) => {
    setEditingPostId(post.id);
    setEditingContent(post.content);
  };

  const saveEdit = async () => {
    if (!editingPostId || !editingContent.trim()) return;
    setIsLoading(true);

    await fetch("/api/admin/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingPostId, content: editingContent }),
    });

    setEditingPostId(null);
    setEditingContent("");
    setIsLoading(false);
    location.reload();
  };

  return (
    <div
      className="w-full p-8"
      style={{
        background: "linear-gradient(145deg, rgba(45, 58, 74, 0.6) 0%, rgba(30, 40, 50, 0.8) 100%)",
        border: "1px solid rgba(209, 176, 70, 0.15)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Editor Section */}
      <div className="mb-8">
        <h2
          className="text-sm tracking-[0.15em] uppercase font-light mb-4"
          style={{ color: "rgba(245, 245, 245, 0.7)" }}
        >
          Novo Post
        </h2>

        <div
          className="mb-4 rounded-sm overflow-hidden"
          style={{ border: "1px solid rgba(209, 176, 70, 0.2)" }}
        >
          <TiptapEditor value={editingContent} onChange={setEditingContent} />
        </div>

        <button
          onClick={createPost}
          disabled={isLoading}
          className="px-8 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 mx-auto disabled:opacity-50"
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
              Publicando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
              </svg>
              Criar Post
            </>
          )}
        </button>
      </div>

      {/* Divider */}
      {posts.length > 0 && (
        <div
          className="mb-8 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(209, 176, 70, 0.3), transparent)" }}
        />
      )}

      {/* Posts List */}
      {posts.length > 0 && (
        <>
          <h2
            className="text-sm tracking-[0.15em] uppercase font-light mb-6"
            style={{ color: "rgba(245, 245, 245, 0.7)" }}
          >
            Seus Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 transition-all duration-300"
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
                {editingPostId === post.id ? (
                  <>
                    <div
                      className="mb-4 rounded-sm overflow-hidden"
                      style={{ border: "1px solid rgba(209, 176, 70, 0.2)" }}
                    >
                      <TiptapEditor value={editingContent} onChange={setEditingContent} />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={saveEdit}
                        disabled={isLoading}
                        className="flex-1 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                        </svg>
                        Salvar
                      </button>
                      <button
                        onClick={() => {
                          setEditingPostId(null);
                          setEditingContent("");
                        }}
                        className="px-4 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300"
                        style={{
                          border: "1px solid rgba(245, 245, 245, 0.2)",
                          color: "rgba(245, 245, 245, 0.6)",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            borderColor: "rgba(245, 245, 245, 0.4)",
                            color: "#F5F5F5",
                            duration: 0.3,
                          });
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            borderColor: "rgba(245, 245, 245, 0.2)",
                            color: "rgba(245, 245, 245, 0.6)",
                            duration: 0.3,
                          });
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="prose prose-invert max-w-none text-sm overflow-y-auto mb-4"
                      style={{
                        maxHeight: "250px",
                        color: "rgba(245, 245, 245, 0.8)",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: post.content.replace(
                          /<oembed url="(.*?)"><\/oembed>/g,
                          (_, url) =>
                            `<iframe style="width: 100%; aspect-ratio: 16/9; border-radius: 0.25rem;" src="https://www.youtube.com/embed/${extractVideoId(
                              url
                            )}" frameborder="0" allowfullscreen></iframe>`
                        ),
                      }}
                    />

                    <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(209, 176, 70, 0.1)" }}>
                      <p
                        className="text-xs font-light"
                        style={{ color: "rgba(245, 245, 245, 0.4)" }}
                      >
                        {new Date(post.createdAt).toLocaleString()}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(post)}
                          className="w-8 h-8 flex items-center justify-center transition-all duration-300"
                          style={{ color: "rgba(209, 176, 70, 0.6)" }}
                          onMouseEnter={(e) => {
                            gsap.to(e.currentTarget, { color: "#D1B046", duration: 0.3 });
                          }}
                          onMouseLeave={(e) => {
                            gsap.to(e.currentTarget, { color: "rgba(209, 176, 70, 0.6)", duration: 0.3 });
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
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
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "rgba(209, 176, 70, 0.3)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p
            className="text-sm font-light"
            style={{ color: "rgba(245, 245, 245, 0.4)" }}
          >
            Você ainda não tem posts. Crie o primeiro acima!
          </p>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
