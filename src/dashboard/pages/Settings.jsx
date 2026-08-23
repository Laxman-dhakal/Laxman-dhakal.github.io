import './DashboardPages.css';

const settingsCards = [
  { title: 'Appearance', description: 'Light and dark theme support with future system preferences.', accent: 'purple' },
  { title: 'Notifications', description: 'Manage alerts for messages, projects and system updates.', accent: 'blue' },
  { title: 'Security', description: 'Change password and review active session controls.', accent: 'green' },
  { title: 'Account', description: 'Delete account or manage admin roles in the future.', accent: 'amber' }
];

const Settings = () => {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Settings</span>
          <h2>Dashboard preferences</h2>
          <p>Adjust how your workspace behaves and how you receive updates.</p>
        </div>
        <button type="button" className="button primary hero-button">Save changes</button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Preferences</span>
          <h3>Customize your workspace</h3>
        </div>
        <div className="dashboard-grid settings-grid">
          {settingsCards.map((setting) => (
            <div className={`info-card service-card setting-card ${setting.accent}`} key={setting.title}>
              <div className="setting-icon" />
              <h4>{setting.title}</h4>
              <p>{setting.description}</p>
              <button type="button" className="text-link">Configure</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
