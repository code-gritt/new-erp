import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { FullScreenLoader } from '../ui/spinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useSelector((state: any) => state.auth || {});
    const location = useLocation();

    if (isAuthenticated === null || isAuthenticated === undefined) {
        return <FullScreenLoader message="Checking authentication..." />;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/sign-in-2" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
