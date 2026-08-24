import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth.js';
import { getSiteContent } from '../services/siteContentService';
import './AuthPages.css';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const { interactiveCopy } = getSiteContent();
  const copy = interactiveCopy.auth.forgot;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await forgotPassword(email);
    setMessage(response.message);
    setSent(true);
  };

  return (
    <div className="auth-shell auth-simple-shell">
      <div className="auth-card auth-card-single">
        <div className="auth-form-shell">
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email Address
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <button type="submit" className="button primary auth-submit">{copy.submit}</button>
          </form>
          {sent && <p className="auth-success">{message}</p>}
          <button type="button" className="button secondary auth-submit" onClick={() => navigate('/login')}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
