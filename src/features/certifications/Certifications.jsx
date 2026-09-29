import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap, Award, ShieldCheck, Calendar, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import GlassCard from '../../components/common/GlassCard';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function Certifications() {
  const { portfolioData, isLoading } = usePortfolio();
  const educationList = portfolioData?.education || [];

  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <section id="education" className="py-12 sm:py-16 lg:py-24 relative">
        <SectionSkeleton type="cards" cardCount={3} />
      </section>
    );
  }

  // Show top 3 by default
  const displayedList = isExpanded ? educationList : educationList.slice(0, 3);
  const hasMore = educationList.length > 3;

  const getCardConfig = (item) => {
    if (item.category === 'ai' || item.id === 'cert-1') {
      return {
        glowVariant: 'purple',
        badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
        institutionColor: 'text-purple-400',
        iconBoxClass: 'group-hover:border-purple-500/40 group-hover:bg-purple-500/10',
        icon: <Award size={22} className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />,
      };
    }
    if (item.category === 'web' || item.id === 'cert-2') {
      return {
        glowVariant: 'cyan',
        badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        institutionColor: 'text-cyan-400',
        iconBoxClass: 'group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10',
        icon: <ShieldCheck size={22} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
      };
    }
    return {
      glowVariant: 'emerald',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      institutionColor: 'text-emerald-400',
      iconBoxClass: 'group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10',
      icon: <GraduationCap size={22} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />,
    };
  };

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={<Sparkles size={13} className="text-[var(--accent-primary)]" />}
          badgeText="Accredited Credentials &amp; Certifications"
          title="Education &amp;"
          titleHighlight="Certifications"
          description="Academic university degree credentials and industry-recognized specialized cloud &amp; AI qualifications."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedList.map((item, idx) => {
            const config = getCardConfig(item);
            const isDegree = item.type === 'degree';

            return (
              <GlassCard
                key={item.id || idx}
                glowVariant={config.glowVariant}
                hasLaserLine={true}
                className={`reveal-scale delay-${(idx + 1) * 100} p-5 sm:p-7 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-2.5 sm:p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 shadow-inner ${config.iconBoxClass}`}
                    >
                      {config.icon}
                    </div>
                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider font-code border transition-colors duration-300 ${config.badgeClass}`}
                    >
                      {item.badge || (isDegree ? 'Degree' : 'Certification')}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <div
                    className={`text-xs sm:text-sm font-semibold mb-2 transition-colors duration-300 ${config.institutionColor}`}
                  >
                    {item.institution}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-code">
                    <Calendar size={13} /> {item.period}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-3 border-t border-white/5 line-clamp-2 sm:line-clamp-none group-hover:text-slate-100 transition-colors duration-300">
                  {item.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Animated Show More / Show Less Toggle */}
        {hasMore && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="min-h-[44px] inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold font-heading text-[var(--accent-primary)] bg-[var(--accent-subtle)] border border-[var(--accent-border)] hover:bg-[var(--accent-primary)] hover:text-slate-950 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_var(--accent-subtle)]"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} /> Show Top 3 Credentials
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> View All {educationList.length} Credentials
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
