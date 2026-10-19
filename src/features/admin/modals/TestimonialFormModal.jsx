import React from 'react';
import { X, Save } from 'lucide-react';

export default function TestimonialFormModal({
  isOpen,
  editingId,
  testiForm,
  setTestiForm,
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
            {editingId ? 'Edit Testimonial' : 'Add Client Recommendation'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="admin-modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Client / Author Name</label>
                <input
                  type="text"
                  required
                  value={testiForm.name}
                  onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>
              <div className="admin-input-group">
                <label>Role / Position Title</label>
                <input
                  type="text"
                  required
                  value={testiForm.role}
                  onChange={(e) => setTestiForm({ ...testiForm, role: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. CTO at HealthTech AI"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Company / Organization</label>
                <input
                  type="text"
                  required
                  value={testiForm.company}
                  onChange={(e) => setTestiForm({ ...testiForm, company: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. HealthTech AI (USA)"
                />
              </div>
              <div className="admin-input-group">
                <label>Date / Period</label>
                <input
                  type="text"
                  value={testiForm.date}
                  onChange={(e) => setTestiForm({ ...testiForm, date: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. July 2026"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-input-group">
                <label>Client Avatar Photo URL</label>
                <input
                  type="text"
                  value={testiForm.avatar}
                  onChange={(e) => setTestiForm({ ...testiForm, avatar: e.target.value })}
                  style={inputStyle}
                  placeholder="https://..."
                />
              </div>
              <div className="admin-input-group">
                <label>Rating (1 to 5 Stars)</label>
                <select
                  value={testiForm.rating}
                  onChange={(e) => setTestiForm({ ...testiForm, rating: Number(e.target.value) })}
                  style={inputStyle}
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★</option>
                  <option value={3}>3 Stars ★★★</option>
                </select>
              </div>
            </div>

            <div className="admin-input-group">
              <label>Testimonial Quote / Review Text</label>
              <textarea
                rows={4}
                required
                value={testiForm.content}
                onChange={(e) => setTestiForm({ ...testiForm, content: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Type the client recommendation quote..."
              />
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Testimonial</button>
          </div>
        </form>
      </div>
    </div>
  );
}
