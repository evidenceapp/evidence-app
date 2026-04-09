"use client";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";

import Loading from "@/app/Loading";
import { IPostSection as Post } from "@/interfaces";
import { extractVideoId } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

interface PostsResponse {
  posts: Post[];
}

const PostsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [activeAuthors, setActiveAuthors] = useState<Set<string>>(new Set());
  const [skip, setSkip] = useState(0);
  const take = 4;
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getAvatarSrc = (avatarBase64?: string | null) => avatarBase64 || "/images/default-avatar.svg";

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".posts-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      const elements = gsap.utils.toArray(".post-animate");
      elements.forEach((el: unknown, idx) => {
        gsap.fromTo(
          el as Element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [posts]);

  const loadPosts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/public/posts?skip=${skip}&take=${take}`);
      const data: PostsResponse = await res.json();

      if (data.posts.length < take || data.posts.length === 0) {
        setHasMore(false);
      }

      setPosts((prev) => [...prev, ...data.posts]);

      const uniqueAuthors: Set<string> = new Set(
        data.posts.map((p: Post) => p.author.instagramUsername)
      );

      setAuthors((prev: string[]) => Array.from(new Set([...prev, ...uniqueAuthors])));

      if (skip === 0) {
        setActiveAuthors(new Set([...uniqueAuthors]));
      }

      setSkip((prev) => prev + take);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, skip, take, hasMore]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScroll = () => {
      const bottom = grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 100;
      if (bottom && hasMore && !isLoading) {
        loadPosts();
      }
    };

    grid.addEventListener("scroll", handleScroll);
    return () => grid.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, loadPosts]);

  useEffect(() => {
    if (posts.length === 0 && !isLoading) {
      loadPosts();
    }
  }, [loadPosts, posts.length, isLoading]);
  const toggleAuthor = (username: string) => {
    setActiveAuthors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(username)) {
        newSet.delete(username);
      } else {
        newSet.add(username);
      }
      return newSet;
    });
  };

  const filteredPosts = posts.filter((post) => activeAuthors.has(post.author.instagramUsername));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("post");

    if (postId && !selectedPost) {
      const fetchPostById = async () => {
        try {
          const res = await fetch(`/api/public/posts/${postId}`);
          const data = await res.json();
          if (data.post) {
            setSelectedPost(data.post);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchPostById();
    }
  }, [selectedPost]);

  if (posts.length === 0) return null;

  return (
    <>
      <section
        id="ciencia"
        ref={sectionRef}
        className="relative py-24 md:py-32 px-6 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
            top: "-150px",
            right: "-150px",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-100px",
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="posts-header text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="w-12 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
              />
              <span
                className="text-xs tracking-[0.3em] uppercase font-light"
                style={{ color: "#D1B046" }}
              >
                Conteúdo
              </span>
              <div
                className="w-12 h-[1px]"
                style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
              />
            </div>

            <h2
              className="text-4xl md:text-5xl font-extralight mb-4"
              style={{ color: "#F5F5F5" }}
            >
              Novidades em{" "}
              <span style={{ color: "#D1B046", fontWeight: 300 }}>Ciência e Saúde</span>
            </h2>

            <p
              className="text-base md:text-lg font-light max-w-xl mx-auto"
              style={{ color: "rgba(245, 245, 245, 0.6)" }}
            >
              Acompanhe os conteúdos, descobertas e práticas que transformam a saúde e a ciência.
            </p>
          </div>

          {/* Author filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {authors.map((username) => {
              const authorPost = posts.find((p) => p.author.instagramUsername === username);
              if (!authorPost) return null;
              return (
                <div
                  key={username}
                  className="relative cursor-pointer"
                  onClick={() => toggleAuthor(username)}
                >
                  <div
                    className="relative w-14 h-14 rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      border: activeAuthors.has(username)
                        ? "2px solid #D1B046"
                        : "2px solid rgba(209, 176, 70, 0.2)",
                      opacity: activeAuthors.has(username) ? 1 : 0.4,
                    }}
                  >
                    <Image
                      src={getAvatarSrc(authorPost.author.instagramProfilePictureUrl)}
                      alt={username}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Posts grid */}
          <div
            ref={gridRef}
            className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 pr-2 relative max-h-[900px] overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(209, 176, 70, 0.3) transparent",
            }}
          >
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="post-animate p-6 w-full max-w-md max-h-[520px] overflow-hidden flex flex-col cursor-pointer mx-auto transition-all duration-300"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(209, 176, 70, 0.15)",
                  borderRadius: "2px",
                }}
                onClick={() => {
                  setSelectedPost(post);
                  const params = new URLSearchParams(window.location.search);
                  params.set("post", post.id);
                  window.history.pushState({}, "", `${window.location.pathname}?${params}`);
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(209, 176, 70, 0.4)",
                    scale: 1.02,
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: "rgba(209, 176, 70, 0.15)",
                    scale: 1,
                    duration: 0.3,
                  });
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="relative w-10 h-10 rounded-full overflow-hidden"
                    style={{ border: "2px solid rgba(209, 176, 70, 0.4)" }}
                  >
                    <Image
                      src={getAvatarSrc(post.author.instagramProfilePictureUrl)}
                      alt={post.author.instagramUsername}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#F5F5F5" }}
                    >
                      @{post.author.instagramUsername}
                    </span>
                    <div
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "rgba(245, 245, 245, 0.5)" }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div
                  className="prose prose-invert max-w-none text-sm overflow-y-auto pr-1 flex-1"
                  style={{
                    maxHeight: "280px",
                    color: "rgba(245, 245, 245, 0.8)",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(
                      /<a[^>]+href=["']?(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})).*?<\/a>/g,
                      (_, url, videoId) => `
        <iframe
          style="width: 100%; aspect-ratio: 16/9; border-radius: 0.5rem;"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allowfullscreen
        ></iframe>
      `
                    ),
                  }}
                />
              </div>
            ))}

            {isLoading && (
              <div className="col-span-full flex justify-center py-4">
                <Loading />
              </div>
            )}

            {hasMore && (
              <div
                className="pointer-events-none absolute bottom-0 left-0 w-full h-16"
                style={{
                  background: "linear-gradient(to top, #1E2832, transparent)",
                }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{
            background: "rgba(10, 20, 30, 0.95)",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => {
            setSelectedPost(null);
            const params = new URLSearchParams(window.location.search);
            params.delete("post");
            window.history.pushState({}, "", `${window.location.pathname}?${params}`);
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center transition-all duration-300"
            style={{
              border: "1px solid rgba(209, 176, 70, 0.3)",
              color: "#D1B046",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(209, 176, 70, 0.8)",
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: "rgba(209, 176, 70, 0.3)",
                duration: 0.3,
              });
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            style={{
              background: "linear-gradient(145deg, rgba(45, 58, 74, 0.95) 0%, rgba(30, 40, 50, 0.95) 100%)",
              border: "1px solid rgba(209, 176, 70, 0.2)",
              borderRadius: "2px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="relative w-14 h-14 rounded-full overflow-hidden"
                style={{ border: "2px solid rgba(209, 176, 70, 0.4)" }}
              >
                <Image
                  src={getAvatarSrc(selectedPost.author.instagramProfilePictureUrl)}
                  alt={selectedPost.author.instagramUsername}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <span
                  className="text-base font-medium"
                  style={{ color: "#F5F5F5" }}
                >
                  @{selectedPost.author.instagramUsername}
                </span>
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "rgba(245, 245, 245, 0.5)" }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{new Date(selectedPost.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const shareUrl = `${window.location.origin}${window.location.pathname}?post=${selectedPost.id}`;
                navigator.clipboard.writeText(shareUrl);
                toast.success("Link do post copiado com sucesso!");
              }}
              className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase px-4 py-2 mb-6 transition-all duration-300"
              style={{
                border: "1px solid rgba(209, 176, 70, 0.4)",
                color: "#D1B046",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  backgroundColor: "#D1B046",
                  color: "#1E2832",
                  duration: 0.3,
                });
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Compartilhar
            </button>

            <div
              className="prose prose-invert max-w-none text-sm"
              style={{ color: "rgba(245, 245, 245, 0.8)" }}
              dangerouslySetInnerHTML={{
                __html: selectedPost.content
                  .replace(/<oembed url=["']?(.*?)["']?><\/oembed>/g, (_, url) => {
                    const videoId = extractVideoId(url);
                    if (!videoId) return `<a href="${url}" target="_blank">${url}</a>`;
                    return `
          <iframe
            style="width: 100%; aspect-ratio: 16/9; border-radius: 0.5rem;"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allowfullscreen
          ></iframe>`;
                  })
                  .replace(
                    /<a[^>]+href=["']?(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})).*?<\/a>/g,
                    (_, url, videoId) => `
        <iframe
          style="width: 100%; aspect-ratio: 16/9; border-radius: 0.5rem;"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allowfullscreen
        ></iframe>
      `
                  ),
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostsSection;
