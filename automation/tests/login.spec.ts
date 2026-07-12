import { test, expect } from '../src/fixtures/auth.fixture';
import { logger } from '../src/utils/logger';

// Reset authentication state for login tests to run unauthenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('OrangeHRM Authentication - Login & Logout Flows', () => {
  
  test.beforeEach(async ({ pageFactory }) => {
    const loginPage = pageFactory.getLoginPage();
    await loginPage.navigateToLogin();
  });

  test('Verify all expected elements load on the login page (LOGIN-P02)', async ({ pageFactory }) => {
    const loginPage = pageFactory.getLoginPage();
    
    // Assert visual elements visibility
    await expect(loginPage.getUsernameInputLocator()).toBeVisible();
    await expect(loginPage.getPasswordInputLocator()).toBeVisible();
    await expect(loginPage.getLoginButtonLocator()).toBeVisible();
    await expect(loginPage.getForgotPasswordLocator()).toBeVisible();
    
    logger.info('LOGIN-P02: Verified login page layout elements are visible.');
  });

  test('Successful login with valid credentials (LOGIN-P01)', async ({ pageFactory, adminUser }) => {
    const loginPage = pageFactory.getLoginPage();
    await loginPage.login(adminUser.username || '', adminUser.password || '');

    const dashboardPage = pageFactory.getDashboardPage();
    const isLoaded = await dashboardPage.isDashboardLoaded();
    expect(isLoaded).toBe(true);

    const headerTitle = await dashboardPage.getHeaderTitle();
    expect(headerTitle).toBe('Dashboard');
    
    logger.info('LOGIN-P01: Successful login verified with header title.');
  });

  test('Login submitted via the Enter key (LOGIN-P05)', async ({ pageFactory, adminUser }) => {
    const loginPage = pageFactory.getLoginPage();
    await loginPage.loginWithEnter(adminUser.username || '', adminUser.password || '');

    const dashboardPage = pageFactory.getDashboardPage();
    const isLoaded = await dashboardPage.isDashboardLoaded();
    expect(isLoaded).toBe(true);
    
    logger.info('LOGIN-P05: Successful login via Enter key verified.');
  });

  // Parameterized Data-Driven array for negative login scenarios
  const negativeScenarios = [
    {
      id: 'LOGIN-N01',
      description: 'Invalid username + valid password',
      username: 'InvalidUser',
      password: 'admin123',
      expectedError: 'Invalid credentials',
      errorType: 'banner'
    },
    {
      id: 'LOGIN-N02',
      description: 'Valid username + invalid password',
      username: 'Admin',
      password: 'wrongPassword',
      expectedError: 'Invalid credentials',
      errorType: 'banner'
    },
    {
      id: 'LOGIN-N03',
      description: 'Both invalid username and password',
      username: 'InvalidUser',
      password: 'wrongPassword',
      expectedError: 'Invalid credentials',
      errorType: 'banner'
    },
    {
      id: 'LOGIN-N04',
      description: 'Empty username & password - verify inline validation',
      username: '',
      password: '',
      expectedError: 'Required',
      errorType: 'inline-both'
    },
    {
      id: 'LOGIN-N05',
      description: 'Empty username only',
      username: '',
      password: 'admin123',
      expectedError: 'Required',
      errorType: 'inline-username'
    },
    {
      id: 'LOGIN-N06',
      description: 'Empty password only',
      username: 'Admin',
      password: '',
      expectedError: 'Required',
      errorType: 'inline-password'
    },
    {
      id: 'LOGIN-N08',
      description: 'Case-sensitive password failure',
      username: 'Admin',
      password: 'ADMIN123',
      expectedError: 'Invalid credentials',
      errorType: 'banner'
    },
    {
      id: 'LOGIN-N10',
      description: 'SQL injection payload in username',
      username: "' OR '1'='1",
      password: 'admin123',
      expectedError: 'Invalid credentials',
      errorType: 'banner'
    },
    {
      id: 'LOGIN-N11',
      description: 'XSS script payload in username',
      username: '<script>alert(1)</script>',
      password: 'admin123',
      expectedError: 'Invalid credentials',
      errorType: 'banner'
    }
  ];

  negativeScenarios.forEach((scenario) => {
    test(`Negative Login: ${scenario.description} (${scenario.id})`, async ({ pageFactory }) => {
      const loginPage = pageFactory.getLoginPage();
      
      // Perform attempt
      await loginPage.login(scenario.username, scenario.password);
      
      // Assertions based on type
      if (scenario.errorType === 'banner') {
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toBe(scenario.expectedError);
      } else if (scenario.errorType === 'inline-both') {
        const userErr = await loginPage.getFieldValidationError('Username');
        const passErr = await loginPage.getFieldValidationError('Password');
        expect(userErr).toBe(scenario.expectedError);
        expect(passErr).toBe(scenario.expectedError);
      } else if (scenario.errorType === 'inline-username') {
        const userErr = await loginPage.getFieldValidationError('Username');
        expect(userErr).toBe(scenario.expectedError);
      } else if (scenario.errorType === 'inline-password') {
        const passErr = await loginPage.getFieldValidationError('Password');
        expect(passErr).toBe(scenario.expectedError);
      }
      
      logger.info(`Verified negative scenario ${scenario.id} successfully.`);
    });
  });
});

test.describe('OrangeHRM Authentication - Logout & Security', () => {

  test('Successful logout via the user dropdown menu (LOGOUT-P01)', async ({ authenticatedPage, pageFactory }) => {
    const dashboardPage = pageFactory.getDashboardPage();
    await dashboardPage.logout();

    // Verify redirected back to login page
    const loginPage = pageFactory.getLoginPage();
    await expect(loginPage.getLoginButtonLocator()).toBeVisible();
    expect(authenticatedPage.url()).toContain('/auth/login');
    
    logger.info('LOGOUT-P01: Successfully logged out and verified login page redirection.');
  });

  test('Attempt direct navigation to dashboard while logged out (LOGIN-N15 / LOGOUT-P02)', async ({ page }) => {
    logger.info('LOGIN-N15: Attempting unauthorized navigation to dashboard index');
    await page.goto('/web/index.php/dashboard/index');
    
    // Assert redirect back to login page
    await expect(page).toHaveURL(/.*\/auth\/login/);
    logger.info('LOGIN-N15: Verified redirection back to login screen.');
  });
});
