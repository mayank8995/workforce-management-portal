import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import ErrorBoundaryPage from '../components/Error/ErrorBoundaryPage';
import { ProtectedRoute } from '../pages/protected-routes/ProtectedRoutes';
import React from 'react';
const Home = React.lazy(() => import('../components/Home/Home.tsx'));
const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard.tsx'));
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

export const router = createBrowserRouter([
  {
    path: '/',
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
        handle: { breadcrumb: 'Home' },
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <DashboardRoot />,
            handle: { breadcrumb: 'Dashboard' },
            children: [
              {
                path: '',
                element: <Dashboard />,
              },
              {
                path: 'viewmore',
                element: <ViewMore />,
                handle: { breadcrumb: 'View More' },
              },
            ],
          },
          {
            path: 'employees',
            element: <Employees />,
            handle: { breadcrumb: 'Employees' },
          },
          {
            path: 'analytics',
            element: <Analytics />,
            handle: { breadcrumb: 'Analytics' },
          },
          {
            path: 'settings',
            element: <ProfileSettings />,
            handle: { breadcrumb: 'Settings' },
          },
        ],
      },
      {
        path: '*',
        element: <div>Route Not found</div>,
      },
    ],
  },
]);
