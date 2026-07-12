# Playwright AI Test Automation Framework

A production-ready, enterprise-level test automation framework built using **Playwright**, **TypeScript**, and modern software design patterns.

---

## 🚀 Key Features

* **Cross-Browser Support**: Chromium, Firefox, WebKit execution.
* **Execution Options**: Headless, Headed, and Parallel execution out-of-the-box.
* **Environment Profiles**: Configurable targets (`local`, `qa`, `uat`, `prod`) driven by `.env` configurations.
* **Smart Reporting**: Configured for HTML and JSON reporting.
* **Artifact Collection**: Auto-screenshots on failures, video recording on failures, and trace collection on retry.
* **Advanced Diagnostics**: Trace Viewer ready.
* **Accessibility Scans**: Integration with `@axe-core/playwright` for automated WCAG accessibility audits.
* **Docker Support**: Containerized configuration for standardized execution.

---

## 📂 Project Structure

```text
playwright-ai-framework/
│
├── src/
│   ├── pages/         # Page Object Model classes (locators & actions)
│   ├── components/    # Reusable UI parts (Header, Sidebar, Modals)
│   ├── api/           # API request clients and controllers
│   ├── utils/         # Framework-level utilities (date, csv, logger)
│   ├── helpers/       # Multi-step business workflow procedures
│   ├── constants/     # Global URL routes, timeouts, and roles
│   ├── data/          # Test data (JSON / CSV seeds)
│   ├── config/        # Environment configurations (Singleton managers)
│   ├── fixtures/      # Playwright custom fixtures
│   ├── types/         # TypeScript interface definitions
│   └── services/      # Service Layer (combining POM and APIs)
│
├── tests/
│   ├── ui/            # UI visual / functional tests
│   ├── api/           # REST API automation tests
│   ├── e2e/           # Multi-page business flow scenarios
│   ├── smoke/         # Crucial smoke verification tests
│   ├── regression/    # Parametrized regression tests
│   └── accessibility/ # Automated accessibility scans
│
├── reports/           # Saved execution test reports
├── screenshots/       # Saved test run screenshots
├── videos/            # Saved video records
├── traces/            # Diagnostic traces
└── Dockerfile         # Dockerized test environment setup
```

---

## ⚙️ Design Patterns Implemented

1. **Page Object Model (POM)**:
   Inherits from [base.page.ts](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation/src/pages/base.page.ts) to dry up element operations and enforce structured layout separation.
2. **Factory Pattern**:
   Implemented in [page.factory.ts](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation/src/pages/page.factory.ts) and [service.factory.ts](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation/src/services/service.factory.ts) to handle page object and service layer initialization automatically.
3. **Builder Pattern**:
   Implemented in [employee.builder.ts](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation/src/data/builders/employee.builder.ts) for fluent, readable test data construction.
4. **Singleton Pattern**:
   Utilized in [environment.config.ts](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation/src/config/environment.config.ts) and [logger.ts](file:///E:/PROJECTS/OrangeHRM/E2E-OrangeHRM/automation/src/utils/logger.ts) to coordinate environment profiles and outputs without duplicate resource load.
5. **Dependency Injection**:
   Passing of context wrappers (`Page`, `APIRequestContext`) directly down through constructor initializers to maximize modularity and separation of concerns.

---

## 💻 CLI Command Manual

### Dependency Installation
```bash
npm install
npx playwright install
```

### Run Tests
```bash
# Run all tests
npm run test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run Smoke suite
npm run test:smoke

# Run Regression suite (CSV-driven parametrized tests)
npm run test:regression

# Run Accessibility audits
npm run test:accessibility
```

### Environment Switching
Set `NODE_ENV` before running tests (defaults to `local`):
```bash
# Windows cmd
set NODE_ENV=qa && npm run test

# Windows PowerShell
$env:NODE_ENV="qa"; npm run test

# Bash / Linux
NODE_ENV=qa npm run test
```

---

## 🐳 Dockerized Execution

Build the test suite container image:
```bash
docker build -t playwright-framework .
```

Execute tests inside the container:
```bash
docker run --rm -v $(pwd)/reports:/app/reports playwright-framework
```
