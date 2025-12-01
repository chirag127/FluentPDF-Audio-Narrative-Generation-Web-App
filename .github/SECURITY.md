# 🛡️ Security Policy: FluentPDF-AI-PDF-To-Audio-Web-Platform

## 1. Security Commitment

The **FluentPDF** project is dedicated to maintaining the highest standards of security, privacy, and reliability. Given our commitment to **privacy-first processing** and handling potentially sensitive user documents, security is paramount. We treat all user input as untrusted and adhere strictly to Zero Trust principles.

This policy outlines how security vulnerabilities are reported, handled, and remediated.

## 2. Supported Versions

We actively support and patch the latest stable release branch (v2.x.x) managed under the **TypeScript 6.x / Tauri 2.x** Apex Stack.

| Version | Status | Supported Until |
| :--- | :--- | :--- |
| **Latest Stable (v2.x)** | Active Support | N/A (Ongoing) |
| Previous Versions | Limited Support | Security patches only via backporting. |

## 3. Vulnerability Reporting (Responsible Disclosure)

If you discover a security vulnerability, we strongly request responsible disclosure. **Do not** file a public issue immediately.

### A. Reporting Procedure

1.  **Do Not Go Public:** Please refrain from disclosing vulnerabilities publicly on GitHub issues, forums, or social media until we have confirmed remediation.
2.  **Contact Privately:** Email the Apex Security Team directly at: `security@fluentpdf.dev` (Placeholder - Actual contact must be established).
3.  **Provide Details:** Include the following information in your email:
    *   Project/Component Affected.
    *   A clear, detailed description of the vulnerability (e.g., XSS, Insecure Direct Object Reference, LLM prompt injection vector).
    *   Steps to reproduce (PoC code, if possible).
    *   Severity Rating (CVSS v3.1 recommended).

### B. Triage and Response SLA

We aim to acknowledge all reports within **24 hours** and prioritize critical vulnerabilities immediately.

| Severity | Definition | Target Response Time | Target Fix Time |
| :--- | :--- | :--- | :--- |
| **Critical** | Remote Code Execution, Complete Data Exposure. | < 4 Hours | < 7 Days |
| **High** | Privilege Escalation, Significant Data Leakage (via API/LLM). | < 12 Hours | < 14 Days |
| **Medium** | Session Hijacking, Minor Information Disclosure. | < 24 Hours | < 30 Days |
| **Low** | Best practice violations, minor XSS vectors. | < 48 Hours | Next Minor Release |

## 4. Security Focus Areas (2025/2026 Mandates)

Due to the nature of this application (client-side LLM interaction and document processing), the following areas receive heightened scrutiny:

1.  **LLM Input Sanitization:** Strict validation and sanitization of all text extracted from PDFs before being processed by any backend or LLM interface (even if processing is in-browser, guardrails must exist).
2.  **Cross-Site Scripting (XSS):** Particularly when rendering synthesized audio metadata or user-uploaded document titles.
3.  **Dependency Vulnerabilities:** Continuous scanning via GitHub Dependabot and scheduled `npm audit` execution via CI.
4.  **Data In-Transit:** Mandatory use of HTTPS/WSS. No sensitive metadata should ever be sent unencrypted.

## 5. DevSecOps Integration

Security is automated into the CI/CD pipeline defined in `.github/workflows/`:

*   **Dependency Scanning:** `npm audit` and Snyk/Trivy scans are run on every pull request.
*   **Static Analysis (SAST):** Biome/TypeScript strict mode enforces compile-time safety.
*   **SBOM Generation:** A Software Bill of Materials is generated during the release workflow for supply chain transparency.

We encourage community members to review the `ci.yml` workflow to understand our automated security gates.

--- 

*Thank you for helping us keep FluentPDF secure and private.*