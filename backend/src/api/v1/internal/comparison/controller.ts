import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse } from '@/utils/response';
import { createError } from '@/middleware/error';
import {
  compareProducts,
  calculateComparisonMetrics,
} from '@/domain/comparison/services/comparisonLogic';

/**
 * @summary Zod schema for comparison request
 */
const comparisonRequestSchema = z.object({
  produtos_selecionados: z
    .array(z.string())
    .length(2, 'Selecione exatamente 2 produtos para comparação'),
  valor_inicial: z.number().min(1, 'Valor inicial deve ser maior ou igual a R$ 1,00'),
  prazo: z.number().int().min(1, 'Prazo mínimo é de 1 mês').max(360, 'Prazo máximo é de 360 meses'),
});

/**
 * @api {post} /internal/comparison Compare Returns
 * @apiName CompareReturns
 * @apiGroup Comparison
 * @apiVersion 1.0.0
 *
 * @apiDescription Compares projected returns of two financial products
 *
 * @apiParam {Array} produtos_selecionados Array with exactly 2 product IDs
 * @apiParam {Number} valor_inicial Initial investment amount (min: R$ 1.00)
 * @apiParam {Number} prazo Investment period in months (1-360)
 *
 * @apiSuccess {Object} data Comparison result
 * @apiSuccess {Object} data.parametros Comparison parameters
 * @apiSuccess {Array} data.produtos Product comparison details
 * @apiSuccess {String} data.data_calculo Calculation timestamp
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = comparisonRequestSchema.parse(req.body);

    const result = compareProducts(validatedData);
    const metrics = calculateComparisonMetrics(result);

    res.json(
      successResponse({
        ...result,
        metricas: metrics,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return next(createError(400, 'Parâmetros inválidos', 'VALIDATION_ERROR', error.errors));
    }

    if (error.message.includes('Selecione exatamente 2 produtos')) {
      return next(createError(400, error.message, 'INVALID_PRODUCT_COUNT'));
    }

    if (error.message.includes('Produto não encontrado')) {
      return next(createError(404, error.message, 'PRODUCT_NOT_FOUND'));
    }

    next(createError(500, error.message || 'Erro ao processar comparação', 'COMPARISON_ERROR'));
  }
}
