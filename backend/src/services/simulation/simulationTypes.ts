/**
 * @module SimulationTypes
 * @summary Type definitions for investment simulation domain
 * @domain simulation
 * @type types
 * @category business-logic
 */

/**
 * @enum InvestmentType
 * @summary Available investment types
 */
export enum InvestmentType {
  CDB = 'CDB',
  TesouroDireto = 'Tesouro Direto',
  FundosImobiliarios = 'Fundos Imobiliários',
}

/**
 * @enum IndicatorType
 * @summary Available indicator types for CDB
 */
export enum IndicatorType {
  CDI = 'CDI',
  SELIC = 'SELIC',
  IPCA = 'IPCA',
  Personalizado = 'Personalizado',
}

/**
 * @enum TreasuryType
 * @summary Available treasury bond types
 */
export enum TreasuryType {
  TesouroDireto = 'Tesouro Selic',
  TesouroIPCA = 'Tesouro IPCA+',
  TesouroPrefixado = 'Tesouro Prefixado',
}

/**
 * @interface CDBParameters
 * @summary Parameters for CDB simulation
 */
export interface CDBParameters {
  valor_investimento: number;
  prazo: number;
  indicador: IndicatorType;
  percentual_indicador: number;
  taxa_personalizada?: number;
}

/**
 * @interface TreasuryParameters
 * @summary Parameters for Treasury Direct simulation
 */
export interface TreasuryParameters {
  valor_investimento: number;
  tipo_tesouro: TreasuryType;
  prazo: number;
  taxa: number;
}

/**
 * @interface RealEstateParameters
 * @summary Parameters for Real Estate Funds simulation
 */
export interface RealEstateParameters {
  valor_investimento: number;
  prazo: number;
  rentabilidade_mensal: number;
  valorizacao_anual: number;
}

/**
 * @interface SimulationRequest
 * @summary Request for investment simulation
 */
export interface SimulationRequest {
  tipo_investimento: InvestmentType;
  parametros: CDBParameters | TreasuryParameters | RealEstateParameters;
}

/**
 * @interface ChartDataPoint
 * @summary Data point for evolution chart
 */
export interface ChartDataPoint {
  periodo: number;
  valor: number;
}

/**
 * @interface SimulationResult
 * @summary Result of investment simulation
 */
export interface SimulationResult {
  valor_final: number;
  rentabilidade_total: number;
  rentabilidade_percentual: number;
  rentabilidade_mensal_media: number;
  rentabilidade_anual_media: number;
  imposto_renda: number;
  valor_liquido: number;
  dados_grafico: ChartDataPoint[];
}

/**
 * @interface EconomicIndicators
 * @summary Current economic indicators
 */
export interface EconomicIndicators {
  taxa_selic: number;
  taxa_cdi: number;
  taxa_ipca: number;
  media_fii: number;
  data_atualizacao: Date;
}
