/**
 * @module ComparisonLogic
 * @summary Business logic for return comparison
 * @domain comparison
 * @type service
 * @category business-logic
 */

import { getEconomicIndicators } from '@/services/simulation';
import type {
  FinancialProduct,
  ComparisonParameters,
  ComparisonResult,
  ProductComparison,
  MonthlyData,
  ComparisonMetrics,
} from '../types';

/**
 * @summary In-memory storage for financial products
 * @description Stores available financial products (no database persistence)
 */
const financialProducts: FinancialProduct[] = [
  {
    id: 'cdb-1',
    nome: 'CDB 100% CDI',
    descricao: 'CDB com rentabilidade de 100% do CDI',
    rentabilidade_media_historica: 11.65,
    categoria: 'CDB',
  },
  {
    id: 'cdb-2',
    nome: 'CDB 110% CDI',
    descricao: 'CDB com rentabilidade de 110% do CDI',
    rentabilidade_media_historica: 12.82,
    categoria: 'CDB',
  },
  {
    id: 'tesouro-selic',
    nome: 'Tesouro Selic',
    descricao: 'Título público indexado à taxa Selic',
    rentabilidade_media_historica: 11.5,
    categoria: 'Tesouro Direto',
  },
  {
    id: 'tesouro-ipca',
    nome: 'Tesouro IPCA+',
    descricao: 'Título público indexado ao IPCA + taxa fixa',
    rentabilidade_media_historica: 10.8,
    categoria: 'Tesouro Direto',
  },
  {
    id: 'fii-1',
    nome: 'Fundo Imobiliário Diversificado',
    descricao: 'FII com portfólio diversificado de imóveis',
    rentabilidade_media_historica: 9.6,
    categoria: 'Fundos Imobiliários',
  },
];

/**
 * @summary Get all available financial products
 * @function getFinancialProducts
 * @returns {FinancialProduct[]} List of financial products
 */
export function getFinancialProducts(): FinancialProduct[] {
  return [...financialProducts];
}

/**
 * @summary Get financial product by ID
 * @function getProductById
 * @param {string} id - Product ID
 * @returns {FinancialProduct | undefined} Product or undefined
 */
export function getProductById(id: string): FinancialProduct | undefined {
  return financialProducts.find((p) => p.id === id);
}

/**
 * @summary Calculate IR rate based on investment period
 * @function calculateIRRate
 * @param {number} months - Investment period in months
 * @returns {number} IR rate
 */
function calculateIRRate(months: number): number {
  if (months <= 6) return 0.225;
  if (months <= 12) return 0.2;
  if (months <= 24) return 0.175;
  return 0.15;
}

/**
 * @summary Calculate tax rate by product category
 * @function getTaxRateByCategory
 * @param {string} categoria - Product category
 * @param {number} prazo - Investment period in months
 * @returns {number} Tax rate
 */
function getTaxRateByCategory(categoria: string, prazo: number): number {
  if (categoria === 'CDB') {
    return calculateIRRate(prazo);
  }
  if (categoria === 'Tesouro Direto') {
    return calculateIRRate(prazo);
  }
  if (categoria === 'Fundos Imobiliários') {
    return 0.2;
  }
  return 0.15;
}

/**
 * @summary Calculate product comparison
 * @function calculateProductComparison
 * @param {FinancialProduct} produto - Financial product
 * @param {number} valor_inicial - Initial investment amount
 * @param {number} prazo - Investment period in months
 * @returns {ProductComparison} Product comparison result
 */
