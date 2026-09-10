import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorBoundaryPage from '../components/Error/ErrorBoundaryPage';
import { ProtectedRoute } from '../pages/protected-routes/ProtectedRoutes';
import React from 'react';
import Landing from '../pages/landing/Landing.tsx';
const Employees = React.lazy(() => import('../pages/employee/Employees.tsx'));
export const loadAnalyticsPage = () =>
  import('../pages/analytics/Analytics.tsx');
const Analytics = React.lazy(loadAnalyticsPage);
const ProfileSettings = React.lazy(
  () => import('../pages/profile-settings/ProfileSettings.tsx')
);
export const loadViewMorePage = () =>
  import('../components/ViewMore/ViewMore.tsx');
const ViewMore = React.lazy(loadViewMorePage);

export const loadDashboardPage = () =>
  import('../pages/dashboard/DashboardRoot.tsx');
const DashboardRoot = React.lazy(loadDashboardPage);

export const loginAppPage = () => import('../App.tsx');
const App = React.lazy(loginAppPage);

export const loadDashboardChildPage = () =>
  import('../pages/dashboard/Dashboard.tsx');
const Dashboard = React.lazy(loadDashboardChildPage);

export const loadHome = () => import('../components/Home/Home.tsx');
const Home = React.lazy(loadHome);

let done = false;
export const prefetchDashboard = () => {
  if (done) return;
  done = true;
  loadHome();
  loadDashboardPage();
  loadDashboardChildPage();
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/auth',
    element: <App />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: '',
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
        errorElement: <ErrorBoundaryPage />,
        handle: { breadcrumb: 'Home', resource: 'home' },
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardRoot />,
            handle: { breadcrumb: 'Dashboard', resource: 'dashboard' },
            children: [
              {
                path: '',
                element: <Dashboard />,
              },
              {
                path: 'viewmore',
                element: <ViewMore />,
                handle: { breadcrumb: 'View More', resource: 'viewmore' },
              },
            ],
          },
          {
            path: 'employee',
            element: <Employees />,
            handle: { breadcrumb: 'Employees', resource: 'employee' },
          },
          {
            path: 'analytics',
            element: <Analytics />,
            handle: { breadcrumb: 'Analytics', resource: 'analytics' },
          },
          {
            path: 'settings',
            element: <ProfileSettings />,
            handle: { breadcrumb: 'Settings', resource: 'settings' },
          },
        ],
      },
      {
        path: '/unauthorized',
        element: <div>Unauthorized Access</div>,
      },
      {
        path: '*',
        element: <div>Route Not found</div>,
      },
    ],
  },
]);
