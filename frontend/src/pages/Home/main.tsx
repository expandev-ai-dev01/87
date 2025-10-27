import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/core/constants/routes';

/**
 * @page HomePage
 * @summary Application home page
 * @domain core
 * @type landing-page
 * @category public
 *
 * @description
 * Landing page for InvestLab application. Displays welcome message
 * and introduction to investment simulation features.
 *
 * @routing
 * - Path: /
 * - Public access
 */
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">InvestLab</h1>
        <p className="text-xl text-gray-600 mb-8">Sistema para simulação de investimentos</p>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bem-vindo ao InvestLab</h2>
          <p className="text-gray-600 mb-6">
            Simule diferentes tipos de investimentos, compare rentabilidades, teste estratégias e
            acompanhe seus possíveis resultados ao longo do tempo.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
            <div className="p-4 bg-primary-50 rounded-lg">
              <h3 className="font-semibold text-primary-900 mb-2">Simulação de Investimentos</h3>
              <p className="text-sm text-primary-700">
                Crie simulações de diferentes tipos de investimentos com valores, prazos e condições
                específicas.
              </p>
            </div>
            <div className="p-4 bg-success-50 rounded-lg">
              <h3 className="font-semibold text-success-900 mb-2">Comparação de Rentabilidades</h3>
              <p className="text-sm text-success-700">
                Compare lado a lado a rentabilidade projetada de diferentes produtos financeiros.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(ROUTES.SIMULATION)}
            className="px-8 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium"
          >
            Começar Simulação
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
