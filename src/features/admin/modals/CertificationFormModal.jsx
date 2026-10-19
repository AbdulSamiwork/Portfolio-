import React from 'react';
import { X, Save } from 'lucide-react';

export default function CertificationFormModal({
  isOpen,
  editingId,
  eduForm,
  setEduForm,
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
            {editingId ? 'Edit Certification' : 'Add New Certification'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="admin-modal-body">
            <div className="admin-input-group">
              <label>Degree / Certification Title</label>
              <input
                type="text"
                required
                value={eduForm.title}
                onChange={(e) => setEduForm({ ...eduForm, title: e.target.value })}
                style={inputStyle}
                placeholder="e.g. Deep Learning Specialization"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Institution / Issuer</label>
                <input
                  type="text"
                  required
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Coursera / DeepLearning.AI"
                />
              </div>
              <div className="admin-input-group">
                <label>Time Period / Year</label>
                <input
                  type="text"
                  required
                  value={eduForm.period}
                  onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. 2024"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Badge Pill</label>
                <input
                  type="text"
                  value={eduForm.badge}
                  onChange={(e) => setEduForm({ ...eduForm, badge: e.target.value })}
                  style={inputStyle}
                  placeholder="Certified"
                />
              </div>
              <div className="admin-input-group">
                <label>Category</label>
                <select
                  value={eduForm.category}
                  onChange={(e) => setEduForm({ ...eduForm, category: e.target.value })}
                  style={inputStyle}
                >
                  <option value="web">Full-Stack Web</option>
                  <option value="ai">AI / ML</option>
                  <option value="cloud">Cloud / DevOps</option>
                </select>
              </div>
            </div>

            <div className="admin-input-group">
              <label>Description / Core Focus</label>
              <textarea
                rows={3}
                value={eduForm.desc}
                onChange={(e) => setEduForm({ ...eduForm, desc: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Overview of topics mastered..."
              />
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Certification</button>
          </div>
        </form>
      </div>
    </div>
  );
}
