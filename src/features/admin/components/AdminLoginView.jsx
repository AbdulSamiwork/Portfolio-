import React from 'react';
import { ShieldCheck, AlertCircle, Key } from 'lucide-react';

export default function AdminLoginView({
  username,
  setUsername,
  password,
  setPassword,
  authError,
  handleLogin,
  handleClose,
  inputStyle
}) {
  return (
    <div className="admin-modal-overlay">
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem',
          textAlign: 'center',
          borderRadius: '16px',
          background: 'rgba(13, 19, 33, 0.95)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(0, 242, 254, 0.12)',
            color: 'var(--cyan-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
          }}
        >
          <ShieldCheck size={36} />
        </div>
        <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem', fontWeight: 800 }}>
          Admin Control Center
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.75rem' }}>
          Authenticate with your admin credentials to access the management portal.
        </p>

        {authError && (
          <div
            style={{
              padding: '0.75rem',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#fca5a5',
              fontSize: '0.82rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={16} /> {authError}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', display: 'block' }}>Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.3rem', display: 'block' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={inputStyle}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            <Key size={16} /> Unlock Dashboard
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
          <span>Protected Administrator Session</span>
          <button
            onClick={handleClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Close & Return to Site
          </button>
        </div>
      </div>
    </div>
  );
}
