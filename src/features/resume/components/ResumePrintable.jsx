import React from 'react';

export default function ResumePrintable({ hero, portfolioData }) {
  return (
    <div id="printable-resume" className="hidden">
      <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '10px', marginBottom: '14px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 3px 0', color: '#0f172a' }}>
          {hero.name || 'Abdul Sami'}
        </h1>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
          {hero.titleTag || 'Full-Stack & AI Practitioner'}
        </div>
        <div style={{ fontSize: '10.5px', color: '#475569' }}>
          {hero.email && `Email: ${hero.email} | `}
          {hero.phone && `Phone: ${hero.phone} | `}
          {hero.location && `Location: ${hero.location}`}
        </div>
        <div style={{ fontSize: '10.5px', color: '#475569' }}>
          {hero.githubUrl && `GitHub: ${hero.githubUrl} | `}
          {hero.linkedinUrl && `LinkedIn: ${hero.linkedinUrl}`}
        </div>
      </div>

      {hero.bio && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '5px', color: '#0f172a' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '10.5px', lineHeight: '1.45', margin: 0, color: '#334155' }}>
            {hero.bio}
          </p>
        </div>
      )}

      {(portfolioData?.skills || []).length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '5px', color: '#0f172a' }}>
            Core Technical Competencies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '10.5px' }}>
            {(portfolioData?.skills || []).map((s) => (
              <div key={s.id} style={{ color: '#334155' }}>
                <strong>{s.name}</strong> — {s.level} {s.desc && `(${s.desc})`}
              </div>
            ))}
          </div>
        </div>
      )}

      {(portfolioData?.experiences || []).length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: '#0f172a' }}>
            Professional Experience
          </h2>
          {(portfolioData?.experiences || []).map((exp) => (
            <div key={exp.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>
                <span>{exp.role}</span>
                <span>{exp.period}</span>
              </div>
              <div style={{ fontSize: '10px', color: '#475569', marginBottom: '3px' }}>{exp.company}</div>
              {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '10px', color: '#334155' }}>
                  {exp.achievements.map((ach, i) => (
                    <li key={i} style={{ marginBottom: '1px' }}>{ach}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {(portfolioData?.education || []).length > 0 && (
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '3px', marginBottom: '6px', color: '#0f172a' }}>
            Education &amp; Certifications
          </h2>
          {(portfolioData?.education || []).map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px', fontSize: '10.5px', color: '#334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                <span>{edu.title}</span>
                <span>{edu.period}</span>
              </div>
              <div>{edu.institution}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
