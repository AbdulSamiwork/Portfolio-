import React from 'react';
import { CheckCircle2, ExternalLink, Printer } from 'lucide-react';

export default function ResumePdfViewer({
  documentName,
  resumeUrl,
  blobUrl,
  onOpenFullTab,
  onPrint
}) {
  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      {/* Document Info & Actions Bar */}
      <div className="p-3 sm:p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between flex-wrap gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-200 font-medium min-w-0 flex-1 overflow-hidden">
          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
          <span className="truncate">
            Attached PDF: <strong className="text-white font-mono">{documentName}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onOpenFullTab}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-border)] hover:bg-[var(--accent-primary)]/20 font-semibold transition-all duration-200 cursor-pointer text-xs"
            title="Open document in a separate browser tab"
          >
            Open in Full Tab <ExternalLink size={12} />
          </button>
          <button
            type="button"
            onClick={onPrint}
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
          src={blobUrl ? `${blobUrl}#toolbar=1` : `${resumeUrl}#toolbar=1`}
          title="Official Resume PDF Document"
          className="w-full h-full border-none"
        />
      </div>

      <div className="text-[11px] text-slate-400 text-center">
        Can't preview the document on your browser? Click <strong>Open in Full Tab</strong> or switch to <strong>Live Web CV Preview</strong>.
      </div>
    </div>
  );
}
