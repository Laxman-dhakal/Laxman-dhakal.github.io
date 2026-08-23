import './DashboardPages.css';

const activities = [
  { action: 'Logged in', user: 'Laxman', date: 'Aug 12, 2026', status: 'Success' },
  { action: 'Project created', user: 'Laxman', date: 'Aug 11, 2026', status: 'Success' },
  { action: 'Message received', user: 'System', date: 'Aug 10, 2026', status: 'Info' },
  { action: 'Profile updated', user: 'Laxman', date: 'Aug 09, 2026', status: 'Warning' }
];

const Activity = () => {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Activity</span>
          <h2>Recent account logs</h2>
          <p>Review the latest dashboard actions, changes, and system updates.</p>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Timeline</span>
          <h3>Recent activity</h3>
        </div>
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item) => (
                <tr key={`${item.action}-${item.date}`}>
                  <td>{item.action}</td>
                  <td>{item.user}</td>
                  <td>{item.date}</td>
                  <td><span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Activity;
