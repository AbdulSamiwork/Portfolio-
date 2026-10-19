import { defaultPortfolioData } from '../data/defaultPortfolioData';

export function mergePortfolioData(apiData) {
  if (!apiData) return defaultPortfolioData;

  const resolvedResume = apiData.resumeUrl || apiData.hero?.resumeUrl || defaultPortfolioData.resumeUrl;

  const mergedSkills = (Array.isArray(apiData.skills) && apiData.skills.length > 0)
    ? apiData.skills
    : defaultPortfolioData.skills;

  const mergedProjects = (Array.isArray(apiData.projects) && apiData.projects.length > 0)
    ? apiData.projects.map((p) => ({
        ...p,
        showDemo: (p.showDemo !== false && p.showDemo !== 0 && p.showDemo !== '0'),
        isInProgress: Boolean(p.isInProgress && p.isInProgress !== '0' && p.isInProgress !== 0),
        demoUrl: p.demoUrl || p.demo || '',
        demo: p.demoUrl || p.demo || '',
      }))
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

  return {
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
      stats: {
        ...(defaultPortfolioData.about?.stats || {}),
        ...(apiData.about?.stats || {}),
      },
      highlights: (Array.isArray(apiData.about?.highlights) && apiData.about.highlights.length > 0)
        ? apiData.about.highlights
        : defaultPortfolioData.about?.highlights,
    },
    skills: mergedSkills,
    projects: mergedProjects,
    experiences: mergedExperiences,
    education: mergedEducation,
    testimonials: mergedTestimonials,
    resumeUrl: resolvedResume,
  };
}
