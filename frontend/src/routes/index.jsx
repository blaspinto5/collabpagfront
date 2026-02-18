/**
 * Router Configuration
 * Defines all application routes
 */

import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts';
import {
  HomePage,
  RafflesPage,
  RaffleDetailPage,
  AdminPage,
  PaymentSuccessPage,
  PaymentFailurePage,
  PaymentPendingPage,
  NotFoundPage
} from '../pages';

import IllustrationsPage from '../pages/IllustrationsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'sorteos',
        element: <RafflesPage />
      },
      {
        path: 'sorteo/:id',
        element: <RaffleDetailPage />
      },
      {
        path: 'ilustraciones',   // 👈 AQUÍ
        element: <IllustrationsPage />
      },
      {
        path: 'admin',
        element: <AdminPage />
      },
      {
        path: 'payment/success',
        element: <PaymentSuccessPage />
      },
      {
        path: 'payment/failure',
        element: <PaymentFailurePage />
      },
      {
        path: 'payment/pending',
        element: <PaymentPendingPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);

export default router;
