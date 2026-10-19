import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ProjectsTab({
  portfolioData,
  searchQuery,
  setEditingId,
  setProjectForm,
  setModalType,
  requestConfirm,
  deleteProject,
  triggerToast
}) {
  return (
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
                            showDemo: (proj.showDemo !== false && proj.showDemo !== 0 && proj.showDemo !== '0'),
                            demoUrl: proj.demoUrl || proj.demo || '',
                            isInProgress: Boolean(proj.isInProgress && proj.isInProgress !== '0' && proj.isInProgress !== 0),
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
  );
}
