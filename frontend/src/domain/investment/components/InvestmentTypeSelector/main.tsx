import { InvestmentType } from '../../types';
import { getTypeCardClassName } from './variants';
import type { InvestmentTypeSelectorProps } from './types';

/**
 * @component InvestmentTypeSelector
 * @summary Investment type selection component
 * @domain investment
 * @type domain-component
 * @category form
 *
 * @description
 * Allows users to select the type of investment to simulate.
 * Displays available investment types as selectable cards.
 */
export const InvestmentTypeSelector = ({ value, onChange }: InvestmentTypeSelectorProps) => {
  const types = [
    {
      type: InvestmentType.CDB,
      title: 'CDB',
      description: 'Certificado de Depósito Bancário',
    },
    {
      type: InvestmentType.TesouroDireto,
      title: 'Tesouro Direto',
      description: 'Títulos públicos do governo',
    },
    {
      type: InvestmentType.FundosImobiliarios,
      title: 'Fundos Imobiliários',
      description: 'Investimento em imóveis',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Tipo de Investimento</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {types.map((item) => (
          <div
            key={item.type}
            className={getTypeCardClassName({ isSelected: value === item.type })}
            onClick={() => onChange(item.type)}
          >
            <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
