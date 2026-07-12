# Prompt: Automate OrangeHRM Demo (Dashboard, PIM, Admin, Leave, Recruitment) in Our Playwright + TypeScript Framework

## Role & Framing (for the AI agent executing this prompt)

You are acting as a **Senior SDET / QA Automation Engineer** with deep expertise in Playwright + TypeScript, the Page Object Model (POM), and building maintainable, CI-ready regression suites. You are extending an **existing** `playwright_typescript_automation` repository — you are not starting from scratch.

Before writing a single line of test code, do this reconnaissance first:

1. Inspect the repo root, `package.json`, `playwright.config.ts`, and any `tsconfig.json` to learn the runner setup, reporters, `baseURL`, projects/browsers, and existing npm scripts.
2. Inspect existing folder structure (commonly `tests/`, `pages/` or `page-objects/`, `fixtures/`, `utils/`, `data/`, `config/`). Reuse the existing pattern — do **not** invent a parallel/competing structure.
3. Open 2–3 existing test files and 2–3 existing page object files to learn our conventions: naming casing, locator strategy (`getByRole`, `getByTestId`, `getByLabel`, CSS), assertion style, custom fixtures, tagging convention (e.g. `@smoke`, `@regression`), and how test data/env vars are managed (`.env`, `dotenv`, `data/*.json`, faker).
4. Only if the repo is genuinely empty/new, fall back to the "Default Framework Conventions" section below.
5. Confirm your understanding of the structure in a short summary comment at the top of your first PR/commit before generating tests, so structure choices are traceable.

**Do not skip this discovery step.** Generating tests that don't match our existing patterns creates review friction and duplicate abstractions.

---

## Application Under Test (AUT)

- **URL:** `https://opensource-demo.orangehrmlive.com/`
- **Login:** Username `Admin`, Password `admin123`
- **Stack observed:** Vue 3 SPA, OXD design system, standard HRM top navigation: `Admin | PIM | Leave | Time | Recruitment | My Info | Performance | Dashboard | Directory | Maintenance | Buzz`
- **Note:** This is a public, shared demo instance. Data (employees, candidates, vacancies, leave records) persists and is shared across all users hitting the demo. Tests **must** create their own unique data (via `faker`/timestamp suffixes) and clean up after themselves wherever a delete action exists, so the suite is idempotent and safe to re-run without colliding with prior runs or other testers.

---

## Objective

Design and implement an **automated regression suite** covering the **Dashboard, PIM, Admin, Leave, and Recruitment** modules, following risk-based prioritization (P0 = smoke/critical path, P1 = core functional, P2 = edge/negative/validation). Every scenario below should map to one automated Playwright test (or a data-driven set of tests) inside our framework's existing conventions.

---

## Default Framework Conventions (use only if repo has no existing pattern to follow)

```
tests/
  dashboard/dashboard.spec.ts
  pim/pim-employee.spec.ts
  admin/admin-users.spec.ts
  admin/admin-job.spec.ts
  admin/admin-organization.spec.ts
  admin/admin-qualifications.spec.ts
  leave/leave-apply.spec.ts
  leave/leave-admin.spec.ts
  recruitment/recruitment-candidate.spec.ts
  recruitment/recruitment-vacancy.spec.ts
pages/
  LoginPage.ts
  DashboardPage.ts
  pim/EmployeeListPage.ts
  pim/AddEmployeePage.ts
  pim/PersonalDetailsPage.ts
  admin/UserManagementPage.ts
  admin/JobTitlesPage.ts
  leave/ApplyLeavePage.ts
  leave/LeaveListPage.ts
  recruitment/CandidatesPage.ts
  recruitment/VacanciesPage.ts
  BasePage.ts
fixtures/
  auth.fixture.ts        // logged-in storageState fixture
  test-data.fixture.ts    // faker-based data builders
data/
  users.json
  employees.json
utils/
  faker-helpers.ts
  env.ts
playwright.config.ts
.env / .env.example
```

