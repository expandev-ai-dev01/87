/**
 * @module SimulationLogic
 * @summary Business logic for investment simulations
 * @domain simulation
 * @type service
 * @category business-logic
 */

import {
  InvestmentType,
  IndicatorType,
  CDBParameters,
  TreasuryParameters,
  RealEstateParameters,
  SimulationResult,
  ChartDataPoint,
  EconomicIndicators,
} from './simulationTypes';

/**
 * @summary In-memory storage for economic indicators
 * @description Stores current economic indicators (no database persistence)
 */
let economicIndicators: EconomicIndicators = {
  taxa_selic: 11.75,
  taxa_cdi: 11.65,
  taxa_ipca: 4.5,
  media_fii: 0.8,
  data_atualizacao: new Date(),
};

/**
 * @summary Get current economic indicators
 * @function getEconomicIndicators
 * @returns {EconomicIndicators} Current indicators
 */
export function getEconomicIndicators(): EconomicIndicators {
  return { ...economicIndicators };
}

/**
 * @summary Update economic indicators
 * @function updateEconomicIndicators
 * @param {Partial<Omit<EconomicIndicators, 'data_atualizacao'>>} indicators - Indicators to update
 * @returns {EconomicIndicators} Updated indicators
 */
export function updateEconomicIndicators(
  indicators: Partial<Omit<EconomicIndicators, 'data_atualizacao'>>
): EconomicIndicators {
  economicIndicators = {
    ...economicIndicators,
    ...indicators,
    data_atualizacao: new Date(),
  };
  return { ...economicIndicators };
}

/**
 * @summary Calculate progressive IR tax rate based on investment period
 * @function calculateIRRate
 * @param {number} months - Investment period in months
 * @returns {number} IR rate (0.225 = 22.5%)
 */
function calculateIRRate(months: number): number {
  if (months <= 6) return 0.225;
  if (months <= 12) return 0.2;
  if (months <= 24) return 0.175;
  return 0.15;
}

/**
 * @summary Calculate CDB simulation
 * @function calculateCDB
 * @param {CDBParameters} params - CDB parameters
 * @returns {SimulationResult} Simulation result
 */
export function calculateCDB(params: CDBParameters): SimulationResult {
  const { valor_investimento, prazo, indicador, percentual_indicador, taxa_personalizada } = params;

  let annualRate: number;

  if (indicador === IndicatorType.Personalizado) {
    annualRate = (taxa_personalizada || 0) / 100;
  } else {
    const baseRate =
      indicador === IndicatorType.CDI
        ? economicIndicators.taxa_cdi
        : indicador === IndicatorType.SELIC
        ? economicIndicators.taxa_selic
        : economicIndicators.taxa_ipca;

    annualRate = (baseRate / 100) * (percentual_indicador / 100);
  }

  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

  const dados_grafico: ChartDataPoint[] = [];
  let currentValue = valor_investimento;

  const chartInterval = prazo <= 24 ? 1 : 12;

  for (let month = 0; month <= prazo; month++) {
    if (month === 0 || month === prazo || month % chartInterval === 0) {
      dados_grafico.push({
        periodo: month,
        valor: currentValue,
      });
    }

    if (month < prazo) {
      currentValue = currentValue * (1 + monthlyRate);
    }
  }

  const valor_final = currentValue;
  const rentabilidade_total = valor_final - valor_investimento;
  const irRate = calculateIRRate(prazo);
  const imposto_renda = rentabilidade_total * irRate;
  const valor_liquido = valor_final - imposto_renda;

  const rentabilidade_percentual = (rentabilidade_total / valor_investimento) * 100;
  const rentabilidade_mensal_media =
    (Math.pow(valor_final / valor_investimento, 1 / prazo) - 1) * 100;
  const rentabilidade_anual_media =
    (Math.pow(valor_final / valor_investimento, 12 / prazo) - 1) * 100;

  return {
    valor_final,
    rentabilidade_total,
    rentabilidade_percentual,
    rentabilidade_mensal_media,
    rentabilidade_anual_media,
    imposto_renda,
    valor_liquido,
    dados_grafico,
  };
}

/**
 * @summary Calculate Treasury Direct simulation
 * @function calculateTreasury
 * @param {TreasuryParameters} params - Treasury parameters
 * @returns {SimulationResult} Simulation result
 */
