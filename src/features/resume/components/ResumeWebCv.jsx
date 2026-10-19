import React from 'react';
import { FileText, Briefcase, GraduationCap } from 'lucide-react';

export default function ResumeWebCv({ hero, portfolioData }) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Executive Bio */}
      <div>
        <h4 className="text-base font-bold text-white mb-2">Executive Summary</h4>
        <p className="text-sm text-slate-300 leading-relaxed m-0">{hero.bio}</p>
      </div>

      {/* Skills Snapshot */}
      <div>
        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <FileText size={18} className="text-cyan-400" /> Technical Toolkit &amp; Competencies
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(portfolioData?.skills || []).slice(0, 8).map((s) => (
            <div
              key={s.id}
              className="bg-white/[0.02] border border-white/10 p-3 rounded-xl flex items-center justify-between transition-colors hover:border-[var(--accent-border)] hover:bg-white/5"
            >
              <strong className="text-white text-sm">{s.name}</strong>
              <span className="text-xs text-[var(--accent-primary)] font-semibold font-code">
                {s.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Snapshot */}
      <div>
        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Briefcase size={18} className="text-emerald-400" /> Professional Work Experience
        </h4>
        <div className="flex flex-col gap-3">
          {(portfolioData?.experiences || []).map((exp) => (
            <div
              key={exp.id}
              className="bg-white/[0.02] border border-white/10 p-4 rounded-xl transition-colors hover:border-white/20"
            >
              <div className="flex justify-between flex-wrap gap-1 mb-1">
                <strong className="text-white text-sm">{exp.role}</strong>
                <span className="text-[var(--accent-primary)] text-xs font-semibold">
                  {exp.period}
                </span>
              </div>
              <div className="text-slate-400 text-xs mb-2.5">{exp.company}</div>
              {Array.isArray(exp.achievements) && (
                <ul className="space-y-1 list-none p-0 m-0">
                  {exp.achievements.map((ach, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-[var(--accent-primary)]">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education Snapshot */}
      <div>
        <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <GraduationCap size={18} className="text-purple-400" /> Education &amp; Certifications
        </h4>
        <div className="flex flex-col gap-2.5">
          {(portfolioData?.education || []).map((edu) => (
            <div
              key={edu.id}
              className="bg-white/[0.02] border border-white/10 p-3.5 rounded-xl flex justify-between items-center transition-colors hover:border-white/20"
            >
              <div>
                <strong className="text-white text-sm">{edu.title}</strong>
                <div className="text-xs text-slate-400">{edu.institution}</div>
              </div>
              <span className="text-xs text-[var(--accent-primary)] font-semibold">
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
