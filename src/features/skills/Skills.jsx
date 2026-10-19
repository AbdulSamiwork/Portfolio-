import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Code2, Cpu, Cloud, Sparkles } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import GlassCard from '../../components/common/GlassCard';
import SectionSkeleton from '../../components/common/SectionSkeleton';

export default function Skills() {
  const { portfolioData, isLoading } = usePortfolio();
  const skillsList = portfolioData?.skills || [];

  const [activeCategory, setActiveCategory] = useState('web');

  if (isLoading) {
    return (
      <section id="skills" className="py-12 sm:py-16 lg:py-24 relative">
        <SectionSkeleton type="grid" />
      </section>
    );
  }

  const categories = [
    { id: 'web', label: 'Frontend & Backend', icon: <Code2 size={16} />, glow: 'emerald' },
    { id: 'ai', label: 'AI & Machine Learning', icon: <Cpu size={16} />, glow: 'purple' },
    { id: 'tools', label: 'Cloud, DevOps & Tools', icon: <Cloud size={16} />, glow: 'cyan' },
  ];

  const activeSkills = skillsList.filter((s) => {
    const cat = (s.category || 'web').toLowerCase().trim();
    if (activeCategory === 'tools' || activeCategory === 'cloud') {
      return cat === 'tools' || cat === 'cloud';
    }
    return cat === activeCategory;
  });
  const activeConfig = categories.find((c) => c.id === activeCategory);

  const gradientMap = {
    web: 'from-emerald-400 to-teal-300',
    ai: 'from-purple-400 via-pink-400 to-indigo-300',
    tools: 'from-cyan-400 to-blue-400',
  };

  const textMap = {
    web: 'text-emerald-400 group-hover:text-emerald-300',
    ai: 'text-purple-400 group-hover:text-purple-300',
    tools: 'text-cyan-400 group-hover:text-cyan-300',
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badgeIcon={<Sparkles size={13} className="text-[var(--accent-primary)]" />}
          badgeText="Core Competencies &amp; Tech Stack"
          title="Technical"
          titleHighlight="Toolkit &amp; Expertise"
          description="Comprehensive stack spanning web software engineering, distributed databases, and deep algorithmic neural networks."
        />

        {/* Category Selector Tabs */}
        <div className="reveal delay-100 flex justify-center mb-8 sm:mb-10">
          <div
            className="inline-flex glass-panel rounded-2xl p-1.5 gap-1.5 shadow-2xl w-full sm:w-auto overflow-x-auto scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 sm:flex-none min-h-[42px] sm:min-h-[46px] inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? `bg-gradient-to-r ${gradientMap[cat.id]} text-slate-950 shadow-lg font-bold scale-[1.02]`
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Header Bar */}
        <div className="reveal delay-200 flex items-center justify-between gap-3 mb-5 sm:mb-6 px-1">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shadow-inner">
              {activeConfig?.icon &&
                React.cloneElement(activeConfig.icon, {
                  size: 18,
                  className: textMap[activeCategory],
                })}
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-bold font-heading text-white">
                {activeCategory === 'web'
                  ? 'Full-Stack Web Development'
                  : activeCategory === 'ai'
                  ? 'AI & Machine Learning Engineering'
                  : 'Platforms, Cloud & Developer Tools'}
              </h3>
              <span className="text-[11px] sm:text-xs text-slate-400 font-code">
                {activeSkills.length} mastery proficiencies in this sector
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Skill Cards Grid with Color-Matched Animated Hover */}
        {activeSkills.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            <p className="text-slate-400 text-sm m-0">No competencies registered in this domain yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {activeSkills.map((skill, sIdx) => {
            const levelPercent =
              skill.level === 'Expert'
                ? 95
                : skill.level === 'Advanced'
                ? 82
                : skill.level === 'Intermediate'
                ? 68
                : 50;

            return (
              <GlassCard
                key={skill.id || sIdx}
                glowVariant={activeConfig?.glow || 'emerald'}
                hasLaserLine={true}
                className="p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <strong className="text-white text-sm sm:text-base font-bold group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </strong>
                    <span
                      className={`text-xs font-bold font-code transition-colors duration-300 ${textMap[activeCategory]}`}
                    >
                      {levelPercent}%
                    </span>
                  </div>

                  {/* Level Progress Bar with Glowing Accent */}
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden my-2.5 relative">
                    <div
                      className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${gradientMap[activeCategory]} shadow-[0_0_12px_rgba(255,255,255,0.15)]`}
                      style={{ width: `${levelPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-white/5">
                    <p className="text-[11px] sm:text-xs text-slate-300 group-hover:text-slate-100 transition-colors duration-300 m-0 leading-relaxed line-clamp-1 sm:line-clamp-none flex-1">
                      {skill.desc}
                    </p>
                    <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-code bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/25 group-hover:text-white transition-colors duration-300 flex-shrink-0 uppercase tracking-wider">
                      {skill.level}
                    </span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