**Coding standards to apply regardless of which structure you land on:**

- TypeScript strict mode; no `any` unless justified with a comment.
- Page Object Model: one class per page/module; methods are intention-revealing (`applyForLeave()`, not `clickButton()`).
- Prefer user-facing locators: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`. Fall back to `[name=...]` only where OrangeHRM's OXD components don't expose accessible roles (common on its custom dropdowns/date pickers — verify and document why).
- No hard-coded `waitForTimeout`. Use Playwright's auto-waiting + explicit `expect(locator).toBeVisible()` / `toHaveText()` assertions instead.
- Use a shared **authenticated fixture** (`storageState`) so we log in once per worker, not once per test — except for the Login/Auth tests themselves, which must exercise the real login flow.
- Generate all test data via `@faker-js/faker` with unique suffixes (e.g. `Employee_${Date.now()}`) — never hard-code a name that could collide with another run.
- Tag every test: `@smoke` for P0, `@regression` for P1/P2, plus a module tag (`@pim`, `@leave`, etc.) so we can run subsets via `npx playwright test --grep`.
- Each `test.describe` block = one module/page; use `test.step()` to break long flows into readable steps in the HTML report.
- Assertions should be specific (assert on the actual success toast text / row data / URL — not just "no error thrown").
- Clean up created data at the end of a test (`test.afterEach`) wherever the module supports delete, to keep the shared demo environment tidy.

---

## Reference Pattern (illustrative — adapt to our real conventions, don't copy blindly)

```ts
// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.locator('.oxd-alert-content-text');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

```ts
// tests/dashboard/dashboard.spec.ts
import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Dashboard @dashboard', () => {
  test('displays all default widgets after login @smoke', async ({ authenticatedPage }) => {
    await test.step('Verify key widgets are visible', async () => {
      await expect(authenticatedPage.getByText('Time at Work')).toBeVisible();
      await expect(authenticatedPage.getByText('My Actions')).toBeVisible();
      await expect(authenticatedPage.getByText('Quick Launch')).toBeVisible();
    });
  });
});
```

Use this level of clarity and structure for every generated test — not this exact code.

---

## Test Scenarios to Automate

### 0. Authentication (precondition for all modules — automate first)

| # | Scenario | Priority |
|---|---|---|
| A1 | Valid login (Admin/admin123) redirects to `/dashboard/index` | P0 |
| A2 | Invalid username/password shows "Invalid credentials" error, stays on login page | P0 |
| A3 | Empty username and/or password shows "Required" inline validation, no navigation | P1 |
| A4 | Logout via user dropdown returns to login page and invalidates session | P0 |
| A5 | Direct navigation to a protected URL (e.g. `/pim/viewEmployeeList`) while logged out redirects to login | P1 |
| A6 | "Forgot your password?" link navigates to the reset password page and shows expected form fields | P2 |

### 1. Dashboard Module

| # | Scenario | Priority |
|---|---|---|
| D1 | All default widgets render: Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location | P0 |
| D2 | Top navigation menu contains all expected module links and each is clickable/navigates correctly | P0 |
| D3 | Quick Launch tiles (Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, My Timesheet) navigate to the correct pages | P1 |
| D4 | User dropdown (top-right) exposes About, Support, Change Password, Logout and each opens the correct panel/page | P1 |
| D5 | "Employees on Leave Today" widget reflects a leave applied earlier in the same test run (integration check with Leave module) | P2 |
| D6 | Page is still functional/responsive at a reduced viewport (basic responsive smoke check) | P2 |

### 2. PIM Module (Personal Information Management)

