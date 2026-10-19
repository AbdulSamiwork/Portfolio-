import React from 'react';
import { Sparkles, Database, Download, Upload, RotateCcw } from 'lucide-react';

export default function SettingsTab({
  accentTheme,
  setAccentTheme,
  triggerToast,
  exportPortfolioJSON,
  handleImportFile,
  handleResetDefaults
}) {
  const themes = [
    { id: 'emerald', label: 'Emerald Matrix', subtitle: 'Terminal Mint & Hacker Tech', color: '#34d399', border: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
    { id: 'cyan', label: 'Cyber Cyan', subtitle: 'Electric Aqua & Sci-Fi Core', color: '#00f2fe', border: '#4facfe', gradient: 'linear-gradient(135deg, #00f2fe, #4facfe)' },
    { id: 'violet', label: 'Neon Violet', subtitle: 'Deep Cyber AI & Neural Indigo', color: '#c084fc', border: '#a855f7', gradient: 'linear-gradient(135deg, #c084fc, #a855f7)' },
    { id: 'amber', label: 'Solar Amber', subtitle: 'Luxury Gold & High Velocity', color: '#fbbf24', border: '#f59e0b', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Theme Engine & Color Schemes Card */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} /> Visual Theme &amp; Color Scheme
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid rgba(52, 211, 153, 0.25)', fontWeight: 600 }}>
            Active: {(accentTheme || 'emerald').toUpperCase()}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem' }}>
          Choose your portfolio accent color palette. Switching a theme instantly transforms buttons, glow effects, badge borders, and laser lines across the entire website and admin panel.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {themes.map((t) => {
            const isCurrent = (accentTheme || 'emerald') === t.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setAccentTheme(t.id);
                  triggerToast(`Active theme switched to ${t.label}!`);
                }}
                style={{
                  background: isCurrent ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                  border: isCurrent ? `2px solid ${t.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  boxShadow: isCurrent ? `0 0 18px ${t.color}33` : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: t.gradient, boxShadow: `0 0 10px ${t.color}66` }} />
                  {isCurrent ? (
                    <span style={{ fontSize: '0.72rem', background: t.color, color: '#090d16', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 800 }}>
                      ACTIVE
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Click to apply</span>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{t.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{t.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backup Card */}
      <div className="admin-card">
        <h3 style={{ fontSize: '1.1rem', color: '#fff', marginTop: 0, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={20} style={{ color: 'var(--cyan-accent)' }} /> Data Backup & Synchronization
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
          Export your entire portfolio content as a single JSON file or upload a backup file to restore your portfolio configuration instantly.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={exportPortfolioJSON} className="btn btn-primary">
            <Download size={16} /> Export Portfolio JSON Backup
          </button>

          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={16} /> Import JSON Backup File
            <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Reset Defaults Card */}
      <div className="admin-card" style={{ border: '1px solid rgba(239, 68, 68, 0.25)', background: 'rgba(239, 68, 68, 0.04)' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#ef4444', marginTop: 0, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RotateCcw size={20} /> Reset System Defaults
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
          This will revert all modified portfolio content (hero, about, skills, projects, certifications) back to initial application defaults and purge local storage.
        </p>

        <button
          onClick={handleResetDefaults}
          className="btn btn-secondary"
          style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
        >
          <RotateCcw size={16} /> Revert All Portfolio Data to Defaults
        </button>
      </div>
    </div>
  );
}
