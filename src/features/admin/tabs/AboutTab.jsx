import React from 'react';
import { Save } from 'lucide-react';

export default function AboutTab({
  aboutForm,
  setAboutForm,
  handleAboutSubmit,
  handleHighlightChange,
  inputStyle
}) {
  return (
    <div className="admin-card">
      <form onSubmit={handleAboutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div className="admin-input-group">
            <label>Section Subtitle</label>
            <input
              type="text"
              value={aboutForm.subtitle || aboutForm.sectionSubtitle || ''}
              onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value, sectionSubtitle: e.target.value })}
              placeholder="e.g. Bridging software engineering precision..."
              style={inputStyle}
            />
          </div>
          <div className="admin-input-group">
            <label>Section Main H2 Title</label>
            <input
              type="text"
              value={aboutForm.title || aboutForm.sectionTitle || ''}
              onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value, sectionTitle: e.target.value })}
              placeholder="e.g. Architecting the Fusion of Web & AI"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="admin-input-group">
          <label>Narrative Box Card Heading</label>
          <input
            type="text"
            value={aboutForm.cardHeading || ''}
            onChange={(e) => setAboutForm({ ...aboutForm, cardHeading: e.target.value })}
            placeholder="e.g. Engineering Beyond the Surface"
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div className="admin-input-group">
            <label>Academic Degree Tag</label>
            <input
              type="text"
              value={aboutForm.degree || ''}
              onChange={(e) => setAboutForm({ ...aboutForm, degree: e.target.value })}
              placeholder="e.g. B.S. Information Technology"
              style={inputStyle}
            />
          </div>
          <div className="admin-input-group">
            <label>University / Institution Badge</label>
            <input
              type="text"
              value={aboutForm.institution || ''}
              onChange={(e) => setAboutForm({ ...aboutForm, institution: e.target.value })}
              placeholder="e.g. University of the Punjab"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="admin-input-group">
          <label>Main Bio Paragraph 1</label>
          <textarea
            rows={3}
            value={aboutForm.paragraph1 || ''}
            onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div className="admin-input-group">
          <label>Main Bio Paragraph 2</label>
          <textarea
            rows={3}
            value={aboutForm.paragraph2 || ''}
            onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div className="admin-input-group">
          <label>Main Bio Paragraph 3 (Extended AI / ML Foundations)</label>
          <textarea
            rows={3}
            value={aboutForm.paragraph3 || ''}
            onChange={(e) => setAboutForm({ ...aboutForm, paragraph3: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div className="admin-input-group">
          <label>Core Philosophy Quote</label>
          <input
            type="text"
            value={aboutForm.philosophy || ''}
            onChange={(e) => setAboutForm({ ...aboutForm, philosophy: e.target.value })}
            placeholder="e.g. Bridging software engineering precision with data-driven predictive modeling."
            style={inputStyle}
          />
        </div>

        {/* Stats counters */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-accent)', marginBottom: '0.75rem', display: 'block' }}>Key Stats Indicators</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="admin-input-group">
              <label>Years Experience Number</label>
              <input type="text" value={aboutForm.stats?.yearsExp || ''} onChange={(e) => setAboutForm({ ...aboutForm, stats: { ...aboutForm.stats, yearsExp: e.target.value } })} placeholder="2+" style={inputStyle} />
            </div>
            <div className="admin-input-group">
              <label>Projects Completed Number</label>
              <input type="text" value={aboutForm.stats?.projectsCompleted || ''} onChange={(e) => setAboutForm({ ...aboutForm, stats: { ...aboutForm.stats, projectsCompleted: e.target.value } })} placeholder="15+" style={inputStyle} />
            </div>
            <div className="admin-input-group">
              <label>Technologies Mastered Count</label>
              <input type="text" value={aboutForm.stats?.techMastered || ''} onChange={(e) => setAboutForm({ ...aboutForm, stats: { ...aboutForm.stats, techMastered: e.target.value } })} placeholder="20+" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* 3 Core Highlight Showcase Cards */}
        <div style={{ background: 'rgba(0, 242, 254, 0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.15)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--cyan-accent)', display: 'block' }}>
            3 Core Highlight Showcase Cards (Full-Stack, AI, Cloud)
          </label>
          {[0, 1, 2].map((idx) => {
            const card = (aboutForm.highlights && aboutForm.highlights[idx]) || {};
            const fallbackNames = ['Card 1: Full-Stack Web', 'Card 2: Applied AI & ML', 'Card 3: Cloud & Production'];
            return (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>{fallbackNames[idx]}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Card Title</label>
                    <input
                      type="text"
                      value={card.title || ''}
                      onChange={(e) => handleHighlightChange(idx, 'title', e.target.value)}
                      placeholder="e.g. Full-Stack Web Mastery"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Pill Badge Text</label>
                    <input
                      type="text"
                      value={card.badge || ''}
                      onChange={(e) => handleHighlightChange(idx, 'badge', e.target.value)}
                      placeholder="e.g. MERN & Core PHP"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>Card Description</label>
                  <textarea
                    rows={2}
                    value={card.description || ''}
                    onChange={(e) => handleHighlightChange(idx, 'description', e.target.value)}
                    placeholder="Architecting robust applications..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={16} /> Save About Section
          </button>
        </div>
      </form>
    </div>
  );
}