export function calculateTreasury(params: TreasuryParameters): SimulationResult {
  const { valor_investimento, prazo, taxa } = params;

  const annualRate = taxa / 100;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

  const custodyRate = 0.0025;
  const monthlyCustody = custodyRate / 12;

  const dados_grafico: ChartDataPoint[] = [];
  let currentValue = valor_investimento;

  const chartInterval = prazo <= 24 ? 1 : 12;

  for (let month = 0; month <= prazo; month++) {
    if (month === 0 || month === prazo || month % chartInterval === 0) {
      dados_grafico.push({
        periodo: month,
        valor: currentValue,
      });
    }

    if (month < prazo) {
      currentValue = currentValue * (1 + monthlyRate);
      currentValue = currentValue * (1 - monthlyCustody);
    }
  }

  const valor_final = currentValue;
  const rentabilidade_total = valor_final - valor_investimento;
  const irRate = calculateIRRate(prazo);
  const imposto_renda = rentabilidade_total * irRate;
  const valor_liquido = valor_final - imposto_renda;

  const rentabilidade_percentual = (rentabilidade_total / valor_investimento) * 100;
  const rentabilidade_mensal_media =
    (Math.pow(valor_final / valor_investimento, 1 / prazo) - 1) * 100;
  const rentabilidade_anual_media =
    (Math.pow(valor_final / valor_investimento, 12 / prazo) - 1) * 100;

  return {
    valor_final,
    rentabilidade_total,
    rentabilidade_percentual,
    rentabilidade_mensal_media,
    rentabilidade_anual_media,
    imposto_renda,
    valor_liquido,
    dados_grafico,
  };
}

/**
 * @summary Calculate Real Estate Funds simulation
 * @function calculateRealEstate
 * @param {RealEstateParameters} params - Real Estate parameters
 * @returns {SimulationResult} Simulation result
 */
export function calculateRealEstate(params: RealEstateParameters): SimulationResult {
  const { valor_investimento, prazo, rentabilidade_mensal, valorizacao_anual } = params;

  const monthlyYield = rentabilidade_mensal / 100;
  const annualAppreciation = valorizacao_anual / 100;
  const monthlyAppreciation = Math.pow(1 + annualAppreciation, 1 / 12) - 1;

  const dados_grafico: ChartDataPoint[] = [];
  let currentValue = valor_investimento;
  let totalDividends = 0;

  const chartInterval = prazo <= 24 ? 1 : 12;

  for (let month = 0; month <= prazo; month++) {
    if (month === 0 || month === prazo || month % chartInterval === 0) {
      dados_grafico.push({
        periodo: month,
        valor: currentValue + totalDividends,
      });
    }

    if (month < prazo) {
      const monthlyDividend = currentValue * monthlyYield;
      totalDividends += monthlyDividend;
      currentValue = currentValue * (1 + monthlyAppreciation);
    }
  }

  const capitalGain = currentValue - valor_investimento;
  const imposto_renda = capitalGain > 0 ? capitalGain * 0.2 : 0;

  const valor_final = currentValue + totalDividends;
  const valor_liquido = valor_final - imposto_renda;
  const rentabilidade_total = valor_liquido - valor_investimento;

  const rentabilidade_percentual = (rentabilidade_total / valor_investimento) * 100;
  const rentabilidade_mensal_media =
    (Math.pow(valor_liquido / valor_investimento, 1 / prazo) - 1) * 100;
  const rentabilidade_anual_media =
    (Math.pow(valor_liquido / valor_investimento, 12 / prazo) - 1) * 100;

  return {
    valor_final,
    rentabilidade_total,
    rentabilidade_percentual,
    rentabilidade_mensal_media,
    rentabilidade_anual_media,
    imposto_renda,
    valor_liquido,
    dados_grafico,
  };
}

/**
 * @summary Execute investment simulation based on type
 * @function simulateInvestment
 * @param {InvestmentType} tipo - Investment type
 * @param {CDBParameters | TreasuryParameters | RealEstateParameters} parametros - Investment parameters
 * @returns {SimulationResult} Simulation result
 * @throws {Error} Invalid investment type
 */
export function simulateInvestment(
  tipo: InvestmentType,
  parametros: CDBParameters | TreasuryParameters | RealEstateParameters
): SimulationResult {
  switch (tipo) {
    case InvestmentType.CDB:
      return calculateCDB(parametros as CDBParameters);
    case InvestmentType.TesouroDireto:
      return calculateTreasury(parametros as TreasuryParameters);
    case InvestmentType.FundosImobiliarios:
      return calculateRealEstate(parametros as RealEstateParameters);
    default:
      throw new Error('Tipo de investimento inválido');
  }
}
