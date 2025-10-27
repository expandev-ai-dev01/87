import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 *
 * @module utils/validation
 *
 * @description
 * Provides reusable Zod validation schemas for common data types.
 * All validators are applied BEFORE .nullable() or .optional() to ensure proper type safety.
 */

/**
 * @summary String validation with max length
 * @description Validates string with optional max length, nullable
 */
export const zString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema;
};

/**
 * @summary Nullable string validation
 * @description Validates string with optional max length, allows null
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name validation
 * @description Validates name field (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description validation
 * @description Validates description field (max 500 characters), nullable
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Email validation
 * @description Validates email format
 */
export const zEmail = z.string().email();

/**
 * @summary Positive number validation
 * @description Validates positive number
 */
export const zPositiveNumber = z.number().positive();

/**
 * @summary Non-negative number validation
 * @description Validates non-negative number (>= 0)
 */
export const zNonNegativeNumber = z.number().min(0);

/**
 * @summary Integer validation
 * @description Validates integer number
 */
export const zInteger = z.number().int();

/**
 * @summary Positive integer validation
 * @description Validates positive integer
 */
export const zPositiveInteger = z.number().int().positive();

/**
 * @summary Foreign key validation
 * @description Validates foreign key (positive integer)
 */
export const zFK = z.number().int().positive();

/**
 * @summary Nullable foreign key validation
 * @description Validates foreign key (positive integer), allows null
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary Boolean bit validation
 * @description Validates boolean value (0 or 1)
 */
export const zBit = z.boolean();

/**
 * @summary Date string validation
 * @description Validates ISO date string format
 */
export const zDateString = z.string().datetime();

/**
 * @summary Percentage validation
 * @description Validates percentage value (0-100)
 */
export const zPercentage = z.number().min(0).max(100);

/**
 * @summary Nullable percentage validation
 * @description Validates percentage value (0-100), allows null
 */
export const zNullablePercentage = z.number().min(0).max(100).nullable();

/**
 * @summary Currency amount validation
 * @description Validates currency amount (non-negative, 2 decimal places)
 */
export const zCurrencyAmount = z.number().min(0);

/**
 * @summary Nullable currency amount validation
 * @description Validates currency amount (non-negative, 2 decimal places), allows null
 */
export const zNullableCurrencyAmount = z.number().min(0).nullable();
