import { Locator, Page } from "@playwright/test";

/**
 * Wait for an element to be visible
 * @param locator - The element to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 */
export async function waitForElement(
  locator: Locator,
  timeout: number = 5000
): Promise<void> {
  await locator.waitFor({ state: "visible", timeout });
}

/**
 * Wait for an element to disappear/be hidden
 * @param locator - The element to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 */
export async function waitForElementToDisappear(
  locator: Locator,
  timeout: number = 5000
): Promise<void> {
  await locator.waitFor({ state: "hidden", timeout });
}

/**
 * Wait for a navigation event after an action
 * @param page - The page object
 * @param action - The action that triggers navigation
 * @param timeout - Maximum time to wait in milliseconds (default: 10000)
 */
export async function waitForNavigation(
  page: Page,
  action: () => Promise<void>,
  timeout: number = 10000
): Promise<void> {
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle", timeout }),
    action(),
  ]);
}

/**
 * Wait for a table to load with data
 * @param tableLocator - The table element
 * @param timeout - Maximum time to wait in milliseconds (default: 10000)
 */
export async function waitForTable(
  tableLocator: Locator,
  timeout: number = 10000
): Promise<void> {
  await tableLocator.waitFor({ state: "visible", timeout });

  // Wait for rows to load
  const rowsLocator = tableLocator.locator("tbody tr");
  await rowsLocator.first().waitFor({ state: "visible", timeout });
}

/**
 * Wait for a custom condition to be true
 * @param condition - Async function that returns boolean
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 * @param checkInterval - How often to check in milliseconds (default: 100)
 */
export async function waitForCondition(
  condition: () => Promise<boolean>,
  timeout: number = 5000,
  checkInterval: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (true) {
    try {
      const result = await condition();
      if (result) {
        return;
      }
    } catch (error) {
      // Ignore errors during condition check
    }

    if (Date.now() - startTime > timeout) {
      throw new Error(`Condition not met within ${timeout}ms`);
    }

    await new Promise((resolve) => setTimeout(resolve, checkInterval));
  }
}

/**
 * Wait for an element to contain specific text
 * @param locator - The element to check
 * @param text - The text to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 */
export async function waitForText(
  locator: Locator,
  text: string,
  timeout: number = 5000
): Promise<void> {
  await locator.waitFor({ state: "visible", timeout });

  await waitForCondition(
    async () => {
      const content = await locator.textContent();
      return content?.includes(text) ?? false;
    },
    timeout
  );
}

/**
 * Wait for element to be enabled/interactive
 * @param locator - The element to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 */
export async function waitForElementEnabled(
  locator: Locator,
  timeout: number = 5000
): Promise<void> {
  await locator.waitFor({ state: "visible", timeout });

  await waitForCondition(
    async () => {
      return await locator.isEnabled();
    },
    timeout
  );
}

/**
 * Wait for page to be ready (network idle)
 * @param page - The page object
 * @param timeout - Maximum time to wait in milliseconds (default: 10000)
 */
export async function waitForPageReady(
  page: Page,
  timeout: number = 10000
): Promise<void> {
  await page.waitForLoadState("networkidle", { timeout });
}

/**
 * Wait for a list/collection to have items
 * @param locator - The collection locator
 * @param minCount - Minimum number of items to wait for (default: 1)
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 */
export async function waitForCollectionNotEmpty(
  locator: Locator,
  minCount: number = 1,
  timeout: number = 5000
): Promise<void> {
  await waitForCondition(
    async () => {
      const count = await locator.count();
      return count >= minCount;
    },
    timeout
  );
}

/**
 * Wait for element to have a specific count
 * @param locator - The element collection
 * @param expectedCount - Expected count of elements
 * @param timeout - Maximum time to wait in milliseconds (default: 5000)
 */
export async function waitForElementCount(
  locator: Locator,
  expectedCount: number,
  timeout: number = 5000
): Promise<void> {
  await waitForCondition(
    async () => {
      const count = await locator.count();
      return count === expectedCount;
    },
    timeout
  );
}

/**
 * Wait for URL to match pattern
 * @param page - The page object
 * @param urlPattern - URL pattern or string
 * @param timeout - Maximum time to wait in milliseconds (default: 10000)
 */
export async function waitForURL(
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 10000
): Promise<void> {
  await page.waitForURL(urlPattern, { timeout });
}
