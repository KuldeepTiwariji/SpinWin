
import React from 'react';
import { useAuth } from '../contexts/auth-context';
import { Redirect } from 'wouter';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || (user.role !== 'admin' && user.role !== 'Admin')) {
    return <Redirect to="/" replace />;
  }

  return <>{children}</>;
};
