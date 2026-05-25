import { Locator, Page, expect } from "@playwright/test";

/**
 * Assert that an element is visible
 * @param locator - The element to assert
 * @param message - Optional custom error message
 */
export async function assertElementVisible(
  locator: Locator,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toBeVisible();
  } else {
    expect(locator).toBeVisible();
  }
}

/**
 * Assert that an element is hidden
 * @param locator - The element to assert
 * @param message - Optional custom error message
 */
export async function assertElementHidden(
  locator: Locator,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toBeHidden();
  } else {
    expect(locator).toBeHidden();
  }
}

/**
 * Assert that an element is enabled
 * @param locator - The element to assert
 * @param message - Optional custom error message
 */
export async function assertElementEnabled(
  locator: Locator,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toBeEnabled();
  } else {
    expect(locator).toBeEnabled();
  }
}

/**
 * Assert that an element is disabled
 * @param locator - The element to assert
 * @param message - Optional custom error message
 */
export async function assertElementDisabled(
  locator: Locator,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toBeDisabled();
  } else {
    expect(locator).toBeDisabled();
  }
}

/**
 * Assert that an element contains specific text
 * @param locator - The element to assert
 * @param text - The text that should be present
 * @param message - Optional custom error message
 */
export async function assertTextPresent(
  locator: Locator,
  text: string,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toContainText(text);
  } else {
    expect(locator).toContainText(text);
  }
}

/**
 * Assert that an element does NOT contain specific text
 * @param locator - The element to assert
 * @param text - The text that should NOT be present
 * @param message - Optional custom error message
 */
export async function assertTextNotPresent(
  locator: Locator,
  text: string,
  message?: string
): Promise<void> {
  const content = await locator.textContent();

  if (message) {
    expect(content, message).not.toContain(text);
  } else {
    expect(content).not.toContain(text);
  }
}

/**
 * Assert error message is displayed
 * @param locator - The error element
 * @param expectedError - The expected error text
 * @param message - Optional custom error message
 */
export async function assertErrorMessage(
  locator: Locator,
  expectedError: string,
  message?: string
): Promise<void> {
  await assertElementVisible(locator);
  await assertTextPresent(
    locator,
    expectedError,
    message || `Expected error message: ${expectedError}`
  );
}

/**
 * Assert success message is displayed
 * @param locator - The success element
 * @param expectedMessage - The expected success message
 * @param message - Optional custom error message
 */
export async function assertSuccessMessage(
  locator: Locator,
  expectedMessage: string,
  message?: string
): Promise<void> {
  await assertElementVisible(locator);
  await assertTextPresent(
    locator,
    expectedMessage,
    message || `Expected success message: ${expectedMessage}`
  );
}

/**
 * Assert element has specific attribute value
 * @param locator - The element to assert
 * @param attribute - The attribute name
 * @param value - The expected attribute value
 * @param message - Optional custom error message
 */
export async function assertAttributeValue(
  locator: Locator,
  attribute: string,
  value: string,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toHaveAttribute(attribute, value);
  } else {
    expect(locator).toHaveAttribute(attribute, value);
  }
}

/**
 * Assert element has specific class
 * @param locator - The element to assert
 * @param className - The class name
 * @param message - Optional custom error message
 */
export async function assertHasClass(
  locator: Locator,
  className: string,
  message?: string
): Promise<void> {
  const classes = await locator.getAttribute("class");

  if (message) {
    expect(classes, message).toContain(className);
  } else {
    expect(classes).toContain(className);
  }
}

/**
 * Assert page has specific title
 * @param page - The page object
 * @param expectedTitle - The expected page title
 * @param message - Optional custom error message
 */
export async function assertPageTitle(
  page: Page,
  expectedTitle: string,
  message?: string
): Promise<void> {
  if (message) {
    expect(page, message).toHaveTitle(expectedTitle);
  } else {
    expect(page).toHaveTitle(expectedTitle);
  }
}

/**
 * Assert page has specific URL
 * @param page - The page object
 * @param expectedUrl - The expected URL (string or regex)
 * @param message - Optional custom error message
 */
export async function assertPageURL(
  page: Page,
  expectedUrl: string | RegExp,
  message?: string
): Promise<void> {
  if (message) {
    expect(page, message).toHaveURL(expectedUrl);
  } else {
    expect(page).toHaveURL(expectedUrl);
  }
}

/**
 * Assert collection has specific count
 * @param locator - The collection locator
 * @param expectedCount - The expected count
 * @param message - Optional custom error message
 */
export async function assertElementCount(
  locator: Locator,
  expectedCount: number,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toHaveCount(expectedCount);
  } else {
    expect(locator).toHaveCount(expectedCount);
  }
}

/**
 * Assert element is checked
 * @param locator - The checkbox/radio element
 * @param message - Optional custom error message
 */
export async function assertElementChecked(
  locator: Locator,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toBeChecked();
  } else {
    expect(locator).toBeChecked();
  }
}

/**
 * Assert element is NOT checked
 * @param locator - The checkbox/radio element
 * @param message - Optional custom error message
 */
export async function assertElementNotChecked(
  locator: Locator,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).not.toBeChecked();
  } else {
    expect(locator).not.toBeChecked();
  }
}

/**
 * Assert input field has specific value
 * @param locator - The input element
 * @param expectedValue - The expected value
 * @param message - Optional custom error message
 */
export async function assertInputValue(
  locator: Locator,
  expectedValue: string,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toHaveValue(expectedValue);
  } else {
    expect(locator).toHaveValue(expectedValue);
  }
}

/**
 * Assert element is in focus
 * @param locator - The element to assert
 * @param message - Optional custom error message
 */
export async function assertElementFocused(
  locator: Locator,
  message?: string
): Promise<void> {
  if (message) {
    expect(locator, message).toBeFocused();
  } else {
    expect(locator).toBeFocused();
  }
}

/**
 * Assert two locators have same text
 * @param locator1 - First element
 * @param locator2 - Second element
 * @param message - Optional custom error message
 */
export async function assertElementsHaveSameText(
  locator1: Locator,
  locator2: Locator,
  message?: string
): Promise<void> {
  const text1 = await locator1.textContent();
  const text2 = await locator2.textContent();

  if (message) {
    expect(text1, message).toBe(text2);
  } else {
    expect(text1).toBe(text2);
  }
}

/**
 * Assert element has specific CSS property value
 * @param locator - The element to assert
 * @param property - The CSS property name
 * @param value - The expected value
 * @param message - Optional custom error message
 */
export async function assertCSSProperty(
  locator: Locator,
  property: string,
  value: string,
  message?: string
): Promise<void> {
  const actualValue = await locator.evaluate(
    (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
    property
  );

  if (message) {
    expect(actualValue.trim(), message).toBe(value);
  } else {
    expect(actualValue.trim()).toBe(value);
  }
}
