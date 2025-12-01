# 🤝 Contributing to FluentPDF-Audio-Narrative-Generation-Web-App

Welcome to the contribution guidelines for **FluentPDF-Audio-Narrative-Generation-Web-App**. We operate at the Apex standard, emphasizing zero-defect code, meticulous design, and feature-sliced architecture. Your contributions are vital, provided they adhere to our rigorous standards.

> This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 1. ⚙️ Development Environment Setup

This project is built on the modern TypeScript/Vite ecosystem, utilizing `pnpm` for efficient dependency management.

### Prerequisites

1.  Node.js (LTS recommended)
2.  pnpm (Recommended package manager)

### Local Setup

bash
# 1. Clone the repository
git clone https://github.com/chirag127/FluentPDF-Audio-Narrative-Generation-Web-App.git
cd FluentPDF-Audio-Narrative-Generation-Web-App

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev


The application should now be running locally, leveraging Vite's lightning-fast HMR (Hot Module Replacement).

---

## 2. 📐 Architectural Guidelines: Feature-Sliced Design (FSD)

All new features, fixes, and components **must** adhere to the **Feature-Sliced Design (FSD)** paradigm.

### FSD Structure Mandates

| Layer | Purpose & Scope |
| :--- | :--- |
| **`app`** | Initialization, Routing, Global Layouts. |
| **`pages`** | High-level routes, orchestration of widgets/features. |
| **`widgets`** | Independent, complex UI blocks (e.g., PDF Viewer, Settings Panel). |
| **`features`** | Business logic specific to user interaction (e.g., Audio Generation Trigger). |
| **`entities`** | Domain objects and data structures (e.g., `PDFDocument`, `AudioTrack`). |
| **`shared`** | Pure utilities, hooks, constants, and basic UI components (Design System). |

**Import Rule:** Imports must always flow downwards (e.g., a `widget` can import an `entity`, but an `entity` cannot import a `feature`).

---

## 3. 🧪 Quality Assurance & Testing

We mandate a comprehensive testing suite using industry-leading tools:

### Unit and Component Testing (Vitest)

Write tests for all core business logic and isolated components. Tests are located alongside the code (e.g., `feature/my-feature/ui/MyComponent.test.tsx`).

bash
# Run unit tests
pnpm test:unit

# Run tests in watch mode
pnpm test


### End-to-End Testing (Playwright)

E2E tests ensure critical user journeys (PDF upload, settings adjustment, audio playback) function correctly across target browsers.

bash
# Run E2E tests
pnpm test:e2e


---

## 4. ✍️ Code Style & Linter Standards (Biome)

We use **Biome** for strict linting and formatting. No code is accepted until it passes the mandatory quality gate.

### Pre-Commit Hooks

Ensure you run the lint and format scripts before committing.

bash
# Run Linter and apply auto-fixes
pnpm lint:fix

# Run formatter (ensures consistent code style)
pnpm format


---

## 5. 🚀 Submitting Your Changes

All contributions must be submitted via a Pull Request (PR) to the `main` branch. Follow these steps for rapid review and merging:

### A. Branching

Create a new branch for your work based on `main`:

bash
git checkout main
git pull origin main
git checkout -b feat/your-descriptive-feature-name


### B. Commit Messages (Conventional Commits)

We enforce the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for clear history tracking and automated releases.

**Format Examples:**
*   `feat: Add audio playback speed controls`
*   `fix(parser): Correct LLM prompt for large PDFs`
*   `docs: Update contributing guidelines`
*   `refactor(widgets): Migrate toolbar to signals`

### C. Pull Request (PR) Checklist

Before submitting, ensure your PR meets these criteria:

1.  **Tested:** All relevant unit and E2E tests pass (CI must be green).
2.  **Linted:** `pnpm lint:fix` has been run.
3.  **Documentation:** Any new features or configuration variables are documented.
4.  **DCO:** All commits are signed off (`git commit -s`).
5.  **Template:** You have filled out the [Pull Request Template](./PULL_REQUEST_TEMPLATE.md) completely, detailing the FSD components affected.

Thank you for elevating the standard of **FluentPDF-Audio-Narrative-Generation-Web-App**.