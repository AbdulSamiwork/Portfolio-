import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAdminForms } from './hooks/useAdminForms';
import AdminLoginView from './components/AdminLoginView';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import AdminContentTabs from './components/AdminContentTabs';
import AdminModalsContainer from './components/AdminModalsContainer';

export default function AdminModal() {
  const portfolio = usePortfolio();

  const forms = useAdminForms({
    portfolioData: portfolio.portfolioData,
    adminLogin: portfolio.adminLogin,
    resetToDefaults: portfolio.resetToDefaults,
    importPortfolioJSON: portfolio.importPortfolioJSON,
    updateHero: portfolio.updateHero,
    updateAbout: portfolio.updateAbout,
    addSkill: portfolio.addSkill,
    updateSkill: portfolio.updateSkill,
    addExperience: portfolio.addExperience,
    updateExperience: portfolio.updateExperience,
    addProject: portfolio.addProject,
    updateProject: portfolio.updateProject,
    addEducation: portfolio.addEducation,
    updateEducation: portfolio.updateEducation,
    updateResumeUrl: portfolio.updateResumeUrl,
    addTestimonial: portfolio.addTestimonial,
    updateTestimonial: portfolio.updateTestimonial,
    markMessageRead: portfolio.markMessageRead,
    uploadFile: portfolio.uploadFile,
    setIsAdminOpen: portfolio.setIsAdminOpen
  });

  if (!portfolio.isAdminOpen) return null;

  if (!portfolio.authToken) {
    return (
      <AdminLoginView
        username={forms.username}
        setUsername={forms.setUsername}
        password={forms.password}
        setPassword={forms.setPassword}
        authError={portfolio.authError}
        handleLogin={forms.handleLogin}
        handleClose={forms.handleClose}
        inputStyle={forms.inputStyle}
      />
    );
  }

  return (
    <div className="admin-modal-overlay">
      <AdminSidebar
        sidebarOpen={forms.sidebarOpen}
        setSidebarOpen={forms.setSidebarOpen}
        activeTab={forms.activeTab}
        setActiveTab={forms.setActiveTab}
        portfolioData={portfolio.portfolioData}
        adminUser={portfolio.adminUser}
        adminLogout={portfolio.adminLogout}
      />

      <div className="admin-main-wrapper">
        <AdminHeader
          activeTab={forms.activeTab}
          sidebarOpen={forms.sidebarOpen}
          setSidebarOpen={forms.setSidebarOpen}
          searchQuery={forms.searchQuery}
          setSearchQuery={forms.setSearchQuery}
          accentTheme={portfolio.accentTheme}
          setAccentTheme={portfolio.setAccentTheme}
          triggerToast={forms.triggerToast}
          saveToast={forms.saveToast}
          handleClose={forms.handleClose}
          handleResetDefaults={forms.handleResetDefaults}
        />

        <AdminContentTabs forms={forms} portfolio={portfolio} />
      </div>

      <AdminModalsContainer forms={forms} />
    </div>
  );
}
