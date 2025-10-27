import { Outlet } from 'react-router-dom';

/**
 * @component RootLayout
 * @summary Root layout component for the application
 * @domain core
 * @type layout-component
 * @category layout
 *
 * @description
 * Base layout that wraps all pages. Provides consistent structure
 * and can include global navigation, footer, etc.
 *
 * @routing
 * - Wraps all application routes
 * - Uses Outlet for nested route rendering
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};
