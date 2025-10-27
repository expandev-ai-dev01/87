import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { RealEstateFormProps } from './types';
import type { RealEstateParameters } from '../../types';

const realEstateSchema = z.object({
  valor_investimento: z
    .number()
    .min(100, 'O valor mínimo para Fundos Imobiliários é R$ 100,00')
    .max(1000000, 'O valor máximo para Fundos Imobiliários é R$ 1.000.000,00'),
  prazo: z
    .number()
    .int()
    .min(1, 'O prazo mínimo é de 1 mês')
    .max(360, 'O prazo máximo é de 360 meses (30 anos)'),
  rentabilidade_mensal: z
    .number()
    .min(0.1, 'A rentabilidade mensal mínima é 0,1%')
    .max(3, 'A rentabilidade mensal máxima é 3%'),
  valorizacao_anual: z
    .number()
    .min(-10, 'A valorização anual mínima é -10%')
    .max(30, 'A valorização anual máxima é 30%'),
});

/**
 * @component RealEstateForm
 * @summary Real Estate Funds investment parameters form
 * @domain investment
 * @type domain-component
 * @category form
 *
 * @description
 * Form for collecting Real Estate Funds investment parameters including
 * amount, term, monthly return, and annual appreciation.
 */
export const RealEstateForm = ({ onSubmit, isLoading = false }: RealEstateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RealEstateParameters>({
    resolver: zodResolver(realEstateSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valor do Investimento (R$)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('valor_investimento', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="100.00"
        />
        {errors.valor_investimento && (
          <p className="mt-1 text-sm text-danger-600">{errors.valor_investimento.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Prazo (meses)</label>
        <input
          type="number"
          {...register('prazo', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="12"
        />
        {errors.prazo && <p className="mt-1 text-sm text-danger-600">{errors.prazo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rentabilidade Mensal (% ao mês)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('rentabilidade_mensal', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="0.8"
        />
        {errors.rentabilidade_mensal && (
          <p className="mt-1 text-sm text-danger-600">{errors.rentabilidade_mensal.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valorização Anual das Cotas (% ao ano)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('valorizacao_anual', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="5.0"
        />
        {errors.valorizacao_anual && (
          <p className="mt-1 text-sm text-danger-600">{errors.valorizacao_anual.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Simulando...' : 'Simular'}
      </button>
    </form>
  );
};
