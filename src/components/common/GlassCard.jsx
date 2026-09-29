import React from 'react';

/**
 * Reusable GlassCard UI Primitive
 * Encapsulates luxury glassmorphism surface, top laser beam, and smooth hover glow animations.
 *
 * @param {Object} props
 * @param {'emerald' | 'purple' | 'cyan' | 'amber' | 'none'} [props.glowVariant='emerald'] - Color theme for hover effects
 * @param {boolean} [props.hasLaserLine=true] - Whether to show the top laser accent line
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {function} [props.onClick] - Click handler
 * @param {React.ReactNode} props.children - Card contents
 */
export default function GlassCard({
  glowVariant = 'emerald',
  hasLaserLine = true,
  className = '',
  onClick,
  children,
  ...rest
}) {
  const variantClassMap = {
    emerald: 'card-animated-emerald',
    purple: 'card-animated-purple',
    cyan: 'card-animated-cyan',
    amber: 'metric-card-emerald', // maps to radiant amber/emerald in theme
    none: 'bg-[#090e19d9] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300',
  };

  const laserLineGradients = {
    emerald: 'from-transparent via-emerald-400/80 to-transparent',
    purple: 'from-transparent via-purple-400/80 to-transparent',
    cyan: 'from-transparent via-cyan-400/80 to-transparent',
    amber: 'from-transparent via-amber-400/80 to-transparent',
    none: 'from-transparent via-white/20 to-transparent',
  };

  const cardVariantClass = variantClassMap[glowVariant] || variantClassMap.emerald;
  const laserGradient = laserLineGradients[glowVariant] || laserLineGradients.emerald;

  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl ${cardVariantClass} ${className}`}
      {...rest}
    >
      {hasLaserLine && (
        <div
          className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r ${laserGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10`}
        />
      )}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
