import React from 'react';
import { Camera, Mail, Phone, MapPin, Github, Linkedin, FileText, Upload, Save } from 'lucide-react';

export default function HeroTab({
  heroForm,
  setHeroForm,
  handleHeroSubmit,
  handleProfileImageFile,
  handleResumePdfFile,
  portfolioData,
  inputStyle
}) {
  return (
    <div className="admin-card">
      <form onSubmit={handleHeroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Avatar Upload Card */}
        <div style={{ background: 'rgba(0, 242, 254, 0.04)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.2)', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <img src={heroForm.profileImage} alt="Avatar Preview" style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--cyan-accent)' }} />
          <div style={{ flexGrow: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--cyan-accent)', fontWeight: 600, marginBottom: '0.3rem', display: 'block' }}>
              Profile Photo Manager (URL or Local Upload)
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input type="text" value={heroForm.profileImage} onChange={(e) => setHeroForm({ ...heroForm, profileImage: e.target.value })} placeholder="/images/abdul_sami_profile.webp" style={inputStyle} />
              <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <Camera size={14} /> Upload File
                <input type="file" onChange={handleProfileImageFile} accept="image/*" style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div className="admin-input-group">
            <label>Full Name</label>
            <input type="text" value={heroForm.name} onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })} style={inputStyle} />
          </div>
          <div className="admin-input-group">
            <label>Title Tagline Badge</label>
            <input type="text" value={heroForm.titleTag} onChange={(e) => setHeroForm({ ...heroForm, titleTag: e.target.value })} style={inputStyle} />
          </div>
        </div>

        <div className="admin-input-group">
          <label>Main Headline (H1)</label>
          <input type="text" value={heroForm.headline} onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })} style={inputStyle} />
        </div>

        <div className="admin-input-group">
          <label>Hero Bio Paragraph</label>
          <textarea rows={3} value={heroForm.bio} onChange={(e) => setHeroForm({ ...heroForm, bio: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div className="admin-input-group">
            <label>Primary CTA Text</label>
            <input type="text" value={heroForm.primaryCtaText} onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })} style={inputStyle} />
          </div>
          <div className="admin-input-group">
            <label>Primary CTA Target Link</label>
            <input type="text" value={heroForm.primaryCtaLink} onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })} style={inputStyle} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div className="admin-input-group">
            <label>Secondary CTA Text</label>
            <input type="text" value={heroForm.secondaryCtaText} onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })} style={inputStyle} />
          </div>
          <div className="admin-input-group">
            <label>Secondary CTA Target Link</label>
            <input type="text" value={heroForm.secondaryCtaLink} onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })} style={inputStyle} />
          </div>
        </div>

        {/* Contact & Social Channels Card */}
        <div style={{ background: 'rgba(52, 211, 153, 0.05)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(52, 211, 153, 0.25)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 700, fontSize: '0.95rem' }}>
              <Mail size={18} /> Contact & Social Channels (Live Sync Across Site)
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              Syncs to Header, Footer &amp; Contact Us
            </span>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
            Save your contact email, phone number, location, and social profile links. Any changes saved here immediately update the website navigation header, footer reach section, and contact section.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div className="admin-input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={14} style={{ color: 'var(--cyan-accent)' }} /> Contact Email
              </label>
              <input
                type="email"
                required
                value={heroForm.email || ''}
                onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                placeholder="e.g. sb850839@gmail.com"
                style={inputStyle}
              />
            </div>

            <div className="admin-input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={14} style={{ color: '#34d399' }} /> Phone / WhatsApp Number
              </label>
              <input
                type="text"
                value={heroForm.phone || ''}
                onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                placeholder="e.g. +92-3228483029"
                style={inputStyle}
              />
            </div>

            <div className="admin-input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={14} style={{ color: '#a855f7' }} /> Location / Remote Status
              </label>
              <input
                type="text"
                value={heroForm.location || ''}
                onChange={(e) => setHeroForm({ ...heroForm, location: e.target.value })}
                placeholder="e.g. Pakistan (Available Worldwide Remote)"
                style={inputStyle}
              />
            </div>

            <div className="admin-input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Github size={14} style={{ color: '#f1f5f9' }} /> GitHub Profile Link
              </label>
              <input
                type="text"
                value={heroForm.githubUrl || ''}
                onChange={(e) => setHeroForm({ ...heroForm, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                style={inputStyle}
              />
            </div>

            <div className="admin-input-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Linkedin size={14} style={{ color: '#38bdf8' }} /> LinkedIn Profile Link
              </label>
              <input
                type="text"
                value={heroForm.linkedinUrl || ''}
                onChange={(e) => setHeroForm({ ...heroForm, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Resume PDF Manager Card */}
        <div style={{ background: 'rgba(0, 242, 254, 0.05)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.25)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>
            <FileText size={18} /> Official Resume / CV PDF Attachment Manager
          </div>
          <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
            Attach your official PDF resume file. Visitors will download this PDF file when clicking the "Download PDF" button in the portfolio modal.
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={heroForm.resumeUrl !== undefined ? heroForm.resumeUrl : (portfolioData.resumeUrl || '')}
              onChange={(e) => setHeroForm({ ...heroForm, resumeUrl: e.target.value })}
              placeholder="https://.../my_resume.pdf or /resume.pdf"
              style={inputStyle}
            />
            <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <Upload size={14} /> Upload PDF File
              <input type="file" onChange={handleResumePdfFile} accept=".pdf" style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={16} /> Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
