/**
 * @module InvestmentTypes
 * @summary Type definitions for investment simulation domain
 * @domain investment
 */

export enum InvestmentType {
  CDB = 'CDB',
  TesouroDireto = 'Tesouro Direto',
  FundosImobiliarios = 'Fundos Imobiliários',
}

export enum IndicatorType {
  CDI = 'CDI',
  SELIC = 'SELIC',
  IPCA = 'IPCA',
  Personalizado = 'Personalizado',
}

export enum TreasuryType {
  TesouroSelic = 'Tesouro Selic',
  TesouroIPCA = 'Tesouro IPCA+',
  TesouroPrefixado = 'Tesouro Prefixado',
}

export interface CDBParameters {
  valor_investimento: number;
  prazo: number;
  indicador: IndicatorType;
  percentual_indicador: number;
  taxa_personalizada?: number;
}

export interface TreasuryParameters {
  valor_investimento: number;
  tipo_tesouro: TreasuryType;
  prazo: number;
  taxa: number;
}

export interface RealEstateParameters {
  valor_investimento: number;
  prazo: number;
  rentabilidade_mensal: number;
  valorizacao_anual: number;
}

export type InvestmentParameters = CDBParameters | TreasuryParameters | RealEstateParameters;

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

export interface ChartDataPoint {
  periodo: number;
  valor: number;
}

export interface EconomicIndicators {
  taxa_selic: number;
  taxa_cdi: number;
  taxa_ipca: number;
  media_fii: number;
  data_atualizacao: string;
}
