import React from 'react';
import { X, Save } from 'lucide-react';

export default function ExperienceFormModal({
  isOpen,
  editingId,
  expForm,
  setExpForm,
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
            {editingId ? 'Edit Work Experience' : 'Add New Work Experience'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="admin-modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Role / Position Title</label>
                <input
                  type="text"
                  required
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Senior Full-Stack Engineer"
                />
              </div>
              <div className="admin-input-group">
                <label>Company / Organization</label>
                <input
                  type="text"
                  required
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Tech Solutions Inc."
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Time Period</label>
                <input
                  type="text"
                  required
                  value={expForm.period}
                  onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. 2023 - Present"
                />
              </div>
              <div className="admin-input-group">
                <label>Domain Badge</label>
                <input
                  type="text"
                  value={expForm.domain}
                  onChange={(e) => setExpForm({ ...expForm, domain: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Full-Stack Web"
                />
              </div>
              <div className="admin-input-group">
                <label>Category</label>
                <select
                  value={expForm.category || 'web'}
                  onChange={(e) => setExpForm({ ...expForm, category: e.target.value })}
                  style={inputStyle}
                >
                  <option value="web">Full-Stack Web</option>
                  <option value="ai">AI / ML System</option>
                  <option value="cloud">Cloud / DevOps</option>
                </select>
              </div>
            </div>

            <div className="admin-input-group">
              <label>Key Achievements (One bullet per line)</label>
              <textarea
                rows={4}
                value={expForm.achievements}
                onChange={(e) => setExpForm({ ...expForm, achievements: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Architected core web services...&#10;Integrated ML models into web dashboards..."
              />
            </div>

            <div className="admin-input-group">
              <label>Technologies Used (Comma separated)</label>
              <input
                type="text"
                value={expForm.skills}
                onChange={(e) => setExpForm({ ...expForm, skills: e.target.value })}
                style={inputStyle}
                placeholder="React, Node.js, PHP, PostgreSQL"
              />
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Experience</button>
          </div>
        </form>
      </div>
    </div>
  );
}
