import React from 'react';
import { Rocket, Code2, Briefcase, GraduationCap, Plus, Download, User, Edit, Database } from 'lucide-react';

export default function OverviewTab({
  portfolioData,
  authToken,
  setActiveTab,
  setModalType,
  setEditingId,
  setProjectForm,
  setSkillForm,
  exportPortfolioJSON
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* KPI Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Total Projects</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
              {portfolioData.projects?.length || 0}
            </div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(0, 242, 254, 0.1)', borderRadius: '12px', color: 'var(--cyan-accent)' }}>
            <Rocket size={24} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Skill Items</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
              {portfolioData.skills?.length || 0}
            </div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '12px', color: '#34d399' }}>
            <Code2 size={24} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Work Experiences</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
              {portfolioData.experiences?.length || 0}
            </div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(192, 132, 252, 0.1)', borderRadius: '12px', color: '#c084fc' }}>
            <Briefcase size={24} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div>
            <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Certifications</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
              {portfolioData.education?.length || 0}
            </div>
          </div>
          <div style={{ padding: '0.75rem', background: 'rgba(251, 146, 60, 0.1)', borderRadius: '12px', color: '#fb923c' }}>
            <GraduationCap size={24} />
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="admin-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08), rgba(0, 0, 0, 0.4))', border: '1px solid rgba(0, 242, 254, 0.25)' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontWeight: 700 }}>Quick Administrative Actions</h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Manage portfolio content dynamically or trigger instant backup downloads.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setModalType('project');
              setEditingId(null);
              setProjectForm({ title: '', subtitle: '', category: 'web', categoryBadge: 'Full-Stack Web App', image: '/images/project_gristmill.webp', tech: '', summary: '', highlights: '', github: 'https://github.com/Abdul-Sami1122' });
            }}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} /> Add Project
          </button>
          <button
            onClick={() => {
              setModalType('skill');
              setEditingId(null);
              setSkillForm({ name: '', category: 'web', level: 'Intermediate', desc: '' });
            }}
            className="btn btn-secondary btn-sm"
          >
            <Plus size={15} /> Add Skill
          </button>
          <button onClick={exportPortfolioJSON} className="btn btn-secondary btn-sm">
            <Download size={15} /> Export JSON
          </button>
        </div>
      </div>

      {/* Recent Activity / System Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <div className="admin-card">
          <h4 style={{ fontSize: '1rem', color: '#fff', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} style={{ color: 'var(--cyan-accent)' }} /> Profile Snapshot
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img src={portfolioData.hero?.profileImage} alt="Avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--cyan-accent)' }} />
            <div>
              <div style={{ fontWeight: 700, color: '#fff' }}>{portfolioData.hero?.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>{portfolioData.hero?.titleTag}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.1rem' }}>{portfolioData.hero?.email}</div>
            </div>
          </div>
          <button onClick={() => setActiveTab('hero')} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            <Edit size={14} /> Edit Profile & Hero
          </button>
        </div>

        <div className="admin-card">
          <h4 style={{ fontSize: '1rem', color: '#fff', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={18} style={{ color: '#34d399' }} /> System Connectivity Status
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#94a3b8' }}>Core PHP API:</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>Active ({import.meta.env.DEV ? 'http://localhost/api' : '/api (Live Production)'})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ color: '#94a3b8' }}>LocalStorage Sync:</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>Enabled (`abdul_sami_portfolio_v1`)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Auth Session Token:</span>
              <span style={{ color: 'var(--cyan-accent)', fontFamily: 'var(--font-code)', fontSize: '0.75rem' }}>{authToken?.slice(0, 18)}...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
