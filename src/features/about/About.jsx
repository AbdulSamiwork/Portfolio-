import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Layers, Brain, Cloud, ChevronDown, ChevronUp, Sparkles, Award } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import GlassCard from '../../components/common/GlassCard';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function About() {
  const { portfolioData, isLoading } = usePortfolio();
  const about = portfolioData?.about || {};
  const hero = portfolioData?.hero || {};

  const [isBioExpanded, setIsBioExpanded] = useState(false);

  if (isLoading) {
    return (
      <section id="about" className="py-12 sm:py-16 lg:py-24 relative">
        <SectionSkeleton type="cards" cardCount={3} />
      </section>
    );
  }

  const highlights = [
    {
      icon: <Layers size={22} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />,
      title: 'Full-Stack Web Mastery',
      description: 'Architecting robust applications using MERN Stack and Core PHP & MySQL with decoupled API architectures.',
      badge: 'MERN & Core PHP',
      glowVariant: 'emerald',
      badgeBorder: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      iconBoxBorder: 'group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10',
    },
    {
      icon: <Brain size={22} className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />,
      title: 'Applied AI & Deep Learning',
      description: 'Deriving custom loss functions and training sequential Deep Neural Networks with Python and Scikit-Learn.',
      badge: '92% Model Accuracy',
      glowVariant: 'purple',
      badgeBorder: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      iconBoxBorder: 'group-hover:border-purple-500/40 group-hover:bg-purple-500/10',
    },
    {
      icon: <Cloud size={22} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
      title: 'Cloud & Production Ready',
      description: 'Configuring automated deployment pipelines across Vercel, Render, Heroku, and Azure AI cloud environments.',
      badge: 'Azure AI Certified',
      glowVariant: 'cyan',
      badgeBorder: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
      iconBoxBorder: 'group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={<Sparkles size={13} className="text-[var(--accent-primary)]" />}
          badgeText="Profile &amp; Engineering Philosophy"
          title={about.sectionTitle || 'Architecting Modern Web & Scalable Intelligence'}
          description={about.sectionSubtitle}
        />

        {/* Narrative Box with Luxury Glass Panel */}
        <div className="reveal-scale delay-100 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-9 lg:p-11 mb-8 sm:mb-12 shadow-2xl transition-all duration-300 hover:border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Personal Photo Card */}
            <div className="md:col-span-4 flex flex-row md:flex-col items-center gap-3.5 sm:gap-4 md:gap-3 text-left md:text-center">
              <div className="relative w-20 h-24 sm:w-36 sm:h-44 md:w-full md:max-w-[210px] md:aspect-[4/5] flex-shrink-0 group">
                <div className="absolute -inset-1 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] to-purple-600 opacity-50 blur-sm group-hover:opacity-80 transition duration-500" />
                <img
                  src={hero.profileImage || '/images/abdul_sami_profile.webp'}
                  alt={hero.name}
                  loading="lazy"
                  decoding="async"
                  className="relative w-full h-full rounded-xl sm:rounded-2xl object-cover border border-white/20 shadow-xl transition-all duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="min-w-0 flex-1 md:flex-none">
                <h4 className="text-base sm:text-xl font-bold font-heading text-white m-0 truncate">
                  {hero.name}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--accent-primary)] font-code mt-0.5 sm:mt-1 truncate">
                  B.S. Information Technology
                </p>
                <div className="inline-flex items-center gap-1.5 mt-1.5 sm:mt-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs text-slate-300 max-w-full">
                  <Award size={12} className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">University of the Punjab</span>
                </div>
              </div>
            </div>

            {/* Bio Text with Progressive Disclosure for Mobile */}
            <div className="md:col-span-8 flex flex-col">
              <h3 className="text-lg sm:text-2xl font-bold font-heading text-white mb-2 sm:mb-4">
                {about.cardHeading}
              </h3>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-4">
                {about.paragraph1}
              </p>

              {/* Additional Paragraphs */}
              <div
                className={`space-y-3 sm:space-y-4 ${
                  isBioExpanded ? 'block' : 'hidden sm:block'
                }`}
              >
                <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                  {about.paragraph2}
                </p>
                <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                  {about.paragraph3}
                </p>
              </div>

              {/* Mobile Read More Toggle */}
              <button
                onClick={() => setIsBioExpanded(!isBioExpanded)}
                className="sm:hidden self-start inline-flex items-center gap-1 text-xs text-[var(--accent-primary)] font-semibold mt-2 py-1 hover:underline cursor-pointer"
              >
                {isBioExpanded ? (
                  <>
                    <ChevronUp size={14} /> Show Less Bio
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} /> Read Full Bio &amp; Background
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((item, index) => (
            <GlassCard
              key={index}
              glowVariant={item.glowVariant}
              hasLaserLine={true}
              className={`reveal-scale delay-${(index + 1) * 100} p-5 sm:p-7 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2.5 sm:p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 ${item.iconBoxBorder}`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold font-code border transition-colors duration-300 ${item.badgeBorder}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 group-hover:text-slate-100 transition-colors duration-300">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
