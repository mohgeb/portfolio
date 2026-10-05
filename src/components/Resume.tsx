import { Download, FileText } from "lucide-react";

export function Resume() {
  return (
    <section id="resume" className="w-full max-w-[900px] mx-auto z-10 py-24 px-4 xl:px-0 border-t border-white/5">
      <div className="bg-[#0a0a0a] rounded-[2rem] p-10 md:p-16 border border-white/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Resume</h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            Mathematics and Computer Science background with experience in machine learning, quantitative analysis, computational projects, and scientific problem solving.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-full hover:bg-emerald-500 transition-colors">
              <FileText className="w-4 h-4" /> View Resume
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 text-sm font-semibold rounded-full hover:bg-white/10 transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </a>
          </div>
        </div>
        
        <div className="hidden md:flex w-[200px] h-[280px] bg-white/5 border border-white/10 rounded-xl items-center justify-center relative overflow-hidden shadow-2xl">
          {/* Abstract representation of a resume document */}
          <div className="absolute inset-0 p-6 flex flex-col gap-3 opacity-30">
            <div className="w-1/2 h-2 bg-white rounded-full mb-2"></div>
            <div className="w-full h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-3/4 h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-full h-1.5 bg-white/50 rounded-full mb-4"></div>
            
            <div className="w-1/3 h-2 bg-white rounded-full mb-2"></div>
            <div className="w-full h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-5/6 h-1.5 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
