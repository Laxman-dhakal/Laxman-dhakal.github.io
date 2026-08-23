import './DashboardPages.css';

const notifications = [
  { title: 'New message received', time: '2m ago', tag: 'Inbox' },
  { title: 'Project published successfully', time: '1h ago', tag: 'Content' },
  { title: 'Password updated', time: 'Yesterday', tag: 'Security' },
  { title: 'Analytics milestone reached', time: '2 days ago', tag: 'Insights' }
];

const Notifications = () => {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Notifications</span>
          <h2>Review recent alerts</h2>
          <p>Stay aware of updates across your portfolio, messages, and account health.</p>
        </div>
        <button type="button" className="button secondary hero-button">Clear all</button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Alerts</span>
          <h3>Latest activity</h3>
        </div>
        <div className="table-card">
          <ul className="notification-list">
            {notifications.map((item) => (
              <li key={item.title} className="notification-item">
                <div className="notification-indicator" />
                <div className="notification-copy">
                  <h4>{item.title}</h4>
                  <span>{item.time}</span>
                </div>
                <span className="notification-tag">{item.tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
