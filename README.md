# FluentPDF - Bulletproof PDF Engine

[![CI](https://github.com/chirag127/FluentPDF-Convert-To-Readable-Spokable-Pdf-Website/actions/workflows/ci.yml/badge.svg)](https://github.com/chirag127/FluentPDF-Convert-To-Readable-Spokable-Pdf-Website/actions/workflows/ci.yml)
[![Biome](https://img.shields.io/badge/code_style-biome-yellow.svg)](https://biomejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**FluentPDF** is an elite, zero-dependency, single-file web application designed to convert technical PDFs into natural, spoken-word audio scripts using advanced LLMs. It adheres to strict "Apex Technical Authority" standards, ensuring zero defects and high velocity.

> **"Zero-Defect. High-Velocity. Future-Proof."**

## ⚡ BLUF (Bottom Line Up Front)

FluentPDF transforms dense technical documents into listenable narratives. It runs entirely in the browser as a **single HTML file**, utilizing your own API keys for top-tier LLMs (Gemini, Groq, Cerebras, etc.). No servers, no tracking, no installation.

## 🚀 Features

*   **Intelligent Parsing**: Visual extraction of PDF content using `pdf.js`.
*   **LLM Transformation**: Converts code, tables, and diagrams into narrative English using a multi-provider engine.
*   **Multi-Provider Support**:
    *   **Google Gemini** (Flash 1.5, 2.0)
    *   **Groq** (Llama 3, Mixtral)
    *   **Cerebras** (Llama 3.1 70B)
    *   **OpenRouter** (DeepSeek R1, Free Models)
    *   **Mistral**
    *   **Cohere**
*   **Bulletproof Architecture**: Infinite retry, auto-failover, unlimited concurrency.
*   **Privacy-First**: 100% Local processing. Direct API calls from your browser to the provider.
*   **Zero-Install**: Compiles to a single portable `index.html` artifact.

## 🛠️ Tech Stack (Apex Standards)

*   **Core**: TypeScript (Strict), Vite, Tailwind CSS (PostCSS).
*   **Quality**: Biome (Lint/Format), Vitest (Unit Testing).
*   **CI/CD**: GitHub Actions (Integrity Check + Release).
*   **Architecture**: Modular, Feature-First, SOLID, Clean Code.

## 🏗️ Architecture

The codebase follows a strict Feature-First architecture:

```
src/
├── features/           # Domain logic (Business Rules)
│   ├── llm/            # LLM Engine & Providers (Strategy Pattern)
│   └── pdf/            # PDF Extraction & Rendering (Adapter Pattern)
├── shared/             # Shared Utilities & Configuration (Singleton)
├── ui/                 # UI Controllers (MVC-like)
├── main.ts             # Application Entry Point & DI
└── style.css           # Global Tailwind Styles
tests/                  # Mirrored Test Suite (100% Coverage Target)
```

## 📦 Usage

### Prerequisites
*   Node.js v20+
*   npm

### Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Dev Server**:
    ```bash
    npx vite
    ```
3.  **Run Tests**:
    ```bash
    npm test
    ```
4.  **Lint & Format**:
    ```bash
    npm run lint
    npm run format
    ```

### Build

To generate the standalone `index.html`:

```bash
npm run build
```

The output will be in `dist/index.html`.

## ⭐ Support

If you find this tool useful, please **Star ⭐ this repository** on GitHub! It helps visibility and encourages further development.

[![Star on GitHub](https://img.shields.io/github/stars/chirag127/FluentPDF-Convert-To-Readable-Spokable-Pdf-Website?style=social)](https://github.com/chirag127/FluentPDF-Convert-To-Readable-Spokable-Pdf-Website)

## 📄 License

Open Source (ISC).
