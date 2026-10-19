import React from 'react';
import { X, Save, Camera } from 'lucide-react';

export default function ProjectFormModal({
  isOpen,
  editingId,
  projectForm,
  setProjectForm,
  handleProjectImageFile,
  onSave,
  onClose,
  inputStyle
}) {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
            {editingId ? 'Edit Project Showcase' : 'Add New Project Showcase'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="admin-modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Project Title</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Gristmill Software System"
                />
              </div>
              <div className="admin-input-group">
                <label>Subtitle Tag</label>
                <input
                  type="text"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Enterprise Industrial Operations Portal"
                />
              </div>
            </div>

            {/* Cover Image Manager */}
            <div className="admin-input-group">
              <label>Cover Image (URL or Direct Upload)</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  style={inputStyle}
                  placeholder="/images/project_gristmill.webp"
                />
                <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <Camera size={14} /> Upload
                  <input type="file" onChange={handleProjectImageFile} accept="image/*" style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Category Badge Text</label>
                <input
                  type="text"
                  value={projectForm.categoryBadge}
                  onChange={(e) => setProjectForm({ ...projectForm, categoryBadge: e.target.value })}
                  style={inputStyle}
                  placeholder="Full-Stack Web App"
                />
              </div>
              <div className="admin-input-group">
                <label>Category Filter</label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  style={inputStyle}
                >
                  <option value="web">Full-Stack Web</option>
                  <option value="ai">AI / ML System</option>
                  <option value="cloud">Cloud / DevOps</option>
                </select>
              </div>
            </div>

            {/* In Progress Status Toggle */}
            <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fbbf24' }}>In Progress Status</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Displays an "In Progress" badge on the project card</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={projectForm.isInProgress || false}
                  onChange={(e) => setProjectForm({ ...projectForm, isInProgress: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#f59e0b' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{projectForm.isInProgress ? 'In Progress' : 'Completed'}</span>
              </label>
            </div>

            {/* Live Demo Toggle & URL Input */}
            <div style={{ background: 'rgba(0, 242, 254, 0.05)', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.2)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--cyan-accent)' }}>Live Demo Button Control</div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>Show or hide the "Live Demo" button on this card</div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={projectForm.showDemo !== false}
                    onChange={(e) => setProjectForm({ ...projectForm, showDemo: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--cyan-accent)' }}
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{projectForm.showDemo !== false ? 'Show Demo' : 'Hide Demo'}</span>
                </label>
              </div>

              {projectForm.showDemo !== false && (
                <div className="admin-input-group">
                  <label>Live Demo Target URL</label>
                  <input
                    type="text"
                    value={projectForm.demoUrl || projectForm.demo || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value, demo: e.target.value })}
                    style={inputStyle}
                    placeholder="https://your-live-demo-app.com"
                  />
                </div>
              )}
            </div>

            <div className="admin-input-group">
              <label>GitHub Repository URL</label>
              <input
                type="text"
                value={projectForm.github}
                onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                style={inputStyle}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="admin-input-group">
              <label>Tech Stack Tags (Comma separated)</label>
              <input
                type="text"
                value={projectForm.tech}
                onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                style={inputStyle}
                placeholder="React, Core PHP, MySQL, Tailwind"
              />
            </div>

            <div className="admin-input-group">
              <label>Project Summary</label>
              <textarea
                rows={2}
                value={projectForm.summary}
                onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Short summary..."
              />
            </div>

            <div className="admin-input-group">
              <label>Highlights & Deliverables (One per line)</label>
              <textarea
                rows={3}
                value={projectForm.highlights}
                onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Architected automated pipeline...&#10;Reduced latency by 45%..."
              />
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}
