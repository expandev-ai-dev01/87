import { useNavigate } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary 404 Not Found page
 * @domain core
 * @type error-page
 * @category public
 *
 * @description
 * Displays 404 error when user navigates to non-existent route.
 * Provides navigation back to home page.
 *
 * @routing
 * - Path: *
 * - Catch-all route
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">A página que você está procurando não existe.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
