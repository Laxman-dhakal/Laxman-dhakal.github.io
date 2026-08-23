import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth.js';
import './AuthPages.css';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    const response = await resetPassword(form.email, form.password);
    if (response.success) {
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1600);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="auth-shell auth-simple-shell">
      <div className="auth-card auth-card-single">
        <div className="auth-form-shell">
          <h2>Reset Password</h2>
          <p>Enter your email and create a new password.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email Address
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              New Password
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>
            <label>
              Confirm Password
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
            </label>
            {error && <p className="form-error">{error}</p>}
            {message && <p className="auth-success">{message}</p>}
            <button type="submit" className="button primary auth-submit">Reset Password</button>
          </form>
          <button type="button" className="button secondary auth-submit" onClick={() => navigate('/login')}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
