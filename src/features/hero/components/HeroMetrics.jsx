import React from 'react';
import GlassCard from '../../../components/common/GlassCard';

export default function HeroMetrics() {
  const metrics = [
    { value: 'MERN & PHP', label: 'Full-Stack Web Dev' },
    { value: '92% Acc.', label: 'Deep Neural Networks' },
    { value: 'REST API', label: 'Decoupled Systems' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-xl mb-6 sm:mb-8">
      {metrics.map((metric, i) => (
        <GlassCard
          key={i}
          glowVariant="emerald"
          hasLaserLine={true}
          className="p-3 sm:p-4 text-center cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-lg sm:text-2xl md:text-3xl font-extrabold font-heading text-white group-hover:text-emerald-300 leading-tight transition-all duration-300 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {metric.value}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-300 mt-1.5 font-medium leading-tight group-hover:text-white transition-colors duration-300">
              {metric.label}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
