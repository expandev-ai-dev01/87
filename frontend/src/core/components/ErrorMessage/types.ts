/**
 * @interface ErrorMessageProps
 * @summary Props for ErrorMessage component
 */
export interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
}
