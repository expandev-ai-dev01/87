import { formatPercentage } from '@/core/utils/format';
import { getProductCardClassName } from './variants';
import type { ProductSelectorProps } from './types';

/**
 * @component ProductSelector
 * @summary Financial product selection component
 * @domain comparison
 * @type domain-component
 * @category form
 *
 * @description
 * Allows users to select exactly 2 financial products for comparison.
 * Displays product cards with name, description, and historical return.
 *
 * @props
 * @param {ProductSelectorProps} props - Component properties
 *
 * @businessRules
 * - User must select exactly 2 products
 * - Cards show product information clearly
 * - Selection state is visually indicated
 */
export const ProductSelector = ({
  products,
  selectedProducts,
  onSelectionChange,
  isLoading = false,
}: ProductSelectorProps) => {
  const handleProductClick = (productId: string) => {
    if (isLoading) return;

    const isSelected = selectedProducts.includes(productId);
    const canSelect = selectedProducts.length < 2;

    if (isSelected) {
      onSelectionChange(selectedProducts.filter((id) => id !== productId));
    } else if (canSelect) {
      onSelectionChange([...selectedProducts, productId]);
    }
  };

  const isProductDisabled = (productId: string) => {
    return selectedProducts.length >= 2 && !selectedProducts.includes(productId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Selecione 2 Produtos para Comparar</h3>
        <span className="text-sm text-gray-600">{selectedProducts.length}/2 selecionados</span>
      </div>

      {selectedProducts.length > 0 && selectedProducts.length < 2 && (
        <div className="p-3 bg-warning-50 border border-warning-200 rounded-md">
          <p className="text-sm text-warning-800">Selecione mais 1 produto para comparação</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const isSelected = selectedProducts.includes(product.id);
          const isDisabled = isProductDisabled(product.id);

          return (
            <div
              key={product.id}
              className={getProductCardClassName({ isSelected, isDisabled })}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{product.nome}</h4>
                {isSelected && (
                  <span className="text-primary-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{product.descricao}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Rentabilidade Média</span>
                <span className="text-sm font-medium text-success-700">
                  {formatPercentage(product.rentabilidade_media_historica / 100)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
