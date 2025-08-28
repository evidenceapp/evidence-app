import { useState } from "react";

import { INavLink } from "@/interfaces";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("agendamento");

  const navLinks: INavLink[] = [
    { name: "Agendamento", href: "agendamento" },
    { name: "Home", href: "home" },
    { name: "Sobre", href: "sobre" },
    { name: "Ciência", href: "ciencia" },
    { name: "Galeria", href: "galeria" },
    { name: "Equipe", href: "equipe" },
    { name: "Feedback", href: "feedback" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -50;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <header
      className="fixed top-0 left-0 w-full shadow-md transition-all duration-300 p-4 z-50"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="container w-[70%] mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold tracking-wide" style={{ color: "#D1B046" }}>
            Evidence
          </a>
        </div>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link: INavLink) => (
            <a
              key={link.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScroll(link.href);
                setActiveLink(link.href);
              }}
              className="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              style={{
                color: activeLink === link.href ? "#D1B046" : "#4a4a4a",
              }}
            >
              {link.name}
              <span
                className="absolute left-0 bottom-0 h-0.5 rounded-full transition-all duration-300"
                style={{
                  width: activeLink === link.href ? "100%" : "0%",
                  backgroundColor: "#D1B046",
                }}
              ></span>
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md"
            style={{
              color: "#4a4a4a",
              outlineColor: "#D1B046",
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 rounded-md shadow-inner">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link: INavLink) => (
              <a
                key={link.name}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(link.href);
                  setActiveLink(link.href);
                  setIsOpen(false);
                }}
                className="relative block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                style={{
                  color: activeLink === link.href ? "#D1B046" : "#4a4a4a",
                }}
              >
                {link.name}
                <span
                  className="absolute left-0 bottom-0 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeLink === link.href ? "100%" : "0%",
                    backgroundColor: "#D1B046",
                  }}
                ></span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
