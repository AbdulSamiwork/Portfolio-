import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, Briefcase, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import GlassCard from '../../components/common/GlassCard';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function Experience() {
  const { portfolioData, isLoading } = usePortfolio();
  const experiences = portfolioData?.experiences || [];

  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <section id="experience" className="py-12 sm:py-16 lg:py-24 relative">
        <SectionSkeleton type="timeline" />
      </section>
    );
  }

  // Show top 3 latest by default
  const displayedExperiences = isExpanded ? experiences : experiences.slice(0, 3);
  const hasMore = experiences.length > 3;

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={<Sparkles size={13} className="text-[var(--accent-primary)]" />}
          badgeText="Career Milestones &amp; Impact"
          title="Professional"
          titleHighlight="Experience"
          description="Proven engineering track record delivering robust web software systems and mathematical machine learning architectures."
        />

        {/* Timeline Container with Vertical Laser Track */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Glowing Laser Line - Centered with sub-pixel precision */}
          <div className="hidden sm:block absolute left-6 -translate-x-1/2 top-7 bottom-7 w-0.5 laser-line opacity-40 rounded-full pointer-events-none" />

          <div className="flex flex-col gap-6 sm:gap-8">
            {displayedExperiences.map((exp, index) => {
              const isWeb = exp.category === 'web';
              const glowVariant = isWeb ? 'emerald' : 'purple';
              const dotBorder = isWeb
                ? 'border-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.5)]'
                : 'border-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.5)]';
              const dotCore = isWeb ? 'bg-emerald-400' : 'bg-purple-400';
              const accentColor = isWeb ? 'text-emerald-400' : 'text-purple-400';

              return (
                <div
                  key={exp.id || index}
                  className={`reveal-${index % 2 === 0 ? 'left' : 'right'} delay-${
                    (index + 1) * 100
                  } relative sm:pl-16 group`}
                >
                  {/* Glowing Node Dot on Timeline - Exactly Centered on the Laser Line */}
                  <div
                    className={`hidden sm:flex absolute left-6 -translate-x-1/2 top-7 w-5 h-5 rounded-full bg-[#06080e] border-2 items-center justify-center transition-all duration-300 group-hover:scale-125 z-20 pointer-events-none ${dotBorder}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotCore}`} />
                  </div>

                  {/* Card Content with Animated Hover */}
                  <GlassCard
                    glowVariant={glowVariant}
                    hasLaserLine={true}
                    className="p-5 sm:p-7 relative transition-all duration-300"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3.5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                            <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-white transition-colors">
                              {exp.role}
                            </h3>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold font-code uppercase tracking-wider transition-colors duration-300 ${
                                isWeb
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                              }`}
                            >
                              {exp.domain}
                            </span>
                          </div>
                          <div
                            className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors duration-300 ${accentColor}`}
                          >
                            <Briefcase size={14} />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit">
                          <Calendar size={13} className="text-slate-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Achievements */}
                      {(() => {
                        const achievementsList = Array.isArray(exp.achievements)
                          ? exp.achievements
                          : (typeof exp.achievements === 'string'
                              ? exp.achievements.split('\n').map((a) => a.trim()).filter(Boolean)
                              : []);
                        return achievementsList.length > 0 ? (
                          <ul className="space-y-2.5 mb-4 list-none p-0 m-0">
                            {achievementsList.map((item, aIdx) => (
                              <li
                                key={aIdx}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed group-hover:text-slate-100 transition-colors duration-300"
                              >
                                <CheckCircle2
                                  size={16}
                                  className={`mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${accentColor}`}
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null;
                      })()}

                      {/* Skill Pills */}
                      {(() => {
                        const skillsList = Array.isArray(exp.skills)
                          ? exp.skills
                          : (typeof exp.skills === 'string'
                              ? exp.skills.split(',').map((s) => s.trim()).filter(Boolean)
                              : []);
                        return skillsList.length > 0 ? (
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                            {skillsList.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className={`px-2.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-code bg-white/5 border border-white/10 text-slate-300 transition-all duration-200 hover:scale-105 ${
                                  isWeb
                                    ? 'hover:border-emerald-500/40 hover:text-emerald-300'
                                    : 'hover:border-purple-500/40 hover:text-purple-300'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
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
                  <ChevronUp size={16} /> Show Latest 3 Roles
                </>
              ) : (
                <>
                  <ChevronDown size={16} /> Show All {experiences.length} Experiences
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
