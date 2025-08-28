import { useEffect, useRef, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollDownHint = () => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      setShow(false);

      scrollTimeout.current = setTimeout(() => {
        const sections = document.querySelectorAll("section");

        let shouldShow = false;

        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;

        if (!isAtBottom) {
          for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            if (rect.top > window.innerHeight * 0.2) {
              shouldShow = true;
              break;
            }
          }
        }

        setShow(shouldShow);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 p-3 rounded-full 
        transition-transform duration-700 ease-out
        ${show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
      `}
    >
      {/* Fundo escuro e blur */}
      <div className="absolute inset-0 rounded-full backdrop-blur-md bg-black/40"></div>

      {/* Seta animada */}
      <FontAwesomeIcon
        icon={faChevronDown}
        className="relative text-[#D1B046] text-3xl animate-bounce-slow"
      />

      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.8s infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollDownHint;
