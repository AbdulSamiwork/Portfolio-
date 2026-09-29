import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import { FormInput, FormTextarea, FormSelect } from '../../components/common/FormControls';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function Contact() {
  const { portfolioData, sendMessage, isLoading } = usePortfolio();
  const hero = portfolioData?.hero || {};

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web Development',
    message: '',
  });

  if (isLoading) {
    return (
      <section id="contact" className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 relative">
        <SectionSkeleton type="contact" />
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sendMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.projectType,
      message: formData.message,
    });

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web Development',
        message: '',
      });
    }, 4000);
  };

  const projectOptions = [
    { value: 'Full-Stack Web Development', label: 'Full-Stack Web Development (MERN / Core PHP)' },
    { value: 'AI / Machine Learning Engineering', label: 'AI / Machine Learning Engineering' },
    { value: 'Deep Neural Network Architecture', label: 'Deep Neural Network Architecture' },
    { value: 'Decoupled REST API Architecture', label: 'Decoupled REST API Architecture' },
    { value: 'Engineering Contract / Remote Role', label: 'Engineering Contract / Remote Role' },
  ];

  return (
    <section id="contact" className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={<Sparkles size={13} className="text-[var(--accent-primary)]" />}
          badgeText="Collaboration &amp; Inquiries"
          title="Let's Build Something"
          titleHighlight="Intelligent Together"
          description="Whether you need a full-stack web platform or predictive AI models embedded into your application—let's talk."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Direct Contact Info */}
          <div className="reveal-left delay-100 lg:col-span-5 w-full">
            <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-5 sm:gap-6 shadow-2xl transition-all duration-300 hover:border-white/20">
              <h3 className="text-lg sm:text-2xl font-bold font-heading text-white">
                Contact Information
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                I am open to worldwide remote roles, freelance web engineering contracts, and machine learning project collaborations. Feel free to reach out directly!
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${hero.email || 'sb850839@gmail.com'}`}
                  className="flex items-center gap-3.5 text-slate-200 hover:text-[var(--accent-primary)] transition-all duration-200 hover:scale-[1.01] hover:bg-white/5 p-3 rounded-2xl group border border-white/5 hover:border-white/15"
                >
                  <div className="p-2.5 bg-[var(--accent-subtle)] text-[var(--accent-primary)] rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 border border-[var(--accent-border)]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-code">Direct Email</div>
                    <strong className="text-xs sm:text-sm font-semibold group-hover:text-white transition-colors">
                      {hero.email || 'sb850839@gmail.com'}
                    </strong>
                  </div>
                </a>

                <a
                  href={`tel:${hero.phone || '+92-3228483029'}`}
                  className="flex items-center gap-3.5 text-slate-200 hover:text-emerald-400 transition-all duration-200 hover:scale-[1.01] hover:bg-white/5 p-3 rounded-2xl group border border-white/5 hover:border-white/15"
                >
                  <div className="p-2.5 bg-emerald-400/10 text-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 border border-emerald-400/30">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-code">Phone / WhatsApp</div>
                    <strong className="text-xs sm:text-sm font-semibold group-hover:text-white transition-colors">
                      {hero.phone || '+92-3228483029'}
                    </strong>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 text-slate-200 p-3 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="p-2.5 bg-purple-400/10 text-purple-400 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-400/30">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-400 font-code">Location</div>
                    <strong className="text-xs sm:text-sm font-semibold">
                      {hero.location || 'Pakistan (Available Worldwide Remote)'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Social Strips */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href={hero.githubUrl || 'https://github.com/Abdul-Sami1122'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href={hero.linkedinUrl || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:border-white/30 hover:text-[#0077b5] hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form Card */}
          <div className="reveal-right delay-200 lg:col-span-7 w-full">
            <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-2xl transition-all duration-300 hover:border-white/20">
              <h3 className="text-lg sm:text-2xl font-bold font-heading text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out this form and your message will be dispatched directly to my inbox and recorded in my dashboard.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fade-in my-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white mb-1">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Thank you for reaching out, {formData.name || 'friend'}. I typically reply within 12–24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="YOUR NAME"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                    />

                    <FormInput
                      label="YOUR EMAIL"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@organization.com"
                    />
                  </div>

                  <FormSelect
                    label="NATURE OF INQUIRY"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    options={projectOptions}
                  />

                  <FormTextarea
                    label="YOUR MESSAGE"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your application goals or engineering inquiry..."
                  />

                  <button
                    type="submit"
                    className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer mt-1 btn-shimmer"
                  >
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
