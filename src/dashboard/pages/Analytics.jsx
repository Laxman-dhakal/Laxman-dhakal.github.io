import { useEffect, useState } from 'react';
import './DashboardPages.css';
import { getAnalytics } from '../../services/analyticsService';

const trafficBars = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 50 },
  { month: 'Apr', value: 72 },
  { month: 'May', value: 68 },
  { month: 'Jun', value: 82 },
  { month: 'Jul', value: 74 },
  { month: 'Aug', value: 94 }
];

const Analytics = () => {
  const [analytics, setAnalytics] = useState(getAnalytics);

  useEffect(() => {
    setAnalytics(getAnalytics());
  }, []);

  const stats = [
    { label: 'Total Visits', value: analytics.visits.toLocaleString(), trend: 'Live local tracking' },
    { label: 'Page Views', value: analytics.pageViews.toLocaleString(), trend: 'Across all routes' },
    { label: 'New Messages', value: analytics.messages.toLocaleString(), trend: 'Successful submissions' },
    { label: 'Top Page', value: Object.entries(analytics.pages).sort((a, b) => b[1] - a[1])[0]?.[0] || '/', trend: 'Most viewed route' }
  ];

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero dashboard-hero-compact">
        <div>
          <span className="small-badge">Analytics</span>
          <h2>Overview analytics</h2>
          <p>Track portfolio traffic, message trends and conversion signals from one place.</p>
        </div>
        <button type="button" className="button secondary hero-button">Export report</button>
      </section>

      <section className="dashboard-section">
        <div className="section-title">
          <span>Insights</span>
          <h3>Traffic summary</h3>
        </div>
        <div className="dashboard-grid analytics-grid">
          {stats.map((item) => (
            <div className="info-card analytic-card" key={item.label}>
              <h4>{item.label}</h4>
              <p>{item.value}</p>
              <span className="info-meta">{item.trend} from last month</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-two-column analytics-layout">
        <div className="dashboard-panel">
          <div className="section-title compact-title">
            <span>Traffic</span>
            <h3>Growth trend</h3>
          </div>

          <div className="chart-bars" aria-label="Traffic chart">
            {trafficBars.map((item) => (
              <div className="bar-group" key={item.month}>
                <div className="bar-column">
                  <span className="bar-fill" style={{ height: `${item.value}%` }} />
                </div>
                <small>{item.month}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="section-title compact-title">
            <span>Performance</span>
            <h3>Top channels</h3>
          </div>

          <div className="channel-list compact-channel-list">
            <div className="channel-item">
              <div className="channel-header">
                <span>Direct</span>
                <strong>44%</strong>
              </div>
              <div className="progress-track"><span className="progress-fill purple" style={{ width: '44%' }} /></div>
            </div>
            <div className="channel-item">
              <div className="channel-header">
                <span>Search</span>
                <strong>31%</strong>
              </div>
              <div className="progress-track"><span className="progress-fill blue" style={{ width: '31%' }} /></div>
            </div>
            <div className="channel-item">
              <div className="channel-header">
                <span>Referral</span>
                <strong>18%</strong>
              </div>
              <div className="progress-track"><span className="progress-fill green" style={{ width: '18%' }} /></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
