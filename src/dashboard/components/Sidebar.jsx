import { NavLink } from 'react-router-dom';
import { FaChartLine, FaFolderOpen, FaWrench, FaEnvelope, FaStar, FaQuestionCircle, FaUserCircle, FaCog, FaBell, FaListAlt, FaLifeRing, FaImage, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navigation = [
  { section: 'MAIN', items: [
      { label: 'Dashboard', path: '/dashboard', icon: FaChartLine },
      { label: 'Analytics', path: '/dashboard/analytics', icon: FaChartLine }
    ] },
  { section: 'CONTENT', items: [
      { label: 'Projects', path: '/dashboard/projects', icon: FaFolderOpen },
      { label: 'Services', path: '/dashboard/services', icon: FaWrench },
      { label: 'Media Library', path: '/dashboard/media', icon: FaImage },
      { label: 'Page Manager', path: '/dashboard/pages', icon: FaFileAlt },
      { label: 'Site Content', path: '/dashboard/site-content', icon: FaFileAlt },
      { label: 'Messages', path: '/dashboard/messages', icon: FaEnvelope },
      { label: 'Testimonials', path: '/dashboard/testimonials', icon: FaStar },
      { label: 'FAQ', path: '/dashboard/faq', icon: FaQuestionCircle }
    ] },
  { section: 'ACCOUNT', items: [
      { label: 'Profile', path: '/dashboard/profile', icon: FaUserCircle },
      { label: 'Settings', path: '/dashboard/settings', icon: FaCog }
    ] },
  { section: 'SYSTEM', items: [
      { label: 'Notifications', path: '/dashboard/notifications', icon: FaBell },
      { label: 'Activity', path: '/dashboard/activity', icon: FaListAlt }
    ] }
];

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (index) => ({ opacity: 1, x: 0, transition: { delay: index * 0.04, duration: 0.25 } })
};

const Sidebar = ({ collapsed, onToggle, onLogout }) => {
  return (
    <motion.aside
      className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="sidebar-top">
        <button type="button" className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? '→' : '←'}
        </button>
        {!collapsed && (
          <div className="sidebar-brand">
            <span className="sidebar-logo">L</span>
            <div>
              <p>Laxman.</p>
              <span>Admin panel</span>
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {navigation.map((group, groupIndex) => (
          <motion.div key={group.section} className="sidebar-group" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: groupIndex * 0.05 } } }}>
            {!collapsed && <p className="sidebar-section">{group.section}</p>}
            <div className="sidebar-items">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.path} custom={index} variants={itemVariants}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="sidebar-icon"><Icon /></span>
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed ? (
          <>
            <div className="sidebar-help">
              <FaLifeRing />
              <div>
                <p>Need help?</p>
                <small>Contact support</small>
              </div>
            </div>
            <button type="button" className="sidebar-logout" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button type="button" className="sidebar-logout collapsed" onClick={onLogout}>Logout</button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
