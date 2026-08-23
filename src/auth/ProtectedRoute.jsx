import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth.js';

const ProtectedRoute = ({ redirectTo = '/login' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
