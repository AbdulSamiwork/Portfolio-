import React from 'react';
import { MessageSquare, Star, Trash2, Mail, ExternalLink, Send } from 'lucide-react';

export default function MessagesTab({
  portfolioData,
  toggleStarMessage,
  deleteMessage,
  markMessageRead,
  replyingId,
  setReplyingId,
  replyText,
  setReplyText,
  handleSendReply,
  requestConfirm,
  triggerToast
}) {
  const messages = portfolioData.messages || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem', fontWeight: 700 }}>
            Contact Form Submissions & Inquiries
          </h3>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Direct messages submitted by clients and recruiters from your public portfolio.
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
          <MessageSquare size={40} style={{ marginBottom: '0.75rem', opacity: 0.4, color: 'var(--cyan-accent)' }} />
          <div style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>No Messages Received Yet</div>
          <div style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>Messages submitted through the Contact form will be delivered here instantly.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="admin-card"
              style={{
                borderLeft: msg.read ? '3px solid #334155' : '3px solid var(--cyan-accent)',
                background: msg.read ? 'rgba(30, 41, 59, 0.4)' : 'rgba(15, 23, 42, 0.85)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.6rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#fff' }}>{msg.name}</strong>
                    {!msg.read && (
                      <span className="badge" style={{ background: 'rgba(0, 242, 254, 0.2)', color: 'var(--cyan-accent)', fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>NEW</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--cyan-accent)', fontWeight: 500 }}>{msg.email}</div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{msg.date}</span>
                  <button
                    onClick={() => toggleStarMessage(msg.id)}
                    style={{ background: 'none', border: 'none', color: msg.starred ? '#f59e0b' : '#64748b', cursor: 'pointer', padding: '0.3rem' }}
                    title="Star message"
                  >
                    <Star size={16} fill={msg.starred ? '#f59e0b' : 'none'} />
                  </button>
                  <button
                    onClick={() => {
                      requestConfirm({
                        title: 'Delete Inbox Message',
                        message: `Are you sure you want to delete the message from "${msg.name}" (${msg.email})?`,
                        confirmText: 'Delete Message',
                        variant: 'danger',
                        onConfirm: () => {
                          deleteMessage(msg.id);
                          triggerToast('Message deleted!');
                        },
                      });
                    }}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem', borderRadius: '6px' }}
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.4rem' }}>
                Subject: {msg.subject}
              </div>

              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1rem 0', whiteSpace: 'pre-wrap' }}>
                {msg.message}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    markMessageRead(msg.id);
                    if (replyingId === msg.id) {
                      setReplyingId(null);
                    } else {
                      setReplyingId(msg.id);
                      setReplyText(`Hi ${msg.name},\n\nThank you for reaching out! `);
                    }
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Mail size={14} /> {replyingId === msg.id ? 'Close Reply Box' : 'Reply to Customer'}
                </button>

                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  onClick={() => markMessageRead(msg.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  <ExternalLink size={14} /> Open in Email App
                </a>

                {!msg.read && (
                  <button
                    onClick={() => markMessageRead(msg.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.78rem', color: '#94a3b8' }}
                  >
                    Mark as Read
                  </button>
                )}
              </div>

              {/* Expandable Inline Reply Form */}
              {replyingId === msg.id && (
                <div
                  className="animate-fade-in"
                  style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(0, 242, 254, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '1rem',
                    borderRadius: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.84rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>
                      Compose Email Reply to: {msg.name} ({msg.email})
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response message here..."
                    style={{
                      width: '100%',
                      background: '#090d16',
                      border: '1px solid rgba(0, 242, 254, 0.3)',
                      borderRadius: '8px',
                      color: '#fff',
                      padding: '0.75rem',
                      fontSize: '0.85rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                  />

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setReplyingId(null)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.78rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(msg)}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.78rem' }}
                    >
                      <Send size={14} /> Send Direct Email to Customer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
