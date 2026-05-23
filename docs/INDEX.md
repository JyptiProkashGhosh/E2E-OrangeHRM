# Documentation Index

Welcome to the E2E OrangeHRM test framework documentation!

## 🚀 Getting Started

**New to the project?** Start here:

- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes ⚡
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions 🔧
- **[README.md](../README.md)** - Project overview 📖

## 📚 Core Documentation

### Understanding the Project

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - How the project is organized and how components work together 🏗️
  - Project structure
  - Design patterns used
  - Data flow & test execution
  - Extension points

### Writing Tests

- **[TEST_GUIDE.md](./TEST_GUIDE.md)** - How to write tests following best practices ✍️
  - Test structure (AAA pattern)
  - Naming conventions
  - Creating page objects
  - Different test types
  - Running tests
  - Debugging

### Available Tools & Utilities

- **[HELPERS.md](./HELPERS.md)** - Reference guide for utility functions 🛠️
  - Wait helpers
  - Assertion helpers
  - API helpers
  - Common utilities

## 📋 Quick Reference Guides

| Guide | Purpose | Audience |
|-------|---------|----------|
| [QUICKSTART.md](./QUICKSTART.md) | Get setup & running fast | Everyone |
| [SETUP.md](./SETUP.md) | Detailed environment setup | Developers |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Understand project design | Developers |
| [TEST_GUIDE.md](./TEST_GUIDE.md) | Write new tests | QA Engineers |
| [HELPERS.md](./HELPERS.md) | Use utility functions | QA Engineers |

## 🎯 By Task

### "I want to..."

#### Set up the project
→ [QUICKSTART.md](./QUICKSTART.md) or [SETUP.md](./SETUP.md)

#### Write a new test
→ [TEST_GUIDE.md](./TEST_GUIDE.md)

#### Use a helper function
→ [HELPERS.md](./HELPERS.md)

#### Understand how things work
→ [ARCHITECTURE.md](./ARCHITECTURE.md)

