import { useState } from 'react';
import { useSimulation } from '@/domain/investment/hooks/useSimulation';
import { InvestmentTypeSelector } from '@/domain/investment/components/InvestmentTypeSelector';
import { CDBForm } from '@/domain/investment/components/CDBForm';
import { TreasuryForm } from '@/domain/investment/components/TreasuryForm';
import { RealEstateForm } from '@/domain/investment/components/RealEstateForm';
import { SimulationResult } from '@/domain/investment/components/SimulationResult';
import { InvestmentType } from '@/domain/investment/types';
import type {
  InvestmentParameters,
  CDBParameters,
  TreasuryParameters,
  RealEstateParameters,
} from '@/domain/investment/types';

/**
 * @page SimulationPage
 * @summary Investment simulation page
 * @domain investment
 * @type form-page
 * @category investment-management
 *
 * @description
 * Main page for creating investment simulations. Allows users to select
 * investment type and input parameters to generate projections.
 *
 * @routing
 * - Path: /simulation
 * - Public access
 */
export const SimulationPage = () => {
  const [selectedType, setSelectedType] = useState<InvestmentType | null>(null);
  const { simulate, result, isSimulating, error, reset } = useSimulation();

  const handleSubmit = async (params: InvestmentParameters) => {
    if (!selectedType) return;
    try {
      await simulate(selectedType, params);
    } catch (err: unknown) {
      console.error('Simulation error:', err);
    }
  };

  const handleReset = () => {
    reset();
    setSelectedType(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Simulação de Investimentos</h1>
          <p className="text-gray-600">
            Simule diferentes tipos de investimentos e visualize os resultados projetados
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg">
            <p className="text-danger-800">
              Erro ao processar simulação. Por favor, tente novamente.
            </p>
          </div>
        )}

        {!result ? (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
            <InvestmentTypeSelector value={selectedType} onChange={setSelectedType} />

            {selectedType === InvestmentType.CDB && (
              <CDBForm
                onSubmit={(params) => handleSubmit(params as CDBParameters)}
                isLoading={isSimulating}
              />
            )}

            {selectedType === InvestmentType.TesouroDireto && (
              <TreasuryForm
                onSubmit={(params) => handleSubmit(params as TreasuryParameters)}
                isLoading={isSimulating}
              />
            )}

            {selectedType === InvestmentType.FundosImobiliarios && (
              <RealEstateForm
                onSubmit={(params) => handleSubmit(params as RealEstateParameters)}
                isLoading={isSimulating}
              />
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <SimulationResult result={result} onReset={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationPage;
