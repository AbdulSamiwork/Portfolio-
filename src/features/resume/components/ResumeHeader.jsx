import React from 'react';
import { X, Download, FileText, Printer } from 'lucide-react';

export default function ResumeHeader({
  hero,
  activeView,
  onPrint,
  onDownload,
  onClose,
  isDownloading
}) {
  return (
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

      <div className="flex items-center gap-2 sm:gap-2.5 flex-nowrap flex-shrink-0 self-end sm:self-center">
        <button
          type="button"
          onClick={onPrint}
          className="min-h-[38px] sm:min-h-[42px] inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold font-heading text-slate-200 bg-white/5 border border-white/10 hover:border-[var(--accent-border)] hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm whitespace-nowrap flex-shrink-0"
          title={activeView === 'pdf' ? 'Print the attached PDF Document' : 'Print the Web CV Document'}
        >
          <Printer size={14} /> Print
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          className="min-h-[38px] sm:min-h-[42px] inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold font-heading text-slate-950 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_15px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.02] active:scale-95 btn-shimmer cursor-pointer whitespace-nowrap flex-shrink-0"
          title="Download attached PDF Resume file"
        >
          <Download size={14} /> {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-[var(--accent-primary)] hover:rotate-90 hover:scale-110 active:scale-90 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm flex-shrink-0"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
