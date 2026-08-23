import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaMoon, FaSun, FaUserCircle } from 'react-icons/fa';
import useTheme from '../../hooks/useTheme.js';
import useAuth from '../../auth/useAuth.js';
import { AnimatePresence, motion } from 'framer-motion';

const Topbar = ({ collapsed, onToggle }) => {
  const { theme, toggleTheme, mounted } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const routeName = location.pathname.split('/').filter(Boolean).slice(1).join(' / ') || 'Overview';

  return (
    <div className="dashboard-topbar">
      <div className="topbar-left">
        <button type="button" className="topbar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? '☰' : '≡'}
        </button>
        <div>
          <p className="topbar-breadcrumb">Dashboard / {routeName}</p>
          <h1>Welcome back, {user?.fullName || 'Laxman'}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-search-wrapper">
          {searchOpen && (
            <input
              type="search"
              className="topbar-search-input"
              placeholder="Search dashboard..."
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          )}
          <button type="button" className="topbar-action" onClick={() => setSearchOpen((prev) => !prev)} aria-label="Search">
            <FaSearch />
          </button>
        </div>
        <div className="topbar-dropdown-wrapper">
          <button type="button" className="topbar-action" onClick={() => setNotificationsOpen((prev) => !prev)} aria-label="Notifications">
            <FaBell />
            <span className="topbar-badge">3</span>
          </button>
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                className="topbar-popover"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <p className="popover-title">Recent notifications</p>
                <ul>
                  <li>New project request received.</li>
                  <li>3 messages unread.</li>
                  <li>Settings updated successfully.</li>
                </ul>
                <Link to="/dashboard/notifications">View all</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button type="button" className="topbar-action" onClick={toggleTheme} disabled={!mounted} aria-label="Toggle theme">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        <div className="topbar-user">
          <button type="button" className="topbar-user-button" onClick={() => setOpen((prev) => !prev)}>
            <FaUserCircle />
            <span>
              <strong>{user?.fullName || 'Laxman'}</strong>
              <small>{user?.role || 'Admin'}</small>
            </span>
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                className="topbar-user-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Link to="/dashboard/profile">Profile</Link>
                <Link to="/dashboard/settings">Settings</Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
