import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight } from 'lucide-react';
import SectionSkeleton from '../../components/common/SectionSkeleton';
import { useTypewriter } from './hooks/useTypewriter';
import HeroMetrics from './components/HeroMetrics';
import HeroCodeTerminal from './components/HeroCodeTerminal';

export default function Hero() {
  const { portfolioData, isLoading } = usePortfolio();
  const hero = portfolioData?.hero || {};

  const titles = [
    hero.titleTag || 'Full-Stack & AI Practitioner',
    'Full-Stack Web Developer (MERN & Core PHP)',
    'Machine Learning & Deep Neural Network Specialist',
    'Scalable Web Systems & AI Architecture',
  ];
  const currentText = useTypewriter(titles);

  if (isLoading) {
    return (
      <section id="hero" className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
        <SectionSkeleton type="hero" />
      </section>
    );
  }

  return (
    <section className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Hero Pitch & Bio */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="radar-beacon w-2 h-2 rounded-full bg-emerald-400" />
              <span>Full-Stack Web Engineering + Custom Neural Networks</span>
            </div>

            {/* Profile Avatar + Main Title */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-[0_0_25px_var(--accent-glow)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                  <img
                    src={hero.profileImage || '/images/abdul_sami_profile.webp'}
                    alt={hero.name}
                    width="96"
                    height="96"
                    fetchPriority="high"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/abdul_sami_profile.webp';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#06080e] flex items-center justify-center border border-white/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white mb-1">
                  {hero.name || 'Abdul Sami'}
                </h1>
                <div className="h-7 sm:h-8 flex items-center justify-center lg:justify-start">
                  <span className="text-sm sm:text-base lg:text-lg font-code font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
                    {currentText}
                  </span>
                  <span className="typewriter-cursor">|</span>
                </div>
              </div>
            </div>

            {/* Bio Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal">
              {hero.bio ||
                'Full-Stack Developer & Machine Learning Specialist with hands-on expertise building decoupled web platforms using React, MERN, and Core PHP, alongside training custom Deep Neural Networks.'}
            </p>

            {/* Key Metrics Strip */}
            <HeroMetrics />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center">
              <a
                href="#projects"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_22px_var(--accent-glow)] hover:shadow-[0_0_34px_var(--accent-glow)] transition-all duration-300 hover:scale-[1.03] active:scale-95 btn-shimmer"
              >
                Explore Projects <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="min-h-[46px] inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold font-heading text-white bg-white/5 border border-white/15 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_20px_var(--accent-subtle)]"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right Column - Code Preview Terminal Window */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <HeroCodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
