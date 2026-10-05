export function Research() {
  return (
    <section id="research" className="w-full max-w-[900px] mx-auto z-10 py-24 px-4 xl:px-0 border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Research</h2>
        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
          Exploring how mathematical and computational methods can be used to investigate complex biological, clinical, and quantitative systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-6">Current Focus</h3>
          <ul className="space-y-4">
            {[
              "Healthcare analytics",
              "Computational biology",
              "Applied machine learning",
              "Statistical modeling",
              "Scientific computing"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-xl">
          <h3 className="text-xl font-semibold text-white mb-6">Research Interests</h3>
          <ul className="space-y-4">
            {[
              "Applying statistical and machine learning methods to biomedical datasets.",
              "Computational approaches to biological and clinical problems.",
              "Quantitative modeling of complex systems.",
              "Predictive modeling and uncertainty analysis.",
              "Data-driven investigation of scientific questions."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 flex-shrink-0"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 bg-emerald-950/20 rounded-[2rem] p-8 md:p-10 border border-emerald-900/30">
        <h3 className="text-xl font-semibold text-emerald-50 mb-4">Research Philosophy</h3>
        <p className="text-emerald-100/70 text-lg leading-relaxed">
          Treat projects as investigations rather than demonstrations. Define a question, establish an appropriate methodology, evaluate uncertainty and limitations, interpret the results, and identify meaningful directions for further investigation.
        </p>
      </div>
    </section>
  );
}
