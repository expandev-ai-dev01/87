# InvestLab - Frontend

Sistema para simulação de investimentos que permite aos usuários simularem diferentes tipos de investimentos, comparar rentabilidades, testar estratégias e acompanhar seus possíveis resultados ao longo do tempo.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- React Router DOM 6.26.2
- TailwindCSS 3.4.14
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Providers globais
│   └── router.tsx         # Configuração de rotas
├── core/                   # Componentes e lógica compartilhada
│   ├── components/        # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Tipos globais
│   ├── utils/            # Funções utilitárias
│   └── constants/        # Constantes globais
├── domain/                # Domínios de negócio
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
└── assets/               # Assets estáticos
    └── styles/           # Estilos globais
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linting do código

## Funcionalidades

### Simulação de Investimentos
Permite aos usuários criar simulações de diferentes tipos de investimentos (renda fixa, renda variável, fundos, etc.), definindo valores, prazos e condições específicas para visualizar resultados projetados.

### Comparação de Rentabilidades
Ferramenta que permite comparar lado a lado a rentabilidade projetada de diferentes produtos financeiros, considerando taxas, impostos e inflação, apresentando gráficos e tabelas comparativas.

## Integração com Backend

O frontend se comunica com o backend através de duas APIs:

- **API Pública** (`/api/v1/external`): Endpoints públicos sem autenticação
- **API Autenticada** (`/api/v1/internal`): Endpoints protegidos que requerem token

A configuração da API está em `src/core/lib/api.ts`.

## Padrões de Código

- Componentes seguem padrão de diretório com `main.tsx`, `types.ts`, `variants.ts` e `index.ts`
- Hooks customizados em diretórios separados
- Tipos TypeScript para todas as props e retornos
- Documentação JSDoc em todos os componentes e funções
- Uso de Tailwind CSS para estilização
- Validação com Zod e React Hook Form

## Contribuindo

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Abra um Pull Request

## Licença

Proprietary