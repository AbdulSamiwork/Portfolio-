import React from 'react';

/**
 * Reusable Section Header Primitive
 * Standardizes badge pill, title typography, and subtitle description across all portfolio sections.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.badgeIcon] - Optional Lucide icon or element
 * @param {string} props.badgeText - Text for the pill badge
 * @param {string} props.title - Primary heading text
 * @param {string} [props.titleHighlight] - Highlighted / gradient portion of the heading
 * @param {string} [props.description] - Supporting subtitle paragraph
 * @param {'center' | 'left'} [props.align='center'] - Alignment of the header
 * @param {string} [props.className] - Extra class names
 */
export default function SectionHeader({
  badgeIcon,
  badgeText,
  title,
  titleHighlight,
  description,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`reveal ${isCenter ? 'text-center max-w-3xl mx-auto' : 'text-left'} mb-12 sm:mb-16 ${className}`}
    >
      {badgeText && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] font-code uppercase tracking-wider text-xs text-[var(--accent-primary)] mb-3.5 shadow-[0_0_15px_var(--accent-glow)] ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {badgeIcon && <span className="flex-shrink-0">{badgeIcon}</span>}
          <span>{badgeText}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight mb-4">
        {title}{' '}
        {titleHighlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`text-slate-400 text-sm sm:text-base leading-relaxed ${
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