| # | Scenario | Priority |
|---|---|---|
| P1a | Add a new employee with only mandatory fields (First/Last name) — verify success and auto-generated Employee ID | P0 |
| P1b | Add a new employee with "Create Login Details" enabled — verify user account created and linked | P0 |
| P2a | Add employee with profile photo upload — verify photo appears on Personal Details page | P1 |
| P3 | Search Employee List by name, and verify only matching row(s) returned | P0 |
| P4 | Filter Employee List by "Employment Status" and by "Include" (Current, Past, Current and Past) | P1 |
| P5 | Reset filters clears search criteria and returns full list | P2 |
| P6 | Edit Personal Details tab (nationality, marital status, DOB, gender) and verify persisted after reload | P1 |
| P7 | Negative: attempt to save Add Employee with mandatory First/Last Name left blank — verify inline "Required" validation, no record created | P1 |
| P8 | Negative: enter invalid/future Date of Birth — verify validation message | P2 |
| P9 | Add Job details (Job Title, Sub Unit, Employment Status, Join Date) on employee's Job tab | P1 |
| P10 | Add Salary/Compensation record for an employee | P2 |
| P11 | Add Emergency Contact record | P2 |
| P12 | Add Dependent record | P2 |
| P13 | Add Immigration record (visa/passport) | P2 |
| P14 | Upload an attachment on the employee's "Attachments" tab and verify it's listed | P2 |
| P15 | Delete a single employee via checkbox + Delete, verify removal from list and confirmation dialog handling | P1 |
| P16 | Bulk delete multiple employees via header checkbox, verify all removed | P2 |
| P17 | Pagination: verify page-size selector and next/previous controls change the displayed rows correctly | P2 |
| P18 | Sort Employee List by column header (e.g. Employee Name) and verify order | P2 |

### 3. Admin Module

| # | Scenario | Priority |
|---|---|---|
| AD1 | Add a new System User (role ESS or Admin) linked to an existing employee — verify success toast and row in User list | P0 |
| AD2 | Search Users by Username, User Role, Status, Employee Name — verify filtered results | P1 |
| AD3 | Edit an existing user — change status (Enabled/Disabled) and role, verify persisted | P1 |
| AD4 | Delete a user (single and bulk) — verify removal | P1 |
| AD5 | Negative: Add User with duplicate username — verify "already exists" validation, no duplicate created | P1 |
| AD6 | Negative: Add User with mismatched password/confirm password — verify validation blocks submission | P2 |
| AD7 | Job Titles: Add / Edit / Delete a Job Title under Job > Job Titles, verify list reflects change | P1 |
| AD8 | Negative: Add a duplicate Job Title — verify validation prevents duplicate | P2 |
| AD9 | Pay Grades: add a pay grade and assign a currency, verify saved | P2 |
| AD10 | Employment Status: Add / Edit / Delete an employment status option | P2 |
| AD11 | Job Categories: Add / Edit / Delete a job category | P2 |
| AD12 | Organization > Company Information: edit and save company details, verify persisted | P2 |
| AD13 | Organization > Locations: Add / Edit / Delete a location record | P2 |
| AD14 | Qualifications > Skills / Education / Languages / Licenses: Add and Delete one record from each sub-tab | P2 |
| AD15 | Nationalities: Add / Edit a nationality entry | P2 |
| AD16 | Configuration > Email Notification: toggle a notification setting and verify it persists on reload | P2 |

### 4. Leave Module

| # | Scenario | Priority |
|---|---|---|
| L1 | Apply for leave (select Leave Type, valid From/To date range, add comment) as logged-in user — verify success toast | P0 |
| L2 | Negative: Apply Leave with End Date before Start Date — verify validation error, no leave request created | P1 |
| L3 | View "My Leave" list and verify the just-applied leave appears with status "Pending Approval" | P0 |
| L4 | Cancel a pending leave request from "My Leave" and verify status changes to "Cancelled" | P1 |
| L5 | Admin: Leave List page — filter by Leave Type / Status / Date Range and verify filtered results | P1 |
| L6 | Admin: Approve a pending leave request from Leave List — verify status updates to "Approved" | P0 |
| L7 | Admin: Reject a pending leave request — verify status updates to "Rejected" | P1 |
| L8 | Admin: Assign Leave — assign a leave record on behalf of an employee, verify it appears in that employee's leave list | P1 |
| L9 | Leave Entitlements: Add Leave Entitlement for an employee and verify balance reflected under "My Leave Entitlements and Usage" (or Leave List) | P2 |
| L10 | Leave Types: Add / Edit / Delete a custom Leave Type (as Admin) | P2 |
| L11 | Holidays: Add a holiday (single day) and verify it appears in the Holiday list | P2 |
| L12 | Negative: Apply for overlapping leave dates against an already-applied leave — verify system's conflict handling/error | P2 |

