import { useState, useEffect } from 'react';
import { useFinancialProducts } from '@/domain/comparison/hooks/useFinancialProducts';
import { useComparison } from '@/domain/comparison/hooks/useComparison';
import { ProductSelector } from '@/domain/comparison/components/ProductSelector';
import { ComparisonParameters } from '@/domain/comparison/components/ComparisonParameters';
import { ComparisonResult } from '@/domain/comparison/components/ComparisonResult';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';

/**
 * @page ComparisonPage
 * @summary Returns comparison page
 * @domain comparison
 * @type form-page
 * @category comparison-management
 *
 * @description
 * Main page for comparing financial product returns.
 * Allows users to select 2 products and configure parameters
 * to generate comparative projections.
 *
 * @routing
 * - Path: /comparison
 * - Public access
 *
 * @userFlows
 * - Primary: Select 2 products → Configure parameters → View comparison
 * - Secondary: Adjust parameters → See real-time updates
 */
export const ComparisonPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [valorInicial, setValorInicial] = useState(1000);
  const [prazo, setPrazo] = useState(12);
  const [hasCompared, setHasCompared] = useState(false);

  const { products, isLoading: isLoadingProducts, error: productsError } = useFinancialProducts();
  const { compare, result, isComparing, error: comparisonError, reset } = useComparison();

  const canCompare = selectedProducts.length === 2;

  useEffect(() => {
    if (canCompare && hasCompared) {
      const timer = setTimeout(() => {
        handleCompare();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [valorInicial, prazo]);

  const handleCompare = async () => {
    if (!canCompare) return;

    try {
      await compare({
        produtos_selecionados: selectedProducts,
        valor_inicial: valorInicial,
        prazo: prazo,
      });
      setHasCompared(true);
    } catch (err: unknown) {
      console.error('Comparison error:', err);
    }
  };

  const handleReset = () => {
    reset();
    setSelectedProducts([]);
    setValorInicial(1000);
    setPrazo(12);
    setHasCompared(false);
  };

  if (isLoadingProducts) {
    return <LoadingSpinner size="lg" />;
  }

  if (productsError) {
    return (
      <ErrorMessage
        title="Erro ao carregar produtos"
        message="Não foi possível carregar os produtos financeiros. Por favor, tente novamente."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Comparação de Rentabilidades</h1>
          <p className="text-gray-600">
            Compare lado a lado a rentabilidade projetada de diferentes produtos financeiros
          </p>
        </div>

        {comparisonError && (
          <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg">
            <p className="text-danger-800">
              Erro ao processar comparação. Por favor, tente novamente.
            </p>
          </div>
        )}

        {!result ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <ProductSelector
                  products={products || []}
                  selectedProducts={selectedProducts}
                  onSelectionChange={setSelectedProducts}
                  isLoading={isComparing}
                />

                {!canCompare && selectedProducts.length > 0 && (
                  <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                    <p className="text-sm text-warning-800">
                      Selecione exatamente 2 produtos para comparação
                    </p>
                  </div>
                )}

                {canCompare && !hasCompared && (
                  <div className="mt-6">
                    <button
                      onClick={handleCompare}
                      disabled={isComparing}
                      className="w-full px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isComparing ? 'Comparando...' : 'Comparar Produtos'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <ComparisonParameters
                valorInicial={valorInicial}
                prazo={prazo}
                onValorInicialChange={setValorInicial}
                onPrazoChange={setPrazo}
                isDisabled={!canCompare || isComparing}
              />
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ComparisonResult result={result} onReset={handleReset} />
            </div>

            <div className="lg:col-span-1">
              <ComparisonParameters
                valorInicial={valorInicial}
                prazo={prazo}
                onValorInicialChange={setValorInicial}
                onPrazoChange={setPrazo}
                isDisabled={isComparing}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
