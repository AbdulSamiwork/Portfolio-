import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal Dialog Shell
 * Provides backdrop overlay, escape key handling, body scroll locking, header bar, and smooth entrance.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {function} props.onClose - Triggered on backdrop click, escape key, or close button
 * @param {string} [props.title] - Modal title text
 * @param {React.ReactNode} [props.titleIcon] - Optional icon beside title
 * @param {string} [props.subtitle] - Subtitle beneath title
 * @param {React.ReactNode} [props.headerActions] - Custom buttons in the header
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} [props.maxWidth='lg'] - Width constraint
 * @param {string} [props.className] - Additional dialog styling
 * @param {React.ReactNode} props.children - Modal body content
 */
export default function ModalShell({
  isOpen,
  onClose,
  title,
  titleIcon,
  subtitle,
  headerActions,
  maxWidth = 'lg',
  className = '',
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthMap = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[94vw]',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#07090e]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full ${
          maxWidthMap[maxWidth] || maxWidthMap.lg
        } max-h-[92vh] overflow-y-auto bg-slate-900 border border-[var(--accent-border)] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-5 sm:p-7 flex flex-col animate-modal-zoom ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        {(title || onClose) && (
          <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/10 flex-shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {titleIcon && <span className="text-[var(--accent-primary)]">{titleIcon}</span>}
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white truncate m-0">
                  {title}
                </h3>
              </div>
              {subtitle && (
                <p className="text-xs text-slate-400 mt-0.5 font-code truncate m-0">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {headerActions}
              {onClose && (
                <button
                  onClick={onClose}
                  className="min-w-[38px] min-h-[38px] rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:rotate-90 hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-200 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}
