/**
 * @module ComparisonTypes
 * @summary Type definitions for comparison domain
 * @domain comparison
 */

export interface FinancialProduct {
  id: string;
  nome: string;
  descricao: string;
  rentabilidade_media_historica: number;
  categoria: string;
}

export interface ComparisonParameters {
  produtos_selecionados: string[];
  valor_inicial: number;
  prazo: number;
}

export interface ChartDataPoint {
  periodo: number;
  produto1: number;
  produto2: number;
}

export interface ProductComparison {
  produto_id: string;
  nome: string;
  valor_final: number;
  rentabilidade_bruta: number;
  rentabilidade_liquida: number;
  rentabilidade_real: number;
  imposto: number;
  dados_mensais: Array<{
    mes: number;
    valor: number;
  }>;
}

export interface ComparisonMetrics {
  diferenca_absoluta: number;
  diferenca_percentual: number;
  melhor_produto: string;
}

export interface ComparisonResult {
  parametros: ComparisonParameters;
  produtos: ProductComparison[];
  metricas: ComparisonMetrics;
  data_calculo: string;
}
