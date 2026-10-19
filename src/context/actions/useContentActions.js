import { API_BASE_URL, authFetch } from '../../services/apiClient';

export function useContentActions(portfolioData, setPortfolioData, authToken) {
  const updateHero = async (heroFields) => {
    const updatedHero = { ...portfolioData.hero, ...heroFields };
    setPortfolioData((prev) => ({
      ...prev,
      hero: updatedHero,
      resumeUrl: updatedHero.resumeUrl || prev.resumeUrl,
    }));
    const res = await authFetch(`${API_BASE_URL}/endpoints/hero.php`, 'PUT', {
      ...updatedHero,
      resumeUrl: updatedHero.resumeUrl || portfolioData.resumeUrl,
    }, authToken);
    if (res && res.status === 'success' && res.data) {
      setPortfolioData((prev) => ({
        ...prev,
        hero: { ...prev.hero, ...res.data },
        resumeUrl: res.data.resumeUrl || prev.resumeUrl,
      }));
      return true;
    }
    return res && res.status === 'success';
  };

  const updateAbout = async (aboutFields) => {
    const updatedAbout = {
      ...portfolioData.about,
      ...aboutFields,
      sectionTitle: aboutFields.sectionTitle || aboutFields.title || portfolioData.about?.sectionTitle || portfolioData.about?.title || '',
      title: aboutFields.title || aboutFields.sectionTitle || portfolioData.about?.title || portfolioData.about?.sectionTitle || '',
      sectionSubtitle: aboutFields.sectionSubtitle || aboutFields.subtitle || portfolioData.about?.sectionSubtitle || portfolioData.about?.subtitle || '',
      subtitle: aboutFields.subtitle || aboutFields.sectionSubtitle || portfolioData.about?.subtitle || portfolioData.about?.sectionSubtitle || '',
    };
    setPortfolioData((prev) => ({ ...prev, about: updatedAbout }));
    const res = await authFetch(`${API_BASE_URL}/endpoints/about.php`, 'PUT', updatedAbout, authToken);
    return res && res.status === 'success';
  };

  const addSkill = (newSkill) => {
    const item = {
      ...newSkill,
      category: newSkill.category || 'web',
      desc: newSkill.desc || newSkill.description || '',
      description: newSkill.desc || newSkill.description || '',
      id: `skill-${Date.now()}`,
    };
    setPortfolioData((prev) => ({ ...prev, skills: [...(prev.skills || []), item] }));
    authFetch(`${API_BASE_URL}/endpoints/skills.php`, 'POST', item, authToken);
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
      skills: (prev.skills || []).map((s) =>
        String(s.id) === String(id) || (s.name && formatted.name && s.name === formatted.name)
          ? { ...s, ...formatted }
          : s
      ),
    }));
    authFetch(`${API_BASE_URL}/endpoints/skills.php?id=${id}`, 'PUT', formatted, authToken);
  };

  const deleteSkill = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((s) => String(s.id) !== String(id)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/skills.php?id=${id}`, 'DELETE', undefined, authToken);
  };

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
    authFetch(`${API_BASE_URL}/endpoints/experiences.php`, 'POST', item, authToken);
  };

  const updateExperience = (id, updatedExp) => {
    const formatted = normalizeExperience(updatedExp);
    setPortfolioData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).map((e) =>
        String(e.id) === String(id) ? { ...e, ...formatted, id: e.id } : e
      ),
    }));
    authFetch(`${API_BASE_URL}/endpoints/experiences.php?id=${id}`, 'PUT', formatted, authToken);
  };

  const deleteExperience = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      experiences: (prev.experiences || []).filter((e) => String(e.id) !== String(id)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/experiences.php?id=${id}`, 'DELETE', undefined, authToken);
  };

  const addEducation = (newItem) => {
    const item = { ...newItem, id: `edu-${Date.now()}` };
    setPortfolioData((prev) => ({ ...prev, education: [...prev.education, item] }));
    authFetch(`${API_BASE_URL}/endpoints/certifications.php`, 'POST', item, authToken);
  };

  const updateEducation = (id, updatedItem) => {
    setPortfolioData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...updatedItem } : e)),
    }));
    authFetch(`${API_BASE_URL}/endpoints/certifications.php?id=${id}`, 'PUT', updatedItem, authToken);
  };

  const deleteEducation = (id) => {
    setPortfolioData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
    authFetch(`${API_BASE_URL}/endpoints/certifications.php?id=${id}`, 'DELETE', undefined, authToken);
  };

  return {
    updateHero,
    updateAbout,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
  };
}
