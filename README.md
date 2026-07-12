# 🍊 OrangeHRM Quality Assurance & Test Automation Workspace

[![Playwright Version](https://img.shields.io/badge/Playwright-%5E1.45.1-blue.svg?logo=playwright)](https://playwright.dev/)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-%5E5.5.2-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![QA Methodology](https://img.shields.io/badge/QA%20Methodology-Manual%20%26%20Automation-orange.svg)](#qa-strategy--methodology)

Welcome to the **OrangeHRM Quality Assurance and Test Automation Workspace**. This repository serves as a centralized QA hub containing comprehensive manual test artifacts and a state-of-the-art automated E2E regression suite built with Playwright and TypeScript.

---

## 🎯 Project Overview & QA Objectives

The target application under test is the [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com). The workspace is designed to achieve the following goals:
1. **Maximize Test Coverage**: Establish full validation of core business modules (Authentication, PIM, Leave, and Admin) through structured manual scenarios and automated workflows.
2. **Accelerate Feedback Loops**: Implement a fast, parallelizable, and flake-free automation framework optimized for local development and CI/CD pipelines.
3. **Ensure Traceability**: Maintain a solid link between manual scenarios, comprehensive test cases, and automated regression scripts.

---

## 📁 Repository Structure

The workspace is organized into two primary pillars: **Manual QA Documentation** and **Automated E2E Suite**.

```text
E2E-OrangeHRM/
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 playwright.yml                         # Root GitHub Actions CI configuration
│
├── 📄 .gitignore                                     # Root Git exclusions configuration
├── 📄 README.md                                      # Workspace root README (this file)
│
├── 📁 manual/                                        # Manual Testing Artifacts
│   ├── 📄 OrangeHRM_Test_Plan.docx                   # Core QA Test Plan
│   ├── 📄 OrangeHRM_Testing_Project_Overview.docx    # High-level Project Overview
│   ├── 📄 OrangeHRM_ManualTestScenarios.xlsx         # High-level Business Scenarios
│   └── 📁 test cases/
│       ├── 📄 Test_Cases_Admin_Modules.xlsx          # Granular Test Cases for Admin
│       └── 📄 test cases.xlsx                        # Comprehensive Test Cases
│
└── 📁 automation/                                    # Automated E2E Testing Suite (Playwright)
    ├── 📁 src/
    │   ├── 📁 pages/                                 # Page Object Model (POM) Layers
    │   │   ├── 📄 base.page.ts                       # Base Page (Common selectors/actions)
    │   │   ├── 📄 login.page.ts                      # Login Page Objects
    │   │   └── ...
    │   ├── 📁 fixtures/                              # Custom Playwright Fixtures
    │   │   ├── 📄 page.fixture.ts                    # Extended fixtures injecting PageFactory
    │   │   └── 📄 auth.fixture.ts                    # Session state fixture (authenticatedPage)
    │   ├── 📁 services/                              # Business logic service abstractions
    │   ├── 📁 api/                                   # Backend REST API clients
    │   ├── 📁 helpers/                               # Dynamic helper routines & CleanupHelper
    │   ├── 📁 config/                                # Environment managers (Singleton)
    │   └── 📁 utils/                                 # General utilities & Loggers
    │
    ├── 📁 tests/                                     # Test Specification Files
    │   ├── 📄 auth.setup.ts                          # Global auth setup (caching cookies)
    │   ├── 📄 login.spec.ts                          # Authentication tests (unauthenticated)
    │   ├── 📄 dashboard.spec.ts                      # Dashboard widget & navigation tests
    │   ├── 📄 admin.spec.ts                          # Admin module management tests
    │   ├── 📄 pim.spec.ts                            # Employee life-cycle & PIM tests
    │   └── ...
    │
    ├── 📁 reports/                                   # Saved execution reports (ignored)
    ├── 📁 test-results/                              # Diagnostic traces & videos (ignored)
    ├── 📄 playwright.config.ts                       # Playwright Framework Configurations
    ├── 📄 package.json                               # Dependencies & NPM scripts
    └── 📄 tsconfig.json                              # TypeScript Compiler Configurations
```

---

## 📋 Manual Testing Artifacts

Located under the [manual](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/manual) directory, these documents lay the foundation for our testing strategy:

1. **[OrangeHRM_Test_Plan.docx](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/manual/OrangeHRM_Test_Plan.docx)**
   * **Scope**: Defines in-scope and out-of-scope modules, entry/exit criteria, testing types (Functional, Boundary, Regression, Integration), risk assessment, and resource allocation.
2. **[OrangeHRM_ManualTestScenarios.xlsx](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/manual/OrangeHRM_ManualTestScenarios.xlsx)**
   * High-level business validation scenarios checking end-to-end integration flows across leaves, employee profiles, and recruitment.
3. **[test cases/Test_Cases_Admin_Modules.xlsx](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/manual/test%20cases/Test_Cases_Admin_Modules.xlsx)**
   * Granular manual test cases covering functional, negative, and boundary validation criteria for Admin dashboards.

---

## 🤖 Playwright Automation Suite

The automation framework inside [automation](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation) is built using **Playwright**, **TypeScript**, and standard **Page Object Model (POM)** architectural patterns.

### Key Architectural Highlights
* **Global Authentication Setup ([auth.setup.ts](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation/tests/auth.setup.ts))**: Logs in once using system admin credentials and saves session cookies/local storage into a cached file (`.playwright/auth/user.json`). Other test files use this cached state to bypass the login screen entirely, optimizing run speed.
* **Page & Service Factories**: Uses a lazy instantiation factory design (`PageFactory` and `ServiceFactory`) to automatically manage page objects and API clients, dry-ing up test specs.
* **Automated Data Teardown**: Uses a dynamic `CleanupHelper` to track created entity IDs (like Employee IDs) during tests and automatically delete them via backend REST APIs at the teardown phase.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: Version `18.x` or higher
* **npm**: Version `9.x` or higher

### Step 1: Install Dependencies
Navigate to the automation folder and install NPM modules:
```bash
cd automation
npm install
```

### Step 2: Install Playwright Browser Binaries
```bash
npx playwright install
```

### Step 3: Run Automation Tests
All commands are run from the `automation/` directory:
```bash
# Run all tests
npm run test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api
```

---

## 🚀 CI/CD Pipeline (GitHub Actions)

Continuous Integration is configured via [.github/workflows/playwright.yml](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/.github/workflows/playwright.yml):
* **Triggers**: On every `push` and `pull_request` targeting the `main` or `master` branches.
* **Caching**: Automatically caches NPM packages and dependencies to decrease runtime.
* **Artifacts**: Retains Playwright HTML execution reports for 30 days to facilitate diagnostics of failing tests.
