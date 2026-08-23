import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import './dashboard.css';

import useAuth from '../auth/useAuth.js';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <div className={`dashboard-shell ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} onLogout={logout} />
      <div className="dashboard-main">
        <Topbar collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