function calculateProductComparison(
  produto: FinancialProduct,
  valor_inicial: number,
  prazo: number
): ProductComparison {
  const indicators = getEconomicIndicators();
  const annualRate = produto.rentabilidade_media_historica / 100;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const monthlyInflation = Math.pow(1 + indicators.taxa_ipca / 100, 1 / 12) - 1;

  const dados_mensais: MonthlyData[] = [];
  let currentValue = valor_inicial;

  for (let mes = 0; mes <= prazo; mes++) {
    const valor_bruto = currentValue;
    const rentabilidade_acumulada = valor_bruto - valor_inicial;
    const imposto_acumulado =
      rentabilidade_acumulada * getTaxRateByCategory(produto.categoria, mes);
    const valor_liquido = valor_bruto - imposto_acumulado;
    const deflator = Math.pow(1 + monthlyInflation, mes);
    const valor_real = valor_liquido / deflator;

    dados_mensais.push({
      mes,
      valor_bruto,
      valor_liquido,
      valor_real,
    });

    if (mes < prazo) {
      currentValue = currentValue * (1 + monthlyRate);
    }
  }

  const valor_final_bruto = dados_mensais[prazo].valor_bruto;
  const rentabilidade_bruta = valor_final_bruto - valor_inicial;
  const imposto = rentabilidade_bruta * getTaxRateByCategory(produto.categoria, prazo);
  const valor_final_liquido = valor_final_bruto - imposto;
  const rentabilidade_liquida = valor_final_liquido - valor_inicial;
  const valor_final_real = dados_mensais[prazo].valor_real;
  const rentabilidade_real = valor_final_real - valor_inicial;

  return {
    produto_id: produto.id,
    produto_nome: produto.nome,
    valor_final: valor_final_liquido,
    rentabilidade_bruta,
    rentabilidade_liquida,
    rentabilidade_real,
    imposto,
    dados_mensais,
  };
}

/**
 * @summary Compare two financial products
 * @function compareProducts
 * @param {ComparisonParameters} params - Comparison parameters
 * @returns {ComparisonResult} Comparison result
 * @throws {Error} Invalid parameters
 */
export function compareProducts(params: ComparisonParameters): ComparisonResult {
  const { produtos_selecionados, valor_inicial, prazo } = params;

  if (produtos_selecionados.length !== 2) {
    throw new Error('Selecione exatamente 2 produtos para comparação');
  }

  if (valor_inicial < 1) {
    throw new Error('Valor inicial deve ser maior ou igual a R$ 1,00');
  }

  if (prazo < 1 || prazo > 360) {
    throw new Error('Prazo deve estar entre 1 e 360 meses');
  }

  const produto1 = getProductById(produtos_selecionados[0]);
  const produto2 = getProductById(produtos_selecionados[1]);

  if (!produto1 || !produto2) {
    throw new Error('Produto não encontrado');
  }

  const comparison1 = calculateProductComparison(produto1, valor_inicial, prazo);
  const comparison2 = calculateProductComparison(produto2, valor_inicial, prazo);

  return {
    parametros: params,
    produtos: [comparison1, comparison2],
    data_calculo: new Date().toISOString(),
  };
}

/**
 * @summary Calculate comparison metrics
 * @function calculateComparisonMetrics
 * @param {ComparisonResult} result - Comparison result
 * @returns {ComparisonMetrics[]} Comparison metrics
 */
export function calculateComparisonMetrics(result: ComparisonResult): ComparisonMetrics[] {
  const metrics: ComparisonMetrics[] = result.produtos.map((produto) => {
    const rentabilidade_total = produto.rentabilidade_liquida;
    const rentabilidade_anual =
      (Math.pow(
        produto.valor_final / result.parametros.valor_inicial,
        12 / result.parametros.prazo
      ) -
        1) *
      100;

    return {
      produto_id: produto.produto_id,
      produto_nome: produto.produto_nome,
      valor_final: produto.valor_final,
      rentabilidade_total,
      rentabilidade_anual,
      rentabilidade_real: produto.rentabilidade_real,
      melhor_em: [],
    };
  });

  if (metrics[0].valor_final > metrics[1].valor_final) {
    metrics[0].melhor_em.push('Valor Final');
  } else if (metrics[1].valor_final > metrics[0].valor_final) {
    metrics[1].melhor_em.push('Valor Final');
  }

  if (metrics[0].rentabilidade_total > metrics[1].rentabilidade_total) {
    metrics[0].melhor_em.push('Rentabilidade Total');
  } else if (metrics[1].rentabilidade_total > metrics[0].rentabilidade_total) {
    metrics[1].melhor_em.push('Rentabilidade Total');
  }

  if (metrics[0].rentabilidade_anual > metrics[1].rentabilidade_anual) {
    metrics[0].melhor_em.push('Rentabilidade Anual');
  } else if (metrics[1].rentabilidade_anual > metrics[0].rentabilidade_anual) {
    metrics[1].melhor_em.push('Rentabilidade Anual');
  }

  if (metrics[0].rentabilidade_real > metrics[1].rentabilidade_real) {
    metrics[0].melhor_em.push('Rentabilidade Real');
  } else if (metrics[1].rentabilidade_real > metrics[0].rentabilidade_real) {
    metrics[1].melhor_em.push('Rentabilidade Real');
  }

  return metrics;
}
