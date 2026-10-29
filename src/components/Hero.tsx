import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const shouldReduceMotion = useReducedMotion();
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.2, 0]);

  return (
    <div id="home" ref={ref} className="relative w-full max-w-[900px] mx-auto flex flex-col-reverse xl:flex-row justify-center xl:justify-end items-center min-h-[85vh] xl:min-h-[75vh] mt-24 xl:mt-0 xl:pt-0 gap-12 xl:gap-0 pb-20">

      {/* Right Content */}
      <motion.div
        style={{ opacity }}
        className="z-20 w-full xl:w-[385px] flex flex-col gap-6 px-4 xl:px-0 text-center xl:text-right mt-8 xl:mt-0"
      >
        <p className="text-emerald-50/70 text-sm tracking-wider font-medium uppercase">
          Applied Mathematics & Data Science
        </p>
        <h1 className="text-[24px] md:text-[30px] xl:text-[34px] leading-[1.25] font-semibold text-white tracking-tight">
          Statistical modeling, machine learning, and computational analysis for healthcare and scientific research.
        </h1>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          className="flex items-center justify-center xl:justify-end gap-2 text-white font-bold text-base group w-fit mx-auto xl:ml-auto xl:mr-0 mt-4 hover:text-emerald-400 transition-colors"
        >
          View Research & Projects
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </a>
      </motion.div>
      {/* Portrait Image */}
      <motion.div
        style={{ y: imageY, opacity }}
        className="absolute z-0 w-[100vw] -top-[128px] bottom-0 left-1/2 xl:left-[37%] -translate-x-1/2 flex items-end justify-center pointer-events-none"
      >
        <div
          className="w-full h-full relative flex items-end justify-center"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)"
          }}
        >
          {/* Gradient overlays for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]/80 z-10 w-full"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-transparent z-10 h-[30%]"></div>

          <img
            src="/portrait.jpg"
            alt="Mohamed Gebril"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-top opacity-80 mix-blend-lighten pointer-events-auto"
          />
        </div>
      </motion.div>

    </div>
  );
}
