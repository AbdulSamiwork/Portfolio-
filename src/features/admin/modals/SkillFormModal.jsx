import React from 'react';
import { X, Save } from 'lucide-react';

export default function SkillFormModal({
  isOpen,
  editingId,
  skillForm,
  setSkillForm,
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
            {editingId ? 'Edit Skill Entry' : 'Add New Skill'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="admin-modal-body">
            <div className="admin-input-group">
              <label>Skill Name</label>
              <input
                type="text"
                required
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                style={inputStyle}
                placeholder="e.g. React.js, PyTorch, Core PHP"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Category</label>
                <select
                  value={skillForm.category === 'tools' ? 'cloud' : (skillForm.category || 'web')}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  style={inputStyle}
                >
                  <option value="web">Full-Stack Web</option>
                  <option value="ai">AI / ML / Data Science</option>
                  <option value="cloud">Cloud / DevOps & Tools</option>
                </select>
              </div>
              <div className="admin-input-group">
                <label>Proficiency Level</label>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  style={inputStyle}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            <div className="admin-input-group">
              <label>Description / Usage Summary</label>
              <textarea
                rows={3}
                value={skillForm.desc}
                onChange={(e) => setSkillForm({ ...skillForm, desc: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Short overview of how you use this skill..."
              />
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Skill</button>
          </div>
        </form>
      </div>
    </div>
  );
}
