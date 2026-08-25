import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaHome } from 'react-icons/fa';
import useAuth from '../auth/useAuth.js';
import { getSiteContent } from '../services/siteContentService';
import './AuthPages.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const { interactiveCopy } = getSiteContent();
  const copy = interactiveCopy.auth.login;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(form);
    if (response.success) {
      navigate('/dashboard');
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card auth-card-left">
        <div className="auth-hero">
          <span className="badge">{copy.badge}</span>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroText}</p>
        </div>
      </div>
      <div className="auth-card auth-card-right">
        <div className="auth-form-shell">
          <div className="auth-form-header">
            <h2>{copy.title}</h2>
            <Link to="/" className="auth-home-tab">
              <FaHome className="auth-home-icon" />
              Return Home
            </Link>
          </div>
          <p>{copy.intro}</p>
          <div className="admin-quick-helper" style={{ margin: '14px 0', padding: '12px 16px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '16px', border: '1px dashed rgba(99, 102, 241, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              🔑 <strong>Admin Credentials:</strong> <span style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>admin@laxmandhakal.com</span>
            </div>
            <button
              type="button"
              onClick={() => setForm({ email: 'admin@laxmandhakal.com', password: 'Admin123', remember: true })}
              style={{ padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, borderRadius: '8px', border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer' }}
            >
              Fill Credentials
            </button>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              {copy.email}
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              {copy.password}
              <div className="password-field">
                <input
                  type={visible ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setVisible((prev) => !prev)}>
                  {visible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            <div className="auth-actions-row">
              <label className="checkbox-label">
                <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} /> Remember me
              </label>
              <Link to="/forgot-password" className="link-muted">Forgot Password?</Link>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="button primary auth-submit">{copy.submit}</button>
            <Link to="/" className="button secondary auth-submit">Back to Home</Link>
          </form>
          <div className="auth-divider">or continue with</div>
          <div className="auth-socials">
            <button type="button" className="social-button"><FaGoogle /> Google</button>
            <button type="button" className="social-button"><FaGithub /> GitHub</button>
          </div>
          <p className="auth-meta">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
