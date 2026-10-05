export function ComputationalStack() {
  const categories = [
    {
      title: "Mathematics & Statistics",
      items: ["Probability & Statistics", "Linear Algebra", "Numerical Analysis", "Mathematical Modeling", "Optimization", "Statistical Inference"],
      highlight: true
    },
    {
      title: "Programming",
      items: ["Python", "R", "MATLAB", "SQL", "TypeScript", "JavaScript", "Perl", "C", "Mathmatica", "Java"],
      highlight: false
    },
    {
      title: "Data",
      items: ["NumPy", "Pandas", "Data Cleaning", "Feature Engineering", "Exploratory Data Analysis", "Data Visualization"],
      highlight: false
    },
    {
      title: "Machine Learning",
      items: ["PyTorch", "Scikit-learn", "Supervised Learning", "Classification", "Regression", "Model Evaluation", "Neural Networks"],
      highlight: false
    },
    {
      title: "Engineering",
      items: ["Git", "GitHub", "REST APIs", "Next.js", "React", "Node.js", "MySQL"],
      highlight: false
    }
  ];

  return (
    <section id="computational-stack" className="w-full max-w-[900px] mx-auto z-10 py-24 px-4 xl:px-0 border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Computational Stack</h2>
        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
          Tools and methods used to transform quantitative problems into reproducible computational analyses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, i) => (
          <div 
            key={i} 
            className={`p-8 rounded-[2rem] border ${
              cat.highlight ? 'bg-emerald-950/20 border-emerald-900/40 md:col-span-2' : 'bg-[#0a0a0a] border-white/5'
            }`}
          >
            <h3 className={`text-xl font-semibold mb-6 ${cat.highlight ? 'text-emerald-400' : 'text-white'}`}>
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {cat.items.map(item => (
                <span 
                  key={item} 
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    cat.highlight 
                      ? 'bg-emerald-900/30 text-emerald-100 border border-emerald-800/50' 
                      : 'bg-white/5 text-neutral-300 border border-white/10'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
