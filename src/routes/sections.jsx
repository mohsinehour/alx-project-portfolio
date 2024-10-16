import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';

export const HomePage = lazy(() => import('src/pages/app'));
export const MedicationsPage = lazy(() => import('src/pages/medications'));
export const CustomersPage = lazy(() => import('src/pages/customers'));
export const ClaimsPage = lazy(() => import('src/pages/claims'));
export const PharmaciesPage = lazy(() => import('src/pages/pharmacies'));
export const ReportsPage = lazy(() => import('src/pages/reports'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'medications', element: <MedicationsPage /> },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'claims', element: <ClaimsPage /> },
        { path: 'pharmacies', element: <PharmaciesPage /> },
        { path: 'reports', element: <ReportsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
