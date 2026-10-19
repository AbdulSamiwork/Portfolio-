import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Github, ExternalLink, CheckCircle2, Share2, Copy, Check } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  const [copied, setCopied] = useState(false);

  // Synchronize Modal Keyboard and Scroll Lock
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

  // Dynamically Update Document Title & Open Graph Meta Tags for Deep Link Previews
  useEffect(() => {
    if (!project) return;
    const prevTitle = document.title;
    document.title = `${project.title} | Abdul Sami`;

    const setMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (el) {
        if (!el.hasAttribute('data-prev')) {
          el.setAttribute('data-prev', el.getAttribute('content') || '');
        }
        el.setAttribute('content', content);
      }
    };

    const domain = window.location.origin;
    const projectUrl = `${domain}/?project=${encodeURIComponent(project.id)}`;
    const projectImage = project.image 
      ? (project.image.startsWith('http') ? project.image : `${domain}${project.image}`) 
      : `${domain}/images/og-preview.png`;

    setMeta('og:title', `${project.title} | Abdul Sami`);
    setMeta('twitter:title', `${project.title} | Abdul Sami`);
    setMeta('og:description', project.summary || '');
    setMeta('twitter:description', project.summary || '');
    setMeta('og:image', projectImage);
    setMeta('og:image:secure_url', projectImage);
    setMeta('twitter:image', projectImage);
    setMeta('og:url', projectUrl);
    setMeta('twitter:url', projectUrl);

    return () => {
      document.title = prevTitle;
      const revertMeta = (property) => {
        let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
        if (el && el.hasAttribute('data-prev')) {
          el.setAttribute('content', el.getAttribute('data-prev') || '');
          el.removeAttribute('data-prev');
        }
      };
      revertMeta('og:title');
      revertMeta('twitter:title');
      revertMeta('og:description');
      revertMeta('twitter:description');
      revertMeta('og:image');
      revertMeta('og:image:secure_url');
      revertMeta('twitter:image');
      revertMeta('og:url');
      revertMeta('twitter:url');
    };
  }, [project]);

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

  const cat = (project.category || 'web').toLowerCase().trim();
  const isCloud = cat === 'cloud' || cat === 'tools';
  const isAi = cat === 'ai';

  const shareOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://abdulsami.tech';
  const shareUrl = `${shareOrigin}/?project=${encodeURIComponent(project.id)}`;
  const shareText = `Check out "${project.title}" by Abdul Sami (Full-Stack & AI Specialist): ${shareUrl}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }).catch(() => {});
    }
  };

  const handleWhatsAppShare = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      style={{
        zIndex: 99999,
        background: 'rgba(4, 7, 14, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#090e1a] border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(0,242,254,0.15)] overflow-hidden my-auto animate-modal-zoom flex flex-col"
        style={{
          maxHeight: 'min(90vh, 780px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-white hover:bg-slate-900 hover:text-[var(--cyan-accent)] hover:rotate-90 hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-md"
          style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 40 }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Banner Cover Image */}
        <div className="relative w-full h-44 sm:h-56 bg-slate-950 overflow-hidden flex-shrink-0">
          <img
            src={project.image || (isAi ? '/images/project_network.webp' : '/images/project_gristmill.webp')}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = isAi ? '/images/project_network.webp' : '/images/project_gristmill.webp';
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-[#090e1a]/30 to-black/60 pointer-events-none" />

          {/* Category & Status Badges */}
          <div className="absolute bottom-3.5 left-4 sm:left-6 z-10 flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md border ${
                isCloud
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                  : isAi
                  ? 'bg-purple-500/20 text-purple-200 border-purple-400/40'
                  : 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40'
              }`}
            >
              {project.categoryBadge || (isCloud ? 'Cloud / DevOps' : isAi ? 'AI / ML System' : 'Full-Stack Web App')}
            </span>

            {Boolean(project.isInProgress) && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/25 text-amber-300 border border-amber-400/50 backdrop-blur-md shadow-md animate-pulse">
                🚧 In Progress
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 custom-scrollbar">
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white mb-1">
            {project.title}
          </h2>
          <div className="text-xs sm:text-sm font-semibold text-[var(--accent-primary)] mb-3.5 font-code">
            {project.subtitle}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
            {project.summary}
          </p>

          {/* Key Deliverables & Architecture */}
          {highlightsList.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 font-heading">
                Architecture &amp; Key Technical Deliverables
              </h4>
              <div className="flex flex-col gap-2">
                {highlightsList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 group">
                    <CheckCircle2
                      size={15}
                      className="text-[var(--accent-primary)] flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-115"
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
            <div className="mb-5">
              <h4 className="text-xs sm:text-sm font-bold text-white mb-2.5 font-heading">
                Technologies &amp; Tools Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {techList.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-code bg-white/5 border border-white/10 text-slate-200 transition-colors hover:border-[var(--accent-border)] hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Dynamic Sharing Bar */}
          <div className="mb-5 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-heading text-slate-300">
              <Share2 size={15} className="text-[var(--accent-primary)]" />
              <span className="font-semibold text-white">Share Project:</span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              {/* WhatsApp Share */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95"
                title="Share on WhatsApp with Dynamic Card"
              >
                <span>WhatsApp</span>
              </button>

              {/* Twitter/X Share */}
              <button
                type="button"
                onClick={handleTwitterShare}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95"
                title="Share on Twitter / X"
              >
                <span>X / Twitter</span>
              </button>

              {/* LinkedIn Share */}
              <button
                type="button"
                onClick={handleLinkedInShare}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95"
                title="Share on LinkedIn"
              >
                <span>LinkedIn</span>
              </button>

              {/* Copy Direct Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                  copied
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
                title="Copy Project Link"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Action Links Footer */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-white/10">
            <a
              href={project.github || 'https://github.com/Abdul-Sami1122'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-heading text-slate-200 bg-white/5 border border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.01] active:scale-95"
            >
              <Github size={15} /> View Source Code
            </a>

            {(project.showDemo !== false && project.showDemo !== 0 && project.showDemo !== '0') && (
              <a
                href={project.demoUrl || project.demo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[42px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.01] active:scale-95 btn-shimmer"
              >
                <ExternalLink size={15} /> Launch Live Demo
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="sm:w-auto min-h-[42px] inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold font-heading text-slate-400 bg-transparent border border-white/10 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
