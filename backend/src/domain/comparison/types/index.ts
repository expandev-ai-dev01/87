/**
 * @module ComparisonTypes
 * @summary Type definitions for return comparison domain
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

export interface ProductComparison {
  produto_id: string;
  produto_nome: string;
  valor_final: number;
  rentabilidade_bruta: number;
  rentabilidade_liquida: number;
  rentabilidade_real: number;
  imposto: number;
  dados_mensais: MonthlyData[];
}

export interface MonthlyData {
  mes: number;
  valor_bruto: number;
  valor_liquido: number;
  valor_real: number;
}

export interface ComparisonResult {
  parametros: ComparisonParameters;
  produtos: ProductComparison[];
  data_calculo: string;
}

export interface ComparisonMetrics {
  produto_id: string;
  produto_nome: string;
  valor_final: number;
  rentabilidade_total: number;
  rentabilidade_anual: number;
  rentabilidade_real: number;
  melhor_em: string[];
}
