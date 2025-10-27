# InvestLab Backend API

Backend API for InvestLab - Investment Simulation System

## Description

Sistema para simulação de investimentos que permite aos usuários simularem diferentes tipos de investimentos, comparar rentabilidades, testar estratégias e acompanhar seus possíveis resultados ao longo do tempo.

## Features

- Investment Simulation: Create and manage investment simulations
- Return Comparison: Compare projected returns across different financial products
- RESTful API with versioning support
- TypeScript for type safety
- Express.js framework
- In-memory data storage

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **Testing**: Jest
- **Architecture**: REST API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Run development server with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Returns server health status.

### API Versioning

The API uses URL path versioning:
- Current version: `/api/v1`
- Future versions will be available at `/api/v2`, etc.

## Project Structure

```
src/
├── api/              # API controllers
│   └── v1/           # API version 1
│       ├── external/ # Public endpoints
│       └── internal/ # Authenticated endpoints
├── routes/           # Route definitions
├── middleware/       # Express middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── constants/        # Application constants
├── instances/        # Service instances
├── tests/            # Global test utilities
└── server.ts         # Application entry point
```

## Environment Variables

See `.env.example` for all available configuration options.

## Contributing

1. Follow the established code structure and patterns
2. Write tests for new features
3. Ensure all tests pass before submitting
4. Follow TypeScript and ESLint standards
5. Document new endpoints and features

## License

MIT