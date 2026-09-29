import React, { useEffect } from 'react';
import { AlertTriangle, AlertCircle, Trash2, RotateCcw, X, ShieldAlert } from 'lucide-react';

/**
 * Custom Confirmation & Alert Dialog matching Emerald / Cyber Obsidian theme.
 * Replaces native browser window.confirm() and alert() popups.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {function} props.onConfirm
 * @param {string} [props.title]
 * @param {string|React.ReactNode} [props.message]
 * @param {string} [props.confirmText='Confirm']
 * @param {string|null} [props.cancelText='Cancel'] - If null, functions as an Alert dialog
 * @param {'danger'|'warning'|'primary'|'info'} [props.variant='danger']
 * @param {React.ReactNode} [props.icon]
 */
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  icon = null,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onConfirm();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  // Variants styling
  const variantStyles = {
    danger: {
      borderColor: 'rgba(239, 68, 68, 0.35)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(239, 68, 68, 0.18)',
      iconBg: 'rgba(239, 68, 68, 0.12)',
      iconBorder: 'rgba(239, 68, 68, 0.3)',
      iconColor: '#f87171',
      defaultIcon: <Trash2 size={24} className="text-red-400" />,
      btnGradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      btnHoverShadow: '0 6px 20px rgba(239, 68, 68, 0.45)',
      glowBadge: 'bg-red-500/20 text-red-300 border-red-500/30',
    },
    warning: {
      borderColor: 'rgba(245, 158, 11, 0.35)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.18)',
      iconBg: 'rgba(245, 158, 11, 0.12)',
      iconBorder: 'rgba(245, 158, 11, 0.3)',
      iconColor: '#fbbf24',
      defaultIcon: <AlertTriangle size={24} className="text-amber-400" />,
      btnGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      btnHoverShadow: '0 6px 20px rgba(245, 158, 11, 0.45)',
      glowBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    primary: {
      borderColor: 'rgba(16, 185, 129, 0.35)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.18)',
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconBorder: 'rgba(16, 185, 129, 0.3)',
      iconColor: '#34d399',
      defaultIcon: <AlertCircle size={24} className="text-emerald-400" />,
      btnGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      btnHoverShadow: '0 6px 20px rgba(16, 185, 129, 0.45)',
      glowBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    info: {
      borderColor: 'rgba(0, 242, 254, 0.35)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.18)',
      iconBg: 'rgba(0, 242, 254, 0.12)',
      iconBorder: 'rgba(0, 242, 254, 0.3)',
      iconColor: '#00f2fe',
      defaultIcon: <ShieldAlert size={24} className="text-cyan-400" />,
      btnGradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
      btnHoverShadow: '0 6px 20px rgba(0, 242, 254, 0.45)',
      glowBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
  };

  const v = variantStyles[variant] || variantStyles.danger;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-[100010] flex items-center justify-center p-4 bg-[#050811]/85 backdrop-blur-md transition-opacity duration-200 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0a0f1d] border p-6 text-left transition-all duration-200 transform scale-100 shadow-2xl animate-modal-zoom"
        style={{
          borderColor: v.borderColor,
          boxShadow: v.boxShadow,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Flare */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: v.iconColor }}
        />

        {/* Header Icon + Close */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-200"
            style={{
              background: v.iconBg,
              borderColor: v.iconBorder,
              color: v.iconColor,
            }}
          >
            {icon || v.defaultIcon}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Title */}
        <h3
          id="confirm-modal-title"
          className="text-lg font-bold text-white mb-2 tracking-tight"
        >
          {title}
        </h3>

        {/* Message body */}
        <div className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
          {message}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/5">
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-150 cursor-pointer"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            autoFocus
            className="px-5 py-2 text-xs sm:text-sm font-bold text-white rounded-xl transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            style={{
              background: v.btnGradient,
              boxShadow: v.btnHoverShadow,
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
