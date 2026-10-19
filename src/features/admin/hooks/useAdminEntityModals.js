import { useState } from 'react';

export function useAdminEntityModals({
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
  triggerToast
}) {
  const [modalType, setModalType] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [skillForm, setSkillForm] = useState({ name: '', category: 'web', level: 'Intermediate', desc: '' });
  const [expForm, setExpForm] = useState({
    role: '', company: '', period: '', domain: 'Full-Stack Web', category: 'web', achievements: '', skills: ''
  });
  const [projectForm, setProjectForm] = useState({
    title: '', subtitle: '', category: 'web', categoryBadge: 'Full-Stack Web App',
    image: '/images/project_gristmill.webp', tech: '', summary: '', highlights: '',
    github: 'https://github.com/Abdul-Sami1122', showDemo: true,
    demoUrl: 'https://github.com/Abdul-Sami1122', isInProgress: false
  });
  const [eduForm, setEduForm] = useState({
    type: 'certification', title: '', institution: '', period: '', badge: 'Certified', category: 'web', desc: ''
  });
  const [testiForm, setTestiForm] = useState({
    name: '', role: '', company: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5, content: '', date: 'July 2026'
  });

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

  return {
    modalType,
    setModalType,
    editingId,
    setEditingId,
    skillForm,
    setSkillForm,
    expForm,
    setExpForm,
    projectForm,
    setProjectForm,
    eduForm,
    setEduForm,
    testiForm,
    setTestiForm,
    handleProjectImageFile,
    handleSaveSkill,
    handleSaveExp,
    handleSaveProject,
    handleSaveEdu,
    handleSaveTestimonial,
  };
}
