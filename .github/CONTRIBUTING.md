# Contributing to FluentPDF-AI-PDF-To-Audio-Web-Platform

Welcome! We're excited you're interested in contributing to the FluentPDF-AI-PDF-To-Audio-Web-Platform.

This project is maintained with the highest standards of code quality, architecture, and documentation. To ensure a smooth and efficient contribution process, please adhere to the following guidelines.

## 1. Our Guiding Principles

This project is built on the core philosophies of the Apex Technical Authority:

*   **Zero-Defect:** Aim for impeccable code quality. All contributions must pass rigorous checks.
*   **High-Velocity:** Streamline development and review processes to enable rapid iteration.
*   **Future-Proof:** Architect for scalability, maintainability, and evolving industry standards.

## 2. Contribution Workflow

1.  **Fork the Repository:** Create your own fork of the `chirag127/FluentPDF-AI-PDF-To-Audio-Web-Platform` repository.
2.  **Clone Your Fork:** Clone your forked repository to your local machine.
    bash
    git clone https://github.com/<your-username>/FluentPDF-AI-PDF-To-Audio-Web-Platform.git
    cd FluentPDF-AI-PDF-To-Audio-Web-Platform
    
3.  **Set Up Development Environment:** Follow the setup instructions in the `README.md` to install dependencies and configure the project.
    *   **TypeScript/Vite:** Ensure Node.js (v20+) and npm/yarn/pnpm are installed. Run `npm install` or `pnpm install`.
    *   **Linting & Formatting:** The project uses Biome. It should auto-format on save or via `pnpm run lint:fix`.
    *   **Testing:** Execute tests with `pnpm run test`.
4.  **Create a New Branch:** Always work on a new, descriptive branch for your feature or fix.
    bash
    git checkout -b feat/your-feature-name
    # or
    git checkout -b fix/your-bug-fix
    
5.  **Make Your Changes:** Implement your feature or fix. Ensure your code adheres to the project's architectural patterns and coding standards.
6.  **Test Your Changes:** Write new unit/integration tests or update existing ones to cover your changes. Ensure all tests pass.
    bash
    pnpm run test
    
7.  **Lint and Format:** Run the linter and formatter to ensure code consistency.
    bash
    pnpm run lint
    pnpm run format
    # Or fix automatically:
    pnpm run lint:fix
    
8.  **Commit Your Changes:** Write clear, concise commit messages following conventional commit standards.
    bash
    git add .
    git commit -m "feat: Add new audio generation provider"
    
9.  **Push to Your Fork:** Push your branch to your fork on GitHub.
    bash
    git push origin feat/your-feature-name
    
10. **Open a Pull Request:** Submit a Pull Request from your branch to the `main` branch of the `chirag127/FluentPDF-AI-PDF-To-Audio-Web-Platform` repository.

## 3. Code Quality & Standards

*   **Architecture:** The project follows the **Feature-Sliced Design (FSD)** pattern for frontend architecture and leverages **Zero-Dependency** principles where possible for enhanced privacy and performance. Adhere to SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).
*   **TypeScript:** Use strict TypeScript settings (`tsconfig.json`). Aim for strong typing and avoid `any` where possible.
*   **Linting & Formatting:** Biome is used for both linting and formatting. Ensure code adheres to Biome's rules. Auto-formatting on save is highly recommended.
*   **Testing:** All new features and bug fixes must include comprehensive tests. We use Vitest for unit/integration tests and Playwright for end-to-end tests.
*   **Documentation:** Maintain clear and concise documentation for all new code, especially within the codebase itself (JSDoc/TSDoc) and in the `README.md`.

## 4. AI Agent Directives

Contributions impacting AI models or their integration must align with the directives specified in `AGENTS.md`. Ensure any AI-related changes are well-documented, thoroughly tested, and consider privacy implications.

## 5. Pull Request Guidelines

*   **Clear Title & Description:** Provide a concise title and a detailed description explaining the changes, the problem they solve, and how to test them.
*   **Link Issues:** If your PR closes an issue, reference it using keywords like `Closes #123`.
*   **Focus:** Each PR should ideally focus on a single feature or bug fix.
*   **Respond to Feedback:** Be prepared to address feedback from reviewers promptly.

## 6. Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold these standards. Please refer to the `CODE_OF_CONDUCT.md` file (if applicable) for details.

## 7. Getting Help

If you have questions or need clarification on any of these guidelines, please open an issue or discuss it in the project's communication channels.

Thank you for contributing to FluentPDF-AI-PDF-To-Audio-Web-Platform!