import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Shift", href: "/shift" },
  { label: "Graph", href: "/#graph" },
  { label: "Orbit", href: "/orbit" },
  { label: "Grid", href: "/#grid" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="bg-white px-2 py-1.5 rounded-lg flex items-center justify-center">
              <img
                src="/SequelStrinAI_Logo.png"
                alt="SequelString AI"
                className="h-6 w-auto"
              />
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium tracking-wide uppercase text-stone-500 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="text-xs font-medium tracking-wide uppercase bg-white text-black px-5 py-2 rounded-full hover:bg-stone-200 transition-colors duration-150"
          >
            Get Started
          </a>
        </div>
      </nav>

      <a
        href="https://agentic-ai.sequelstring.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-24 right-4 md:right-8 z-40 hidden sm:flex items-center gap-2 text-xs font-medium tracking-wide uppercase bg-white/5 text-[#22c55e] px-5 py-3 rounded-full border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(52,211,153,0.15)] transition-all duration-300 backdrop-blur-md group"
      >
        <span>The Future of Enterprise Intelligence</span>
        <svg
          className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </>
  );
}
