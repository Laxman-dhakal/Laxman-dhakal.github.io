import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth.js';

const RoleGuard = ({ roles = [], fallback = '/dashboard' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