#### Add a new page object
→ [TEST_GUIDE.md - Creating New Page Objects](./TEST_GUIDE.md#️-creating-new-page-objects)

#### Debug a failing test
→ [TEST_GUIDE.md - Debugging Failed Tests](./TEST_GUIDE.md#-debugging-failed-tests)

#### Configure CI/CD
→ [README.md - CI/CD Integration](../README.md#-cicd-integration)

#### Contribute to the project
→ [CONTRIBUTING.md](./CONTRIBUTING.md) (if available)

## 🔍 By Topic

### Environment & Configuration

- Environment variables: [SETUP.md - Step 3](./SETUP.md#step-3-environment-configuration)
- Encryption: [SETUP.md - Step 3.4](./SETUP.md#34-encrypt-your-credentials)
- Multiple environments: [SETUP.md - Environment-Specific](./SETUP.md#environment-specific-configuration)

### Testing

- Test structure: [TEST_GUIDE.md - Anatomy of a Test](./TEST_GUIDE.md#-anatomy-of-a-test)
- Best practices: [TEST_GUIDE.md - Best Practices](./TEST_GUIDE.md#-best-practices-for-writing-tests)
- Page objects: [TEST_GUIDE.md - Creating Page Objects](./TEST_GUIDE.md#️-creating-new-page-objects)

### Utilities & Helpers

- Wait helpers: [HELPERS.md - Wait Helpers](./HELPERS.md#wait-helpers)
- Assertions: [HELPERS.md - Assertion Helpers](./HELPERS.md#assertion-helpers)
- API calls: [HELPERS.md - API Helpers](./HELPERS.md#api-helpers)

### Architecture & Design

- Project structure: [ARCHITECTURE.md - Directory Structure](./ARCHITECTURE.md#-directory-structure)
- Design patterns: [ARCHITECTURE.md - Design Patterns](./ARCHITECTURE.md#-design-patterns-used)
- Fixtures: [ARCHITECTURE.md - Fixture-Based Architecture](./ARCHITECTURE.md#2-fixture-based-architecture)

## 📂 File Locations

### Documentation Files
```
docs/
├── QUICKSTART.md          ← Start here! (5 min)
├── SETUP.md               ← Detailed setup
├── ARCHITECTURE.md        ← How it works
├── TEST_GUIDE.md          ← Write tests
├── HELPERS.md             ← Utility reference
├── INDEX.md               ← This file
└── CONTRIBUTING.md        ← (if available)
```

### Project Files
```
root/
├── README.md              ← Project overview
├── playwright.config.ts   ← Playwright config
├── package.json           ← Dependencies
├── .gitignore             ← Git rules
└── encrypt-credentials.js ← Encryption tool

tests/                     ← Test files
pages/                     ← Page objects
fixtures/                  ← Test setup
helpers/                   ← Utility functions
constants/                 ← Test data & selectors
utils/                     ← General utilities
env-files/                 ← Environment config
.github/workflows/         ← CI/CD pipelines
```

## 🎓 Learning Path

### Beginner Path (30 minutes)
1. Read [QUICKSTART.md](./QUICKSTART.md) (5 min)
2. Run tests: `npm run test_demo` (5 min)
3. Read [TEST_GUIDE.md - Test Structure](./TEST_GUIDE.md#-basic-test-structure) (10 min)
4. Review existing tests in `/tests` (10 min)

### Intermediate Path (1 hour)
1. Complete Beginner Path
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) (15 min)
3. Read [TEST_GUIDE.md - Page Objects](./TEST_GUIDE.md#️-creating-new-page-objects) (10 min)
4. Create your first page object (20 min)
5. Write your first test (15 min)

### Advanced Path (2-3 hours)
1. Complete Intermediate Path
2. Read [HELPERS.md](./HELPERS.md) completely (20 min)
3. Review helper implementations in `/helpers` (15 min)
4. Write tests using multiple helpers (20 min)
5. Add new helpers for your needs (30 min)

## 🔗 External Resources

- [Playwright Documentation](https://playwright.dev/) - Official Playwright docs
- [Best Practices](https://playwright.dev/docs/best-practices) - Playwright best practices
- [Page Object Model](https://playwright.dev/docs/pom) - POM pattern guide
- [Test Fixtures](https://playwright.dev/docs/test-fixtures) - Fixture system
- [Test Assertions](https://playwright.dev/docs/test-assertions) - Available assertions

## 💬 FAQ

### "Where do I start?"
→ [QUICKSTART.md](./QUICKSTART.md)

### "How do I write a test?"
→ [TEST_GUIDE.md](./TEST_GUIDE.md)

### "What helpers are available?"
→ [HELPERS.md](./HELPERS.md)

### "Why is my test failing?"
→ [TEST_GUIDE.md - Debugging](./TEST_GUIDE.md#-debugging-failed-tests)

### "How do I add a new page?"
→ [TEST_GUIDE.md - Creating Page Objects](./TEST_GUIDE.md#️-creating-new-page-objects)

### "How do I set up CI/CD?"
→ [README.md - CI/CD Integration](../README.md#-cicd-integration)

### "Where's the API reference?"
→ [HELPERS.md - API Helpers](./HELPERS.md#api-helpers)

## 📞 Getting Help

1. **Check the docs** - Most questions are answered in one of these files
2. **Search for examples** - Look in `/tests` and `/helpers` for similar code
3. **Read error messages** - Playwright provides detailed error descriptions
4. **Debug mode** - Use `npx playwright test --debug` to step through tests
5. **Check screenshots** - Failed tests capture screenshots in `test-results/`

## 🎯 Common Scenarios

### Scenario: Add login test for new role
1. Read [TEST_GUIDE.md - Test Structure](./TEST_GUIDE.md#-anatomy-of-a-test)
2. Check existing login tests in `tests/login-module.spec.ts`
3. Use `LoginPage` from `pages/LoginPage.ts`
4. Follow naming convention: `[Feature] Description`
5. Run: `npm run test_dev`

### Scenario: Create employee page tests
1. Read [TEST_GUIDE.md - Page Objects](./TEST_GUIDE.md#️-creating-new-page-objects)
2. Create `pages/EmployeePage.ts` with locators and methods
3. Register in `fixtures/pom-fixtures.ts`
4. Create `tests/employee-module.spec.ts`
5. Use helpers from [HELPERS.md](./HELPERS.md)

### Scenario: Debug failing test
1. Note the test name and error
2. Run: `npx playwright test <test-name> --debug`
3. Step through the code
4. Check screenshots in `test-results/`
5. Read [TEST_GUIDE.md - Debugging](./TEST_GUIDE.md#-debugging-failed-tests)

## 📊 Documentation Stats

- **Total pages**: 7+ documents
- **Total sections**: 50+ guides
- **Code examples**: 100+ examples
- **Quick reference**: Yes ✅
- **Setup guide**: Yes ✅
- **Best practices**: Yes ✅

---

**Last Updated**: May 2026
**Version**: 1.0.0
**Status**: Complete ✅

**Need something?** Check here first → [FAQ](#-faq)
