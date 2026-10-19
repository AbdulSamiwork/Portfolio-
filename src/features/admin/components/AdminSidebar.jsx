import React from 'react';
import {
  Settings, LogOut, LayoutDashboard, User, Layers, Code2, Briefcase,
  Rocket, GraduationCap, MessageSquareQuote, MessageSquare, Database
} from 'lucide-react';

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  portfolioData,
  adminUser,
  adminLogout
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'hero', label: 'Profile & Contact Info', icon: <User size={18} /> },
    { id: 'about', label: 'About Me', icon: <Layers size={18} /> },
    { id: 'skills', label: 'Skills Matrix', icon: <Code2 size={18} />, count: portfolioData.skills?.length },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} />, count: portfolioData.experiences?.length },
    { id: 'projects', label: 'Projects Gallery', icon: <Rocket size={18} />, count: portfolioData.projects?.length },
    { id: 'education', label: 'Certifications', icon: <GraduationCap size={18} />, count: portfolioData.education?.length },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquareQuote size={18} />, count: portfolioData.testimonials?.length },
    { id: 'messages', label: 'Contact Inbox', icon: <MessageSquare size={18} />, count: (portfolioData.messages || []).filter((m) => !m.read).length || (portfolioData.messages || []).length },
    { id: 'settings', label: 'System & Backup', icon: <Database size={18} /> },
  ];

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-header">
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#07090e',
            fontWeight: 800,
            fontSize: '1rem',
          }}
        >
          <Settings size={20} />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.98rem', whiteSpace: 'nowrap' }}>Control Panel</div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
            <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
            Session Active
          </div>
        </div>
      </div>

      <div className="admin-nav-list">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.count !== undefined && (
              <span
                style={{
                  padding: '0.15rem 0.5rem',
                  borderRadius: '12px',
                  background: activeTab === item.id ? 'var(--cyan-accent)' : 'rgba(255, 255, 255, 0.08)',
                  color: activeTab === item.id ? '#07090e' : '#94a3b8',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                }}
              >
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="admin-sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0, 242, 254, 0.15)',
                border: '1px solid var(--cyan-accent)',
                color: 'var(--cyan-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{adminUser?.username || 'admin'}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Administrator</div>
            </div>
          </div>

          <button
            onClick={adminLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              padding: '0.4rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
