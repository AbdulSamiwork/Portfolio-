import React, { useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

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

  return (
    <div
      className="fixed inset-0 z-50 bg-[#04060a]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0f1d] border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden animate-modal-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Cover Image with Fluid Aspect Ratio */}
        <div className="relative w-full aspect-video sm:h-64 bg-slate-950 overflow-hidden">
          <img
            src={project.image || '/images/project_gristmill.webp'}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-black/50 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-950/80 border border-white/20 rounded-full min-w-[42px] min-h-[42px] w-10 h-10 flex items-center justify-center text-white hover:bg-slate-950 hover:text-[var(--accent-primary)] hover:rotate-90 hover:scale-110 active:scale-90 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg z-10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-4 z-10">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md ${
                project.category === 'web'
                  ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40'
                  : 'bg-purple-500/20 text-purple-200 border border-purple-400/40'
              }`}
            >
              {project.categoryBadge}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white mb-1.5">
            {project.title}
          </h2>
          <div className="text-sm font-semibold text-[var(--accent-primary)] mb-4 font-code">
            {project.subtitle}
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Key Deliverables & Architecture */}
          {highlightsList.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm sm:text-base font-bold text-white mb-3 font-heading">
                Architecture &amp; Key Technical Deliverables
              </h4>
              <div className="flex flex-col gap-2.5">
                {highlightsList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 group">
                    <CheckCircle2
                      size={16}
                      className="text-[var(--accent-primary)] flex-shrink-0 mt-1 transition-transform duration-200 group-hover:scale-115"
                    />
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          {techList.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm sm:text-base font-bold text-white mb-3 font-heading">
                Technologies &amp; Tools Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-code bg-white/5 border border-white/10 text-slate-200 transition-colors hover:border-[var(--accent-border)] hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Footer */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-white/10">
            <a
              href={project.github || 'https://github.com/Abdul-Sami1122'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-heading text-slate-200 bg-white/5 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              <Github size={16} /> View Source Code
            </a>

            {(project.showDemo === true ||
              (project.showDemo !== false && (project.demoUrl || project.demo))) && (
              <a
                href={project.demoUrl || project.demo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.02] active:scale-95 btn-shimmer"
              >
                <ExternalLink size={16} /> Launch Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
