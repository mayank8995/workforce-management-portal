import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hourglass } from 'react-loader-spinner';

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
      <div className="flex justify-center h-full bg-slate-100 dark:bg-gray-800">
        <Hourglass
          visible={true}
          height="60"
          width="60"
          colors={['#306cce', '#72a1ed']}
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
