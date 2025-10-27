import { getErrorMessageClassName } from './variants';
import type { ErrorMessageProps } from './types';

/**
 * @component ErrorMessage
 * @summary Error message display component
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @description
 * Displays error messages with optional retry and back actions.
 * Used for error states throughout the application.
 *
 * @props
 * @param {ErrorMessageProps} props - Component properties
 * @param {string} props.title - Error title
 * @param {string} props.message - Error message
 * @param {() => void} props.onRetry - Optional retry callback
 * @param {() => void} props.onBack - Optional back navigation callback
 *
 * @examples
 * ```tsx
 * <ErrorMessage
 *   title="Failed to load data"
 *   message="Please try again later"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export const ErrorMessage = ({ title, message, onRetry, onBack }: ErrorMessageProps) => {
  return (
    <div className={getErrorMessageClassName()}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
