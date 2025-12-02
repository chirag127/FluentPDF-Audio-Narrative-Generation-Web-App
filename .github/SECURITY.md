# Security Policy for FluentPDF-Audio-Narrative-Generation-Web-App

As an Apex Technical Authority project, `FluentPDF-Audio-Narrative-Generation-Web-App` adheres to the **Zero-Defect, Future-Proof** mandate, treating security as a non-negotiable foundation.

This repository prioritizes **Privacy-First Design**, especially given its in-browser LLM processing capability, aiming for **zero data leakage**.

## 1. Supported Versions

We support the current major version and the immediately preceding minor version of all core technologies (TypeScript, Vite, Core Libraries). Security patches are applied immediately upon release for all actively maintained dependencies.

## 2. Reporting Vulnerabilities

We welcome responsible disclosure of security vulnerabilities. If you discover a potential issue, please follow these steps:

1.  **Do Not** create a public issue or pull request.
2.  **Contact** the maintainer directly via email: `security+fluentpdf@chirag127.io` (Note: This is a hypothetical, secure contact point).
3.  In your report, provide a **Proof of Concept (PoC)**, detailed steps to reproduce the vulnerability, and the affected component/version.

We commit to acknowledging receipt of the report within **48 hours** and will coordinate a responsible disclosure timeline.

## 3. Security Architecture Principles (Applies to TypeScript/Vite Stack)

This project enforces strict security measures inherent in its design:

### A. Privacy-First LLM Integration
Since processing occurs **in-browser** (Client-Side LLM inference), the primary security focus is on preventing **Supply Chain Attacks** on the client bundle and ensuring **Content Security Policy (CSP)** is rigorously maintained to prevent XSS vectors from injecting malicious scripts that could hijack local processing state.

### B. Dependency Management
*   **Automated Scanning:** GitHub Dependabot is configured to automatically scan for known vulnerabilities (via `npm audit` reports) and create PRs for dependency updates.
*   **Ruff/Biome Enforcement:** Pre-commit hooks and CI pipelines enforce linting and formatting standards established by Biome, which checks for certain code smells that could indicate security weaknesses.

### C. Supply Chain Security
All build artifacts are generated through the **`.github/workflows/ci.yml`** workflow, which is configured to utilize OpenID Connect (OIDC) for secure, non-credential-based deployment and interaction with external services (if any non-local LLM proxy is introduced later).

## 4. Responsible Disclosure Timeline

We adhere to the following timeline once a vulnerability report is received:

| Step | Timeframe (from Acknowledgment) |
| :--- | :--- |
| T0 | Acknowledgment of Report |
| T+1 Week | Develop and internally test fix. |
| T+2 Weeks | Prepare coordinated public disclosure (if necessary). |
| T+3 Weeks | Release fix via a new patch version. |

If a critical zero-day vulnerability requires immediate action, this timeline may be compressed, and we will communicate transparently with the reporter.

--- 

*Last reviewed against Apex Standards: December 2025.*