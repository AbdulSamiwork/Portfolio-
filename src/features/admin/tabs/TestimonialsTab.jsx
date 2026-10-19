import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function TestimonialsTab({
  portfolioData,
  searchQuery,
  setEditingId,
  setTestiForm,
  setModalType,
  requestConfirm,
  deleteTestimonial,
  triggerToast
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
          Manage client reviews, endorsements, and peer recommendations.
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setTestiForm({ name: '', role: '', company: '', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', rating: 5, content: '', date: 'July 2026' });
            setModalType('testi');
          }}
          className="btn btn-primary btn-sm"
        >
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client / Author</th>
              <th>Role & Company</th>
              <th>Rating</th>
              <th>Review Quote</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(portfolioData.testimonials || [])
              .filter((t) => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.company.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={item.avatar} alt={item.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.date}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: 'var(--cyan-accent)', fontWeight: 600, fontSize: '0.85rem' }}>{item.role}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.company}</div>
                  </td>
                  <td>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>{item.rating || 5} ★</span>
                  </td>
                  <td style={{ maxWidth: '280px' }}>
                    <div style={{ fontSize: '0.82rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      "{item.content || item.quote}"
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setTestiForm({
                            ...item,
                            content: item.content || item.quote || '',
                            quote: item.content || item.quote || '',
                          });
                          setModalType('testi');
                        }}
                        style={{ background: 'rgba(0, 242, 254, 0.12)', border: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--cyan-accent)', padding: '0.45rem', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => {
                          requestConfirm({
                            title: 'Delete Recommendation',
                            message: `Are you sure you want to delete recommendation from "${item.name}"?`,
                            confirmText: 'Delete Recommendation',
                            variant: 'danger',
                            onConfirm: () => {
                              deleteTestimonial(item.id);
                              triggerToast('Testimonial deleted!');
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
