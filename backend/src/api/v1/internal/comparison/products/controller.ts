import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/response';
import { createError } from '@/middleware/error';
import { getFinancialProducts } from '@/domain/comparison/services/comparisonLogic';

/**
 * @api {get} /internal/comparison/products Get Financial Products
 * @apiName GetFinancialProducts
 * @apiGroup Comparison
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves all available financial products for comparison
 *
 * @apiSuccess {Array} data List of financial products
 * @apiSuccess {String} data.id Product identifier
 * @apiSuccess {String} data.nome Product name
 * @apiSuccess {String} data.descricao Product description
 * @apiSuccess {Number} data.rentabilidade_media_historica Historical average return
 * @apiSuccess {String} data.categoria Product category
 *
 * @apiError {String} ServerError Internal server error
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const products = getFinancialProducts();
    res.json(successResponse(products));
  } catch (error: any) {
    next(
      createError(500, error.message || 'Erro ao buscar produtos financeiros', 'PRODUCTS_ERROR')
    );
  }
}
