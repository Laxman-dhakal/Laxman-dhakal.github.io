import { useMemo, useState } from 'react';
import './DashboardPages.css';

const messages = [
  { name: 'Priya Sharma', subject: 'New project inquiry', date: 'Aug 11, 2026', status: 'Unread' },
  { name: 'Ninad Joshi', subject: 'Portfolio feedback', date: 'Aug 10, 2026', status: 'Read' },
  { name: 'Sita K.', subject: 'Collaboration request', date: 'Aug 09, 2026', status: 'Unread' },
  { name: 'Mark Lee', subject: 'Website maintenance quote', date: 'Aug 08, 2026', status: 'Read' }
];

const Messages = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => messages.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.subject.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Messages</span>
          <h2>Contact inbox</h2>
          <p>Keep conversations moving and stay on top of new inquiries.</p>
        </div>
        <button type="button" className="button primary hero-button">Mark all as read</button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Inbox</span>
          <h3>Recent conversations</h3>
        </div>

        <div className="table-toolbar message-toolbar">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages" />
          <button type="button" className="button secondary table-button">Filter</button>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((message) => (
                <tr key={`${message.name}-${message.subject}`}>
                  <td>{message.name}</td>
                  <td>{message.subject}</td>
                  <td>{message.date}</td>
                  <td><span className={`status-badge status-${message.status.toLowerCase()}`}>{message.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Messages;
