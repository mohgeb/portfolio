import { useState, useEffect } from "react";

export function SidebarLeft() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id], div[id='home']");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const links = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Research", href: "#research", id: "research" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Computational Stack", href: "#computational-stack", id: "computational-stack" },
    { label: "Resume", href: "#resume", id: "resume" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav className="flex flex-col gap-6 text-sm">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          className={`text-right transition-colors tracking-wide ${
            activeSection === link.id ? "text-white font-medium" : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
