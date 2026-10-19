import React from 'react';
import SkillFormModal from '../modals/SkillFormModal';
import ExperienceFormModal from '../modals/ExperienceFormModal';
import ProjectFormModal from '../modals/ProjectFormModal';
import CertificationFormModal from '../modals/CertificationFormModal';
import TestimonialFormModal from '../modals/TestimonialFormModal';
import ConfirmModal from '../../../components/common/ConfirmModal';

export default function AdminModalsContainer({ forms }) {
  return (
    <>
      <SkillFormModal
        isOpen={forms.modalType === 'skill'}
        editingId={forms.editingId}
        skillForm={forms.skillForm}
        setSkillForm={forms.setSkillForm}
        onSave={forms.handleSaveSkill}
        onClose={() => forms.setModalType(null)}
        inputStyle={forms.inputStyle}
      />

      <ExperienceFormModal
        isOpen={forms.modalType === 'exp'}
        editingId={forms.editingId}
        expForm={forms.expForm}
        setExpForm={forms.setExpForm}
        onSave={forms.handleSaveExp}
        onClose={() => forms.setModalType(null)}
        inputStyle={forms.inputStyle}
      />

      <ProjectFormModal
        isOpen={forms.modalType === 'project'}
        editingId={forms.editingId}
        projectForm={forms.projectForm}
        setProjectForm={forms.setProjectForm}
        handleProjectImageFile={forms.handleProjectImageFile}
        onSave={forms.handleSaveProject}
        onClose={() => forms.setModalType(null)}
        inputStyle={forms.inputStyle}
      />

      <CertificationFormModal
        isOpen={forms.modalType === 'edu'}
        editingId={forms.editingId}
        eduForm={forms.eduForm}
        setEduForm={forms.setEduForm}
        onSave={forms.handleSaveEdu}
        onClose={() => forms.setModalType(null)}
        inputStyle={forms.inputStyle}
      />

      <TestimonialFormModal
        isOpen={forms.modalType === 'testi'}
        editingId={forms.editingId}
        testiForm={forms.testiForm}
        setTestiForm={forms.setTestiForm}
        onSave={forms.handleSaveTestimonial}
        onClose={() => forms.setModalType(null)}
        inputStyle={forms.inputStyle}
      />

      <ConfirmModal
        isOpen={forms.confirmDialog.isOpen}
        onClose={forms.closeConfirm}
        onConfirm={forms.confirmDialog.onConfirm}
        title={forms.confirmDialog.title}
        message={forms.confirmDialog.message}
        confirmText={forms.confirmDialog.confirmText}
        cancelText={forms.confirmDialog.cancelText}
        variant={forms.confirmDialog.variant}
      />
    </>
  );
}
