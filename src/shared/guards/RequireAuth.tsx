import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../features/auth/session.store';

export function RequireAuth() {
  const user = useSession(s => s.user);
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
