import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse } from '@/utils/response';
import { createError } from '@/middleware/error';
import { getEconomicIndicators, updateEconomicIndicators } from '@/services/simulation';

/**
 * @summary Zod schema for updating indicators
 */
const updateIndicatorsSchema = z.object({
  taxa_selic: z.number().min(0).optional(),
  taxa_cdi: z.number().min(0).optional(),
  taxa_ipca: z.number().min(0).optional(),
  media_fii: z.number().min(0).optional(),
});

/**
 * @api {get} /internal/indicators Get Economic Indicators
 * @apiName GetIndicators
 * @apiGroup Indicators
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves current economic indicators
 *
 * @apiSuccess {Object} data Economic indicators
 * @apiSuccess {Number} data.taxa_selic Current SELIC rate
 * @apiSuccess {Number} data.taxa_cdi Current CDI rate
 * @apiSuccess {Number} data.taxa_ipca Current IPCA rate
 * @apiSuccess {Number} data.media_fii Average Real Estate Funds return
 * @apiSuccess {Date} data.data_atualizacao Last update date
 *
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const indicators = getEconomicIndicators();
    res.json(successResponse(indicators));
  } catch (error: any) {
    next(createError(500, error.message || 'Erro ao buscar indicadores', 'INDICATORS_ERROR'));
  }
}

/**
 * @api {put} /internal/indicators Update Economic Indicators
 * @apiName UpdateIndicators
 * @apiGroup Indicators
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates economic indicators (admin only)
 *
 * @apiParam {Number} [taxa_selic] SELIC rate
 * @apiParam {Number} [taxa_cdi] CDI rate
 * @apiParam {Number} [taxa_ipca] IPCA rate
 * @apiParam {Number} [media_fii] Average Real Estate Funds return
 *
 * @apiSuccess {Object} data Updated economic indicators
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = updateIndicatorsSchema.parse(req.body);

    const updatedIndicators = updateEconomicIndicators(validatedData);

    res.json(successResponse(updatedIndicators));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return next(createError(400, 'Parâmetros inválidos', 'VALIDATION_ERROR', error.errors));
    }

    next(createError(500, error.message || 'Erro ao atualizar indicadores', 'INDICATORS_ERROR'));
  }
}
