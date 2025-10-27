import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { RootLayout } from '@/pages/layouts/RootLayout';

const HomePage = lazy(() => import('@/pages/Home'));
const SimulationPage = lazy(() => import('@/pages/Simulation'));
const ComparisonPage = lazy(() => import('@/pages/Comparison'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @component AppRouter
 * @summary Main application routing configuration
 * @domain core
 * @type router-component
 * @category navigation
 *
 * @description
 * Defines all application routes with lazy loading for code splitting.
 * Uses React Router v6 with nested routes and layouts.
 *
 * @routing
 * - /: Home page
 * - /simulation: Investment simulation page
 * - /comparison: Returns comparison page
 * - *: 404 Not Found page
 */
export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="simulation" element={<SimulationPage />} />
          <Route path="comparison" element={<ComparisonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
