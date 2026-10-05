/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from "./components/Header";
import { SidebarLeft } from "./components/SidebarLeft";
import { Hero } from "./components/Hero";
import { Research } from "./components/Research";
import { Projects } from "./components/Projects";
import { ComputationalStack } from "./components/ComputationalStack";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

function SectionWrapper({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0.92, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0px", "0px"] : ["0px", "25px"]);
  
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-emerald-900/50 relative">
      <Header />

      {/* Hero Background Effect */}
      <motion.div 
        style={{ y: bgY }}
        className="fixed top-0 left-0 w-full h-[120vh] pointer-events-none -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_#053f2c_0%,_#020202_60%)] opacity-90"></div>
        <div className="absolute top-[-20%] left-[0%] w-[50%] h-[60%] bg-emerald-900/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[10%] right-[0%] w-[50%] h-[50%] bg-teal-900/10 blur-[150px] rounded-full"></div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full relative flex">

        
        {/* Globally Sticky Left Nav - Desktop Only */}
        <div className="hidden xl:block w-[240px] flex-shrink-0 relative z-20">
          <div className="sticky top-48 pt-8">
            <SidebarLeft />
          </div>
        </div>

        {/* Center Content Container */}
        <div className="flex-1 w-full max-w-full xl:max-w-none relative pt-8 xl:pt-32 pb-24">
           <Hero />
           <SectionWrapper><Research /></SectionWrapper>
           <SectionWrapper><Projects /></SectionWrapper>
           <SectionWrapper><ComputationalStack /></SectionWrapper>
           <SectionWrapper><Resume /></SectionWrapper>
           <SectionWrapper><Contact /></SectionWrapper>
        </div>

      </div>
    </div>
  );
}
