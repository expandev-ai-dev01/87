import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TreasuryType } from '../../types';
import type { TreasuryFormProps } from './types';
import type { TreasuryParameters } from '../../types';

const treasurySchema = z.object({
  valor_investimento: z
    .number()
    .min(100, 'O valor mínimo para Tesouro Direto é R$ 100,00')
    .max(500000, 'O valor máximo para Tesouro Direto é R$ 500.000,00'),
  tipo_tesouro: z.nativeEnum(TreasuryType),
  prazo: z
    .number()
    .int()
    .min(1, 'O prazo mínimo é de 1 mês')
    .max(360, 'O prazo máximo é de 360 meses (30 anos)'),
  taxa: z.number().min(0.1, 'A taxa mínima é 0,1%').max(15, 'A taxa máxima é 15%'),
});

/**
 * @component TreasuryForm
 * @summary Treasury Direct investment parameters form
 * @domain investment
 * @type domain-component
 * @category form
 *
 * @description
 * Form for collecting Treasury Direct investment parameters including
 * amount, treasury type, term, and rate.
 */
export const TreasuryForm = ({ onSubmit, isLoading = false }: TreasuryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TreasuryParameters>({
    resolver: zodResolver(treasurySchema),
    defaultValues: {
      tipo_tesouro: TreasuryType.TesouroSelic,
    },
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Título</label>
        <select
          {...register('tipo_tesouro')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value={TreasuryType.TesouroSelic}>Tesouro Selic</option>
          <option value={TreasuryType.TesouroIPCA}>Tesouro IPCA+</option>
          <option value={TreasuryType.TesouroPrefixado}>Tesouro Prefixado</option>
        </select>
        {errors.tipo_tesouro && (
          <p className="mt-1 text-sm text-danger-600">{errors.tipo_tesouro.message}</p>
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
          Taxa de Rentabilidade (% ao ano)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('taxa', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="10.5"
        />
        {errors.taxa && <p className="mt-1 text-sm text-danger-600">{errors.taxa.message}</p>}
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
