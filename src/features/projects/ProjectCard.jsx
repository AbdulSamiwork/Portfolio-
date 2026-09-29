import React from 'react';
import { Github, Factory, HeartPulse, ExternalLink, Info } from 'lucide-react';

export default function ProjectCard({
  project,
  isMobile = false,
  onOpenDetails,
}) {
  const highlightsList = Array.isArray(project.highlights)
    ? project.highlights
    : typeof project.highlights === 'string'
    ? project.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
    : [];

  const techList = Array.isArray(project.tech)
    ? project.tech
    : typeof project.tech === 'string'
    ? project.tech.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const isWeb = project.category === 'web';
  const borderAccent = isWeb
    ? 'border-t-4 border-t-emerald-400 hover:border-emerald-400/50 hover:shadow-[0_20px_45px_rgba(16,185,129,0.2)]'
    : 'border-t-4 border-t-purple-500 hover:border-purple-500/50 hover:shadow-[0_20px_45px_rgba(168,85,247,0.2)]';

  const getIcon = (category) => {
    if (category === 'web') return <Factory size={18} className="text-emerald-400" />;
    return <HeartPulse size={18} className="text-purple-400" />;
  };

  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group ${
        isMobile ? 'w-[84vw] max-w-[340px] flex-shrink-0 snap-center' : 'w-full'
      } ${borderAccent}`}
    >
      {/* Project Banner with Zoom */}
      <div className="relative w-full h-40 sm:h-52 bg-slate-950 overflow-hidden">
        <img
          src={project.image || '/images/project_gristmill.webp'}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-black/40 pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold font-code uppercase tracking-wider backdrop-blur-md shadow-md ${
              isWeb
                ? 'bg-slate-950/80 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-950/80 text-purple-400 border border-purple-500/40'
            }`}
          >
            {getIcon(project.category)}
            <span>{project.categoryBadge}</span>
          </span>
        </div>

        {/* Quick Details Trigger */}
        <button
          onClick={() => onOpenDetails(project)}
          className="absolute top-3 right-3 bg-slate-950/80 border border-white/20 hover:border-white/40 rounded-full min-w-[36px] min-h-[36px] w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 active:scale-90 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md z-10"
          title="View Architecture Details"
        >
          <Info size={16} />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base sm:text-xl font-bold font-heading text-white group-hover:text-white transition-colors duration-200 line-clamp-1 mb-1">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-[var(--accent-primary)] mb-3 font-code line-clamp-1">
            {project.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
            {project.summary}
          </p>

          {/* Highlights Mini List */}
          {highlightsList.length > 0 && (
            <div className="space-y-1.5 mb-4">
              {highlightsList.slice(0, 2).map((item, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-[var(--accent-primary)] font-bold">•</span>
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-white/10">
            {techList.slice(0, 4).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-code bg-white/5 border border-white/10 text-slate-300"
              >
                {tech}
              </span>
            ))}
            {techList.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-code bg-white/5 text-slate-400">
                +{techList.length - 4}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2 pt-2">
            <a
              href={project.github || 'https://github.com/Abdul-Sami1122'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold font-heading text-slate-200 bg-white/5 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              <Github size={14} /> Code
            </a>

            {(project.showDemo === true ||
              (project.showDemo !== false && (project.demoUrl || project.demo))) && (
              <a
                href={project.demoUrl || project.demo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_15px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.02] active:scale-95 btn-shimmer"
              >
                <ExternalLink size={14} /> Demo
              </a>
            )}

            <button
              onClick={() => onOpenDetails(project)}
              className="min-w-[40px] min-h-[40px] rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title="Full Project Specs"
            >
              <Info size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
