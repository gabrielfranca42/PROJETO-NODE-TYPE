// ============================================================
// eslint.config.mjs — Configuração ESLint para PROJETO_BETA
// ============================================================

// 📦 IMPORTAÇÕES
// -------------------------------------------------------
import json from "@eslint/json";             // Plugin para lint de JSON
import markdown from "@eslint/markdown";     // Plugin para lint de Markdown
import css from "@eslint/css";               // Plugin para lint de CSS
import tseslint from "typescript-eslint";    // 🆕 Plugin + Parser para TypeScript
import { defineConfig } from "eslint/config"; // Helper que valida a config

// 🏗️ CONFIGURAÇÃO
// -------------------------------------------------------
export default defineConfig([

  // ┌─────────────────────────────────────────────────┐
  // │ CAMADA 1: Arquivos/pastas para IGNORAR          │
  // └─────────────────────────────────────────────────┘
  {
    ignores: [
      "node_modules/",   // Dependências (nunca lint nisso!)
      "dist/",           // Código compilado (gerado pelo tsc)
    ],
  },

  // ┌─────────────────────────────────────────────────┐
  // │ CAMADA 2: Regras de TypeScript                  │
  // └─────────────────────────────────────────────────┘
  // 🔑 tseslint.configs.recommended já inclui:
  //    - O parser correto (typescript-eslint/parser)
  //    - O plugin correto (@typescript-eslint)
  //    - ~30 regras recomendadas pré-configuradas
  ...tseslint.configs.recommended,

  // ┌─────────────────────────────────────────────────┐
  // │ CAMADA 3: Suas regras PERSONALIZADAS de TS      │
  // └─────────────────────────────────────────────────┘
  {
    files: ["**/*.ts"],
    rules: {
      // --- REGRAS DE QUALIDADE ---

      // Proíbe variáveis declaradas mas não usadas
      // (o "_" no início do nome indica intencionalmente não usada)
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",       // Ignora args como _req, _next
        varsIgnorePattern: "^_",       // Ignora vars como _temp
      }],

      // Proíbe uso de `any` — força tipagem real
      "@typescript-eslint/no-explicit-any": "warn",

      // --- REGRAS DE ESTILO/PADRÃO ---

      // Nomes de interfaces NÃO devem começar com "I"
      // (padrão moderno: User ao invés de IUser)
      "@typescript-eslint/naming-convention": ["error",
        {
          selector: "interface",
          format: ["PascalCase"],
          // Se quiser PROIBIR o prefixo "I":
          // custom: { regex: "^I[A-Z]", match: false }
        },
      ],

      // Prefere `type` para aliases simples, `interface` para objetos
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    },
  },

  // ┌─────────────────────────────────────────────────┐
  // │ CAMADA 4: JSON                                  │
  // └─────────────────────────────────────────────────┘
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },

  // ┌─────────────────────────────────────────────────┐
  // │ CAMADA 5: Markdown                              │
  // └─────────────────────────────────────────────────┘
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },

  // ┌─────────────────────────────────────────────────┐
  // │ CAMADA 6: CSS                                   │
  // └─────────────────────────────────────────────────┘
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