### 5. Recruitment Module

| # | Scenario | Priority |
|---|---|---|
| R1 | Add a Vacancy (Job Title, Position title, Hiring Manager, number of positions, Status Active) — verify it appears in Vacancy list | P0 |
| R2 | Add a Candidate manually (name, email, contact, attach resume, link to a vacancy) — verify success and candidate appears in Candidate list | P0 |
| R3 | Negative: Add Candidate with missing mandatory First Name — verify inline validation blocks save | P1 |
| R4 | Negative: Add Candidate with invalid email format — verify validation message | P2 |
| R5 | Change a candidate's status through the hiring pipeline (e.g. Shortlisted → Interview Scheduled) and verify status badge updates | P1 |
| R6 | Schedule an interview for a candidate (interviewer, date/time) and verify it's listed under the candidate's interview history | P1 |
| R7 | Reject a candidate with a reason/note — verify status is "Rejected" and reason is stored/visible | P2 |
| R8 | Search/filter Candidate list by Vacancy, Status, and Date Range — verify filtered results | P1 |
| R9 | Search/filter Vacancy list by Job Title and Status (Active/Inactive) — verify filtered results | P2 |
| R10 | Delete a candidate — verify removal from the list | P2 |
| R11 | Negative: Add a Candidate with an email that's already tied to an existing candidate — verify duplicate-handling behavior | P2 |

---

## Non-Functional / Cross-Cutting Checks (optional stretch goals — only implement if time-boxed effort allows)

- Basic accessibility smoke check on Login and Dashboard pages (e.g. via `@axe-core/playwright` if already a dependency; do not add new dependencies without confirming with the team first).
- Visual regression is **out of scope** unless the framework already integrates a screenshot-diff tool — flag this rather than adding one unprompted.
- Cross-browser: run the P0/@smoke set across Chromium, Firefox, WebKit if `playwright.config.ts` already defines multiple projects; otherwise leave single-project and note this as a follow-up.

---

## Explicitly Out of Scope

- API-level testing (this prompt is UI/E2E only, unless our framework already has an API testing layer — if so, flag it as a possible follow-up prompt rather than mixing it in here).
- Performance/load testing.
- Corporate Branding / paid-tier Admin features not available on the open-source demo.
- Any destructive action against shared demo data that cannot be cleaned up afterward (e.g. do not delete the seed `Admin` user or default leave types).

---

## Deliverables & Definition of Done

1. New/updated Page Object classes for each module listed above, placed according to the discovered (or default) folder convention.
2. Spec files implementing every P0 and P1 scenario at minimum; P2 scenarios included where time allows, clearly tagged `@regression`.
3. All tests pass locally via the existing `npm run test` (or equivalent) script, and via `npx playwright test --grep @smoke` for the P0 subset.
4. No hard-coded waits; no test depends on execution order; no test leaves orphaned data it created (where a delete path exists).
5. A short `README` note (or update to the existing one) listing the new tags/scripts available for running this suite (e.g. `--grep @pim`, `--grep @smoke`).
6. Test data uses `faker`/timestamped values — running the suite twice in a row does not fail due to duplicate-data collisions.

---

## How to Use This Prompt

Feed this file as-is to your AI coding agent (Claude Code, Cursor, etc.) with the repository open as working context. Ask it to work module-by-module (Dashboard → PIM → Admin → Leave → Recruitment), committing/reviewing after each module rather than generating everything in one giant unreviewed batch — this keeps the diff reviewable and lets you catch convention mismatches early.
