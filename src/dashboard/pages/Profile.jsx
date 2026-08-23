import { useState } from 'react';
import useAuth from '../../auth/useAuth.js';
import './DashboardPages.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName || '', email: user?.email || '', phone: user?.phone || '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const response = await updateProfile(form);
    if (response.success) {
      setMessage('Profile updated successfully.');
    } else {
      setMessage(response.message || 'Unable to update profile.');
    }
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Profile</span>
          <h2>Your account details</h2>
          <p>Update your personal information and account preferences.</p>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Account</span>
          <h3>Profile information</h3>
        </div>
        <div className="form-card dashboard-profile-card">
          <div className="profile-avatar">
            <span>{(user?.fullName || 'L').charAt(0).toUpperCase()}</span>
          </div>
          <label>
            Full Name
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </label>
          <label>
            Phone
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          </label>
          {message && <p className="form-status">{message}</p>}
          <button type="button" className="button primary" onClick={handleSave}>Save Changes</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
