/**
 * @interface ComparisonParametersProps
 * @summary Props for ComparisonParameters component
 */
export interface ComparisonParametersProps {
  valorInicial: number;
  prazo: number;
  onValorInicialChange: (value: number) => void;
  onPrazoChange: (value: number) => void;
  isDisabled?: boolean;
}
