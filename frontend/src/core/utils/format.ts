/**
 * @module FormatUtils
 * @summary Utility functions for formatting data
 * @domain core
 * @type utility
 * @category formatting
 */

/**
 * @function formatCurrency
 * @summary Formats number as Brazilian currency (BRL)
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * @function formatPercentage
 * @summary Formats number as percentage
 * @param {number} value - Value to format (0.15 = 15%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * @function formatDate
 * @summary Formats date to Brazilian format
 * @param {Date | string} date - Date to format
 * @returns {string} Formatted date string (DD/MM/YYYY)
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR').format(dateObj);
};
