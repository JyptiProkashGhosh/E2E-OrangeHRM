import { Page, Locator, expect } from '@playwright/test';
import { logger } from '../utils/logger';
import { ScreenshotUtil } from '../utils/screenshot.util';

/**
 * BasePage implementing the core Page Object Model (POM) architecture.
 * Encapsulates common element interactions, state waiters, and browser actions.
 */
export class BasePage {
  public readonly page: Page;
  private readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toastMessage = this.page.locator('.oxd-toast');
  }

  /**
   * Navigate to a path relative to the base URL or absolute URL.
   */
  public async open(path: string): Promise<void> {
    logger.info(`Opening path: ${path}`);
    await this.page.goto(path);
  }

  /**
   * Click an element.
   */
  public async click(selector: string | Locator): Promise<void> {
    await this.waitForLoaderToDisappear();
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    logger.debug(`Clicking element: ${locator.toString()}`);
    await locator.click();
  }

  /**
   * Fill an element input field.
   */
  public async fill(selector: string | Locator, value: string): Promise<void> {
    await this.waitForLoaderToDisappear();
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    logger.debug(`Filling element: ${locator.toString()} with text length ${value.length}`);
    await locator.fill(value);
  }

  /**
   * Clear an element input field.
   */
  public async clear(selector: string | Locator): Promise<void> {
    await this.waitForLoaderToDisappear();
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    logger.debug(`Clearing input element: ${locator.toString()}`);
    await locator.fill('');
  }

  /**
   * Wait for element to be visible in the DOM and viewable.
   */
  public async waitForVisible(selector: string | Locator, timeoutMs: number = 10000): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    logger.debug(`Waiting for visibility of element: ${locator.toString()}`);
    await locator.waitFor({ state: 'visible', timeout: timeoutMs });
  }

  /**
   * Wait for element to be hidden or detached from the DOM.
   */
  public async waitForHidden(selector: string | Locator, timeoutMs: number = 10000): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    logger.debug(`Waiting for hidden state of element: ${locator.toString()}`);
    await locator.waitFor({ state: 'hidden', timeout: timeoutMs });
  }

  /**
   * Waits for the OrangeHRM form loading overlay or spinner to disappear.
   */
  public async waitForLoaderToDisappear(): Promise<void> {
    const loader = this.page.locator('.oxd-form-loader, .oxd-loading-spinner-container');
    const count = await loader.count();
    if (count > 0) {
      logger.debug('BasePage: Form loader/spinner detected, waiting for it to be hidden');
      await loader.first().waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    }
  }

  /**
   * Verify if element is currently visible.
   */
  public async isVisible(selector: string | Locator): Promise<boolean> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    try {
      const visible = await locator.isVisible();
      logger.debug(`Element visibility for ${locator.toString()} is: ${visible}`);
      return visible;
    } catch (e) {
      return false;
    }
  }

  /**
   * Retrieve the inner text of an element.
   */
  public async getText(selector: string | Locator): Promise<string> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    const text = await locator.innerText();
    logger.debug(`Retrieved text: "${text}" from element: ${locator.toString()}`);
    return text.trim();
  }

  /**
   * Capture page screenshot and save in customized folder.
   */
  public async takeScreenshot(name: string): Promise<string> {
    return ScreenshotUtil.capture(this.page, name);
  }

  /**
   * Scroll element into view.
   */
  public async scrollIntoView(selector: string | Locator): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    logger.debug(`Scrolling element into view: ${locator.toString()}`);
    await locator.scrollIntoViewIfNeeded();
  }

  // --- OrangeHRM Custom Generic Helpers ---

  public getFormFieldGroup(labelText: string): Locator {
    return this.page.locator('.oxd-input-group').filter({
      has: this.page.locator('label').filter({ hasText: new RegExp(`^\\s*${labelText}\\s*\\*?\\s*$,?`) })
    });
  }

  /**
   * Fills a standard text input field identified by its label text.
   */
  public async fillFieldByLabel(labelText: string, value: string): Promise<void> {
    const group = this.getFormFieldGroup(labelText);
    const input = group.locator('input').first();
    await this.waitForVisible(input, 15000);
    await this.fill(input, value);
  }

  /**
   * Fills a textarea element identified by its label text.
   */
  public async fillTextareaByLabel(labelText: string, value: string): Promise<void> {
    const group = this.getFormFieldGroup(labelText);
    const textarea = group.locator('textarea').first();
    await this.waitForVisible(textarea, 15000);
    await this.fill(textarea, value);
  }

  /**
   * Handles OrangeHRM's custom div-based select dropdown selection.
   */
  public async selectDropdownOption(labelText: string, optionText: string): Promise<void> {
    logger.debug(`Dropdown: Selecting "${optionText}" under field label "${labelText}"`);
    const group = this.getFormFieldGroup(labelText);
    const dropdownTrigger = group.locator('.oxd-select-text');
    
    await this.waitForVisible(dropdownTrigger, 15000);
    await this.click(dropdownTrigger);

    // Wait for the option list and click the target value
    const optionElement = this.page.getByRole('option', { name: optionText }).first();
    await this.waitForVisible(optionElement, 10000);
    await this.click(optionElement);
  }

  /**
   * Clicks a custom select dropdown and selects the first available non-placeholder option, returning its text.
   */
  public async selectFirstAvailableDropdownOption(labelText: string): Promise<string> {
    const group = this.getFormFieldGroup(labelText);
    const dropdownTrigger = group.locator('.oxd-select-text');
    await this.waitForVisible(dropdownTrigger, 15000);
    await this.click(dropdownTrigger);

    const optionElement = this.page.locator('.oxd-select-option').nth(1);
    await this.waitForVisible(optionElement, 15000);
    const chosenText = await this.getText(optionElement);
    logger.info(`Dropdown: Dynamically selected "${chosenText}" under field label "${labelText}"`);
    await this.click(optionElement);
    return chosenText;
  }

  /**
   * Resolves the autocomplete field (e.g. Employee Name).
   */
  public async selectAutocompleteFirstSuggestion(labelText: string, inputHint: string): Promise<string> {
    logger.debug(`Autocomplete: Typing "${inputHint}" under field label "${labelText}"`);
    const group = this.getFormFieldGroup(labelText);
    const input = group.locator('input[placeholder="Type for hints..."]').first();

    await this.waitForVisible(input, 15000);
    await this.fill(input, inputHint);

    // Wait for dropdown to hydrate in DOM
    const dropdown = this.page.locator('.oxd-autocomplete-dropdown');
    await this.waitForVisible(dropdown, 15000);

    const firstOption = dropdown.locator('.oxd-autocomplete-option').first();
    await this.waitForVisible(firstOption, 15000);
    
    // Ensure the suggestion is loaded and is not "Searching...."
    await expect(firstOption).not.toHaveText('Searching....', { timeout: 15000 });
    
    const chosenName = await this.getText(firstOption);
    logger.info(`Autocomplete: Selecting first suggestion: "${chosenName}"`);
    await this.click(firstOption);
    
    // Wait for dropdown to be hidden
    await expect(dropdown).toBeHidden({ timeout: 10000 });
    
    return chosenName;
  }

  /**
   * Asserts the success of action workflows using web-first retrying assertions.
   */
  public async expectSuccessToast(): Promise<void> {
    await expect(this.toastMessage).toBeVisible({ timeout: 20000 });
    await expect(this.toastMessage).toContainText('Success');
  }

  /**
   * Returns inline validation error warning message (e.g. "Required") under target labels.
   */
  public async getFieldErrorText(labelText: string): Promise<string> {
    const group = this.getFormFieldGroup(labelText);
    const errorTextElement = group.locator('.oxd-input-group__message');
    await this.waitForVisible(errorTextElement, 15000);
    return this.getText(errorTextElement);
  }

  /**
   * Returns inline validation error message for fields without labels (using placeholders).
   */
  public async getPlaceholderFieldErrorText(placeholder: string): Promise<string> {
    const group = this.page.locator(`input[placeholder="${placeholder}"]`).locator('xpath=ancestor::div[contains(@class, "oxd-input-group")][1]');
    const errorTextElement = group.locator('.oxd-input-group__message');
    await this.waitForVisible(errorTextElement, 15000);
    return this.getText(errorTextElement);
  }

  /**
   * Clears a date input field completely by focusing, selecting all, deleting, and filling the value.
   */
  public async fillDateInput(labelText: string, value: string): Promise<void> {
    const group = this.getFormFieldGroup(labelText);
    const input = group.locator('input').first();
    await this.waitForVisible(input, 15000);
    await input.focus();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await input.fill(value);
    
    // Click outside to trigger date change event and validation
    await this.page.locator('label').first().click();
    await this.page.waitForTimeout(500);
  }
}
