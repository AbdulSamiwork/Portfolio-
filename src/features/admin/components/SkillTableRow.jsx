import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function SkillTableRow({
  skill,
  setEditingId,
  setSkillForm,
  setModalType,
  requestConfirm,
  deleteSkill,
  triggerToast,
}) {
  const levelPercent =
    skill.level === 'Expert' ? 95 : skill.level === 'Advanced' ? 80 : skill.level === 'Intermediate' ? 65 : 45;
  const cat = (skill.category || 'web').toLowerCase().trim();
  const isCloud = cat === 'cloud' || cat === 'tools';
  const isAi = cat === 'ai';

  const badgeStyle = isCloud
    ? { background: 'rgba(6, 182, 212, 0.14)', color: '#38bdf8', border: '1px solid rgba(6, 182, 212, 0.35)' }
    : isAi
    ? { background: 'rgba(168, 85, 247, 0.14)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.35)' }
    : { background: 'rgba(16, 185, 129, 0.14)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)' };

  const badgeLabel = isCloud ? 'Cloud & Tools' : isAi ? 'AI / ML' : 'Full-Stack Web';
  const barGradient = isCloud
    ? 'linear-gradient(90deg, #06b6d4, #38bdf8)'
    : isAi
    ? 'linear-gradient(90deg, #8b5cf6, #c084fc)'
    : 'linear-gradient(90deg, #10b981, #34d399)';

  return (
    <tr style={{ transition: 'background 0.2s' }}>
      <td style={{ fontWeight: 700, color: '#fff' }}>{skill.name}</td>
      <td>
        <span
          style={{
            ...badgeStyle,
            padding: '0.22rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.74rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            letterSpacing: '0.02em',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: isCloud ? '#38bdf8' : isAi ? '#c084fc' : '#34d399',
            }}
          />
          {badgeLabel}
        </span>
      </td>
      <td style={{ width: '170px' }}>
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#e2e8f0',
            marginBottom: '0.25rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{skill.level}</span>
          <span style={{ color: isCloud ? '#38bdf8' : isAi ? '#c084fc' : 'var(--cyan-accent)', fontSize: '0.75rem' }}>
            {levelPercent}%
          </span>
        </div>
        <div
          style={{
            height: '6px',
            width: '100%',
            background: '#0f172a',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #334155',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${levelPercent}%`,
              background: barGradient,
              borderRadius: '4px',
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </td>
      <td style={{ color: '#cbd5e1', fontSize: '0.84rem', maxWidth: '300px' }}>{skill.desc}</td>
      <td style={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              setEditingId(skill.id);
              setSkillForm(skill);
              setModalType('skill');
            }}
            style={{
              background: 'rgba(0, 242, 254, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              color: 'var(--cyan-accent)',
              padding: '0.45rem',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.15s',
            }}
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => {
              requestConfirm({
                title: 'Delete Skill',
                message: `Are you sure you want to delete skill "${skill.name}"? This action cannot be undone.`,
                confirmText: 'Delete Skill',
                variant: 'danger',
                onConfirm: () => {
                  deleteSkill(skill.id);
                  triggerToast('Skill deleted!');
                },
              });
            }}
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              padding: '0.45rem',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.15s',
            }}
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
