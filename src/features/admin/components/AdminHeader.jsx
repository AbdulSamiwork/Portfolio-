import React from 'react';
import { Menu, Search, X, Sparkles, CheckCircle2, Eye, RotateCcw } from 'lucide-react';

export default function AdminHeader({
  activeTab,
  sidebarOpen,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  accentTheme,
  setAccentTheme,
  triggerToast,
  saveToast,
  handleClose,
  handleResetDefaults
}) {
  const themes = [
    { id: 'emerald', label: 'Emerald Matrix', color: '#34d399', bg: 'linear-gradient(135deg, #10b981, #34d399)' },
    { id: 'cyan', label: 'Cyber Cyan', color: '#00f2fe', bg: 'linear-gradient(135deg, #00f2fe, #4facfe)' },
    { id: 'violet', label: 'Neon Violet', color: '#c084fc', bg: 'linear-gradient(135deg, #c084fc, #a855f7)' },
    { id: 'amber', label: 'Solar Amber', color: '#fbbf24', bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
  ];

  return (
    <header className="admin-top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'none',
          }}
          className="mobile-toggle"
        >
          <Menu size={22} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h2 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, fontWeight: 700, textTransform: 'capitalize' }}>
            {activeTab === 'hero' ? 'Profile & Contact Channels Manager' : activeTab === 'education' ? 'Certifications Manager' : `${activeTab} Management`}
          </h2>
        </div>
      </div>

      {/* Header Live Search Input Bar */}
      <div style={{ display: 'flex', alignItems: 'center', background: '#0f172a', border: '1px solid #475569', borderRadius: '20px', padding: '0.4rem 0.85rem', gap: '0.5rem', width: '240px' }}>
        <Search size={15} style={{ color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Filter items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.82rem', outline: 'none', width: '100%' }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dynamic 4-Theme Color Scheme Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '0.35rem 0.75rem',
        }}
        title="Switch Active Portfolio Color Scheme"
      >
        <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Sparkles size={12} style={{ color: 'var(--accent-primary)' }} /> Theme:
        </span>
        {themes.map((th) => {
          const isActive = (accentTheme || 'emerald') === th.id;
          return (
            <button
              key={th.id}
              type="button"
              onClick={() => {
                setAccentTheme(th.id);
                triggerToast(`Theme switched to ${th.label}`);
              }}
              style={{
                width: isActive ? '24px' : '18px',
                height: isActive ? '24px' : '18px',
                borderRadius: '50%',
                background: th.bg,
                border: isActive ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: isActive ? `0 0 10px ${th.color}` : 'none',
                cursor: 'pointer',
                padding: 0,
                transform: isActive ? 'scale(1.12)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              title={`${th.label} (Click to activate)`}
              aria-label={`${th.label} Theme`}
            />
          );
        })}
      </div>

      {/* Toast Banner */}
      {saveToast && (
        <div
          className="animate-fade-in"
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            padding: '0.45rem 1rem',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <CheckCircle2 size={16} /> {saveToast}
        </div>
      )}

      {/* Right Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={handleClose}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.8rem' }}
          title="Close Admin Panel and view live portfolio"
        >
          <Eye size={14} /> Preview Live Site
        </button>
        <button
          onClick={handleResetDefaults}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.8rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          title="Reset all content to defaults"
        >
          <RotateCcw size={14} /> Reset Defaults
        </button>
        <button
          onClick={handleClose}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.2rem' }}
        >
          <X size={22} />
        </button>
      </div>
    </header>
  );
}
