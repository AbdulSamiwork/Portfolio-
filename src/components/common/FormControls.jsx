import React from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Standard Form Label
 */
export function FormLabel({ children, required, className = '' }) {
  return (
    <label className={`block text-xs font-semibold text-slate-300 mb-1.5 font-code uppercase tracking-wider ${className}`}>
      {children} {required && <span className="text-rose-400">*</span>}
    </label>
  );
}

/**
 * Standard Text Input
 */
export function FormInput({
  label,
  required,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <input
        required={required}
        className={`w-full px-4 py-2.5 sm:py-3 rounded-xl bg-slate-950/80 border ${
          error ? 'border-rose-500/50' : 'border-white/10 hover:border-white/20'
        } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-subtle)] transition-all duration-200 ${className}`}
        {...props}
      />
      {error && <span className="text-[11px] text-rose-400 mt-1 block">{error}</span>}
    </div>
  );
}

/**
 * Standard Textarea
 */
export function FormTextarea({
  label,
  required,
  error,
  rows = 4,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <textarea
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border ${
          error ? 'border-rose-500/50' : 'border-white/10 hover:border-white/20'
        } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-subtle)] transition-all duration-200 resize-none h-32 sm:h-36 leading-relaxed custom-scrollbar ${className}`}
        {...props}
      />
      {error && <span className="text-[11px] text-rose-400 mt-1 block">{error}</span>}
    </div>
  );
}

/**
 * Standard Select Dropdown
 */
export function FormSelect({
  label,
  required,
  options = [],
  children,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <div className="relative group">
        <select
          required={required}
          className={`w-full pl-4 pr-10 py-2.5 sm:py-3 rounded-xl bg-slate-950/80 border border-white/10 hover:border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-subtle)] transition-all duration-200 cursor-pointer appearance-none ${className}`}
          {...props}
        >
          {children ||
            options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-white py-2">
                {opt.label}
              </option>
            ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-[var(--accent-primary)] transition-colors duration-200 flex items-center justify-center">
          <ChevronDown size={17} />
        </div>
      </div>
    </div>
  );
}

