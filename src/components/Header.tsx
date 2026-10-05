import { ArrowUpRight } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 md:py-8 flex items-center justify-between text-white pointer-events-none bg-gradient-to-b from-[#020202]/80 to-transparent backdrop-blur-[2px]">
      <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-wide pointer-events-auto hover:text-emerald-400 transition-colors">
        Gebril M.
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
      </a>
      <a 
        href="https://www.linkedin.com/in/mohamed-gebril-364ab72a8/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm font-medium hover:text-emerald-400 transition-colors pointer-events-auto"
      >
        LinkedIn <ArrowUpRight className="w-4 h-4" />
      </a>
    </header>
  );
}
