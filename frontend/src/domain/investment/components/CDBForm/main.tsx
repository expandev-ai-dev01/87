import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IndicatorType } from '../../types';
import type { CDBFormProps } from './types';
import type { CDBParameters } from '../../types';

const cdbSchema = z
  .object({
    valor_investimento: z
      .number()
      .min(1000, 'O valor mínimo para CDB é R$ 1.000,00')
      .max(1000000, 'O valor máximo para CDB é R$ 1.000.000,00'),
    prazo: z
      .number()
      .int()
      .min(1, 'O prazo mínimo é de 1 mês')
      .max(360, 'O prazo máximo é de 360 meses (30 anos)'),
    indicador: z.nativeEnum(IndicatorType),
    percentual_indicador: z
      .number()
      .min(70, 'O percentual mínimo do indicador é 70%')
      .max(200, 'O percentual máximo do indicador é 200%'),
    taxa_personalizada: z
      .number()
      .min(0.1, 'A taxa personalizada mínima é 0,1%')
      .max(30, 'A taxa personalizada máxima é 30%')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.indicador === IndicatorType.Personalizado) {
        return data.taxa_personalizada !== undefined;
      }
      return true;
    },
    {
      message: 'Informe a taxa personalizada',
      path: ['taxa_personalizada'],
    }
  );

/**
 * @component CDBForm
 * @summary CDB investment parameters form
 * @domain investment
 * @type domain-component
 * @category form
 *
 * @description
 * Form for collecting CDB investment parameters including
 * amount, term, indicator type, and percentage.
 */
export const CDBForm = ({ onSubmit, isLoading = false }: CDBFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CDBParameters>({
    resolver: zodResolver(cdbSchema),
    defaultValues: {
      indicador: IndicatorType.CDI,
      percentual_indicador: 100,
    },
  });

  const selectedIndicator = watch('indicador');
  const showCustomRate = selectedIndicator === IndicatorType.Personalizado;

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
          placeholder="1000.00"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Indicador</label>
        <select
          {...register('indicador')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value={IndicatorType.CDI}>CDI</option>
          <option value={IndicatorType.SELIC}>SELIC</option>
          <option value={IndicatorType.IPCA}>IPCA</option>
          <option value={IndicatorType.Personalizado}>Personalizado</option>
        </select>
        {errors.indicador && (
          <p className="mt-1 text-sm text-danger-600">{errors.indicador.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Percentual do Indicador (%)
        </label>
        <input
          type="number"
          step="0.01"
          {...register('percentual_indicador', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="100"
        />
        {errors.percentual_indicador && (
          <p className="mt-1 text-sm text-danger-600">{errors.percentual_indicador.message}</p>
        )}
      </div>

      {showCustomRate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Taxa Personalizada (% ao ano)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('taxa_personalizada', { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="10.5"
          />
          {errors.taxa_personalizada && (
            <p className="mt-1 text-sm text-danger-600">{errors.taxa_personalizada.message}</p>
          )}
        </div>
      )}

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
