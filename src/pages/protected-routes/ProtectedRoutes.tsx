import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hourglass } from 'react-loader-spinner';
import { palette, surface } from '../../theme/theme';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const root = document.documentElement;
  if (
    !localStorage.getItem('theme') ||
    localStorage.getItem('theme') === 'dark'
  ) {
    root.setAttribute('data-theme', 'dark');
  }

  if (isLoading) {
    return (
      <div className={`flex justify-center h-full ${surface.page}`}>
        <Hourglass
          visible={true}
          height="60"
          width="60"
          colors={[palette.brand, palette.brandLight]}
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass="flex items-center justify-center min-h-screen"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
