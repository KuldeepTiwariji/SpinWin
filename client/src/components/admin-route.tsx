
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useLocation } from 'wouter';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    setLocation('/login');
    return null;
  }

  if (user.role !== 'admin') {
    setLocation('/');
    return null;
  }

  return <>{children}</>;
}
