import { ArrowRight, Github } from "lucide-react";
import { useState } from "react";
import { CaseStudyModal } from "./CaseStudyModal";
import { RepositoryModal } from "./RepositoryModal";

export function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);

  return (
    <section id="projects" className="w-full max-w-[900px] mx-auto z-10 pt-4 pb-24 px-4">
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Selected Research Projects</h2>
        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
          Quantitative and computational projects focused on predictive modeling, statistical analysis, and real-world data.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Featured Project */}
        <article className="w-full bg-[#0a0a0a] rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-emerald-400/90 text-sm font-medium tracking-wide uppercase mb-2">Healthcare / Applied Machine Learning</p>
                <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                  A Feedforward Neural Network Approach to Fine-Needle Aspirate (FNA) Classification via Non-Linear Feature Mapping
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Python', 'PyTorch', 'Machine Learning', 'Statistical Analysis', 'Data Preprocessing'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-neutral-300">
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-neutral-400 text-base leading-relaxed">
              <p>
                <strong className="text-neutral-200">Problem Context:</strong> The Wisconsin Diagnostic Breast Cancer dataset contains 569 samples and 30 physiological features. The objective was to evaluate whether increased model complexity is justified for this specific classification task.
              </p>
              <p>
                <strong className="text-neutral-200">Methodology:</strong> The data was rigorously separated into training, validation, and independent testing sets. Crucially, feature scaling was performed using training data parameters only to prevent data leakage. A feedforward neural network was compared against a linear baseline classifier.
              </p>
              <p>
                <strong className="text-neutral-200">Results:</strong> The neural network achieved approximately 95.4% test accuracy, while the linear baseline achieved approximately 94.2% test accuracy.
              </p>
              <p>
                <strong className="text-neutral-200">Interpretation:</strong> The marginal performance difference is a significant finding. It suggests that the dataset is sufficiently linearly separable, meaning that additional nonlinear complexity provides limited predictive benefit. This emphasizes the analytical principle that increased model complexity should be justified by measurable performance gains.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsRepoModalOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
              >
                View Repository <Github className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Read Full Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* In Progress Project 1 */}
          <article className="w-full p-8 md:p-10 rounded-[2rem] border border-white/5 border-dashed bg-white/[0.01] flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-neutral-400 mb-4 uppercase tracking-wider font-semibold">Research in Progress</div>
            <h3 className="text-lg font-semibold text-neutral-300 mb-3 leading-tight">Comparative Proteomics Analysis of Naegleria Fowleri</h3>
            <p className="text-neutral-500 max-w-sm text-sm leading-relaxed mb-6">Identifying candidate metabolic pathways underlying pathogenicity.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-auto">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-400">Computational Biology</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-400">Proteomics</span>
            </div>
          </article>

          {/* In Progress Project 2 */}
          <article className="w-full p-8 md:p-10 rounded-[2rem] border border-white/5 border-dashed bg-white/[0.01] flex flex-col items-center justify-center text-center min-h-[300px]">
            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-neutral-400 mb-4 uppercase tracking-wider font-semibold">Research in Progress</div>
            <h3 className="text-lg font-semibold text-neutral-300 mb-3 leading-tight">Neural Responses to Semantic Complexity: Investigating Neural Correlates of Cognitive Reserve</h3>
            <p className="text-neutral-500 max-w-sm text-sm leading-relaxed mb-6">A structural neuroimaging analysis project currently in early planning and formulation phases.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-auto">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-400">Healthcare Analytics</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-400">Neuroimaging</span>
            </div>
          </article>
        </div>
      </div>

      <CaseStudyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <RepositoryModal isOpen={isRepoModalOpen} onClose={() => setIsRepoModalOpen(false)} />
    </section>
  );
}
