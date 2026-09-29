import React from 'react';

/**
 * Reusable Badge & Status Pill Primitive
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {boolean} [props.hasBeacon=false] - Whether to show an animated radar ping dot
 * @param {'emerald' | 'cyan' | 'purple' | 'amber' | 'subtle'} [props.variant='emerald'] - Color theme
 * @param {'sm' | 'md'} [props.size='md'] - Padding & font size
 * @param {string} [props.className] - Additional classes
 * @param {React.ReactNode} props.children - Pill text or content
 */
export default function Badge({
  icon,
  hasBeacon = false,
  variant = 'emerald',
  size = 'md',
  className = '',
  children,
}) {
  const variantStyles = {
    emerald: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
    purple: 'bg-purple-500/10 border-purple-500/25 text-purple-400',
    amber: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
    subtle: 'bg-white/5 border-white/10 text-slate-300',
  };

  const beaconColors = {
    emerald: 'bg-emerald-400',
    cyan: 'bg-cyan-400',
    purple: 'bg-purple-400',
    amber: 'bg-amber-400',
    subtle: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[11px]',
    md: 'px-3 py-1.5 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border font-medium font-code tracking-wide ${
        variantStyles[variant] || variantStyles.emerald
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {hasBeacon && (
        <span
          className={`radar-beacon w-2 h-2 rounded-full ${
            beaconColors[variant] || beaconColors.emerald
          }`}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
