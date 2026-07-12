import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class RecruitmentPage extends BasePage {
  // Tabs
  private readonly candidatesTab: Locator;
  private readonly vacanciesTab: Locator;

  // Buttons
  private readonly addButton: Locator;
  private readonly saveButton: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);

    this.candidatesTab = this.page.locator('.oxd-topbar-body-nav-tab-item:has-text("Candidates")');
    this.vacanciesTab = this.page.locator('.oxd-topbar-body-nav-tab-item:has-text("Vacancies")');

    this.addButton = this.page.locator('button:has-text("Add")');
    this.saveButton = this.page.locator('button[type="submit"]');
    this.searchButton = this.page.locator('button[type="submit"]');
  }

  // --- Tab Navigation ---

  public async navigateToCandidates(): Promise<void> {
    logger.info('RecruitmentPage: Navigating to Candidates Tab');
    await this.waitForVisible(this.candidatesTab, 15000);
    await this.click(this.candidatesTab);
    // Force page reload to clear SPA caches and fetch fresh dropdown options
    await this.page.reload();
    await this.page.waitForTimeout(1000);
  }

  public async navigateToVacancies(): Promise<void> {
    logger.info('RecruitmentPage: Navigating to Vacancies Tab');
    await this.waitForVisible(this.vacanciesTab, 15000);
    await this.click(this.vacanciesTab);
    // Force page reload to clear SPA caches and fetch fresh dropdown options
    await this.page.reload();
    await this.page.waitForTimeout(1000);
  }

  // --- Vacancies Methods ---

  public async addVacancy(
    jobTitle: string,
    vacancyName: string,
    hiringManagerHint: string,
    numberOfPositions?: string
  ): Promise<string> {
    logger.info(`RecruitmentPage: Adding vacancy "${vacancyName}"`);
    await this.click(this.addButton);

    await this.fillFieldByLabel('Vacancy Name', vacancyName);
    await this.selectDropdownOption('Job Title', jobTitle);
    
    const managerName = await this.selectAutocompleteFirstSuggestion('Hiring Manager', hiringManagerHint);

    if (numberOfPositions) {
      await this.fillFieldByLabel('Number of Positions', numberOfPositions);
    }

    await this.click(this.saveButton);
    return managerName;
  }

  public async filterVacancies(vacancyName: string): Promise<void> {
    logger.info(`RecruitmentPage: Filtering vacancies by name "${vacancyName}"`);
    await this.selectDropdownOption('Vacancy', vacancyName);
    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);
  }

  // --- Candidates Methods ---

  public async addCandidate(
    firstName: string,
    lastName: string,
    email: string,
    vacancy: string,
    resumeFilePath?: string
  ): Promise<void> {
    logger.info(`RecruitmentPage: Adding candidate "${firstName} ${lastName}"`);
    await this.click(this.addButton);

    // First/Last Name inputs are inside a grouped field row (Employee Full Name structure)
    await this.page.locator('input[placeholder="First Name"]').fill(firstName);
    await this.page.locator('input[placeholder="Last Name"]').fill(lastName);

    await this.selectDropdownOption('Vacancy', vacancy);
    await this.fillFieldByLabel('Email', email);

    if (resumeFilePath) {
      const fileInput = this.page.locator('input[type="file"]');
      await fileInput.setInputFiles(resumeFilePath);
    }

    // Check consent checkbox if present
    const consentCheckbox = this.page.locator('.oxd-checkbox-wrapper .oxd-checkbox-input');
    if (await consentCheckbox.isVisible()) {
      await this.click(consentCheckbox);
    }

    await this.click(this.saveButton);
  }

  public async filterCandidates(vacancyName: string, status?: string): Promise<void> {
    logger.info(`RecruitmentPage: Filtering candidates: vacancy="${vacancyName}", status="${status}"`);
    await this.selectDropdownOption('Vacancy', vacancyName);
    
    if (status) {
      await this.selectDropdownOption('Status', status);
    }
    
    await this.click(this.searchButton);
    await this.page.waitForTimeout(2000);
  }

  public getCandidateRowLocator(info: string): Locator {
    return this.page.locator('.oxd-table-body .oxd-table-card').filter({ hasText: info }).first();
  }

  // --- Candidate Hiring Pipeline & Interview Methods ---

  public async transitionCandidateStatus(actionName: string): Promise<void> {
    logger.info(`RecruitmentPage: Transitioning candidate status via action "${actionName}"`);
    const actionBtn = this.page.locator(`button:has-text("${actionName}")`).first();
    await this.waitForVisible(actionBtn, 15000);
    await this.click(actionBtn);
    
    // Wait for the details form to load by waiting for the submit/save button to become visible and stable
    await this.waitForVisible(this.saveButton, 15000);
    await this.click(this.saveButton);
  }

  public async scheduleInterview(
    interviewTitle: string,
    interviewerHint: string,
    date: string
  ): Promise<void> {
    logger.info(`RecruitmentPage: Scheduling interview "${interviewTitle}"`);
    
    const actionBtn = this.page.locator('button:has-text("Schedule Interview")').first();
    await this.waitForVisible(actionBtn, 15000);
    await this.click(actionBtn);

    // Wait for the form fields to render
    await this.fillFieldByLabel('Interview Title', interviewTitle);
    await this.selectAutocompleteFirstSuggestion('Interviewer', interviewerHint);
    
    // Clear and fill the Date field using robust fillDateInput
    await this.fillDateInput('Date', date);

    await this.click(this.saveButton);
  }

  public async getCandidateStatusBadgeText(): Promise<string> {
    const badge = this.page.locator('.orangehrm-recruitment-statusText, .oxd-text--subtitle-2').first();
    await this.waitForVisible(badge, 15000);
    return this.getText(badge);
  }
}
