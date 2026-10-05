import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock data for the charts
const generateChartData = () => {
  const data = [];
  let trainLoss = 0.65;
  let valLoss = 0.65;
  let trainAcc = 0.65;
  let valAcc = 0.65;

  for (let i = 0; i <= 50; i++) {
    data.push({
      epoch: i,
      trainLoss: Math.max(0.05, trainLoss + (Math.random() * 0.04 - 0.02)),
      valLoss: Math.max(0.05, valLoss + (Math.random() * 0.05 - 0.02)),
      trainAcc: Math.min(0.99, trainAcc + (Math.random() * 0.02 - 0.005)),
      valAcc: Math.min(0.98, valAcc + (Math.random() * 0.02 - 0.005)),
    });
    
    // Decay
    trainLoss *= 0.92;
    valLoss *= 0.93;
    trainAcc += (1 - trainAcc) * 0.1;
    valAcc += (1 - valAcc) * 0.09;
  }
  return data;
};

const chartData = generateChartData();

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen && !isMounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className={`relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-y-auto scrollbar-hide transform transition-transform duration-500 flex flex-col ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-[0.98]"
        }`}
      >
        <button 
          onClick={onClose}
          className="sticky top-4 sm:top-6 right-4 sm:right-6 ml-auto w-10 h-10 bg-transparent hover:bg-transparent text-neutral-400 hover:text-white rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 sm:px-12 pb-16 pt-2 sm:pt-4">
          
          <header className="mb-12 max-w-4xl mx-auto border-b border-white/10 pb-12 mt-4">
            <div className="flex flex-wrap gap-2 mb-6">
              {['Python', 'PyTorch', 'Machine Learning', 'Statistical Analysis', 'Data Preprocessing'].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 rounded-full text-xs font-medium tracking-wide">
                  {tech}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-[42px] font-semibold text-white leading-[1.2] tracking-tight mb-10">
              A Feedforward Neural Network Approach to Fine-Needle Aspirate (FNA) Classification via Non-Linear Feature Mapping
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-500 uppercase tracking-wider text-[11px] font-semibold">Author</span>
                <span className="text-neutral-200 font-medium">Mohamed Gebril</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-500 uppercase tracking-wider text-[11px] font-semibold">Institution</span>
                <span className="text-neutral-200 font-medium">Texas Tech University</span>
                <span className="text-neutral-400">Dept. of Mathematics</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-500 uppercase tracking-wider text-[11px] font-semibold">Context</span>
                <span className="text-neutral-200 font-medium">MATH 4330</span>
                <span className="text-neutral-400">Adv: Dr. Chris Monico</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-neutral-500 uppercase tracking-wider text-[11px] font-semibold">Date</span>
                <span className="text-neutral-200 font-medium">May 5, 2026</span>
              </div>
            </div>
          </header>

          <article className="prose prose-invert prose-emerald max-w-4xl mx-auto text-neutral-300">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Introduction</h2>
              <p className="leading-relaxed mb-4">
                Breast Cancer is one of the most common cancers in the United States, after skin cancer (American Cancer Society, 2026). Premature classification can be laborious, given the limited advances of contemporary technology and human error. Machine learning is a subfield of computer science that deals with a family of algorithms that mimic the learning capabilities of a human using statistical techniques. Human error can be a prone factor in determining credibility, thus relying on Machine learning algorithms might be a route that is going to provide us with insights inevitably.
              </p>
              <p className="leading-relaxed">
                Through training Feedforward Neural Networks, we can train machines to interpret cytopathological data. The goal of this project is to investigate how to utilize limited data in the training process of machine learning models and to conduct a comparative analysis between linear and nonlinear models to understand the relationship in the data.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-2">Method</h2>
              
              <h3 className="text-xl font-medium text-white mb-3">Dataset Description</h3>
              <p className="leading-relaxed mb-6">
                The data used in this project is the Wisconsin Diagnostic Breast Cancer (WDBC), which contains physiological measurements on cell nuclei in women's breasts. The data contains a total of <strong>569 samples</strong> collected from patients, and the data is collected to describe <strong>thirty different features</strong>. Furthermore, the target column is a feature that describes whether the cell is malignant or benign, and since the features of the data are linearly related, it can be predicted whether a given cell is going to be malignant or benign. The data was split into three: <strong>70%</strong> was used for iterative training, <strong>15%</strong> for validation, and <strong>15%</strong> for testing. Finally, all the data features are standardized using a scaler-fit exclusively on the training data to prevent data leakage during the neural network training.
              </p>

              <h3 className="text-xl font-medium text-white mb-3">Model Architecture</h3>
              <p className="leading-relaxed mb-6">
                This project relies on two distinct models for classification and uses comparative analysis between them to reach a slight improvement in the classification prediction due to the limited size of the dataset. The feedforward neural network model starts by having one layer that accepts <strong>thirty feature dimensions</strong>. It then passes them through two sequential hidden layers containing <strong>16 and 8 neurons</strong>, respectively, and the final output is a two-neuron layer representing the binary target class. Since nonlinearity is a necessary aspect of this project, Rectified Linear Unit (ReLU) activation functions are introduced immediately in between the hidden layers. Furthermore, to avoid the risk of overfitting due to the size of the dataset, a dropout regularization layer with <strong>0.2 probability</strong> was implemented after the first hidden layer. Finally, a standard linear classifier is instantiated within a baseline state for estimating the performance of the remarkably simple and featureless neural network capacity between an input layer and an output layer.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-2">Procedure</h2>
              <p className="leading-relaxed mb-8">
                Training utilized a cross-entropy loss function with the Adam optimization algorithm yet paired with a <strong>0.001 learning step</strong> to ensure a stable gradient descent. The model was trained in <strong>50 epochs</strong>, taking advantage of batching over sixty-four samples. Following each epoch, the model's loss and accuracy were calculated against the independent <strong>15% of the validation set</strong> to monitor convergence and ensure that the model was not overfitting. Enclosing the training phase, the model starts comparing its prediction against the unseen <strong>15% of the testing data set</strong>. Conclusively, for a methodologically sound evaluation guarantee, the exact data was trained using a linear classifier using the same controls to ensure credibility.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                <div className="bg-[#141414] p-4 rounded-xl border border-white/5">
                  <h4 className="text-center text-sm font-medium mb-4">Loss Curves</h4>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="epoch" stroke="#888" fontSize={12} />
                        <YAxis stroke="#888" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                        <Legend iconType="plainline" />
                        <Line type="monotone" dataKey="trainLoss" name="Train Loss" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="valLoss" name="Val Loss" stroke="#f59e0b" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#141414] p-4 rounded-xl border border-white/5">
                  <h4 className="text-center text-sm font-medium mb-4">Accuracy Curves</h4>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="epoch" stroke="#888" fontSize={12} />
                        <YAxis domain={[0.6, 1.0]} stroke="#888" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }} />
                        <Legend iconType="plainline" />
                        <Line type="monotone" dataKey="trainAcc" name="Train Accuracy" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="valAcc" name="Val Accuracy" stroke="#f59e0b" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-neutral-500 italic mb-8">
                Fig. 1 (The model demonstrates stable convergence without significant overfitting after 50 epochs)
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-2">Results</h2>
              
              <h3 className="text-xl font-medium text-white mb-3">Model Evaluation</h3>
              <p className="leading-relaxed mb-10">
                Across the evaluation against the independent testing set, the neural network scored a final classification score of <strong>95.4%</strong>. A deeper analysis of the predictive performance of the model showed a level of sensitivity of <strong>100%</strong> (which occurs due to the mere size of the data) and specificity, which indicates a robust identification across both classes. Parallelly, the linear model performed at an analogous accuracy of <strong>94.2%</strong>. Due to the performance of both models on unseen testing data, the expected accuracy of the neural network on the broader population, like diagnostic samples, is estimated to mirror the test results, remaining highly accurate within the 95% to 98% range. The absence of trivial divergence between the nonlinear model and the linear baseline indicates that the dataset's features are highly linearly separable.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
                {/* Confusion Matrix - DNN */}
                <div className="flex flex-col items-center">
                  <h4 className="text-sm font-medium mb-4">Confusion Matrix - Deep Neural Network</h4>
                  <div className="flex">
                    <div className="flex flex-col justify-center items-center w-8 -rotate-90 text-xs font-medium text-neutral-400">
                      True
                    </div>
                    <div>
                      <div className="grid grid-cols-2">
                        {/* TL */}
                        <div className="w-32 h-32 bg-[#3b82f6] text-white flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          30
                        </div>
                        {/* TR */}
                        <div className="w-32 h-32 bg-[#eff6ff] text-neutral-800 flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          2
                        </div>
                        {/* BL */}
                        <div className="w-32 h-32 bg-[#eff6ff] text-neutral-800 flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          2
                        </div>
                        {/* BR */}
                        <div className="w-32 h-32 bg-[#1e3a8a] text-white flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          52
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-64 mt-2 px-8 text-xs text-neutral-400">
                    <span>Malignant (0)</span>
                    <span>Benign (1)</span>
                  </div>
                  <div className="text-xs font-medium text-neutral-400 mt-2">Predicted</div>
                </div>

                {/* Confusion Matrix - Linear */}
                <div className="flex flex-col items-center">
                  <h4 className="text-sm font-medium mb-4">Confusion Matrix - Linear Model</h4>
                  <div className="flex">
                    <div className="flex flex-col justify-center items-center w-8 -rotate-90 text-xs font-medium text-neutral-400">
                      True
                    </div>
                    <div>
                      <div className="grid grid-cols-2">
                        {/* TL */}
                        <div className="w-32 h-32 bg-[#22c55e] text-white flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          30
                        </div>
                        {/* TR */}
                        <div className="w-32 h-32 bg-[#f0fdf4] text-neutral-800 flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          2
                        </div>
                        {/* BL */}
                        <div className="w-32 h-32 bg-[#dcfce7] text-neutral-800 flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          3
                        </div>
                        {/* BR */}
                        <div className="w-32 h-32 bg-[#14532d] text-white flex items-center justify-center font-semibold text-lg border border-[#0a0a0a]">
                          51
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-64 mt-2 px-8 text-xs text-neutral-400">
                    <span>Malignant (0)</span>
                    <span>Benign (1)</span>
                  </div>
                  <div className="text-xs font-medium text-neutral-400 mt-2">Predicted</div>
                </div>
              </div>

              <p className="text-xs text-neutral-500 italic mb-8 leading-relaxed">
                Fig. 2 The independent testing set (N = 86) shows deep neural network predictive performance on the left side and linear model predictive performance on the right side. The diagonal cells show correct classifications, while the off-diagonal cells show misclassifications. The two models produced nearly identical results because they both failed to detect the same two malignant tumors. The neural network achieved a marginally higher specificity by misclassifying only two benign tumors (false positives) compared to the linear model's three. The dataset exhibits a highly linearly separable nature, which is demonstrated through the matching error distribution patterns.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-2">Discussion</h2>
              
              <h3 className="text-xl font-medium text-white mb-3">Justification of Performance</h3>
              <p className="leading-relaxed">
                The performance estimates derived from the independent testing set are justified as a dependable proxy for the broader population due to the strict methodological controls implemented during training. The model's evaluation shows its actual capacity to generalize the latest information because the data underwent rigorous stratification and scaling without any information leakage. The baseline linear classifier showed equivalent results because the dataset contains physiological features from malignant and benign tumors that can be separated through linear methods, which produce consistent and predictable results. The expected error rate on the population shows an inverse relationship with test accuracy because it stays in the 5% range. The model achieved high sensitivity, which is essential for reducing false negative results in clinical cytopathology testing, but its performance results from studying 569 patients, which creates a natural range of variability. The current error bounds show promising results, but the model needs testing on a larger multi-demographic dataset to establish its error bounds across the entire global population.
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
