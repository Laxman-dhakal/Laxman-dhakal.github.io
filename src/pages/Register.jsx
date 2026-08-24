import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth.js';
import { getSiteContent } from '../services/siteContentService';
import './AuthPages.css';

const getStrength = (value) => {
  if (value.length >= 10 && /[A-Z]/.test(value) && /[0-9]/.test(value)) return 'Strong';
  if (value.length >= 7) return 'Medium';
  return 'Weak';
};

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { interactiveCopy } = getSiteContent();
  const copy = interactiveCopy.auth.register;

  const strength = useMemo(() => getStrength(form.password), [form.password]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 7) {
      setError('Password should be at least 7 characters.');
      return;
    }
    const response = await register(form);
    if (response.success) {
      navigate('/dashboard');
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="auth-shell auth-register-shell">
      <div className="auth-card auth-card-left">
        <div className="auth-hero">
          <span className="badge">{copy.badge}</span>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroText}</p>
        </div>
      </div>
      <div className="auth-card auth-card-right">
        <div className="auth-form-shell">
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label>
              Email Address
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>
            <label>
              Confirm Password
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
            </label>
            <div className="password-strength">
              <span>Password strength:</span>
              <strong>{strength}</strong>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="button primary auth-submit">{copy.submit}</button>
          </form>
          <p className="auth-meta">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
