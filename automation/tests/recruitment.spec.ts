import { test, expect } from '../src/fixtures/auth.fixture';
import { logger } from '../src/utils/logger';
import * as fs from 'fs';
import * as path from 'path';

// Helper to create a valid vacancy to ensure clean data relationships
async function createTestVacancy(recruitmentPage: any, uniqueId: string): Promise<string> {
  const vacancyName = `Vac_${uniqueId}`;
  await recruitmentPage.navigateToVacancies();
  await recruitmentPage.click('button:has-text("Add")');
  await recruitmentPage.fillFieldByLabel('Vacancy Name', vacancyName);
  await recruitmentPage.selectFirstAvailableDropdownOption('Job Title');
  await recruitmentPage.selectAutocompleteFirstSuggestion('Hiring Manager', 'm');
  await recruitmentPage.click('button[type="submit"]');
  // Wait for redirect to confirm success
  await expect(recruitmentPage.page).toHaveURL(/.*recruitment\/addJobVacancy\/\d+/, { timeout: 15000 });
  return vacancyName;
}

test.describe('OrangeHRM Recruitment Module @recruitment', () => {
  const workerIndex = process.env.TEST_WORKER_INDEX || '0';
  const dummyResumePath = path.resolve(__dirname, `dummy_resume_${workerIndex}.txt`);

  test.beforeAll(() => {
    // Create a dummy resume text file for testing file upload
    fs.writeFileSync(dummyResumePath, 'Candidate Resume Content for Automated Testing');
  });

  test.afterAll(() => {
    // Clean up dummy resume file
    if (fs.existsSync(dummyResumePath)) {
      fs.unlinkSync(dummyResumePath);
    }
  });

  test.beforeEach(async ({ authenticatedPage, pageFactory }) => {
    const sidebar = pageFactory.getSidebarComponent();
    await sidebar.clickRecruitment();
  });

  test('R1: Add a Vacancy @smoke @regression', async ({ pageFactory }) => {
    test.setTimeout(90000);
    const recruitmentPage = pageFactory.getRecruitmentPage();
    await recruitmentPage.navigateToVacancies();

    const uniqueId = Date.now().toString().slice(-6);
    const vacancyName = `Vacancy_${uniqueId}`;

    await recruitmentPage.click('button:has-text("Add")');
    await recruitmentPage.fillFieldByLabel('Vacancy Name', vacancyName);
    await recruitmentPage.selectFirstAvailableDropdownOption('Job Title');
    await recruitmentPage.selectAutocompleteFirstSuggestion('Hiring Manager', 'm');
    await recruitmentPage.fillFieldByLabel('Number of Positions', '2');
    await recruitmentPage.click('button[type="submit"]');

    // OrangeHRM redirects to /addJobVacancy/<id> on successful creation
    await expect(recruitmentPage.page).toHaveURL(/.*recruitment\/addJobVacancy\/\d+/, { timeout: 15000 });
    logger.info(`R1: Created vacancy "${vacancyName}" successfully`);

    // Verify it appears in Vacancies list
    await recruitmentPage.navigateToVacancies();
    await recruitmentPage.filterVacancies(vacancyName);
    const row = recruitmentPage.page.locator('.oxd-table-body .oxd-table-card').filter({ hasText: vacancyName }).first();
    await expect(row).toBeVisible({ timeout: 15000 });
    logger.info(`R1: Verified vacancy "${vacancyName}" exists in the list.`);
  });

  test('R2, R3 & R4: Add Candidate manually and check validation errors @smoke @regression', async ({ pageFactory }) => {
    test.setTimeout(120000);
    const recruitmentPage = pageFactory.getRecruitmentPage();
    await recruitmentPage.navigateToCandidates();

    // R3: Negative - Add Candidate with missing mandatory First Name
    await recruitmentPage.click('button:has-text("Add")');
    await recruitmentPage.page.locator('input[placeholder="Last Name"]').fill('LastNameTest');
    await recruitmentPage.click('button[type="submit"]');
    
    // Check validation error on First Name
    const firstNameInput = recruitmentPage.page.locator('input[placeholder="First Name"]');
    const group = firstNameInput.locator('xpath=ancestor::div[contains(@class, "oxd-input-group")][1]');
    const errorTextElement = group.locator('.oxd-input-group__message');
    await expect(errorTextElement).toHaveText('Required', { timeout: 10000 });
    logger.info('R3: Verified missing First Name validation is blocked with "Required".');

    // R4: Negative - Add Candidate with invalid email format
    await recruitmentPage.page.locator('input[placeholder="First Name"]').fill('FirstNameTest');
    await recruitmentPage.fillFieldByLabel('Email', 'invalid-email-format');
    await recruitmentPage.click('button[type="submit"]');
    
    const emailError = await recruitmentPage.getFieldErrorText('Email');
    expect(emailError).toBe('Expected format: admin@example.com');
    logger.info('R4: Verified invalid email validation message: "Expected format: admin@example.com".');

    // R2: Add candidate manually with valid details
    await recruitmentPage.navigateToCandidates();
    const uniqueId = Date.now().toString().slice(-6);
    const firstName = `CandidateFirst_${uniqueId}`;
    const lastName = `CandidateLast_${uniqueId}`;
    const email = `candidate_${uniqueId}@gmail.com`;

    const vacancy = await recruitmentPage.selectFirstAvailableDropdownOption('Vacancy');
    await recruitmentPage.addCandidate(firstName, lastName, email, vacancy, dummyResumePath);
    await recruitmentPage.expectSuccessToast();
    logger.info(`R2: Successfully created candidate "${firstName} ${lastName}"`);

    // Verify candidate appears in Candidates list
    await recruitmentPage.navigateToCandidates();
    await recruitmentPage.filterCandidates(vacancy);
    const row = recruitmentPage.getCandidateRowLocator(firstName);
    await expect(row).toBeVisible({ timeout: 20000 });
    logger.info(`R2: Verified candidate "${firstName}" appears in the list.`);
  });

  test('R5, R6 & R8: Candidate pipeline, interview scheduling and filtering @regression', async ({ pageFactory }) => {
    test.setTimeout(180000);
    const recruitmentPage = pageFactory.getRecruitmentPage();
    const uniqueId = Date.now().toString().slice(-6);

    // Step 1: Create a 100% valid vacancy first to prevent pipeline/relationship errors
    const vacancy = await createTestVacancy(recruitmentPage, uniqueId);

    // Step 2: Add a candidate linked to this vacancy
    await recruitmentPage.navigateToCandidates();
    const firstName = `PipeCandidate_${uniqueId}`;
    const lastName = `Test`;
    const email = `pipecand_${uniqueId}@gmail.com`;
    
    await recruitmentPage.addCandidate(firstName, lastName, email, vacancy, dummyResumePath);
    await recruitmentPage.expectSuccessToast();

    // Step 3: R5 - Change status to Shortlisted
    await recruitmentPage.transitionCandidateStatus('Shortlist');
    await recruitmentPage.expectSuccessToast();
    
    let statusText = await recruitmentPage.getCandidateStatusBadgeText();
    expect(statusText).toContain('Shortlisted');
    logger.info('R5: Candidate transitioned to Shortlisted.');

    // Step 4: R6 - Schedule an interview
    const interviewDate = '2026-25-10'; // YYYY-DD-MM format
    await recruitmentPage.scheduleInterview('Automation Technical Interview', 'm', interviewDate);
    await recruitmentPage.expectSuccessToast();

    statusText = await recruitmentPage.getCandidateStatusBadgeText();
    expect(statusText).toContain('Interview Scheduled');
    logger.info('R6: Successfully scheduled interview and status updated to Interview Scheduled.');

    // Step 5: R8 - Filter candidate list by Vacancy, Status and verify result
    await recruitmentPage.navigateToCandidates();
    await recruitmentPage.filterCandidates(vacancy, 'Interview Scheduled');
    
    const row = recruitmentPage.getCandidateRowLocator(firstName);
    await expect(row).toBeVisible({ timeout: 20000 });
    logger.info('R8: Verified filtered candidate appears in list search.');
  });
});
