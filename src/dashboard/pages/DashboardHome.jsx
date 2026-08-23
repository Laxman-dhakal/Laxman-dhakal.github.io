import { motion } from 'framer-motion';
import { FaProjectDiagram, FaWrench, FaEnvelope, FaStar, FaArrowRight, FaBolt, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import StatCard from '../components/StatCard.jsx';
import './DashboardPages.css';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

const DashboardHome = () => {
  const stats = [
    { icon: FaProjectDiagram, label: 'Projects', value: '24', trend: 'positive', change: '12.5%' },
    { icon: FaWrench, label: 'Services', value: '8', trend: 'positive', change: '4.9%' },
    { icon: FaEnvelope, label: 'Messages', value: '42', trend: 'neutral', change: '0.2%' },
    { icon: FaStar, label: 'Testimonials', value: '18', trend: 'positive', change: '3.8%' }
  ];

  const recentProjects = [
    { title: 'Portfolio Website', category: 'React', status: 'Published', views: '1,245', date: 'Aug 10, 2026' },
    { title: 'SaaS Dashboard', category: 'Admin', status: 'Draft', views: '982', date: 'Aug 08, 2026' },
    { title: 'E-Commerce Design', category: 'UI/UX', status: 'Published', views: '762', date: 'Aug 02, 2026' }
  ];

  const quickActions = [
    { title: 'Add new project', subtitle: 'Launch a fresh portfolio case study', action: 'Create' },
    { title: 'Publish service', subtitle: 'Update your web design package', action: 'Open' },
    { title: 'Reply to messages', subtitle: '2 new inquiries waiting for a response', action: 'Inbox' }
  ];

  const activityFeed = [
    { title: 'New inquiry from a startup client', time: '12 min ago', type: 'success' },
    { title: 'Website analytics crossed 9.8k views', time: '1 hour ago', type: 'info' },
    { title: 'Project “SaaS Dashboard” moved to review', time: '3 hours ago', type: 'warning' },
    { title: 'Profile settings updated successfully', time: 'Yesterday', type: 'success' }
  ];

  const pipeline = [
    { label: 'Brand refresh', value: 82, color: 'purple' },
    { label: 'Portfolio revamp', value: 66, color: 'blue' },
    { label: 'Client onboarding', value: 48, color: 'green' }
  ];

  return (
    <motion.div className="dashboard-page" initial="hidden" animate="visible" variants={fadeUp}>
      <motion.section className="dashboard-hero dashboard-hero-featured" variants={fadeUp}>
        <div className="dashboard-hero-copy">
          <span className="small-badge">
            <FaBolt /> Dashboard Overview
          </span>
          <h2>Good morning, Laxman 👋</h2>
          <p>Here’s what’s happening with your portfolio and client work today.</p>

          <div className="dashboard-hero-actions">
            <button type="button" className="button primary hero-button">View reports</button>
            <button type="button" className="button secondary hero-button">Add project</button>
          </div>
        </div>

        <div className="dashboard-hero-visual">
          <div className="hero-metric-card">
            <span className="metric-label">Total engagement</span>
            <strong>18.4K</strong>
            <div className="mini-trend">
              <span className="up">+24.8%</span>
              <FaChartLine />
            </div>
          </div>
          <div className="hero-ring">
            <div className="ring-inner">
              <span>82%</span>
              <small>Conversion</small>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div className="dashboard-stats-grid" variants={fadeUp}>
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </motion.div>

      <motion.section className="dashboard-two-column" variants={fadeUp}>
        <div className="dashboard-panel dashboard-panel-large">
          <div className="section-title compact-title">
            <span>Dashboard</span>
            <h3>Recent projects</h3>
          </div>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.title}>
                    <td>{project.title}</td>
                    <td>{project.category}</td>
                    <td><span className={`status-badge status-${project.status.toLowerCase()}`}>{project.status}</span></td>
                    <td>{project.views}</td>
                    <td>{project.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-panel stack-panel">
          <div className="section-title compact-title">
            <span>Quick</span>
            <h3>Actions</h3>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <button key={action.title} type="button" className="action-card">
                <div>
                  <strong>{action.title}</strong>
                  <small>{action.subtitle}</small>
                </div>
                <span>{action.action} <FaArrowRight /></span>
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="dashboard-grid dashboard-insights" variants={fadeUp}>
        <div className="dashboard-panel">
          <div className="section-title compact-title">
            <span>Performance</span>
            <h3>Channel reach</h3>
          </div>

          <div className="channel-list">
            {pipeline.map((item) => (
              <div key={item.label} className="channel-item">
                <div className="channel-header">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="progress-track">
                  <span className={`progress-fill ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="section-title compact-title">
            <span>Focus</span>
            <h3>Project pipeline</h3>
          </div>

          <div className="pipeline-list">
            <div className="pipeline-item complete">
              <div className="pipeline-dot"><FaCheckCircle /></div>
              <div>
                <strong>Brand strategy</strong>
                <small>Completed</small>
              </div>
            </div>
            <div className="pipeline-item active">
              <div className="pipeline-dot"><FaProjectDiagram /></div>
              <div>
                <strong>Modern portfolio</strong>
                <small>In review</small>
              </div>
            </div>
            <div className="pipeline-item upcoming">
              <div className="pipeline-dot"><FaWrench /></div>
              <div>
                <strong>Maintenance setup</strong>
                <small>Scheduled</small>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="section-title compact-title">
            <span>Activity</span>
            <h3>Recent updates</h3>
          </div>

          <div className="activity-list">
            {activityFeed.map((item) => (
              <div key={item.title} className="activity-item">
                <span className={`activity-dot ${item.type}`} />
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default DashboardHome;
