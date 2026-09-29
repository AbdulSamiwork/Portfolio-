import React from 'react';

/**
 * High-End Cyberpunk / Emerald Shimmer Section Skeleton Loader
 * Renders tailored loading placeholders with pulsing neon glows and scanning beam animations.
 *
 * @param {Object} props
 * @param {'hero' | 'cards' | 'timeline' | 'grid' | 'contact'} [props.type='cards'] - Layout variant
 * @param {number} [props.cardCount=3] - Number of card skeletons to render
 * @param {string} [props.className] - Additional classes
 */
export default function SectionSkeleton({
  type = 'cards',
  cardCount = 3,
  className = '',
}) {
  return (
    <div className={`w-full py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}>
      {/* Background Scanning Shimmer Beam */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-glow)] to-transparent opacity-10 -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />

      {/* Common Header Skeleton */}
      {type !== 'hero' && (
        <div className="flex flex-col items-center mb-12 sm:mb-16 text-center">
          {/* Pill Badge */}
          <div className="w-44 h-7 rounded-full bg-white/5 border border-white/10 animate-pulse mb-4 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]/40 mr-2 animate-ping" />
            <div className="w-24 h-2.5 rounded bg-white/10" />
          </div>
          {/* Title */}
          <div className="w-72 sm:w-96 h-9 sm:h-12 rounded-xl bg-white/10 animate-pulse mb-3" />
          {/* Subtitle */}
          <div className="w-full max-w-lg h-4 rounded bg-white/5 animate-pulse" />
        </div>
      )}

      {/* Hero Skeleton */}
      {type === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start space-y-4">
            <div className="w-64 h-7 rounded-full bg-white/5 border border-white/10 animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 animate-pulse border border-[var(--accent-border)]" />
              <div className="space-y-2">
                <div className="w-56 sm:w-72 h-10 rounded-xl bg-white/15 animate-pulse" />
                <div className="w-40 h-5 rounded bg-white/10 animate-pulse" />
              </div>
            </div>
            <div className="w-full max-w-xl h-20 rounded-xl bg-white/5 animate-pulse" />
            <div className="grid grid-cols-3 gap-3 w-full max-w-xl">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
              ))}
            </div>
            <div className="flex gap-4 pt-2">
              <div className="w-36 h-11 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] animate-pulse" />
              <div className="w-32 h-11 rounded-full bg-white/5 animate-pulse" />
            </div>
          </div>
          <div className="lg:col-span-5 w-full">
            <div className="w-full h-80 sm:h-96 rounded-2xl bg-[#070b14]/90 border border-white/10 animate-pulse flex flex-col p-4 space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="space-y-2.5 pt-2">
                <div className="w-3/4 h-3 bg-white/10 rounded" />
                <div className="w-1/2 h-3 bg-white/10 rounded" />
                <div className="w-5/6 h-3 bg-white/10 rounded" />
                <div className="w-2/3 h-3 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cards Skeleton (About, Certifications) */}
      {type === 'cards' && (
        <div className={`grid grid-cols-1 ${cardCount === 1 ? 'max-w-2xl mx-auto' : cardCount === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4 sm:gap-6`}>
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 bg-[#090e19d9] border border-white/10 animate-pulse flex flex-col justify-between space-y-4 min-h-[220px]"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/10" />
                <div className="w-24 h-5 rounded-full bg-white/5 border border-white/10" />
              </div>
              <div className="space-y-2">
                <div className="w-3/4 h-6 rounded bg-white/10" />
                <div className="w-full h-4 rounded bg-white/5" />
                <div className="w-4/5 h-4 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid Skeleton (Skills, Projects) */}
      {type === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 bg-[#090e19d9] border border-white/10 animate-pulse space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="w-32 h-5 rounded bg-white/10" />
                <div className="w-12 h-4 rounded bg-[var(--accent-subtle)]" />
              </div>
              <div className="w-full h-2 rounded-full bg-white/10" />
              <div className="w-full h-3 rounded bg-white/5" />
            </div>
          ))}
        </div>
      )}

      {/* Timeline Skeleton (Experience) */}
      {type === 'timeline' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-6 bg-[#090e19d9] border border-white/10 animate-pulse space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="w-48 h-6 rounded bg-white/10" />
                <div className="w-28 h-5 rounded-full bg-white/5" />
              </div>
              <div className="w-36 h-4 rounded bg-[var(--accent-subtle)]" />
              <div className="space-y-2 pt-2">
                <div className="w-full h-3 rounded bg-white/5" />
                <div className="w-5/6 h-3 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Skeleton */}
      {type === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 rounded-2xl p-6 bg-[#090e19d9] border border-white/10 animate-pulse space-y-4">
            <div className="w-44 h-7 rounded bg-white/10" />
            <div className="w-full h-12 rounded-xl bg-white/5" />
            <div className="w-full h-12 rounded-xl bg-white/5" />
            <div className="w-full h-12 rounded-xl bg-white/5" />
          </div>
          <div className="lg:col-span-7 rounded-2xl p-6 bg-[#090e19d9] border border-white/10 animate-pulse space-y-4">
            <div className="w-56 h-7 rounded bg-white/10" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 rounded-xl bg-white/5" />
              <div className="h-10 rounded-xl bg-white/5" />
            </div>
            <div className="h-10 rounded-xl bg-white/5" />
            <div className="h-28 rounded-xl bg-white/5" />
            <div className="h-12 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent-border)]" />
          </div>
        </div>
      )}
    </div>
  );
}
