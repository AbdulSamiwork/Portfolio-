import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Download, FileText, Briefcase, GraduationCap, Printer, ExternalLink, Globe, CheckCircle2 } from 'lucide-react';

function dataUrlToBlob(dataUrl) {
  try {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error('Failed to convert DataURL to Blob:', e);
    return null;
  }
}

export default function ResumeModal({ isOpen, onClose }) {
  const { portfolioData } = usePortfolio();
  const [activeView, setActiveView] = useState('web'); // 'web' | 'pdf'
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const hero = portfolioData?.hero || {};
  const rawUrl = portfolioData?.resumeUrl || hero?.resumeUrl || '/resume_abdul_sami.pdf';
  const resumeUrl = rawUrl.trim();

  const handleClose = () => {
    setActiveView('web');
    onClose();
  };

  // Get clean, short filename for the UI badge so long base64 strings don't stretch layout
  const getDocumentName = () => {
    if (!resumeUrl || resumeUrl.startsWith('data:') || resumeUrl.startsWith('blob:')) {
      return `${(hero.name || 'Abdul_Sami').replace(/\s+/g, '_')}_Official_Resume.pdf`;
    }
    const clean = resumeUrl.split('?')[0].split('#')[0].split('/').pop();
    if (!clean || clean.length > 35) {
      return `${(hero.name || 'Abdul_Sami').replace(/\s+/g, '_')}_Official_Resume.pdf`;
    }
    return clean;
  };

  // Open PDF in a new tab without browser security blocks (converts base64 to Blob URL)
  const handleOpenFullTab = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!resumeUrl) return;

    if (resumeUrl.startsWith('data:')) {
      const blob = dataUrlToBlob(resumeUrl);
      if (blob) {
        const blobUrl = window.URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
        return;
      }
    }

    window.open(resumeUrl, '_blank');
  };

  // Print handler: If user is on attached PDF view, print the attached PDF directly.
  // If on web CV view, print the web CV sheet.
  const handlePrint = () => {
    if (activeView === 'pdf') {
      // 1. Try printing from the embedded PDF iframe directly
      const iframe = document.getElementById('pdf-viewer-frame');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          return;
        } catch (e) {
          console.warn('Direct iframe print blocked by browser, using blob print popup fallback:', e);
        }
      }

      // 2. Open clean Blob in new tab with print trigger
      let targetUrl = resumeUrl;
      if (resumeUrl.startsWith('data:')) {
        const blob = dataUrlToBlob(resumeUrl);
        if (blob) {
          targetUrl = window.URL.createObjectURL(blob);
        }
      }

      const printWin = window.open(targetUrl, '_blank');
      if (printWin) {
        printWin.focus();
        setTimeout(() => {
          try {
            printWin.print();
          } catch (err) {}
        }, 800);
      }
    } else {
      // Active view is Web CV: Print the isolated resume sheet cleanly
      window.print();
    }
  };

  // Explicit download: Only triggered when user intentionally clicks "Download PDF"
  const handleDownload = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!resumeUrl) return;

    setIsDownloading(true);
    const fileName = `Resume_${(hero.name || 'Abdul_Sami').replace(/\s+/g, '_')}.pdf`;

    try {
      if (resumeUrl.startsWith('data:') || resumeUrl.startsWith('blob:')) {
        const a = document.createElement('a');
        a.href = resumeUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsDownloading(false);
        return;
      }

      const res = await fetch(resumeUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Fetch failed');
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const a = document.createElement('a');
      a.href = resumeUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* ========================================================
          1. Printable Resume Container (Active when printing Web CV)
          ======================================================== */}
      <div id="printable-resume" className="hidden">
        <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '10px', marginBottom: '14px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 3px 0', color: '#0f172a' }}>
            {hero.name || 'Abdul Sami'}
          </h1>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
            {hero.titleTag || 'Full-Stack & AI Practitioner'}
          </div>
          <div style={{ fontSize: '10.5px', color: '#475569' }}>
            {hero.email && `Email: ${hero.email} | `}
            {hero.phone && `Phone: ${hero.phone} | `}
            {hero.location && `Location: ${hero.location}`}
          </div>
          <div style={{ fontSize: '10.5px', color: '#475569' }}>
            {hero.githubUrl && `GitHub: ${hero.githubUrl} | `}
            {hero.linkedinUrl && `LinkedIn: ${hero.linkedinUrl}`}
          </div>
        </div>

        {hero.bio && (
          <div style={{ marginBottom: '12px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '5px', color: '#0f172a' }}>
              Professional Summary
            </h2>
            <p style={{ fontSize: '10.5px', lineHeight: '1.45', margin: 0, color: '#334155' }}>
              {hero.bio}
            </p>
          </div>
        )}

        {(portfolioData?.skills || []).length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '5px', color: '#0f172a' }}>
              Core Technical Competencies
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '10.5px' }}>
              {(portfolioData?.skills || []).map((s) => (
                <div key={s.id} style={{ color: '#334155' }}>
                  <strong>{s.name}</strong> — {s.level} {s.desc && `(${s.desc})`}
                </div>
              ))}
            </div>
          </div>
        )}

        {(portfolioData?.experiences || []).length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: '#0f172a' }}>
              Professional Experience
            </h2>
            {(portfolioData?.experiences || []).map((exp) => (
              <div key={exp.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>
                  <span>{exp.role}</span>
                  <span>{exp.period}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#475569', marginBottom: '3px' }}>{exp.company}</div>
                {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '10px', color: '#334155' }}>
                    {exp.achievements.map((ach, i) => (
                      <li key={i} style={{ marginBottom: '1px' }}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {(portfolioData?.education || []).length > 0 && (
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: '#0f172a' }}>
              Education &amp; Certifications
            </h2>
            {(portfolioData?.education || []).map((edu) => (
              <div key={edu.id} style={{ marginBottom: '6px', fontSize: '10.5px', color: '#334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                  <span>{edu.title}</span>
                  <span>{edu.period}</span>
                </div>
                <div>{edu.institution}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          2. Screen Interactive Modal
          ======================================================== */}
      <div
        className="fixed inset-0 z-50 bg-[#07090e]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-[var(--accent-border)] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-5 sm:p-8 flex flex-col animate-modal-zoom custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 mb-5 border-b border-white/10">
            <div className="min-w-0 flex-1 pr-1">
              <div className="inline-flex items-center gap-1.5 text-[var(--accent-primary)] text-xs font-bold mb-1 font-code">
                <FileText size={15} /> Official Curriculum Vitae
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white m-0 truncate">
                {hero.name || 'Abdul Sami'} — Resume
              </h2>
              <div className="text-xs sm:text-sm text-slate-400 mt-0.5 font-code truncate">
                {hero.titleTag} | {hero.location}
              </div>
            </div>

            {/* Actions: Strictly in a Single Row */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap flex-shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={handlePrint}
                className="min-h-[38px] sm:min-h-[42px] inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold font-heading text-slate-200 bg-white/5 border border-white/10 hover:border-[var(--accent-border)] hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm whitespace-nowrap flex-shrink-0"
                title={activeView === 'pdf' ? 'Print the attached PDF Document' : 'Print the Web CV Document'}
              >
                <Printer size={14} /> Print
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="min-h-[38px] sm:min-h-[42px] inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_15px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.02] active:scale-95 btn-shimmer cursor-pointer whitespace-nowrap flex-shrink-0"
                title="Download attached PDF Resume file"
              >
                <Download size={14} /> {isDownloading ? 'Downloading...' : 'Download PDF'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-[var(--accent-primary)] hover:rotate-90 hover:scale-110 active:scale-90 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm flex-shrink-0"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* View Mode Toggle Switch with Crystal-Clear Labels */}
          <div className="flex gap-2 mb-5 bg-black/40 p-1.5 rounded-xl border border-white/10 w-full sm:w-fit">
            <button
              type="button"
              onClick={() => setActiveView('web')}
              className={`min-h-[38px] flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                activeView === 'web'
                  ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe size={14} /> Live Web CV Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveView('pdf')}
              className={`min-h-[38px] flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                activeView === 'pdf'
                  ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-slate-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={14} /> Attached PDF File
            </button>
          </div>

          {/* Dynamic Viewport */}
          {activeView === 'pdf' ? (
            <div className="flex flex-col gap-3 animate-fade-in">
              {/* Document Info & Actions Bar (100% Responsive, no base64 overflow) */}
              <div className="p-3 sm:p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between flex-wrap gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-200 font-medium min-w-0 flex-1 overflow-hidden">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span className="truncate">
                    Attached PDF: <strong className="text-white font-mono">{getDocumentName()}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleOpenFullTab}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-border)] hover:bg-[var(--accent-primary)]/20 font-semibold transition-all duration-200 cursor-pointer text-xs"
                    title="Open document in a separate browser tab"
                  >
                    Open in Full Tab <ExternalLink size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[var(--accent-border)] text-slate-200 hover:text-white font-semibold transition-all duration-200 cursor-pointer text-xs"
                    title="Print attached PDF document"
                  >
                    <Printer size={12} /> Print PDF
                  </button>
                </div>
              </div>

              {/* PDF Embed Iframe */}
              <div className="w-full h-[55vh] sm:h-[520px] rounded-xl overflow-hidden border border-white/10 bg-slate-950 relative shadow-inner">
                <iframe
                  id="pdf-viewer-frame"
                  src={`${resumeUrl}#toolbar=1`}
                  title="Official Resume PDF Document"
                  className="w-full h-full border-none"
                />
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                Can't preview the document on your browser? Click <strong>Open in Full Tab</strong> or switch to <strong>Live Web CV Preview</strong>.
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Executive Bio */}
              <div>
                <h4 className="text-base font-bold text-white mb-2">Executive Summary</h4>
                <p className="text-sm text-slate-300 leading-relaxed m-0">{hero.bio}</p>
              </div>

              {/* Skills Snapshot */}
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-cyan-400" /> Technical Toolkit &amp; Competencies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(portfolioData?.skills || []).slice(0, 8).map((s) => (
                    <div
                      key={s.id}
                      className="bg-white/[0.02] border border-white/10 p-3 rounded-xl flex items-center justify-between transition-colors hover:border-[var(--accent-border)] hover:bg-white/5"
                    >
                      <strong className="text-white text-sm">{s.name}</strong>
                      <span className="text-xs text-[var(--accent-primary)] font-semibold font-code">
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Snapshot */}
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Briefcase size={18} className="text-emerald-400" /> Professional Work Experience
                </h4>
                <div className="flex flex-col gap-3">
                  {(portfolioData?.experiences || []).map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-white/[0.02] border border-white/10 p-4 rounded-xl transition-colors hover:border-white/20"
                    >
                      <div className="flex justify-between flex-wrap gap-1 mb-1">
                        <strong className="text-white text-sm">{exp.role}</strong>
                        <span className="text-[var(--accent-primary)] text-xs font-semibold">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-slate-400 text-xs mb-2.5">{exp.company}</div>
                      {Array.isArray(exp.achievements) && (
                        <ul className="space-y-1 list-none p-0 m-0">
                          {exp.achievements.map((ach, i) => (
                            <li
                              key={i}
                              className="text-xs text-slate-300 flex items-start gap-2"
                            >
                              <span className="text-[var(--accent-primary)]">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Snapshot */}
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <GraduationCap size={18} className="text-purple-400" /> Education &amp; Certifications
                </h4>
                <div className="flex flex-col gap-2.5">
                  {(portfolioData?.education || []).map((edu) => (
                    <div
                      key={edu.id}
                      className="bg-white/[0.02] border border-white/10 p-3.5 rounded-xl flex justify-between items-center transition-colors hover:border-white/20"
                    >
                      <div>
                        <strong className="text-white text-sm">{edu.title}</strong>
                        <div className="text-xs text-slate-400">{edu.institution}</div>
                      </div>
                      <span className="text-xs text-[var(--accent-primary)] font-semibold">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
