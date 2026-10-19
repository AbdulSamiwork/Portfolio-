import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ExperienceTab({
  portfolioData,
  searchQuery,
  setEditingId,
  setExpForm,
  setModalType,
  requestConfirm,
  deleteExperience,
  triggerToast
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
          Timeline items for work experience and professional history.
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setExpForm({ role: '', company: '', period: '', domain: 'Full-Stack Web', category: 'web', achievements: '', skills: '' });
            setModalType('exp');
          }}
          className="btn btn-primary btn-sm"
        >
          <Plus size={15} /> Add Experience
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Role & Company</th>
              <th>Period</th>
              <th>Domain Tag</th>
              <th>Category</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.experiences
              ?.filter((e) => !searchQuery || e.role.toLowerCase().includes(searchQuery.toLowerCase()) || e.company.toLowerCase().includes(searchQuery.toLowerCase()))
              ?.map((exp) => (
                <tr key={exp.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{exp.role}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>{exp.company}</div>
                  </td>
                  <td>{exp.period}</td>
                  <td><span className="pill">{exp.domain}</span></td>
                  <td>
                    {(() => {
                      const cat = (exp.category || 'web').toLowerCase().trim();
                      const isCloud = cat === 'cloud' || cat === 'tools';
                      const isAi = cat === 'ai';
                      const badgeStyle = isCloud
                        ? { background: 'rgba(6, 182, 212, 0.14)', color: '#38bdf8', border: '1px solid rgba(6, 182, 212, 0.35)' }
                        : isAi
                        ? { background: 'rgba(168, 85, 247, 0.14)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.35)' }
                        : { background: 'rgba(16, 185, 129, 0.14)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.35)' };
                      const badgeLabel = isCloud ? 'Cloud / DevOps' : isAi ? 'AI / ML' : 'Web';
                      return (
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
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: isCloud ? '#38bdf8' : isAi ? '#c084fc' : '#34d399' }} />
                          {badgeLabel}
                        </span>
                      );
                    })()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => {
                          setEditingId(exp.id);
                          setExpForm({
                            ...exp,
                            achievements: Array.isArray(exp.achievements) ? exp.achievements.join('\n') : exp.achievements,
                            skills: Array.isArray(exp.skills) ? exp.skills.join(', ') : exp.skills,
                          });
                          setModalType('exp');
                        }}
                        style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--cyan-accent)', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => {
                          requestConfirm({
                            title: 'Delete Experience Entry',
                            message: `Are you sure you want to delete the experience entry for "${exp.role}"?`,
                            confirmText: 'Delete Experience',
                            variant: 'danger',
                            onConfirm: () => {
                              deleteExperience(exp.id);
                              triggerToast('Experience deleted!');
                            },
                          });
                        }}
                        style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
