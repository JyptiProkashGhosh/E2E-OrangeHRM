# 🍊 OrangeHRM Quality Assurance & Test Automation Workspace

[![Playwright Version](https://img.shields.io/badge/Playwright-%5E1.44.0-blue.svg?logo=playwright)](https://playwright.dev/)
[![TypeScript Version](https://img.shields.io/badge/TypeScript-%5E5.4.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![QA Methodology](https://img.shields.io/badge/QA%20Methodology-Manual%20%26%20Automation-orange.svg)](#qa-strategy--methodology)

Welcome to the **OrangeHRM Quality Assurance and Test Automation Workspace**. This repository serves as a centralized QA hub containing comprehensive manual test artifacts and a state-of-the-art automated E2E regression suite built with Playwright and TypeScript.

---

## 🎯 Project Overview & QA Objectives

The target application under test is the [OrangeHRM Open Source Demo](https://opensource-demo.orangehrmlive.com). The workspace is designed to achieve the following goals:
1. **Maximize Test Coverage**: Establish full validation of core business modules (Authentication, PIM, and Admin) through structured manual and automated workflows.
2. **Accelerate Feedback Loops**: Implement a fast, parallelizable, and flake-free automation framework optimized for local development and CI/CD pipelines.
3. **Ensure Traceability**: Maintain a solid link between manual scenarios, comprehensive test cases, and automated regression scripts.

---

## 📁 Repository Structure

The workspace is organized into two primary pillars: **Manual QA Documentation** and **Automated E2E Suite**.

```text
e:/OrangeHRM/
├── 📄 README.md                                  # Workspace root README (this file)
│
├── 📁 manualTesting/                             # Manual Testing Artifacts
│   ├── 📄 OrangeHRM_TestPlan.docx                # Core QA Test Plan
│   ├── 📄 OrangeHRM_ManualTestScenarios.xlsx     # High-level Business Scenarios
│   └── 📁 test cases/
│       └── 📄 Test_Cases_Admin_Modules.xlsx      # Granular Test Cases for Admin
│
└── 📁 OrangeHRMadvance/                          # Automated E2E Testing Suite (Playwright)
    ├── 📁 tests/                                 # Test Specification Files
    │   ├── 📄 auth.setup.ts                      # Global Login Setup (Session Caching)
    │   ├── 📁 auth/                              # Login & Authentication Tests
    │   │   └── 📄 login.spec.ts
    │   ├── 📁 admin/                             # Admin Module Life-cycle & Boundary Tests
    │   │   └── 📄 admin.spec.ts
    │   └── 📁 pim/                               # PIM (Employee) Lifecycle Tests
    │       └── 📄 pim.spec.ts
    │
    ├── 📁 pages/                                 # Page Object Model (POM) Layers
    │   ├── 📄 base.page.ts                       # Base Page (Common selectors/actions)
    │   ├── 📄 login.page.ts                      # Login Page Objects
    │   ├── 📄 dashboard.page.ts                  # Dashboard Page Objects
    │   ├── 📄 admin.page.ts                      # Admin Module Page Objects
    │   └── 📄 pim.page.ts                        # PIM Module Page Objects
    │
    ├── 📁 fixtures/                              # Custom Playwright Fixtures
    │   └── 📄 auth.fixture.ts                    # Extended fixtures injecting Pages
    │
    ├── 📁 utils/                                 # Test Data & Utility Helpers
    │   ├── 📄 test-data.ts                       # Environment URLs and test users
    │   └── 📄 helpers.ts                         # Dynamic data and file mock generators
    │
    ├── 📁 test-data/                             # Sandbox for dynamic uploads (generated)
    ├── 📁 playwright-report/                     # Test Reports (HTML & logs)
    ├── 📄 playwright.config.ts                   # Framework Settings & Profile Config
    ├── 📄 package.json                           # NPM Script Definitions & Dependencies
    └── 📄 tsconfig.json                          # TypeScript Compiler Configurations
```

---

## 📋 Manual Testing Artifacts

Located under the [manualTesting](file:///e:/OrangeHRM/manualTesting) directory, these documents lay the foundation for our testing strategy:

1. **[OrangeHRM_TestPlan.docx](file:///e:/OrangeHRM/manualTesting/OrangeHRM_TestPlan.docx)**
   * **Scope**: Defines in-scope and out-of-scope modules, entry/exit criteria, testing types (Functional, Boundary, Regression, Integration), risk assessment, and resource allocation.
   * **Environments**: Outlines hardware, software, and browser matrix configurations required for manual evaluation.
2. **[OrangeHRM_ManualTestScenarios.xlsx](file:///e:/OrangeHRM/manualTesting/OrangeHRM_ManualTestScenarios.xlsx)**
   * High-level business validation scenarios checking end-to-end integration flows across recruitment, leave management, and employee profiling.
3. **[Test_Cases_Admin_Modules.xlsx](file:///e:/OrangeHRM/manualTesting/test cases/Test_Cases_Admin_Modules.xlsx)**
   * Granular manual test cases covering functional, negative, and boundary test validation criteria specifically mapping out the Admin dashboard's capabilities.

---

## 🤖 Playwright Automation Suite

The automation framework inside [OrangeHRMadvance](file:///e:/OrangeHRM/OrangeHRMadvance) is built using **Playwright E2E Runner**, **TypeScript**, and standard **Page Object Model (POM)** architectural patterns.

### Key Architectural Highlights
* **Global Authentication Setup ([auth.setup.ts](file:///e:/OrangeHRM/OrangeHRMadvance/tests/auth.setup.ts))**: Tests authenticate once using admin credentials and save cookies/session state into a cached storage file (`playwright/.auth/user.json`). Tests within [admin.spec.ts](file:///e:/OrangeHRM/OrangeHRMadvance/tests/admin/admin.spec.ts) and [pim.spec.ts](file:///e:/OrangeHRM/OrangeHRMadvance/tests/pim/pim.spec.ts) reuse this session state to bypass the login UI, saving significant execution time.
* **Custom Dependency Fixture Injection ([auth.fixture.ts](file:///e:/OrangeHRM/OrangeHRMadvance/fixtures/auth.fixture.ts))**: Automatically initializes and injects all POM instances ([login.page.ts](file:///e:/OrangeHRM/OrangeHRMadvance/pages/login.page.ts), [dashboard.page.ts](file:///e:/OrangeHRM/OrangeHRMadvance/pages/dashboard.page.ts), [pim.page.ts](file:///e:/OrangeHRM/OrangeHRMadvance/pages/pim.page.ts), [admin.page.ts](file:///e:/OrangeHRM/OrangeHRMadvance/pages/admin.page.ts)) into the tests, eliminating boilerplate instantiation in individual spec files.
* **Test Isolation & State Cleanliness ([helpers.ts](file:///e:/OrangeHRM/OrangeHRMadvance/utils/helpers.ts))**: 
  * Avoids hardcoded input values by generating dynamic employee IDs, usernames, and job titles.
  * Dynamically constructs custom 1x1 transparent PNG files and dummy PDF documents for boundary tests (checking the 1MB attachment limit), clean-deleting them after execution.
* **Automatic Failure Recovery**: Configured in [playwright.config.ts](file:///e:/OrangeHRM/OrangeHRMadvance/playwright.config.ts) to capture **videos**, full-page **screenshots**, and **system traces** only when a test fails (`retain-on-failure`).

---

## 🚀 Getting Started

Follow these steps to set up and run the automation framework locally.

### Prerequisites
* **Node.js**: Version `18.x` or higher (LTS recommended)
* **npm**: Version `9.x` or higher

### Step 1: Install Dependencies
Navigate to the automation project folder and install the node dependencies:
```bash
cd OrangeHRMadvance
npm install
```

### Step 2: Install Playwright Browsers
Download the required browser binaries (Chromium, Firefox, WebKit):
```bash
npx playwright install
```

---

## ⚙️ Running Automated Tests

All scripts are executed from the [OrangeHRMadvance](file:///e:/OrangeHRM/OrangeHRMadvance) directory.

### NPM Execution Scripts

| Command | Action | Recommended Use |
|:---|:---|:---|
| `npm run test` | Run all automated tests headlessly | Core regressions / CI pipelines |
| `npm run test:headed` | Run tests with browser UI visible | Local debugging & visual analysis |
| `npm run test:ui` | Open Playwright interactive UI Mode | Time-travel debugging & locator checking |
| `npm run test:smoke` | Run test cases tagged with `@smoke` | Fast validation of core flows |
| `npm run test:pim` | Run test cases tagged with `@pim` | Target PIM module validation |
| `npm run test:report` | Open the last generated HTML Report | Reviewing execution logs & screenshots |

### Advanced CLI Run Commands
* **Run a single spec file:**
  ```bash
  npx playwright test tests/admin/admin.spec.ts
  ```
* **Run specifically tagged test suites (e.g., Boundary checks):**
  ```bash
  npx playwright test --grep "@boundary"
  ```
* **Run with visual Debugger step-by-step:**
  ```bash
  npx playwright test tests/auth/login.spec.ts --debug
  ```

---

## 📊 Test Reporting and Diagnostics

Playwright is configured to compile test results into an interactive HTML Report. 

1. Once tests complete, view the report using:
   ```bash
   npm run test:report
   ```
2. If a test fails:
   * **Screenshots**: Automatically taken at the failure point.
   * **Traces**: Located in the `test-results` folder. Load them into the Playwright Trace Viewer (`npx playwright show-trace path/to/trace.zip`) to step backward and forward through network logs, console messages, and source code execution.

---

## 🚀 CI/CD Pipeline (GitHub Actions)

We have integrated continuous validation workflows under [.github/workflows/](file:///e:/OrangeHRM/.github/workflows/):

1. **Smoke Tests Workflow ([smoke.yml](file:///e:/OrangeHRM/.github/workflows/smoke.yml))**
   * **Trigger**: On any `push` or `pull_request` targeting `main`, `master`, or `develop` branches. Supports manual trigger (`workflow_dispatch`).
   * **Scope**: Quick validation run targeting only tests tagged `@smoke`.
   * **Optimization**: Installs only Chromium and caches npm packages and Playwright browser packages for rapid feedback loops.
   * **Artifacts**: Retains smoke test reports for 7 days.

2. **Nightly Regression Workflow ([regression.yml](file:///e:/OrangeHRM/.github/workflows/regression.yml))**
   * **Trigger**: Automatically runs nightly at 12:00 AM UTC (5:30 AM IST). Supports manual execution.
   * **Scope**: Complete E2E regression check across all active browsers configured in [playwright.config.ts](file:///e:/OrangeHRM/OrangeHRMadvance/playwright.config.ts).
   * **Diagnostics**: Preserves HTML reports, failure screenshots, and trace logs as workflow artifacts with a 14-day retention cycle.

---

## 🧠 QA Best Practices Implemented

To ensure a highly maintainable, enterprise-ready testing suite, we adhere to the following QA principles:
* **Web-First Assertions**: Never use implicit timeouts like `page.waitForTimeout()`. Playwright's assertions (e.g., `expect(locator).toBeVisible()`) auto-wait for conditions to be met.
* **Resilient Element Selection**: Prioritize user-facing, accessibility-tree locators like `getByRole`, `getByText`, or `getByLabel` over brittle CSS/XPath strings.
* **Clean State Transitions**: Tests in [admin.spec.ts](file:///e:/OrangeHRM/OrangeHRMadvance/tests/admin/admin.spec.ts) use `test.describe.configure({ mode: 'serial' })` to safely run sequential dependencies (Create user -> Search user -> Delete user) without side-effect collisions.
* **No Shared Mutable State**: Each spec initializes clean local objects and works on dynamic records, meaning test suites can run simultaneously/parallelly in multiple browsers without interfering with one another.

