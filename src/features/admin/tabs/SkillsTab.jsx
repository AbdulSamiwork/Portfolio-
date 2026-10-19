import React from 'react';
import { Plus } from 'lucide-react';
import SkillTableRow from '../components/SkillTableRow';

export default function SkillsTab({
  portfolioData,
  searchQuery,
  skillCategoryTab,
  setSkillCategoryTab,
  setEditingId,
  setSkillForm,
  setModalType,
  requestConfirm,
  deleteSkill,
  triggerToast
}) {
  const allSkills = portfolioData.skills || [];
  const webSkillsCount = allSkills.filter((s) => (s.category || 'web').toLowerCase().trim() === 'web').length;
  const aiSkillsCount = allSkills.filter((s) => (s.category || '').toLowerCase().trim() === 'ai').length;
  const cloudSkillsCount = allSkills.filter((s) => {
    const c = (s.category || '').toLowerCase().trim();
    return c === 'cloud' || c === 'tools';
  }).length;

  const filteredSkills = allSkills.filter((s) => {
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    const cat = (s.category || 'web').toLowerCase().trim();
    if (skillCategoryTab === 'web') return cat === 'web';
    if (skillCategoryTab === 'ai') return cat === 'ai';
    if (skillCategoryTab === 'cloud') return cat === 'cloud' || cat === 'tools';
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Skills', count: allSkills.length, color: '#38bdf8' },
    { id: 'web', label: 'Full-Stack Web', count: webSkillsCount, color: '#34d399' },
    { id: 'ai', label: 'AI & Data Science', count: aiSkillsCount, color: '#c084fc' },
    { id: 'cloud', label: 'Cloud & DevOps', count: cloudSkillsCount, color: '#38bdf8' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.92rem', color: '#f8fafc', fontWeight: 600 }}>
            Manage Core Technologies & Proficiencies
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Filter by category or search across your technical skill metrics.
          </div>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            const defaultCategory = skillCategoryTab === 'all' ? 'web' : skillCategoryTab;
            setSkillForm({ name: '', category: defaultCategory, level: 'Intermediate', desc: '' });
            setModalType('skill');
          }}
          className="btn btn-primary btn-sm"
        >
          <Plus size={15} /> Add New Skill
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          padding: '0.4rem',
          background: 'rgba(15, 23, 42, 0.75)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          alignItems: 'center',
        }}
      >
        {categories.map((tab) => {
          const isActive = skillCategoryTab === tab.id;
          const bgActive =
            tab.id === 'web'
              ? 'rgba(16, 185, 129, 0.18)'
              : tab.id === 'ai'
              ? 'rgba(168, 85, 247, 0.18)'
              : tab.id === 'cloud'
              ? 'rgba(6, 182, 212, 0.18)'
              : 'rgba(255, 255, 255, 0.12)';
          const borderActive =
            tab.id === 'web'
              ? '1px solid rgba(16, 185, 129, 0.45)'
              : tab.id === 'ai'
              ? '1px solid rgba(168, 85, 247, 0.45)'
              : tab.id === 'cloud'
              ? '1px solid rgba(6, 182, 212, 0.45)'
              : '1px solid rgba(255, 255, 255, 0.25)';

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSkillCategoryTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: isActive ? bgActive : 'transparent',
                border: isActive ? borderActive : '1px solid transparent',
                color: isActive ? tab.color : '#94a3b8',
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? tab.color : '#64748b',
                  fontWeight: 700,
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Level</th>
              <th>Description</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>
                    No skills found in this category
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {searchQuery ? `No matching skills for "${searchQuery}"` : 'Click "Add New Skill" above to register a skill here.'}
                  </div>
                </td>
              </tr>
            ) : (
              filteredSkills.map((skill) => (
                <SkillTableRow
                  key={skill.id}
                  skill={skill}
                  setEditingId={setEditingId}
                  setSkillForm={setSkillForm}
                  setModalType={setModalType}
                  requestConfirm={requestConfirm}
                  deleteSkill={deleteSkill}
                  triggerToast={triggerToast}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
