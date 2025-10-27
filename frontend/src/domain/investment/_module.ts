/**
 * @module investment
 * @summary Investment simulation domain module
 * @domain functional
 * @dependencies React, React Hook Form, Zod, TanStack Query, Axios
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

export * from './types';
export * from './services/investmentService';
export * from './hooks/useSimulation';
export * from './hooks/useIndicators';
export * from './components/InvestmentTypeSelector';
export * from './components/CDBForm';
export * from './components/TreasuryForm';
export * from './components/RealEstateForm';
export { SimulationResult } from './components/SimulationResult';
export type { SimulationResultProps } from './components/SimulationResult';

export const moduleMetadata = {
  name: 'investment',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: [
    'InvestmentTypeSelector',
    'CDBForm',
    'TreasuryForm',
    'RealEstateForm',
    'SimulationResult',
  ],
  publicHooks: ['useSimulation', 'useIndicators'],
  publicServices: ['investmentService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/utils/format'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query', 'axios'],
    domains: [],
  },
  exports: {
    components: [
      'InvestmentTypeSelector',
      'CDBForm',
      'TreasuryForm',
      'RealEstateForm',
      'SimulationResult',
    ],
    hooks: ['useSimulation', 'useIndicators'],
    services: ['investmentService'],
    types: [
      'InvestmentType',
      'IndicatorType',
      'TreasuryType',
      'CDBParameters',
      'TreasuryParameters',
      'RealEstateParameters',
      'SimulationResult',
      'EconomicIndicators',
    ],
  },
} as const;
