/**
 * @summary
 * Global test environment setup
 *
 * @module tests/testSetup
 *
 * @description
 * Configures the test environment for all test files.
 * This file is executed before running tests.
 */

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Suppress console output during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
