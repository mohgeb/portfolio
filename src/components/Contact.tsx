import { Mail, Linkedin, Github, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import React, { useState, FormEvent } from "react";

export function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = {
      name: formData.get('Name'),
      email: formData.get('Email'),
      organization: formData.get('Organization'),
      opportunity_type: formData.get('Opportunity_Type'),
      message: formData.get('Message'),
      _subject: `New Portfolio Message from ${formData.get('Name')}`,
      _template: 'table'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/mgebril180@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus('success');
        formElement.reset();
        setTimeout(() => setFormStatus('idle'), 6000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 6000);
      }
    } catch (err) {
      console.error('Failed to submit form:', err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="w-full max-w-[900px] mx-auto z-10 py-24 px-4 xl:px-0 border-t border-white/5 pb-40">
      <div className="mb-16 text-center md:text-left">
        <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Let's Work on Something Meaningful</h2>
        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed mx-auto md:mx-0">
          I am interested in internships, research opportunities, and quantitative projects involving healthcare, scientific computing, data analysis, and machine learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2 flex flex-col gap-6">
          <a href="mailto:mgebril180@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <p className="text-sm text-neutral-400 break-all">mgebril180@gmail.com</p>
            </div>
          </a>
          
          <a href="https://www.linkedin.com/in/mohamed-gebril-364ab72a8/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">LinkedIn</p>
              <p className="text-sm text-neutral-400">Connect professionally</p>
            </div>
          </a>

          <a href="https://github.com/mohgeb/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">GitHub</p>
              <p className="text-sm text-neutral-400">View code repositories</p>
            </div>
          </a>
        </div>

        <div className="md:col-span-3 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-300">Name</label>
                <input type="text" id="name" name="Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Jane Doe" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-300">Email</label>
                <input type="email" id="email" name="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="jane@organization.com" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="organization" className="text-sm font-medium text-neutral-300">Organization</label>
                <input type="text" id="organization" name="Organization" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="University / Company" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="opportunity" className="text-sm font-medium text-neutral-300">Opportunity Type</label>
                <select id="opportunity" name="Opportunity_Type" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none" required>
                  <option value="" className="bg-[#141414]">Select an option...</option>
                  <option value="Healthcare Analytics" className="bg-[#141414]">Healthcare Analytics</option>
                  <option value="Research Opportunity" className="bg-[#141414]">Research Opportunity</option>
                  <option value="Data Science" className="bg-[#141414]">Data Science</option>
                  <option value="Quantitative Research" className="bg-[#141414]">Quantitative Research</option>
                  <option value="Collaboration" className="bg-[#141414]">Collaboration</option>
                  <option value="Other" className="bg-[#141414]">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="message" className="text-sm font-medium text-neutral-300">Message</label>
              <textarea id="message" name="Message" rows={4} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="How can we work together?" required></textarea>
            </div>

            <button 
              type="submit" 
              disabled={formStatus === 'submitting' || formStatus === 'success'}
              className={`w-full font-semibold rounded-xl px-4 py-3 mt-4 transition-colors flex items-center justify-center gap-2 ${
                formStatus === 'success' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : formStatus === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : formStatus === 'submitting'
                      ? 'bg-white/10 text-neutral-400 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {formStatus === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
              {formStatus === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {formStatus === 'error' && <AlertCircle className="w-5 h-5" />}
              {formStatus === 'idle' && 'Get in Touch'}
              {formStatus === 'submitting' && 'Sending...'}
              {formStatus === 'success' && 'Message Sent!'}
              {formStatus === 'error' && 'Failed to Send — Try Again'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
