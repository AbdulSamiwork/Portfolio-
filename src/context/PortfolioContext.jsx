import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPortfolioData } from '../data/defaultPortfolioData';

const PortfolioContext = createContext();

const STORAGE_KEY = 'abdul_sami_portfolio_v1';
const AUTH_KEY = 'abdul_sami_auth_v1';
const THEME_KEY = 'abdul_sami_theme_accent';

// Dynamic API Base URL: Uses relative '/api' in production or VITE_API_URL, fallback to 'http://localhost/api' in dev
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost/api' : '/api');

export function PortfolioProvider({ children }) {
  const [accentTheme, setAccentTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) return savedTheme;
    } catch (e) {
      // ignore
    }
    return 'emerald';
  });

  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load local storage:', e);
    }
    return defaultPortfolioData;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', accentTheme);
    try {
      localStorage.setItem(THEME_KEY, accentTheme);
    } catch (e) {
      console.error(e);
    }
  }, [accentTheme]);

  const [authToken, setAuthToken] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) || null;
    } catch (e) {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Public Portfolio Data from Core PHP API on Mount
  useEffect(() => {
    async function fetchApiData() {
      try {
        const res = await fetch(`${API_BASE_URL}/endpoints/portfolio.php`);
        const json = await res.json();
        if (json.status === 'success' && json.data) {
          const apiData = json.data;
          const resolvedResume = apiData.resumeUrl || apiData.hero?.resumeUrl || defaultPortfolioData.resumeUrl;

          // Intelligently merge with default portfolio data so empty database tables never blank out the live site
          const mergedSkills = (Array.isArray(apiData.skills) && apiData.skills.length > 0)
            ? apiData.skills
            : defaultPortfolioData.skills;

          const mergedProjects = (Array.isArray(apiData.projects) && apiData.projects.length > 0)
            ? apiData.projects
            : defaultPortfolioData.projects;

          const mergedExperiences = (Array.isArray(apiData.experiences) && apiData.experiences.length > 0)
            ? apiData.experiences
            : defaultPortfolioData.experiences;

          const mergedEducation = (Array.isArray(apiData.education) && apiData.education.length > 0)
            ? apiData.education
            : defaultPortfolioData.education;

          const mergedTestimonials = (Array.isArray(apiData.testimonials) && apiData.testimonials.length > 0)
            ? apiData.testimonials
            : defaultPortfolioData.testimonials;

          setPortfolioData({
            ...defaultPortfolioData,
            ...apiData,
            hero: {
              ...(defaultPortfolioData.hero || {}),
              ...(apiData.hero || {}),
              resumeUrl: resolvedResume,
            },
            about: {
              ...(defaultPortfolioData.about || {}),
              ...(apiData.about || {}),
            },
            skills: mergedSkills,
            projects: mergedProjects,
            experiences: mergedExperiences,
            education: mergedEducation,
            testimonials: mergedTestimonials,
            resumeUrl: resolvedResume,
          });
        }
      } catch (e) {
        // Core PHP API offline; uses local state fallback cleanly
      }
    }
    fetchApiData();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch (e) {
      console.error(e);
    }
  }, [portfolioData]);

  // Admin Login Authentication Handler against Core PHP Auth API
  const adminLogin = async (username, password) => {
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();

      if (res.ok && json.status === 'success') {
        setAuthToken(json.token);
        setAdminUser(json.user);
        localStorage.setItem(AUTH_KEY, json.token);
        return true;
      } else {
        setAuthError(json.message || 'Invalid username or password.');
        return false;
      }
    } catch (e) {
      // Local demo fallback if PHP local server is not active
      if ((username.toLowerCase() === 'sami' || username === 'admin' || username === 'sb850839@gmail.com') && password === 'Abdul@Sami$1122') {
        const demoToken = 'demo_admin_session_token_12345';
        setAuthToken(demoToken);
        setAdminUser({ username: 'Sami', role: 'admin' });
        localStorage.setItem(AUTH_KEY, demoToken);
        return true;
      } else {
        setAuthError('Invalid credentials. Please enter valid admin password.');
        return false;
      }
    }
  };

  const adminLogout = () => {
    setAuthToken(null);
    setAdminUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const resetToDefaults = () => {
    setPortfolioData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    return true;
  };

  // Helper for Authorized PHP API Calls (passes both Authorization & X-Auth-Token for FastCGI reliability)
  const authFetch = async (url, method, body) => {
    const token = authToken || localStorage.getItem(AUTH_KEY) || 'demo_admin_session_token_12345';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Auth-Token': token,
        },
        body: JSON.stringify(body),
      });
      return await res.json().catch(() => null);
    } catch (e) {
      console.warn('[API Network Error]', e);
    }
  };

  // Helper for Uploading Files (Images / PDFs) to PHP Backend or persistent DataURL fallback
  const uploadFile = async (file) => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const headers = {};
      const token = authToken || localStorage.getItem(AUTH_KEY);
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(`${API_BASE_URL}/endpoints/upload.php`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.status === 'success' && json.url) {
        return json.url;
      }
    } catch (e) {
      console.warn('PHP upload endpoint error, fallback to data URL...', e);
    }

    // Fallback: Convert to Base64 so it persists in localStorage across refresh
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  // Updaters
  const updateHero = (heroFields) => {
    const updatedHero = { ...portfolioData.hero, ...heroFields };
    setPortfolioData((prev) => ({
      ...prev,
      hero: updatedHero,
      resumeUrl: updatedHero.resumeUrl || prev.resumeUrl,
    }));
    authFetch(`${API_BASE_URL}/endpoints/hero.php`, 'PUT', {
      ...updatedHero,
      resumeUrl: updatedHero.resumeUrl || portfolioData.resumeUrl,
    });
  };

  const updateAbout = (aboutFields) => {
    const updatedAbout = { ...portfolioData.about, ...aboutFields };
    setPortfolioData((prev) => ({ ...prev, about: updatedAbout }));
    authFetch(`${API_BASE_URL}/endpoints/about.php`, 'PUT', updatedAbout);
  };

  // Skill CRUD
  const addSkill = (newSkill) => {
    const item = {
      ...newSkill,
      category: newSkill.category || 'web',
      desc: newSkill.desc || newSkill.description || '',
      description: newSkill.desc || newSkill.description || '',
      id: `skill-${Date.now()}`,
    };
    setPortfolioData((prev) => ({ ...prev, skills: [...(prev.skills || []), item] }));
    authFetch(`${API_BASE_URL}/endpoints/skills.php`, 'POST', item);
  };

  const updateSkill = (id, updatedSkill) => {
    const formatted = {
      ...updatedSkill,
      category: updatedSkill.category || 'web',
      desc: updatedSkill.desc || updatedSkill.description || '',
      description: updatedSkill.desc || updatedSkill.description || '',
    };
    setPortfolioData((prev) => ({
      ...prev,
      skills: (prev.skills || []).map((s) => (s.id === id ? { ...s, ...formatted } : s)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/skills.php?id=${id}`, 'PUT', formatted);
  };

  const deleteSkill = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((s) => s.id !== id),
    }));
    authFetch(`${API_BASE_URL}/endpoints/skills.php?id=${id}`, 'DELETE');
  };

  // Experience CRUD
  const normalizeExperience = (exp) => ({
    ...exp,
    category: exp.category || 'web',
    achievements: Array.isArray(exp.achievements)
      ? exp.achievements
      : (typeof exp.achievements === 'string'
          ? exp.achievements.split('\n').map((a) => a.trim()).filter(Boolean)
          : []),
    skills: Array.isArray(exp.skills)
      ? exp.skills
      : (typeof exp.skills === 'string'
          ? exp.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : []),
  });

  const addExperience = (newExp) => {
    const item = { ...normalizeExperience(newExp), id: `exp-${Date.now()}` };
    setPortfolioData((prev) => ({ ...prev, experiences: [...(prev.experiences || []), item] }));
    authFetch(`${API_BASE_URL}/endpoints/experiences.php`, 'POST', item);
  };

  const updateExperience = (id, updatedExp) => {
    const formatted = normalizeExperience(updatedExp);
    setPortfolioData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).map((e) =>
        String(e.id) === String(id) ? { ...e, ...formatted, id: e.id } : e
      ),
    }));
    authFetch(`${API_BASE_URL}/endpoints/experiences.php?id=${id}`, 'PUT', formatted);
  };

  const deleteExperience = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).filter((e) => String(e.id) !== String(id)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/experiences.php?id=${id}`, 'DELETE');
  };

  // Project CRUD
  const addProject = (newProject) => {
    const item = { ...newProject, id: `proj-${Date.now()}` };
    setPortfolioData((prev) => ({ ...prev, projects: [...prev.projects, item] }));
    authFetch(`${API_BASE_URL}/endpoints/projects.php`, 'POST', item);
  };

  const updateProject = (id, updatedProject) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((p) =>
        String(p.id) === String(id) ? { ...p, ...updatedProject, id: p.id } : p
      ),
    }));
    authFetch(`${API_BASE_URL}/endpoints/projects.php?id=${id}`, 'PUT', updatedProject);
  };

  const deleteProject = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((p) => String(p.id) !== String(id)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/projects.php?id=${id}`, 'DELETE');
  };

  // Education CRUD
  const addEducation = (newItem) => {
    const item = { ...newItem, id: `edu-${Date.now()}` };
    setPortfolioData((prev) => ({ ...prev, education: [...prev.education, item] }));
    authFetch(`${API_BASE_URL}/endpoints/certifications.php`, 'POST', item);
  };

  const updateEducation = (id, updatedItem) => {
    setPortfolioData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...updatedItem } : e)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/certifications.php?id=${id}`, 'PUT', updatedItem);
  };

  const deleteEducation = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
    authFetch(`${API_BASE_URL}/endpoints/certifications.php?id=${id}`, 'DELETE');
  };

  // Data Backup Export / Import
  const exportPortfolioJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importPortfolioJSON = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (parsed && typeof parsed === 'object') {
        setPortfolioData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  // Messages Inbox CRUD
  const sendMessage = (msgData) => {
    const newMsg = {
      ...msgData,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      read: false,
      starred: false,
    };
    setPortfolioData((prev) => ({
      ...prev,
      messages: [newMsg, ...(prev.messages || [])],
    }));
    authFetch(`${API_BASE_URL}/endpoints/messages.php`, 'POST', newMsg);
    return true;
  };

  const deleteMessage = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      messages: (prev.messages || []).filter((m) => m.id !== id),
    }));
  };

  const toggleStarMessage = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      messages: (prev.messages || []).map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)),
    }));
  };

  const markMessageRead = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      messages: (prev.messages || []).map((m) => (m.id === id ? { ...m, read: true } : m)),
    }));
  };

  const updateResumeUrl = (url) => {
    setPortfolioData((prev) => ({
      ...prev,
      resumeUrl: url,
      hero: { ...(prev.hero || {}), resumeUrl: url },
    }));
    authFetch(`${API_BASE_URL}/endpoints/resume.php`, 'PUT', { resumeUrl: url });
  };

  // Testimonial Actions
  const addTestimonial = (testimonial) => {
    const text = testimonial.content || testimonial.quote || '';
    const newTestimonial = {
      ...testimonial,
      content: text,
      quote: text,
      id: 'testi-' + Date.now(),
      verified: true,
    };
    setPortfolioData((prev) => ({
      ...prev,
      testimonials: [newTestimonial, ...(prev.testimonials || [])],
    }));
  };

  const updateTestimonial = (id, updated) => {
    const text = updated.content !== undefined ? updated.content : (updated.quote || '');
    setPortfolioData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).map((t) =>
        t.id === id ? { ...t, ...updated, content: text, quote: text } : t
      ),
    }));
  };

  const deleteTestimonial = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((t) => t.id !== id),
    }));
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        sendMessage,
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
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
