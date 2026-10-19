import { API_BASE_URL, authFetch } from '../../services/apiClient';

export function useEngagementActions(portfolioData, setPortfolioData, authToken) {
  const addProject = async (newProject) => {
    const item = {
      ...newProject,
      id: `proj-${Date.now()}`,
      showDemo: (newProject.showDemo !== false && newProject.showDemo !== 0 && newProject.showDemo !== '0'),
      isInProgress: Boolean(newProject.isInProgress && newProject.isInProgress !== '0' && newProject.isInProgress !== 0),
      demoUrl: newProject.demoUrl || newProject.demo || '',
      demo: newProject.demoUrl || newProject.demo || '',
    };
    setPortfolioData((prev) => ({ ...prev, projects: [...prev.projects, item] }));
    const res = await authFetch(`${API_BASE_URL}/endpoints/projects.php`, 'POST', item, authToken);
    if (res && res.data && res.data.id) {
      setPortfolioData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) => (p.id === item.id ? { ...p, id: res.data.id } : p)),
      }));
    }
  };

  const updateProject = (id, updatedProject) => {
    const normalized = {
      ...updatedProject,
      showDemo: (updatedProject.showDemo !== false && updatedProject.showDemo !== 0 && updatedProject.showDemo !== '0'),
      isInProgress: Boolean(updatedProject.isInProgress && updatedProject.isInProgress !== '0' && updatedProject.isInProgress !== 0),
      demoUrl: updatedProject.demoUrl || updatedProject.demo || '',
      demo: updatedProject.demoUrl || updatedProject.demo || '',
    };
    setPortfolioData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((p) =>
        String(p.id) === String(id) ? { ...p, ...normalized, id: p.id } : p
      ),
    }));
    authFetch(`${API_BASE_URL}/endpoints/projects.php?id=${id}`, 'PUT', normalized, authToken);
  };

  const deleteProject = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((p) => String(p.id) !== String(id)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/projects.php?id=${id}`, 'DELETE', undefined, authToken);
  };

  const addTestimonial = async (testimonial) => {
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
    const res = await authFetch(`${API_BASE_URL}/endpoints/testimonials.php`, 'POST', {
      name: testimonial.name || '',
      role: testimonial.role || '',
      company: testimonial.company || '',
      avatar: testimonial.avatar || '',
      rating: testimonial.rating ?? 5,
      content: text,
      date: testimonial.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      verified: true,
    }, authToken);
    if (res?.data?.id) {
      setPortfolioData((prev) => ({
        ...prev,
        testimonials: (prev.testimonials || []).map((t) =>
          t.id === newTestimonial.id ? { ...t, id: res.data.id } : t
        ),
      }));
    }
  };

  const updateTestimonial = async (id, updated) => {
    const text = updated.content !== undefined ? updated.content : (updated.quote || '');
    setPortfolioData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).map((t) =>
        t.id === id ? { ...t, ...updated, content: text, quote: text } : t
      ),
    }));
    authFetch(`${API_BASE_URL}/endpoints/testimonials.php?id=${id}`, 'PUT', {
      ...updated,
      content: text,
      id: id,
    }, authToken);
  };

  const deleteTestimonial = async (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((t) => t.id !== id),
    }));
    authFetch(`${API_BASE_URL}/endpoints/testimonials.php?id=${id}`, 'DELETE', { id }, authToken);
  };

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
    authFetch(`${API_BASE_URL}/endpoints/messages.php`, 'POST', newMsg, authToken);
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

  const updateResumeUrl = async (url) => {
    setPortfolioData((prev) => ({
      ...prev,
      resumeUrl: url,
      hero: { ...(prev.hero || {}), resumeUrl: url },
    }));
    const res = await authFetch(`${API_BASE_URL}/endpoints/resume.php`, 'PUT', { resumeUrl: url }, authToken);
    return res && res.status === 'success';
  };

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

  return {
    addProject,
    updateProject,
    deleteProject,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    sendMessage,
    deleteMessage,
    toggleStarMessage,
    markMessageRead,
    updateResumeUrl,
    exportPortfolioJSON,
    importPortfolioJSON,
  };
}
