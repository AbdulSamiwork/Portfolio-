import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  X, Save, RotateCcw, Plus, Trash2, Settings, Lock, LogOut, Key, Camera,
  User, Layers, Code2, Briefcase, Rocket, GraduationCap, CheckCircle2, AlertCircle, Image,
  Search, Eye, Download, Upload, LayoutDashboard, Database, RefreshCw, Menu, Edit, Sparkles, ExternalLink, ShieldCheck,
  MessageSquare, Star, Mail, FileText, Send, MessageSquareQuote, Quote, Phone, MapPin, Github, Linkedin
} from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function AdminModal() {
  const {
    portfolioData,
    authToken,
    adminUser,
    authError,
    isAdminOpen,
    setIsAdminOpen,
    adminLogin,
    adminLogout,
    resetToDefaults,
    exportPortfolioJSON,
    importPortfolioJSON,
    updateHero,
    updateAbout,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
    addProject,
    updateProject,
    deleteProject,
    addEducation,
    updateEducation,
    deleteEducation,
    deleteMessage,
    toggleStarMessage,
    markMessageRead,
    updateResumeUrl,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    uploadFile,
    accentTheme,
    setAccentTheme,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('overview');
  const [saveToast, setSaveToast] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Reply state
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (msg) => {
    if (!replyText.trim()) return;
    markMessageRead(msg.id);
    const subject = `Re: ${msg.subject || 'Portfolio Inquiry'}`;
    const body = `Hi ${msg.name},\n\n${replyText}\n\nBest regards,\n${portfolioData.hero?.name || 'Abdul Sami'}`;

    window.location.href = `mailto:${msg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    triggerToast(`Email client launched to reply to ${msg.email}!`);
    setReplyingId(null);
    setReplyText('');
  };

  // Login form state
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  // Local form states
  const [heroForm, setHeroForm] = useState(portfolioData.hero || {});
  const [aboutForm, setAboutForm] = useState(portfolioData.about || {});

  useEffect(() => {
    if (portfolioData?.hero) {
      setHeroForm(portfolioData.hero);
    }
  }, [portfolioData?.hero]);

  useEffect(() => {
    if (portfolioData?.about) {
      setAboutForm(portfolioData.about);
    }
  }, [portfolioData?.about]);

  // Modals state for Add / Edit
  const [modalType, setModalType] = useState(null); // 'skill' | 'exp' | 'project' | 'edu'
  const [editingId, setEditingId] = useState(null);

  // Form states for items
  const [skillForm, setSkillForm] = useState({ name: '', category: 'web', level: 'Intermediate', desc: '' });
  const [expForm, setExpForm] = useState({ role: '', company: '', period: '', domain: 'Full-Stack Web', category: 'web', achievements: '', skills: '' });
  const [projectForm, setProjectForm] = useState({
    title: '', subtitle: '', category: 'web', categoryBadge: 'Full-Stack Web App',
    image: '/images/project_gristmill.webp', tech: '', summary: '', highlights: '', github: 'https://github.com/Abdul-Sami1122',
    showDemo: true, demoUrl: 'https://github.com/Abdul-Sami1122', isInProgress: false
  });
  const [eduForm, setEduForm] = useState({ type: 'certification', title: '', institution: '', period: '', badge: 'Certified', category: 'web', desc: '' });
  const [testiForm, setTestiForm] = useState({
    name: '',
    role: '',
    company: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    content: '',
    date: 'July 2026',
  });

  const triggerToast = (msg = 'Saved Successfully!') => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  // Custom Confirmation Dialog State (replaces browser default window.confirm & alert)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'danger',
    onConfirm: () => {},
  });

  const requestConfirm = ({
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    onConfirm,
  }) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      variant,
      onConfirm: () => {
        onConfirm?.();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closeConfirm = () => {
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const handleResetDefaults = () => {
    requestConfirm({
      title: 'Reset System Defaults',
      message: (
        <span>
          Are you sure you want to revert all portfolio data to initial system defaults?
          <br /><br />
          <span style={{ color: '#fbbf24', fontWeight: 600 }}>Warning:</span> All custom changes to hero details, bio, skills matrix, projects showcase, and certifications will be permanently reverted.
        </span>
      ),
      confirmText: 'Revert to Defaults',
      cancelText: 'Cancel',
      variant: 'warning',
      onConfirm: () => {
        resetToDefaults();
        triggerToast('Portfolio content reverted to system defaults!');
      },
    });
  };

  const handleClose = () => {
    setIsAdminOpen(false);
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('/sami')) {
      window.history.pushState(null, '', '/');
    }
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('sami')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await adminLogin(username, password);
    if (success) {
      setPassword('');
      triggerToast('Authenticated Admin Session Started');
    }
  };

  const handleProfileImageFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      triggerToast('Uploading profile photo...');
      const url = await uploadFile(file);
      if (url) {
        setHeroForm((prev) => ({ ...prev, profileImage: url }));
        updateHero({ profileImage: url });
        triggerToast('Profile photo saved permanently!');
      }
    }
  };

  const handleProjectImageFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      triggerToast('Uploading project image...');
      const url = await uploadFile(file);
      if (url) {
        setProjectForm((prev) => ({ ...prev, image: url }));
        triggerToast('Project image attached successfully!');
      }
    }
  };

  const handleResumePdfFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      triggerToast('Uploading CV / Resume PDF...');
      const url = await uploadFile(file);
      if (url) {
        updateResumeUrl(url);
        triggerToast('Resume PDF saved to database and live server!');
      } else {
        triggerToast('Failed to upload PDF file. Please try again.');
      }
    }
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    updateHero({ ...heroForm, resumeUrl: portfolioData.resumeUrl });
    triggerToast('Profile & Contact Channels updated across Header, Footer & Contact section!');
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    updateAbout(aboutForm);
    triggerToast('About section updated!');
  };

  // Skill Save
  const handleSaveSkill = (e) => {
    e.preventDefault();
    if (editingId) {
      updateSkill(editingId, skillForm);
      triggerToast('Skill updated!');
    } else {
      addSkill(skillForm);
      triggerToast('New skill added!');
    }
    setModalType(null);
    setEditingId(null);
  };

  // Experience Save
  const handleSaveExp = (e) => {
    e.preventDefault();
    const formattedExp = {
      ...expForm,
      category: expForm.category || 'web',
      achievements: typeof expForm.achievements === 'string'
        ? expForm.achievements.split('\n').map((a) => a.trim()).filter(Boolean)
        : (Array.isArray(expForm.achievements) ? expForm.achievements : []),
      skills: typeof expForm.skills === 'string'
        ? expForm.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : (Array.isArray(expForm.skills) ? expForm.skills : []),
    };

    if (editingId) {
      updateExperience(editingId, formattedExp);
      triggerToast('Experience updated successfully!');
    } else {
      addExperience(formattedExp);
      triggerToast('New experience added successfully!');
    }
    setModalType(null);
    setEditingId(null);
  };

  // Project Save
  const handleSaveProject = (e) => {
    e.preventDefault();
    const formattedProject = {
      ...projectForm,
      tech: typeof projectForm.tech === 'string'
        ? projectForm.tech.split(',').map((s) => s.trim()).filter(Boolean)
        : projectForm.tech,
      highlights: typeof projectForm.highlights === 'string'
        ? projectForm.highlights.split('\n').map((s) => s.trim()).filter(Boolean)
        : projectForm.highlights,
      showDemo: projectForm.showDemo !== false,
      isInProgress: !!projectForm.isInProgress,
      demoUrl: projectForm.demoUrl || projectForm.demo || 'https://github.com/Abdul-Sami1122',
      demo: projectForm.demoUrl || projectForm.demo || 'https://github.com/Abdul-Sami1122',
    };
    if (editingId) {
      updateProject(editingId, formattedProject);
      triggerToast('Project updated!');
    } else {
      addProject(formattedProject);
      triggerToast('New project added!');
    }
    setModalType(null);
    setEditingId(null);
  };

  // Education Save
  const handleSaveEdu = (e) => {
    e.preventDefault();
    if (editingId) {
      updateEducation(editingId, eduForm);
      triggerToast('Certification updated!');
    } else {
      addEducation(eduForm);
      triggerToast('New certification added!');
    }
    setModalType(null);
    setEditingId(null);
  };

  // Testimonial Save
  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    const payload = {
      ...testiForm,
      content: testiForm.content || testiForm.quote || '',
      quote: testiForm.content || testiForm.quote || '',
    };
    if (editingId) {
      updateTestimonial(editingId, payload);
      triggerToast('Testimonial updated!');
    } else {
      addTestimonial(payload);
      triggerToast('New testimonial added!');
    }
    setModalType(null);
    setEditingId(null);
  };

  // JSON File Import
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importPortfolioJSON(event.target.result);
        if (success) {
          triggerToast('Portfolio backup imported successfully!');
        } else {
          requestConfirm({
            title: 'Import Failed',
            message: 'Failed to import JSON data. The file format is invalid or corrupted.',
            confirmText: 'Understood',
            cancelText: null,
            variant: 'warning',
            onConfirm: () => {},
          });
        }
      };
      reader.readAsText(file);
    }
  };

  // Common Input Component Style
  const inputStyle = {
    width: '100%',
    background: '#0f172a',
    border: '1px solid #475569',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#ffffff',
    fontSize: '0.92rem',
    fontWeight: 500,
    outline: 'none',
  };

  if (!isAdminOpen) return null;

  return (
    <div className="admin-dashboard-overlay">
      
      {/* AUTHENTICATION LOCK SCREEN */}
      {!authToken ? (
        <div style={{ margin: 'auto', maxWidth: '440px', width: '100%', padding: '2rem' }}>
          <div
            className="admin-card"
            style={{
              textAlign: 'center',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              boxShadow: '0 20px 60px rgba(0, 242, 254, 0.15)',
              padding: '2.5rem 2rem',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 242, 254, 0.12)',
                color: 'var(--cyan-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
              }}
            >
              <ShieldCheck size={36} />
            </div>
            <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem', fontWeight: 800 }}>
              Admin Control Center
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.75rem' }}>
              Authenticate with your admin credentials to access the management portal.
            </p>

            {authError && (
              <div
                style={{
                  padding: '0.75rem',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#fca5a5',
                  fontSize: '0.82rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <AlertCircle size={16} /> {authError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', display: 'block' }}>Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', display: 'block' }}>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  style={inputStyle}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <Key size={16} /> Unlock Dashboard
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
              <span>Protected Administrator Session</span>
              <button
                onClick={handleClose}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Close & Return to Site
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* MAIN AUTHENTICATED DASHBOARD */
        <>
          {/* LEFT SIDEBAR NAVIGATION */}
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

            {/* Sidebar Nav Links */}
            <div className="admin-nav-list">
              {[
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
              ].map((item) => (
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

            {/* Sidebar Footer User Info */}
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

          {/* MAIN CONTENT WRAPPER */}
          <div className="admin-main-wrapper">
            
            {/* TOP HEADER */}
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
                {[
                  { id: 'emerald', label: 'Emerald Matrix', color: '#34d399', bg: 'linear-gradient(135deg, #10b981, #34d399)' },
                  { id: 'cyan', label: 'Cyber Cyan', color: '#00f2fe', bg: 'linear-gradient(135deg, #00f2fe, #4facfe)' },
                  { id: 'violet', label: 'Neon Violet', color: '#c084fc', bg: 'linear-gradient(135deg, #c084fc, #a855f7)' },
                  { id: 'amber', label: 'Solar Amber', color: '#fbbf24', bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
                ].map((th) => {
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

            {/* CONTENT WORKSPACE AREA WITH TAB TRANSITION ANIMATION */}
            <main key={activeTab} className="admin-content-area admin-tab-content">
              
              {/* TAB 1: OVERVIEW DASHBOARD */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {/* KPI Stat Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    <div className="admin-stat-card">
                      <div>
                        <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Total Projects</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
                          {portfolioData.projects?.length || 0}
                        </div>
                      </div>
                      <div style={{ padding: '0.75rem', background: 'rgba(0, 242, 254, 0.1)', borderRadius: '12px', color: 'var(--cyan-accent)' }}>
                        <Rocket size={24} />
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div>
                        <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Skill Items</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
                          {portfolioData.skills?.length || 0}
                        </div>
                      </div>
                      <div style={{ padding: '0.75rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '12px', color: '#34d399' }}>
                        <Code2 size={24} />
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div>
                        <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Work Experiences</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
                          {portfolioData.experiences?.length || 0}
                        </div>
                      </div>
                      <div style={{ padding: '0.75rem', background: 'rgba(192, 132, 252, 0.1)', borderRadius: '12px', color: '#c084fc' }}>
                        <Briefcase size={24} />
                      </div>
                    </div>

                    <div className="admin-stat-card">
                      <div>
                        <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 700 }}>Certifications</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
                          {portfolioData.education?.length || 0}
                        </div>
                      </div>
                      <div style={{ padding: '0.75rem', background: 'rgba(251, 146, 60, 0.1)', borderRadius: '12px', color: '#fb923c' }}>
                        <GraduationCap size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Banner */}
                  <div className="admin-card" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08), rgba(0, 0, 0, 0.4))', border: '1px solid rgba(0, 242, 254, 0.25)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontWeight: 700 }}>Quick Administrative Actions</h3>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>Manage portfolio content dynamically or trigger instant backup downloads.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={() => { setModalType('project'); setEditingId(null); setProjectForm({ title: '', subtitle: '', category: 'web', categoryBadge: 'Full-Stack Web App', image: '/images/project_gristmill.webp', tech: '', summary: '', highlights: '', github: 'https://github.com/Abdul-Sami1122' }); }} className="btn btn-primary btn-sm">
                        <Plus size={15} /> Add Project
                      </button>
                      <button onClick={() => { setModalType('skill'); setEditingId(null); setSkillForm({ name: '', category: 'web', level: 'Intermediate', desc: '' }); }} className="btn btn-secondary btn-sm">
                        <Plus size={15} /> Add Skill
                      </button>
                      <button onClick={exportPortfolioJSON} className="btn btn-secondary btn-sm">
                        <Download size={15} /> Export JSON
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity / System Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                    <div className="admin-card">
                      <h4 style={{ fontSize: '1rem', color: '#fff', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={18} style={{ color: 'var(--cyan-accent)' }} /> Profile Snapshot
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <img src={portfolioData.hero?.profileImage} alt="Avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--cyan-accent)' }} />
                        <div>
                          <div style={{ fontWeight: 700, color: '#fff' }}>{portfolioData.hero?.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>{portfolioData.hero?.titleTag}</div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.1rem' }}>{portfolioData.hero?.email}</div>
                        </div>
                      </div>
                      <button onClick={() => setActiveTab('hero')} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                        <Edit size={14} /> Edit Profile & Hero
                      </button>
                    </div>

                    <div className="admin-card">
                      <h4 style={{ fontSize: '1rem', color: '#fff', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Database size={18} style={{ color: '#34d399' }} /> System Connectivity Status
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <span style={{ color: '#94a3b8' }}>Core PHP API:</span>
                          <span style={{ color: '#34d399', fontWeight: 600 }}>Active ({import.meta.env.DEV ? 'http://localhost/api' : '/api (Live Production)'})</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <span style={{ color: '#94a3b8' }}>LocalStorage Sync:</span>
                          <span style={{ color: '#34d399', fontWeight: 600 }}>Enabled (`abdul_sami_portfolio_v1`)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#94a3b8' }}>Auth Session Token:</span>
                          <span style={{ color: 'var(--cyan-accent)', fontFamily: 'var(--font-code)', fontSize: '0.75rem' }}>{authToken?.slice(0, 18)}...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROFILE & HERO */}
              {activeTab === 'hero' && (
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

                    {/* Contact & Social Channels Card (Live sync with Header, Footer, and Contact Us) */}
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
                            type="url"
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
                            type="url"
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
                          value={portfolioData.resumeUrl || ''}
                          onChange={(e) => updateResumeUrl(e.target.value)}
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
              )}

              {/* TAB 3: ABOUT ME */}
              {activeTab === 'about' && (
                <div className="admin-card">
                  <form onSubmit={handleAboutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      <div className="admin-input-group">
                        <label>Section Subtitle</label>
                        <input type="text" value={aboutForm.subtitle} onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })} style={inputStyle} />
                      </div>
                      <div className="admin-input-group">
                        <label>Section Main H2 Title</label>
                        <input type="text" value={aboutForm.title} onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })} style={inputStyle} />
                      </div>
                    </div>

                    <div className="admin-input-group">
                      <label>Main Bio Paragraph 1</label>
                      <textarea rows={3} value={aboutForm.paragraph1} onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>

                    <div className="admin-input-group">
                      <label>Main Bio Paragraph 2</label>
                      <textarea rows={3} value={aboutForm.paragraph2} onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>

                    <div className="admin-input-group">
                      <label>Core Philosophy Quote</label>
                      <input type="text" value={aboutForm.philosophy} onChange={(e) => setAboutForm({ ...aboutForm, philosophy: e.target.value })} style={inputStyle} />
                    </div>

                    {/* Stats counters */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--cyan-accent)', marginBottom: '0.75rem', display: 'block' }}>Key Stats Indicators</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div className="admin-input-group">
                          <label>Years Experience Number</label>
                          <input type="text" value={aboutForm.stats?.yearsExp} onChange={(e) => setAboutForm({ ...aboutForm, stats: { ...aboutForm.stats, yearsExp: e.target.value } })} style={inputStyle} />
                        </div>
                        <div className="admin-input-group">
                          <label>Projects Completed Number</label>
                          <input type="text" value={aboutForm.stats?.projectsCompleted} onChange={(e) => setAboutForm({ ...aboutForm, stats: { ...aboutForm.stats, projectsCompleted: e.target.value } })} style={inputStyle} />
                        </div>
                        <div className="admin-input-group">
                          <label>Technologies Mastered Count</label>
                          <input type="text" value={aboutForm.stats?.techMastered} onChange={(e) => setAboutForm({ ...aboutForm, stats: { ...aboutForm.stats, techMastered: e.target.value } })} style={inputStyle} />
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} /> Save About Section
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: SKILLS MATRIX */}
              {activeTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      Manage core technologies and proficiency levels displayed in your Skills section.
                    </div>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setSkillForm({ name: '', category: 'web', level: 'Intermediate', desc: '' });
                        setModalType('skill');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} /> Add New Skill
                    </button>
                  </div>

                  <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Skill Name</th>
                          <th>Category</th>
                          <th>Level</th>
                          <th>Description</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioData.skills
                          ?.filter((s) => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc?.toLowerCase().includes(searchQuery.toLowerCase()))
                          ?.map((skill) => {
                            const levelPercent = skill.level === 'Expert' ? 95 : skill.level === 'Advanced' ? 80 : skill.level === 'Intermediate' ? 65 : 45;
                            return (
                              <tr key={skill.id} style={{ transition: 'background 0.2s' }}>
                                <td style={{ fontWeight: 700, color: '#fff' }}>{skill.name}</td>
                                <td>
                                  <span className={`badge ${skill.category === 'ai' ? 'badge-ai' : 'badge-web'}`}>
                                    {skill.category}
                                  </span>
                                </td>
                                <td style={{ width: '170px' }}>
                                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{skill.level}</span>
                                    <span style={{ color: 'var(--cyan-accent)', fontSize: '0.75rem' }}>{levelPercent}%</span>
                                  </div>
                                  <div style={{ height: '6px', width: '100%', background: '#0f172a', borderRadius: '4px', overflow: 'hidden', border: '1px solid #334155' }}>
                                    <div style={{ height: '100%', width: `${levelPercent}%`, background: skill.category === 'ai' ? 'linear-gradient(90deg, #8b5cf6, #c084fc)' : 'var(--gradient-primary)', borderRadius: '4px', transition: 'width 0.6s ease' }} />
                                  </div>
                                </td>
                                <td style={{ color: '#cbd5e1', fontSize: '0.84rem', maxWidth: '300px' }}>{skill.desc}</td>
                                <td style={{ textAlign: 'right' }}>
                                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button
                                      onClick={() => {
                                        setEditingId(skill.id);
                                        setSkillForm(skill);
                                        setModalType('skill');
                                      }}
                                      style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--cyan-accent)', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer', transition: 'transform 0.15s' }}
                                      title="Edit"
                                    >
                                      <Edit size={14} />
                                    </button>
                                    <button
                                      onClick={() => {
                                        requestConfirm({
                                          title: 'Delete Skill',
                                          message: `Are you sure you want to delete skill "${skill.name}"? This action cannot be undone.`,
                                          confirmText: 'Delete Skill',
                                          variant: 'danger',
                                          onConfirm: () => {
                                            deleteSkill(skill.id);
                                            triggerToast('Skill deleted!');
                                          },
                                        });
                                      }}
                                      style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer', transition: 'transform 0.15s' }}
                                      title="Delete"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: WORK EXPERIENCE */}
              {activeTab === 'experience' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      Timeline items for work experience and professional history.
                    </div>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setExpForm({ role: '', company: '', period: '', domain: 'Full-Stack Web', category: 'web', achievements: '', skills: '' });
                        setModalType('exp');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} /> Add Experience
                    </button>
                  </div>

                  <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Role & Company</th>
                          <th>Period</th>
                          <th>Domain Tag</th>
                          <th>Category</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioData.experiences
                          ?.filter((e) => !searchQuery || e.role.toLowerCase().includes(searchQuery.toLowerCase()) || e.company.toLowerCase().includes(searchQuery.toLowerCase()))
                          ?.map((exp) => (
                            <tr key={exp.id}>
                              <td>
                                <div style={{ fontWeight: 700, color: '#fff' }}>{exp.role}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>{exp.company}</div>
                              </td>
                              <td>{exp.period}</td>
                              <td><span className="pill">{exp.domain}</span></td>
                              <td>
                                <span className={`badge ${exp.category === 'ai' ? 'badge-ai' : 'badge-web'}`}>{exp.category}</span>
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                  <button
                                    onClick={() => {
                                      setEditingId(exp.id);
                                      setExpForm({
                                        ...exp,
                                        achievements: Array.isArray(exp.achievements) ? exp.achievements.join('\n') : exp.achievements,
                                        skills: Array.isArray(exp.skills) ? exp.skills.join(', ') : exp.skills,
                                      });
                                      setModalType('exp');
                                    }}
                                    style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--cyan-accent)', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      requestConfirm({
                                        title: 'Delete Experience Entry',
                                        message: `Are you sure you want to delete the experience entry for "${exp.role}"?`,
                                        confirmText: 'Delete Experience',
                                        variant: 'danger',
                                        onConfirm: () => {
                                          deleteExperience(exp.id);
                                          triggerToast('Experience deleted!');
                                        },
                                      });
                                    }}
                                    style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: PROJECTS GALLERY */}
              {activeTab === 'projects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                      Showcase projects, images, tech stack, and GitHub repository links.
                    </div>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setProjectForm({
                          title: '', subtitle: '', category: 'web', categoryBadge: 'Full-Stack Web App',
                          image: '/images/project_gristmill.webp', tech: '', summary: '', highlights: '', github: 'https://github.com/Abdul-Sami1122'
                        });
                        setModalType('project');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} /> Add Project
                    </button>
                  </div>

                  <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Cover</th>
                          <th>Project Title</th>
                          <th>Status & Demo</th>
                          <th>Tech Stack</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioData.projects
                          ?.filter((p) => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) || p.summary?.toLowerCase().includes(searchQuery.toLowerCase()))
                          ?.map((proj) => (
                            <tr key={proj.id}>
                              <td style={{ width: '60px' }}>
                                <img src={proj.image} alt={proj.title} style={{ width: '48px', height: '36px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
                              </td>
                              <td>
                                <div style={{ fontWeight: 700, color: '#fff' }}>{proj.title}</div>
                                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{proj.subtitle}</div>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                                  {proj.isInProgress ? (
                                    <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.45)', color: '#fbbf24', fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                                      🚧 In Progress
                                    </span>
                                  ) : (
                                    <span className={`badge ${proj.category === 'ai' ? 'badge-ai' : 'badge-web'}`} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                                      {proj.categoryBadge || proj.category}
                                    </span>
                                  )}
                                  <span className="pill" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderColor: proj.showDemo ? 'rgba(0, 242, 254, 0.4)' : 'rgba(255,255,255,0.1)', color: proj.showDemo ? 'var(--cyan-accent)' : '#94a3b8' }}>
                                    {proj.showDemo ? '🔗 Demo ON' : '🚫 Demo OFF'}
                                  </span>
                                </div>
                              </td>
                              <td style={{ fontSize: '0.8rem', color: 'var(--cyan-accent)' }}>
                                {Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                  <button
                                    onClick={() => {
                                      setEditingId(proj.id);
                                      setProjectForm({
                                        ...proj,
                                        tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech,
                                        highlights: Array.isArray(proj.highlights) ? proj.highlights.join('\n') : proj.highlights,
                                        showDemo: proj.showDemo !== undefined ? proj.showDemo : true,
                                        demoUrl: proj.demoUrl || proj.demo || '',
                                        isInProgress: proj.isInProgress || false,
                                      });
                                      setModalType('project');
                                    }}
                                    style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--cyan-accent)', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      requestConfirm({
                                        title: 'Delete Project Showcase',
                                        message: `Are you sure you want to delete project "${proj.title}"?`,
                                        confirmText: 'Delete Project',
                                        variant: 'danger',
                                        onConfirm: () => {
                                          deleteProject(proj.id);
                                          triggerToast('Project deleted!');
                                        },
                                      });
                                    }}
                                    style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: CERTIFICATIONS & EDUCATION */}
              {activeTab === 'education' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                      Certifications, degrees, and academic accomplishments.
                    </div>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEduForm({ type: 'certification', title: '', institution: '', period: '', badge: 'Certified', category: 'web', desc: '' });
                        setModalType('edu');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} /> Add Certification
                    </button>
                  </div>

                  <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Title & Institution</th>
                          <th>Period</th>
                          <th>Badge</th>
                          <th>Category</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolioData.education
                          ?.filter((ed) => !searchQuery || ed.title.toLowerCase().includes(searchQuery.toLowerCase()) || ed.institution?.toLowerCase().includes(searchQuery.toLowerCase()))
                          ?.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div style={{ fontWeight: 700, color: '#fff' }}>{item.title}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--cyan-accent)' }}>{item.institution}</div>
                              </td>
                              <td>{item.period}</td>
                              <td><span className="pill">{item.badge}</span></td>
                              <td>
                                <span className={`badge ${item.category === 'ai' ? 'badge-ai' : 'badge-web'}`}>{item.category}</span>
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                  <button
                                    onClick={() => {
                                      setEditingId(item.id);
                                      setEduForm(item);
                                      setModalType('edu');
                                    }}
                                    style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--cyan-accent)', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      requestConfirm({
                                        title: 'Delete Certification',
                                        message: `Are you sure you want to delete certification "${item.title}"?`,
                                        confirmText: 'Delete Certification',
                                        variant: 'danger',
                                        onConfirm: () => {
                                          deleteEducation(item.id);
                                          triggerToast('Certification deleted!');
                                        },
                                      });
                                    }}
                                    style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: TESTIMONIALS MANAGER */}
              {activeTab === 'testimonials' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                      Manage client reviews, endorsements, and peer recommendations.
                    </div>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setTestiForm({ name: '', role: '', company: '', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', rating: 5, content: '', date: 'July 2026' });
                        setModalType('testi');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <Plus size={15} /> Add Testimonial
                    </button>
                  </div>

                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Client / Author</th>
                          <th>Role & Company</th>
                          <th>Rating</th>
                          <th>Review Quote</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(portfolioData.testimonials || [])
                          .filter((t) => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.company.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <img src={item.avatar} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                                  <div>
                                    <div style={{ fontWeight: 700, color: '#fff' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.date}</div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div style={{ color: 'var(--cyan-accent)', fontWeight: 600, fontSize: '0.85rem' }}>{item.role}</div>
                                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.company}</div>
                              </td>
                              <td>
                                <span style={{ color: '#f59e0b', fontWeight: 700 }}>{item.rating || 5} ★</span>
                              </td>
                              <td style={{ maxWidth: '280px' }}>
                                <div style={{ fontSize: '0.82rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  "{item.content || item.quote}"
                                </div>
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                  <button
                                    onClick={() => {
                                      setEditingId(item.id);
                                      setTestiForm({
                                        ...item,
                                        content: item.content || item.quote || '',
                                        quote: item.content || item.quote || '',
                                      });
                                      setModalType('testi');
                                    }}
                                    style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--cyan-accent)', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      requestConfirm({
                                        title: 'Delete Recommendation',
                                        message: `Are you sure you want to delete recommendation from "${item.name}"?`,
                                        confirmText: 'Delete Recommendation',
                                        variant: 'danger',
                                        onConfirm: () => {
                                          deleteTestimonial(item.id);
                                          triggerToast('Testimonial deleted!');
                                        },
                                      });
                                    }}
                                    style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 8: CONTACT INBOX */}
              {activeTab === 'messages' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                        Contact Form Submissions & Inquiries
                      </h3>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                        Direct messages submitted by clients and recruiters from your public portfolio.
                      </div>
                    </div>
                  </div>

                  {(!portfolioData.messages || portfolioData.messages.length === 0) ? (
                    <div className="admin-card" style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
                      <MessageSquare size={40} style={{ marginBottom: '0.75rem', opacity: 0.4, color: 'var(--cyan-accent)' }} />
                      <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>No Messages Received Yet</div>
                      <div style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>Messages submitted through the Contact form will be delivered here instantly.</div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {portfolioData.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="admin-card"
                          style={{
                            borderLeft: msg.read ? '3px solid #334155' : '3px solid var(--cyan-accent)',
                            background: msg.read ? 'rgba(30, 41, 59, 0.4)' : 'rgba(15, 23, 42, 0.85)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.6rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                                <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{msg.name}</strong>
                                {!msg.read && (
                                  <span className="badge" style={{ background: 'rgba(0, 242, 254, 0.2)', color: 'var(--cyan-accent)', fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>NEW</span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.82rem', color: 'var(--cyan-accent)', fontWeight: 500 }}>{msg.email}</div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{msg.date}</span>
                              <button
                                onClick={() => toggleStarMessage(msg.id)}
                                style={{ background: 'none', border: 'none', color: msg.starred ? '#f59e0b' : '#64748b', cursor: 'pointer', padding: '0.3rem' }}
                                title="Star message"
                              >
                                <Star size={16} fill={msg.starred ? '#f59e0b' : 'none'} />
                              </button>
                              <button
                                onClick={() => {
                                  requestConfirm({
                                    title: 'Delete Inbox Message',
                                    message: `Are you sure you want to delete the message from "${msg.name}" (${msg.email})?`,
                                    confirmText: 'Delete Message',
                                    variant: 'danger',
                                    onConfirm: () => {
                                      deleteMessage(msg.id);
                                      triggerToast('Message deleted!');
                                    },
                                  });
                                }}
                                style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem', borderRadius: '6px' }}
                                title="Delete message"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.4rem' }}>
                            Subject: {msg.subject}
                          </div>

                          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1rem 0', whiteSpace: 'pre-wrap' }}>
                            {msg.message}
                          </p>

                          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button
                              onClick={() => {
                                markMessageRead(msg.id);
                                if (replyingId === msg.id) {
                                  setReplyingId(null);
                                } else {
                                  setReplyingId(msg.id);
                                  setReplyText(`Hi ${msg.name},\n\nThank you for reaching out! `);
                                }
                              }}
                              className="btn btn-primary btn-sm"
                              style={{ fontSize: '0.78rem' }}
                            >
                              <Mail size={14} /> {replyingId === msg.id ? 'Close Reply Box' : 'Reply to Customer'}
                            </button>

                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              onClick={() => markMessageRead(msg.id)}
                              className="btn btn-secondary btn-sm"
                              style={{ fontSize: '0.78rem' }}
                            >
                              <ExternalLink size={14} /> Open in Email App
                            </a>

                            {!msg.read && (
                              <button
                                onClick={() => markMessageRead(msg.id)}
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: '0.78rem', color: '#94a3b8' }}
                              >
                                Mark as Read
                              </button>
                            )}
                          </div>

                          {/* Expandable Inline Reply Form */}
                          {replyingId === msg.id && (
                            <div
                              className="animate-fade-in"
                              style={{
                                marginTop: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(0, 242, 254, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                background: 'rgba(0, 0, 0, 0.3)',
                                padding: '1rem',
                                borderRadius: '12px',
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.84rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>
                                  Compose Email Reply to: {msg.name} ({msg.email})
                                </span>
                              </div>

                              <textarea
                                rows={4}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your response message here..."
                                style={{
                                  width: '100%',
                                  background: '#090d16',
                                  border: '1px solid rgba(0, 242, 254, 0.3)',
                                  borderRadius: '8px',
                                  color: '#fff',
                                  padding: '0.75rem',
                                  fontSize: '0.85rem',
                                  outline: 'none',
                                  resize: 'vertical',
                                  fontFamily: 'inherit',
                                }}
                              />

                              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                <button
                                  onClick={() => setReplyingId(null)}
                                  className="btn btn-secondary btn-sm"
                                  style={{ fontSize: '0.78rem' }}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSendReply(msg)}
                                  className="btn btn-primary btn-sm"
                                  style={{ fontSize: '0.78rem' }}
                                >
                                  <Send size={14} /> Send Direct Email to Customer
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 9: SYSTEM & BACKUP SETTINGS */}
              {activeTab === 'settings' && (
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
                      {[
                        { id: 'emerald', label: 'Emerald Matrix', subtitle: 'Terminal Mint & Hacker Tech', color: '#34d399', border: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
                        { id: 'cyan', label: 'Cyber Cyan', subtitle: 'Electric Aqua & Sci-Fi Core', color: '#00f2fe', border: '#4facfe', gradient: 'linear-gradient(135deg, #00f2fe, #4facfe)' },
                        { id: 'violet', label: 'Neon Violet', subtitle: 'Deep Cyber AI & Neural Indigo', color: '#c084fc', border: '#a855f7', gradient: 'linear-gradient(135deg, #c084fc, #a855f7)' },
                        { id: 'amber', label: 'Solar Amber', subtitle: 'Luxury Gold & High Velocity', color: '#fbbf24', border: '#f59e0b', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
                      ].map((t) => {
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
              )}

            </main>
          </div>
        </>
      )}

      {/* ==========================================================================
         ADD / EDIT MODAL DRAWER POPUPS
         ========================================================================== */}
      
      {/* Skill Modal */}
      {modalType === 'skill' && (
        <div className="admin-modal-overlay" onClick={() => setModalType(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                {editingId ? 'Edit Skill Entry' : 'Add New Skill'}
              </h3>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveSkill}>
              <div className="admin-modal-body">
                <div className="admin-input-group">
                  <label>Skill Name</label>
                  <input type="text" required value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} style={inputStyle} placeholder="e.g. React.js, PyTorch, Core PHP" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Category</label>
                    <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} style={inputStyle}>
                      <option value="web">Full-Stack Web</option>
                      <option value="ai">AI / ML / Data Science</option>
                    </select>
                  </div>
                  <div className="admin-input-group">
                    <label>Proficiency Level</label>
                    <select value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })} style={inputStyle}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Description / Usage Summary</label>
                  <textarea rows={3} value={skillForm.desc} onChange={(e) => setSkillForm({ ...skillForm, desc: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Short overview of how you use this skill..." />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {modalType === 'exp' && (
        <div className="admin-modal-overlay" onClick={() => setModalType(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                {editingId ? 'Edit Work Experience' : 'Add New Work Experience'}
              </h3>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveExp}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Role / Position Title</label>
                    <input type="text" required value={expForm.role} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} style={inputStyle} placeholder="e.g. Senior Full-Stack Engineer" />
                  </div>
                  <div className="admin-input-group">
                    <label>Company / Organization</label>
                    <input type="text" required value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} style={inputStyle} placeholder="e.g. Tech Solutions Inc." />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Time Period</label>
                    <input type="text" required value={expForm.period} onChange={(e) => setExpForm({ ...expForm, period: e.target.value })} style={inputStyle} placeholder="e.g. 2023 - Present" />
                  </div>
                  <div className="admin-input-group">
                    <label>Domain Badge</label>
                    <input type="text" value={expForm.domain} onChange={(e) => setExpForm({ ...expForm, domain: e.target.value })} style={inputStyle} placeholder="e.g. Full-Stack Web" />
                  </div>
                  <div className="admin-input-group">
                    <label>Category</label>
                    <select value={expForm.category || 'web'} onChange={(e) => setExpForm({ ...expForm, category: e.target.value })} style={inputStyle}>
                      <option value="web">Full-Stack Web</option>
                      <option value="ai">AI / ML System</option>
                    </select>
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Key Achievements (One bullet per line)</label>
                  <textarea rows={4} value={expForm.achievements} onChange={(e) => setExpForm({ ...expForm, achievements: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Architected core web services...&#10;Integrated ML models into web dashboards..." />
                </div>

                <div className="admin-input-group">
                  <label>Technologies Used (Comma separated)</label>
                  <input type="text" value={expForm.skills} onChange={(e) => setExpForm({ ...expForm, skills: e.target.value })} style={inputStyle} placeholder="React, Node.js, PHP, PostgreSQL" />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {modalType === 'project' && (
        <div className="admin-modal-overlay" onClick={() => setModalType(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                {editingId ? 'Edit Project Showcase' : 'Add New Project Showcase'}
              </h3>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Project Title</label>
                    <input type="text" required value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} style={inputStyle} placeholder="e.g. Gristmill Software System" />
                  </div>
                  <div className="admin-input-group">
                    <label>Subtitle Tag</label>
                    <input type="text" value={projectForm.subtitle} onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })} style={inputStyle} placeholder="e.g. Enterprise Industrial Operations Portal" />
                  </div>
                </div>

                {/* Cover Image Manager */}
                <div className="admin-input-group">
                  <label>Cover Image (URL or Direct Upload)</label>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input type="text" value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} style={inputStyle} placeholder="/images/project_gristmill.webp" />
                    <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <Camera size={14} /> Upload
                      <input type="file" onChange={handleProjectImageFile} accept="image/*" style={{ display: 'none' }} />
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Category Badge Text</label>
                    <input type="text" value={projectForm.categoryBadge} onChange={(e) => setProjectForm({ ...projectForm, categoryBadge: e.target.value })} style={inputStyle} placeholder="Full-Stack Web App" />
                  </div>
                  <div className="admin-input-group">
                    <label>Category Filter</label>
                    <select value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} style={inputStyle}>
                      <option value="web">Full-Stack Web</option>
                      <option value="ai">AI / ML System</option>
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
                  <input type="text" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} style={inputStyle} placeholder="https://github.com/..." />
                </div>

                <div className="admin-input-group">
                  <label>Tech Stack Tags (Comma separated)</label>
                  <input type="text" value={projectForm.tech} onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })} style={inputStyle} placeholder="React, Core PHP, MySQL, Tailwind" />
                </div>

                <div className="admin-input-group">
                  <label>Project Summary</label>
                  <textarea rows={2} value={projectForm.summary} onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Short summary..." />
                </div>

                <div className="admin-input-group">
                  <label>Highlights & Deliverables (One per line)</label>
                  <textarea rows={3} value={projectForm.highlights} onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Architected automated pipeline...&#10;Reduced latency by 45%..." />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {modalType === 'edu' && (
        <div className="admin-modal-overlay" onClick={() => setModalType(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                {editingId ? 'Edit Certification' : 'Add New Certification'}
              </h3>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEdu}>
              <div className="admin-modal-body">
                <div className="admin-input-group">
                  <label>Degree / Certification Title</label>
                  <input type="text" required value={eduForm.title} onChange={(e) => setEduForm({ ...eduForm, title: e.target.value })} style={inputStyle} placeholder="e.g. Deep Learning Specialization" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Institution / Issuer</label>
                    <input type="text" required value={eduForm.institution} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} style={inputStyle} placeholder="e.g. Coursera / DeepLearning.AI" />
                  </div>
                  <div className="admin-input-group">
                    <label>Time Period / Year</label>
                    <input type="text" required value={eduForm.period} onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })} style={inputStyle} placeholder="e.g. 2024" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Badge Pill</label>
                    <input type="text" value={eduForm.badge} onChange={(e) => setEduForm({ ...eduForm, badge: e.target.value })} style={inputStyle} placeholder="Certified" />
                  </div>
                  <div className="admin-input-group">
                    <label>Category</label>
                    <select value={eduForm.category} onChange={(e) => setEduForm({ ...eduForm, category: e.target.value })} style={inputStyle}>
                      <option value="web">Full-Stack Web</option>
                      <option value="ai">AI / ML</option>
                    </select>
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Description / Core Focus</label>
                  <textarea rows={3} value={eduForm.desc} onChange={(e) => setEduForm({ ...eduForm, desc: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Overview of topics mastered..." />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Certification</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {modalType === 'testi' && (
        <div className="admin-modal-overlay" onClick={() => setModalType(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
                {editingId ? 'Edit Testimonial' : 'Add Client Recommendation'}
              </h3>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveTestimonial}>
              <div className="admin-modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Client / Author Name</label>
                    <input type="text" required value={testiForm.name} onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })} style={inputStyle} placeholder="e.g. Sarah Jenkins" />
                  </div>
                  <div className="admin-input-group">
                    <label>Role / Position Title</label>
                    <input type="text" required value={testiForm.role} onChange={(e) => setTestiForm({ ...testiForm, role: e.target.value })} style={inputStyle} placeholder="e.g. CTO at HealthTech AI" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Company / Organization</label>
                    <input type="text" required value={testiForm.company} onChange={(e) => setTestiForm({ ...testiForm, company: e.target.value })} style={inputStyle} placeholder="e.g. HealthTech AI (USA)" />
                  </div>
                  <div className="admin-input-group">
                    <label>Date / Period</label>
                    <input type="text" value={testiForm.date} onChange={(e) => setTestiForm({ ...testiForm, date: e.target.value })} style={inputStyle} placeholder="e.g. July 2026" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-input-group">
                    <label>Client Avatar Photo URL</label>
                    <input type="text" value={testiForm.avatar} onChange={(e) => setTestiForm({ ...testiForm, avatar: e.target.value })} style={inputStyle} placeholder="https://..." />
                  </div>
                  <div className="admin-input-group">
                    <label>Rating (1 to 5 Stars)</label>
                    <select value={testiForm.rating} onChange={(e) => setTestiForm({ ...testiForm, rating: Number(e.target.value) })} style={inputStyle}>
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★</option>
                      <option value={3}>3 Stars ★★★</option>
                    </select>
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Testimonial Quote / Review Text</label>
                  <textarea rows={4} required value={testiForm.content} onChange={(e) => setTestiForm({ ...testiForm, content: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Type the client recommendation quote..." />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setModalType(null)} className="btn btn-secondary btn-sm">Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm"><Save size={14} /> Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Theme-matched Confirmation Dialog (Replaces native browser popups) */}
      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirm}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        variant={confirmDialog.variant}
      />

    </div>
  );
}
