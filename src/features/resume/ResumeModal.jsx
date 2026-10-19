import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Globe, FileText } from 'lucide-react';
import { useResumePreview } from './hooks/useResumePreview';
import ResumeHeader from './components/ResumeHeader';
import ResumePrintable from './components/ResumePrintable';
import ResumePdfViewer from './components/ResumePdfViewer';
import ResumeWebCv from './components/ResumeWebCv';

export default function ResumeModal({ isOpen, onClose }) {
  const { portfolioData } = usePortfolio();
  const [activeView, setActiveView] = useState('web');

  const hero = portfolioData?.hero || {};
  const rawUrl = portfolioData?.resumeUrl || hero?.resumeUrl || '/resume_abdul_sami.pdf';
  const resumeUrl = (rawUrl || '').trim();

  const {
    blobUrl,
    isDownloading,
    getDocumentName,
    handleOpenFullTab,
    handleDownload,
    dataUrlToBlob
  } = useResumePreview(resumeUrl, hero.name);

  if (!isOpen) return null;

  const handleClose = () => {
    setActiveView('web');
    onClose();
  };

  const handlePrint = () => {
    if (activeView === 'pdf') {
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
      window.print();
    }
  };

  return (
    <>
      <ResumePrintable hero={hero} portfolioData={portfolioData} />

      <div
        className="fixed inset-0 z-50 bg-[#07090e]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
        onClick={handleClose}
      >
        <div
          className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-[var(--accent-border)] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-5 sm:p-8 flex flex-col animate-modal-zoom custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <ResumeHeader
            hero={hero}
            activeView={activeView}
            onPrint={handlePrint}
            onDownload={handleDownload}
            onClose={handleClose}
            isDownloading={isDownloading}
          />

          {/* View Mode Toggle Switch */}
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

          {activeView === 'pdf' ? (
            <ResumePdfViewer
              documentName={getDocumentName()}
              resumeUrl={resumeUrl}
              blobUrl={blobUrl}
              onOpenFullTab={handleOpenFullTab}
              onPrint={handlePrint}
            />
          ) : (
            <ResumeWebCv hero={hero} portfolioData={portfolioData} />
          )}
        </div>
      </div>
    </>
  );
}
