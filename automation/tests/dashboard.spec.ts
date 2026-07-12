import { test, expect } from '../src/fixtures/auth.fixture';
import { logger } from '../src/utils/logger';

test.describe('OrangeHRM Dashboard Module @dashboard', () => {

  test('D1: All default widgets render on the dashboard @smoke @regression', async ({ authenticatedPage, pageFactory }) => {
    const dashboardPage = pageFactory.getDashboardPage();
    const expectedWidgets = [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
      'Employee Distribution by Location'
    ];

    for (const widget of expectedWidgets) {
      await test.step(`Verify widget "${widget}" is visible`, async () => {
        const isVisible = await dashboardPage.isWidgetVisible(widget);
        expect(isVisible).toBe(true);
      });
    }
    logger.info('D1: Verified all 7 default dashboard widgets render successfully.');
  });

  test('D2: Sidebar menu contains all expected module links and navigate correctly @smoke @regression', async ({ authenticatedPage, pageFactory }) => {
    test.setTimeout(90000);
    const sidebar = pageFactory.getSidebarComponent();
    
    await test.step('Verify sidebar is visible', async () => {
      expect(await sidebar.isSidebarVisible()).toBe(true);
    });

    const modules = [
      { name: 'Admin', urlPattern: /.*\/admin\/viewSystemUsers/ },
      { name: 'PIM', urlPattern: /.*\/pim\/viewEmployeeList/ },
      { name: 'Leave', urlPattern: /.*\/leave\/viewLeaveList/ },
      { name: 'Recruitment', urlPattern: /.*\/recruitment\/viewCandidates/ },
      { name: 'My Info', urlPattern: /.*\/pim\/viewPersonalDetails/ },
      { name: 'Dashboard', urlPattern: /.*\/dashboard\/index/ },
      { name: 'Directory', urlPattern: /.*\/directory\/viewDirectory/ }
    ];

    for (const mod of modules) {
      await test.step(`Navigate to ${mod.name} and verify URL`, async () => {
        if (mod.name === 'Admin') await sidebar.clickAdmin();
        else if (mod.name === 'PIM') await sidebar.clickPim();
        else if (mod.name === 'Leave') await sidebar.clickLeave();
        else if (mod.name === 'Recruitment') await sidebar.clickRecruitment();
        else if (mod.name === 'My Info') await sidebar.clickMyInfo();
        else if (mod.name === 'Dashboard') await sidebar.clickDashboard();
        else if (mod.name === 'Directory') await sidebar.clickDirectory();

        await expect(authenticatedPage).toHaveURL(mod.urlPattern, { timeout: 20000 });
      });
    }
    logger.info('D2: Verified sidebar module links and navigation.');
  });

  test('D3: Quick Launch tiles navigate to the correct pages @regression', async ({ authenticatedPage, pageFactory }) => {
    test.setTimeout(120000);
    const dashboardPage = pageFactory.getDashboardPage();
    const sidebar = pageFactory.getSidebarComponent();

    const tiles = [
      { name: 'Assign Leave', urlPattern: /.*\/leave\/assignLeave/ },
      { name: 'Leave List', urlPattern: /.*\/leave\/viewLeaveList/ },
      { name: 'Timesheets', urlPattern: /.*\/time\/viewEmployeeTimesheet/ },
      { name: 'Apply Leave', urlPattern: /.*\/leave\/applyLeave/ },
      { name: 'My Leave', urlPattern: /.*\/leave\/viewMyLeaveList/ },
      { name: 'My Timesheet', urlPattern: /.*\/time\/viewMyTimesheet/ }
    ];

    for (const tile of tiles) {
      await test.step(`Click Quick Launch "${tile.name}" and verify URL`, async () => {
        // Go to dashboard first
        await sidebar.clickDashboard();
        await dashboardPage.isDashboardLoaded();
        
        await dashboardPage.clickQuickLaunchTile(tile.name);
        await expect(authenticatedPage).toHaveURL(tile.urlPattern, { timeout: 20000 });
      });
    }
    logger.info('D3: Verified all Quick Launch tiles navigation.');
  });

  test('D4: User dropdown exposes correct links and About modal @regression', async ({ authenticatedPage, pageFactory }) => {
    test.setTimeout(60000);
    const dashboardPage = pageFactory.getDashboardPage();

    await test.step('Open user dropdown, click Support and verify redirection', async () => {
      await dashboardPage.clickUserDropdownOption('Support');
      await expect(authenticatedPage).toHaveURL(/.*\/help\/support/, { timeout: 20000 });
    });

    await test.step('Open user dropdown, click Change Password and verify redirection', async () => {
      await dashboardPage.clickUserDropdownOption('Change Password');
      await expect(authenticatedPage).toHaveURL(/.*\/pim\/updatePassword/, { timeout: 20000 });
    });

    await test.step('Open user dropdown, click About and verify About Modal works', async () => {
      await dashboardPage.clickUserDropdownOption('About');
      const isModalVisible = await dashboardPage.verifyAndCloseAboutModal();
      expect(isModalVisible).toBe(true);
    });
    
    logger.info('D4: Verified user dropdown menu options.');
  });

  test('D6: Basic responsive check at reduced viewport @regression', async ({ authenticatedPage, pageFactory }) => {
    await authenticatedPage.setViewportSize({ width: 375, height: 812 }); // iPhone X viewport
    const sidebar = pageFactory.getSidebarComponent();
    const dashboardPage = pageFactory.getDashboardPage();

    await test.step('Verify header/title is visible on mobile view', async () => {
      const isVisible = await dashboardPage.isDashboardLoaded();
      expect(isVisible).toBe(true);
    });
    
    // Reset viewport size
    await authenticatedPage.setViewportSize({ width: 1280, height: 720 });
    logger.info('D6: Verified basic responsive smoke check on dashboard.');
  });
});
