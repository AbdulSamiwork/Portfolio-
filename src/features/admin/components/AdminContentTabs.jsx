import React from 'react';
import OverviewTab from '../tabs/OverviewTab';
import HeroTab from '../tabs/HeroTab';
import AboutTab from '../tabs/AboutTab';
import SkillsTab from '../tabs/SkillsTab';
import ExperienceTab from '../tabs/ExperienceTab';
import ProjectsTab from '../tabs/ProjectsTab';
import CertificationsTab from '../tabs/CertificationsTab';
import TestimonialsTab from '../tabs/TestimonialsTab';
import MessagesTab from '../tabs/MessagesTab';
import SettingsTab from '../tabs/SettingsTab';

export default function AdminContentTabs({ forms, portfolio }) {
  return (
    <main key={forms.activeTab} className="admin-content-area admin-tab-content">
      {forms.activeTab === 'overview' && (
        <OverviewTab
          portfolioData={portfolio.portfolioData}
          authToken={portfolio.authToken}
          setActiveTab={forms.setActiveTab}
          setModalType={forms.setModalType}
          setEditingId={forms.setEditingId}
          setProjectForm={forms.setProjectForm}
          setSkillForm={forms.setSkillForm}
          exportPortfolioJSON={portfolio.exportPortfolioJSON}
        />
      )}

      {forms.activeTab === 'hero' && (
        <HeroTab
          heroForm={forms.heroForm}
          setHeroForm={forms.setHeroForm}
          handleHeroSubmit={forms.handleHeroSubmit}
          handleProfileImageFile={forms.handleProfileImageFile}
          handleResumePdfFile={forms.handleResumePdfFile}
          portfolioData={portfolio.portfolioData}
          inputStyle={forms.inputStyle}
        />
      )}

      {forms.activeTab === 'about' && (
        <AboutTab
          aboutForm={forms.aboutForm}
          setAboutForm={forms.setAboutForm}
          handleAboutSubmit={forms.handleAboutSubmit}
          handleHighlightChange={forms.handleHighlightChange}
          inputStyle={forms.inputStyle}
        />
      )}

      {forms.activeTab === 'skills' && (
        <SkillsTab
          portfolioData={portfolio.portfolioData}
          searchQuery={forms.searchQuery}
          skillCategoryTab={forms.skillCategoryTab}
          setSkillCategoryTab={forms.setSkillCategoryTab}
          setEditingId={forms.setEditingId}
          setSkillForm={forms.setSkillForm}
          setModalType={forms.setModalType}
          requestConfirm={forms.requestConfirm}
          deleteSkill={portfolio.deleteSkill}
          triggerToast={forms.triggerToast}
        />
      )}

      {forms.activeTab === 'experience' && (
        <ExperienceTab
          portfolioData={portfolio.portfolioData}
          searchQuery={forms.searchQuery}
          setEditingId={forms.setEditingId}
          setExpForm={forms.setExpForm}
          setModalType={forms.setModalType}
          requestConfirm={forms.requestConfirm}
          deleteExperience={portfolio.deleteExperience}
          triggerToast={forms.triggerToast}
        />
      )}

      {forms.activeTab === 'projects' && (
        <ProjectsTab
          portfolioData={portfolio.portfolioData}
          searchQuery={forms.searchQuery}
          setEditingId={forms.setEditingId}
          setProjectForm={forms.setProjectForm}
          setModalType={forms.setModalType}
          requestConfirm={forms.requestConfirm}
          deleteProject={portfolio.deleteProject}
          triggerToast={forms.triggerToast}
        />
      )}

      {forms.activeTab === 'education' && (
        <CertificationsTab
          portfolioData={portfolio.portfolioData}
          searchQuery={forms.searchQuery}
          setEditingId={forms.setEditingId}
          setEduForm={forms.setEduForm}
          setModalType={forms.setModalType}
          requestConfirm={forms.requestConfirm}
          deleteEducation={portfolio.deleteEducation}
          triggerToast={forms.triggerToast}
        />
      )}

      {forms.activeTab === 'testimonials' && (
        <TestimonialsTab
          portfolioData={portfolio.portfolioData}
          searchQuery={forms.searchQuery}
          setEditingId={forms.setEditingId}
          setTestiForm={forms.setTestiForm}
          setModalType={forms.setModalType}
          requestConfirm={forms.requestConfirm}
          deleteTestimonial={portfolio.deleteTestimonial}
          triggerToast={forms.triggerToast}
        />
      )}

      {forms.activeTab === 'messages' && (
        <MessagesTab
          portfolioData={portfolio.portfolioData}
          toggleStarMessage={portfolio.toggleStarMessage}
          deleteMessage={portfolio.deleteMessage}
          markMessageRead={portfolio.markMessageRead}
          replyingId={forms.replyingId}
          setReplyingId={forms.setReplyingId}
          replyText={forms.replyText}
          setReplyText={forms.setReplyText}
          handleSendReply={forms.handleSendReply}
          requestConfirm={forms.requestConfirm}
          triggerToast={forms.triggerToast}
        />
      )}

      {forms.activeTab === 'settings' && (
        <SettingsTab
          accentTheme={portfolio.accentTheme}
          setAccentTheme={portfolio.setAccentTheme}
          triggerToast={forms.triggerToast}
          exportPortfolioJSON={portfolio.exportPortfolioJSON}
          handleImportFile={forms.handleImportFile}
          handleResetDefaults={forms.handleResetDefaults}
        />
      )}
    </main>
  );
}
