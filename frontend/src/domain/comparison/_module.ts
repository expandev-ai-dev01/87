/**
 * @module comparison
 * @summary Comparison of financial products returns domain module
 * @domain functional
 * @dependencies React, React Hook Form, Zod, TanStack Query, Axios
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

export * from './types';
export * from './services/comparisonService';
export * from './hooks/useComparison';
export * from './hooks/useFinancialProducts';
export * from './components/ProductSelector';
export * from './components/ComparisonChart';
export * from './components/ComparisonTable';
export { ComparisonResult } from './components/ComparisonResult';
export type { ComparisonResultProps } from './components/ComparisonResult';

export const moduleMetadata = {
  name: 'comparison',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['ProductSelector', 'ComparisonChart', 'ComparisonTable', 'ComparisonResult'],
  publicHooks: ['useComparison', 'useFinancialProducts'],
  publicServices: ['comparisonService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/utils/format'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: ['ProductSelector', 'ComparisonChart', 'ComparisonTable', 'ComparisonResult'],
    hooks: ['useComparison', 'useFinancialProducts'],
    services: ['comparisonService'],
    types: ['FinancialProduct', 'ComparisonResult', 'ComparisonMetrics', 'ChartDataPoint'],
  },
} as const;
