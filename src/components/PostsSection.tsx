"use client";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import Loading from '@/app/Loading';
import { IPostSection as Post } from '@/interfaces';
import { extractVideoId } from '@/utils';
import { faClock, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".post-animate");
      elements.forEach((el: any, idx) => {
        gsap.fromTo(
          el,
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

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScroll = () => {
      if (
        grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        loadPosts();
      }
    };

    grid.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => grid.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading]);

  const loadPosts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await fetch(`/api/public/posts?skip=${skip}&take=${take}`);
    const data = await res.json();

    if (data.posts.length < take || data.posts.length === 0) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...data.posts]);

    const uniqueAuthors = new Set(
      data.posts.map((p: Post) => p.author.instagramUsername)
    );
    setAuthors((prev) => Array.from(new Set([...prev, ...uniqueAuthors])));

    if (skip === 0) {
      setActiveAuthors(new Set([...uniqueAuthors]));
    }

    setSkip((prev) => prev + take);
    setIsLoading(false);
  };

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

  const filteredPosts = posts.filter((post) =>
    activeAuthors.has(post.author.instagramUsername)
  );

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
        className="py-16 px-6 bg-[#f9f9f9] text-[#2b2b2b] relative overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Novidades em Ciência e Saúde
        </h2>
        <p className="text-base md:text-lg text-center mb-8 max-w-xl mx-auto">
          Acompanhe os conteúdos, descobertas e práticas que transformam a saúde
          e a ciência.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {authors.map((username) => {
            const authorPost = posts.find(
              (p) => p.author.instagramUsername === username
            );
            if (!authorPost) return null;
            return (
              <img
                key={username}
                src={authorPost.author.instagramProfilePictureUrl}
                alt={username}
                className={`w-12 h-12 rounded-full object-cover border cursor-pointer transition-opacity duration-300 ${
                  activeAuthors.has(username) ? "opacity-100" : "opacity-30"
                }`}
                onClick={() => toggleAuthor(username)}
              />
            );
          })}
        </div>

        <div
          ref={gridRef}
          className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 pr-2 relative max-h-[900px] overflow-y-auto"
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="post-animate p-5 rounded-2xl bg-white border border-gray-200 shadow hover:scale-[1.02] transition-transform duration-300 w-full max-w-md max-h-[520px] overflow-hidden flex flex-col cursor-pointer mx-auto"
              onClick={() => {
                setSelectedPost(post);
                const params = new URLSearchParams(window.location.search);
                params.set("post", post.id);
                window.history.pushState(
                  {},
                  "",
                  `${window.location.pathname}?${params}`
                );
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={post.author.instagramProfilePictureUrl}
                  alt={post.author.instagramUsername}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <span className="font-semibold">
                    @{post.author.instagramUsername}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div
                className="prose max-w-none text-sm overflow-y-auto pr-1 flex-1"
                style={{ maxHeight: "280px" }}
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
            </div>
          ))}

          {isLoading && (
            <div className="col-span-full flex justify-center py-4">
              <Loading />
            </div>
          )}

          {hasMore && (
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#f9f9f9] to-transparent" />
          )}
        </div>
      </section>

      {selectedPost && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/40 text-[#4a4a4a]"
          onClick={() => {
            setSelectedPost(null);
            const params = new URLSearchParams(window.location.search);
            params.delete("post");
            window.history.pushState(
              {},
              "",
              `${window.location.pathname}?${params}`
            );
          }}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedPost.author.instagramProfilePictureUrl}
                alt={selectedPost.author.instagramUsername}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <span className="font-semibold">
                  @{selectedPost.author.instagramUsername}
                </span>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <FontAwesomeIcon icon={faClock} />
                  <span>
                    {new Date(selectedPost.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const shareUrl = `${window.location.origin}${window.location.pathname}?post=${selectedPost.id}`;
                navigator.clipboard.writeText(shareUrl);
                toast.success("Link do post copiado com sucesso!");
              }}
              className="flex items-center gap-2 text-sm bg-[#D1B046] hover:bg-yellow-500 text-[#4a4a4a] font-semibold px-3 py-1 rounded shadow transition-transform hover:scale-105 active:scale-95 mb-4 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faShareAlt} />
            </button>

            <div
              className="prose prose-neutral max-w-none text-sm text-[#4a4a4a]"
              dangerouslySetInnerHTML={{
                __html: selectedPost.content.replace(
                  /<oembed url="(.*?)"><\/oembed>/g,
                  (_, url) =>
                    `<iframe style="width: 100%; aspect-ratio: 16/9; border-radius: 0.5rem;" src="https://www.youtube.com/embed/${extractVideoId(
                      url
                    )}" frameborder="0" allowfullscreen></iframe>`
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
