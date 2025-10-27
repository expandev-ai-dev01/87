import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse } from '@/utils/response';
import { createError } from '@/middleware/error';
import {
  InvestmentType,
  IndicatorType,
  TreasuryType,
  simulateInvestment,
} from '@/services/simulation';

/**
 * @summary Zod schema for CDB parameters
 */
const cdbParametersSchema = z
  .object({
    valor_investimento: z.number().min(1000).max(1000000),
    prazo: z.number().int().min(1).max(360),
    indicador: z.nativeEnum(IndicatorType),
    percentual_indicador: z.number().min(70).max(200),
    taxa_personalizada: z.number().min(0.1).max(30).optional(),
  })
  .refine(
    (data) => {
      if (data.indicador === IndicatorType.Personalizado) {
        return data.taxa_personalizada !== undefined;
      }
      return true;
    },
    {
      message: 'Taxa personalizada é obrigatória quando indicador é Personalizado',
      path: ['taxa_personalizada'],
    }
  );

/**
 * @summary Zod schema for Treasury Direct parameters
 */
const treasuryParametersSchema = z.object({
  valor_investimento: z.number().min(100).max(500000),
  tipo_tesouro: z.nativeEnum(TreasuryType),
  prazo: z.number().int().min(1).max(360),
  taxa: z.number().min(0.1).max(15),
});

/**
 * @summary Zod schema for Real Estate Funds parameters
 */
const realEstateParametersSchema = z.object({
  valor_investimento: z.number().min(100).max(1000000),
  prazo: z.number().int().min(1).max(360),
  rentabilidade_mensal: z.number().min(0.1).max(3),
  valorizacao_anual: z.number().min(-10).max(30),
});

/**
 * @summary Zod schema for simulation request
 */
const simulationRequestSchema = z.object({
  tipo_investimento: z.nativeEnum(InvestmentType),
  parametros: z.union([cdbParametersSchema, treasuryParametersSchema, realEstateParametersSchema]),
});

/**
 * @api {post} /internal/simulation Simulate Investment
 * @apiName SimulateInvestment
 * @apiGroup Simulation
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates an investment simulation based on provided parameters
 *
 * @apiParam {String} tipo_investimento Investment type (CDB, Tesouro Direto, Fundos Imobiliários)
 * @apiParam {Object} parametros Investment parameters (varies by type)
 *
 * @apiSuccess {Object} data Simulation result
 * @apiSuccess {Number} data.valor_final Final projected value
 * @apiSuccess {Number} data.rentabilidade_total Total return in absolute value
 * @apiSuccess {Number} data.rentabilidade_percentual Total return percentage
 * @apiSuccess {Number} data.rentabilidade_mensal_media Average monthly return
 * @apiSuccess {Number} data.rentabilidade_anual_media Average annual return
 * @apiSuccess {Number} data.imposto_renda Estimated income tax
 * @apiSuccess {Number} data.valor_liquido Net value after taxes
 * @apiSuccess {Array} data.dados_grafico Chart data points
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = simulationRequestSchema.parse(req.body);

    const { tipo_investimento, parametros } = validatedData;

    const result = simulateInvestment(tipo_investimento, parametros);

    res.json(successResponse(result));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return next(createError(400, 'Parâmetros inválidos', 'VALIDATION_ERROR', error.errors));
    }

    next(createError(500, error.message || 'Erro ao processar simulação', 'SIMULATION_ERROR'));
  }
}
