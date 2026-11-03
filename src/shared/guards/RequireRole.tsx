import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../../features/auth/session.store';
import type { Role } from '../routes';

export function RequireRole({ roles }: { roles: Role[] }) {
  const user = useSession(s => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/403" replace />;
  return <Outlet />;
}
