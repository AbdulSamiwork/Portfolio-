import { useState, useEffect } from 'react';
import { useAdminEntityModals } from './useAdminEntityModals';

export function useAdminForms({
  portfolioData, adminLogin, resetToDefaults, importPortfolioJSON,
  updateHero, updateAbout, addSkill, updateSkill,
  addExperience, updateExperience, addProject, updateProject,
  addEducation, updateEducation, updateResumeUrl,
  addTestimonial, updateTestimonial, markMessageRead, uploadFile, setIsAdminOpen
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [saveToast, setSaveToast] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillCategoryTab, setSkillCategoryTab] = useState('all');

  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  const [heroForm, setHeroForm] = useState(() => ({
    ...(portfolioData.hero || {}),
    resumeUrl: portfolioData.resumeUrl || portfolioData.hero?.resumeUrl || '/resume_abdul_sami.pdf'
  }));
  const [aboutForm, setAboutForm] = useState(portfolioData.about || {});

  useEffect(() => {
    if (portfolioData?.hero) {
      setHeroForm((prev) => ({
        ...portfolioData.hero,
        resumeUrl: prev.resumeUrl !== undefined ? prev.resumeUrl : (portfolioData.resumeUrl || portfolioData.hero?.resumeUrl || ''),
      }));
    }
  }, [portfolioData?.hero?.email, portfolioData?.hero?.name, portfolioData?.hero?.githubUrl, portfolioData?.hero?.linkedinUrl]);

  useEffect(() => {
    if (portfolioData?.about) {
      setAboutForm({
        ...portfolioData.about,
        title: portfolioData.about.title || portfolioData.about.sectionTitle || '',
        sectionTitle: portfolioData.about.sectionTitle || portfolioData.about.title || '',
        subtitle: portfolioData.about.subtitle || portfolioData.about.sectionSubtitle || '',
        sectionSubtitle: portfolioData.about.sectionSubtitle || portfolioData.about.subtitle || '',
        cardHeading: portfolioData.about.cardHeading || '',
        paragraph1: portfolioData.about.paragraph1 || '',
        paragraph2: portfolioData.about.paragraph2 || '',
        paragraph3: portfolioData.about.paragraph3 || '',
        degree: portfolioData.about.degree || 'B.S. Information Technology',
        institution: portfolioData.about.institution || 'University of the Punjab',
        philosophy: portfolioData.about.philosophy || '',
        stats: {
          yearsExp: portfolioData.about.stats?.yearsExp || '2+',
          projectsCompleted: portfolioData.about.stats?.projectsCompleted || '15+',
          techMastered: portfolioData.about.stats?.techMastered || '20+',
        },
        highlights: portfolioData.about.highlights || [],
      });
    }
  }, [portfolioData?.about]);

  const triggerToast = (msg = 'Saved Successfully!') => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const modals = useAdminEntityModals({
    addSkill,
    updateSkill,
    addExperience,
    updateExperience,
    addProject,
    updateProject,
    addEducation,
    updateEducation,
    addTestimonial,
    updateTestimonial,
    uploadFile,
    triggerToast,
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false, title: '', message: '', confirmText: 'Confirm', cancelText: 'Cancel', variant: 'danger', onConfirm: () => {}
  });

  const requestConfirm = ({ title = 'Confirm Action', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger', onConfirm }) => {
    setConfirmDialog({
      isOpen: true, title, message, confirmText, cancelText, variant,
      onConfirm: () => {
        onConfirm?.();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeConfirm = () => setConfirmDialog((prev) => ({ ...prev, isOpen: false }));

  const handleResetDefaults = () => {
    requestConfirm({
      title: 'Reset System Defaults',
      message: 'Are you sure you want to revert all portfolio data to initial system defaults?',
      confirmText: 'Revert to Defaults',
      cancelText: 'Cancel',
      variant: 'warning',
      onConfirm: () => {
        resetToDefaults();
        triggerToast('Portfolio content reverted to system defaults!');
      }
    });
  };

  const handleClose = () => {
    setIsAdminOpen(false);
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('/sami')) window.history.pushState(null, '', '/');
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('sami')) window.history.pushState(null, '', window.location.pathname);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await adminLogin(username, password);
    if (success) {
      setPassword('');
      triggerToast('Authenticated Admin Session Started');
    }
  };

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

  const handleProfileImageFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      triggerToast('Uploading profile photo...');
      const url = await uploadFile(file);
      if (url) {
        setHeroForm((prev) => ({ ...prev, profileImage: url }));
        await updateHero({ profileImage: url });
        triggerToast('Profile photo saved to Database successfully!');
      }
    }
  };

  const handleResumePdfFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      triggerToast('Uploading CV / Resume PDF...');
      const url = await uploadFile(file);
      if (url) {
        setHeroForm((prev) => ({ ...prev, resumeUrl: url }));
        await updateResumeUrl(url);
        triggerToast('Resume PDF uploaded! Click Save Profile Changes to finalize.');
      } else {
        triggerToast('Failed to upload PDF file. Please try again.');
      }
    }
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    triggerToast('Saving Profile & Contact to Database...');
    const targetResume = (heroForm.resumeUrl !== undefined ? heroForm.resumeUrl : (portfolioData.resumeUrl || '')).trim();
    const formattedHero = {
      ...heroForm,
      githubUrl: heroForm.githubUrl ? heroForm.githubUrl.trim() : '',
      linkedinUrl: heroForm.linkedinUrl ? heroForm.linkedinUrl.trim() : '',
      resumeUrl: targetResume || '/resume_abdul_sami.pdf',
    };
    const ok = await updateHero(formattedHero);
    if (targetResume) await updateResumeUrl(targetResume);
    triggerToast(ok !== false ? 'Profile & Contact updated in Database successfully!' : 'Profile updated locally.');
  };

  const handleHighlightChange = (index, field, value) => {
    const currentHighlights = [...(aboutForm.highlights || [])];
    currentHighlights[index] = { ...currentHighlights[index], [field]: value };
    setAboutForm((prev) => ({ ...prev, highlights: currentHighlights }));
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    triggerToast('Saving About section to Database...');
    const ok = await updateAbout({
      ...aboutForm,
      sectionTitle: aboutForm.title || aboutForm.sectionTitle,
      title: aboutForm.title || aboutForm.sectionTitle,
      sectionSubtitle: aboutForm.subtitle || aboutForm.sectionSubtitle,
      subtitle: aboutForm.subtitle || aboutForm.sectionSubtitle,
    });
    triggerToast(ok !== false ? 'About section updated in Database successfully!' : 'About section updated locally.');
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importPortfolioJSON(event.target.result);
        triggerToast(success ? 'Portfolio backup imported successfully!' : 'Failed to import JSON data.');
      };
      reader.readAsText(file);
    }
  };

  const inputStyle = {
    width: '100%', background: '#0f172a', border: '1px solid #475569', borderRadius: '8px',
    padding: '0.75rem 1rem', color: '#ffffff', fontSize: '0.92rem', fontWeight: 500, outline: 'none',
  };

  return {
    activeTab, setActiveTab, saveToast, triggerToast, sidebarOpen, setSidebarOpen,
    searchQuery, setSearchQuery, skillCategoryTab, setSkillCategoryTab,
    replyingId, setReplyingId, replyText, setReplyText, handleSendReply,
    username, setUsername, password, setPassword,
    heroForm, setHeroForm, aboutForm, setAboutForm,
    confirmDialog, requestConfirm, closeConfirm,
    handleResetDefaults, handleClose, handleLogin,
    handleProfileImageFile, handleResumePdfFile,
    handleHeroSubmit, handleHighlightChange, handleAboutSubmit,
    handleImportFile, inputStyle,
    ...modals
  };
}
