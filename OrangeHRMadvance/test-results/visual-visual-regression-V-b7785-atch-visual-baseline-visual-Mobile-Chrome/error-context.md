# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual\visual-regression.spec.ts >> Visual Regression - UI Components @visual >> Admin module page should match visual baseline @visual
- Location: tests\visual\visual-regression.spec.ts:45:7

# Error details

```
TypeError: adminPage.navigateToUserManagement is not a function
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary:
      - navigation "Sidepanel":
        - generic:
          - link "client brand banner" [ref=e4] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e6]
          - generic [ref=e7] [cursor=pointer]: 
        - generic:
          - generic [ref=e8]:
            - generic [ref=e9]:
              - textbox "Search" [ref=e12]
              - text: 
            - separator
          - list [ref=e13]:
            - listitem:
              - link "Admin" [ref=e14] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e17]: Admin
            - listitem:
              - link "PIM" [ref=e18] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e32]: PIM
            - listitem:
              - link "Leave" [ref=e33] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e36]: Leave
            - listitem:
              - link "Time" [ref=e37] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e43]: Time
            - listitem:
              - link "Recruitment" [ref=e44] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e50]: Recruitment
            - listitem:
              - link "My Info" [ref=e51] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e57]: My Info
            - listitem:
              - link "Performance" [ref=e58] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e66]: Performance
            - listitem:
              - link "Dashboard" [ref=e67] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e70]: Dashboard
            - listitem:
              - link "Directory" [ref=e71] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e74]: Directory
            - listitem:
              - link "Maintenance" [ref=e75] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e79]: Maintenance
            - listitem:
              - link "Claim" [ref=e80] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e83]
                - generic [ref=e87]: Claim
            - listitem:
              - link "Buzz" [ref=e88] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e91]: Buzz
    - banner [ref=e92]:
      - generic [ref=e93]:
        - generic [ref=e94]:
          - generic [ref=e95] [cursor=pointer]: 
          - heading "Dashboard" [level=6] [ref=e97]
        - link "Upgrade" [ref=e99]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e100] [cursor=pointer]: Upgrade
        - list [ref=e106]:
          - listitem [ref=e107]:
            - generic [ref=e108] [cursor=pointer]:
              - img "profile picture" [ref=e109]
              - generic [ref=e110]: 
      - navigation "Topbar Menu" [ref=e112]:
        - list [ref=e113]:
          - button "" [ref=e115] [cursor=pointer]:
            - generic [ref=e116]: 
  - generic [ref=e117]:
    - generic [ref=e119]:
      - generic [ref=e121]:
        - generic [ref=e123]:
          - generic [ref=e124]: 
          - paragraph [ref=e125]: Time at Work
        - separator [ref=e126]
        - generic [ref=e128]:
          - generic [ref=e129]:
            - img "profile picture" [ref=e131]
            - generic [ref=e132]:
              - paragraph [ref=e133]: Punched Out
              - paragraph [ref=e134]: "Punched Out: Today at 06:47 AM (GMT 3)"
          - generic [ref=e135]:
            - generic [ref=e136]: 0h 0m Today
            - button "" [ref=e137] [cursor=pointer]:
              - generic [ref=e138]: 
          - separator [ref=e139]
          - generic [ref=e140]:
            - generic [ref=e141]:
              - paragraph [ref=e142]: This Week
              - paragraph [ref=e143]: Jun 08 - Jun 14
            - generic [ref=e144]:
              - generic [ref=e145]: 
              - paragraph [ref=e146]: 0h 0m
      - generic [ref=e150]:
        - generic [ref=e152]:
          - generic [ref=e153]: 
          - paragraph [ref=e154]: My Actions
        - separator [ref=e155]
        - generic [ref=e157]:
          - generic [ref=e158]:
            - button [ref=e159] [cursor=pointer]
            - paragraph [ref=e165] [cursor=pointer]: (1) Pending Self Review
          - generic [ref=e166]:
            - button [ref=e167] [cursor=pointer]
            - paragraph [ref=e176] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=e178]:
        - generic [ref=e180]:
          - generic [ref=e181]: 
          - paragraph [ref=e182]: Quick Launch
        - separator [ref=e183]
        - generic [ref=e185]:
          - generic [ref=e186]:
            - button "Assign Leave" [ref=e187] [cursor=pointer]
            - generic "Assign Leave" [ref=e190]:
              - paragraph [ref=e191]: Assign Leave
          - generic [ref=e192]:
            - button "Leave List" [ref=e193] [cursor=pointer]
            - generic "Leave List" [ref=e200]:
              - paragraph [ref=e201]: Leave List
          - generic [ref=e202]:
            - button "Timesheets" [ref=e203] [cursor=pointer]
            - generic "Timesheets" [ref=e209]:
              - paragraph [ref=e210]: Timesheets
          - generic [ref=e211]:
            - button "Apply Leave" [ref=e212] [cursor=pointer]
            - generic "Apply Leave" [ref=e215]:
              - paragraph [ref=e216]: Apply Leave
          - generic [ref=e217]:
            - button "My Leave" [ref=e218] [cursor=pointer]
            - generic "My Leave" [ref=e223]:
              - paragraph [ref=e224]: My Leave
          - generic [ref=e225]:
            - button "My Timesheet" [ref=e226] [cursor=pointer]
            - generic "My Timesheet" [ref=e229]:
              - paragraph [ref=e230]: My Timesheet
      - generic [ref=e232]:
        - generic [ref=e234]:
          - generic [ref=e235]: 
          - paragraph [ref=e236]: Buzz Latest Posts
        - separator [ref=e237]
        - generic [ref=e239]:
          - generic [ref=e240]:
            - generic [ref=e241] [cursor=pointer]:
              - img "profile picture" [ref=e243]
              - generic [ref=e244]:
                - paragraph [ref=e245]: Phong test01
                - paragraph [ref=e246]: 2026-13-06 08:54 AM
            - separator [ref=e247]
            - paragraph [ref=e248]: hello! I'm test
          - generic [ref=e249]:
            - generic [ref=e250] [cursor=pointer]:
              - img "profile picture" [ref=e252]
              - generic [ref=e253]:
                - paragraph [ref=e254]: Test_7 akhil user
                - paragraph [ref=e255]: 2020-08-10 09:08 AM
            - separator [ref=e256]
            - paragraph [ref=e257]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
          - generic [ref=e258]:
            - generic [ref=e259] [cursor=pointer]:
              - img "profile picture" [ref=e261]
              - generic [ref=e262]:
                - paragraph [ref=e263]: Sania Shaheen
                - paragraph [ref=e264]: 2020-08-10 09:08 AM
            - separator [ref=e265]
            - paragraph [ref=e266]: "World Championship: What makes the perfect snooker player? Mark Selby: Robertson has one of the best techniques in the game. It is very, very straight and he fully commits to every single shot he plays. John Higgins: Every shot is repetitive. He always keeps the same technique and cues through the ball bang straight. Barry Hawkins: Robertson is textbook with his grip and has a ramrod solid cue action, delivering it in a straight line. Honourable mentions: Shaun Murphy, Ding Junhui, Jack Lisowski."
          - generic [ref=e267]:
            - generic [ref=e268] [cursor=pointer]:
              - img "profile picture" [ref=e270]
              - generic [ref=e271]:
                - paragraph [ref=e272]: Rebecca Harmony
                - paragraph [ref=e273]: 2020-08-10 09:04 AM
            - separator [ref=e274]
            - paragraph [ref=e275]: Throwback Thursdays!!
            - img [ref=e276]
          - generic [ref=e277]:
            - generic [ref=e278] [cursor=pointer]:
              - img "profile picture" [ref=e280]
              - generic [ref=e281]:
                - paragraph [ref=e282]: Russel Hamilton
                - paragraph [ref=e283]: 2020-08-10 09:03 AM
            - separator [ref=e284]
            - paragraph [ref=e285]: Live SIMPLY Dream BIG Be GREATFULL Give LOVE Laugh LOT.......
      - generic [ref=e287]:
        - generic [ref=e288]:
          - paragraph [ref=e293]: Employees on Leave Today
          - generic [ref=e294] [cursor=pointer]: 
        - separator [ref=e295]
        - generic [ref=e297]:
          - img "No Content" [ref=e298]
          - paragraph [ref=e299]: No Employees are on Leave Today
      - generic [ref=e301]:
        - generic [ref=e303]:
          - generic [ref=e304]: 
          - paragraph [ref=e305]: Employee Distribution by Sub Unit
        - separator [ref=e306]
        - list [ref=e311]:
          - listitem [ref=e312] [cursor=pointer]:
            - generic "Engineering" [ref=e314]
          - listitem [ref=e315] [cursor=pointer]:
            - generic "Human Resources" [ref=e317]
          - listitem [ref=e318] [cursor=pointer]:
            - generic "Administration" [ref=e320]
          - listitem [ref=e321] [cursor=pointer]:
            - generic "Client Services" [ref=e323]
          - listitem [ref=e324] [cursor=pointer]:
            - generic "Unassigned" [ref=e326]
      - generic [ref=e328]:
        - generic [ref=e330]:
          - generic [ref=e331]: 
          - paragraph [ref=e332]: Employee Distribution by Location
        - separator [ref=e333]
        - list [ref=e338]:
          - listitem [ref=e339] [cursor=pointer]:
            - generic "Texas R&D" [ref=e341]
          - listitem [ref=e342] [cursor=pointer]:
            - generic "New York Sales Office" [ref=e344]
          - listitem [ref=e345] [cursor=pointer]:
            - generic "Unassigned" [ref=e347]
    - generic [ref=e348]:
      - paragraph [ref=e349]: OrangeHRM OS 5.8
      - paragraph [ref=e350]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e351] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | import { test } from '../../src/fixtures/auth.fixture';
  2  | import { percySnapshot } from '@percy/playwright';
  3  | 
  4  | /**
  5  |  * Visual Regression Tests
  6  |  * These tests capture visual snapshots of key UI elements to detect unintended visual changes
  7  |  * Requires PERCY_TOKEN environment variable to be set
  8  |  * Run with: npx percy exec -- npx playwright test tests/visual/visual-regression.spec.ts
  9  |  */
  10 | test.describe('Visual Regression - UI Components @visual', () => {
  11 |   test.beforeEach(async ({ page, dashboardPage }) => {
  12 |     // Ensure we're logged in
  13 |     await page.goto('/web/index.php/dashboard/index', { waitUntil: 'networkidle' });
  14 |   });
  15 | 
  16 |   test('Dashboard page should match visual baseline @visual @smoke', async ({
  17 |     page,
  18 |   }) => {
  19 |     // Wait for page to fully load
  20 |     await page.waitForLoadState('networkidle');
  21 |     // Wait for any animations to complete
  22 |     await page.waitForTimeout(500);
  23 |     // Capture the full page screenshot
  24 |     await percySnapshot(page, 'Dashboard - Full Page');
  25 |   });
  26 | 
  27 |   test('Login form should match visual baseline @visual', async ({ loginPage, page }) => {
  28 |     await loginPage.goto();
  29 |     await page.waitForLoadState('networkidle');
  30 |     await page.waitForTimeout(500);
  31 |     await percySnapshot(page, 'Login Form');
  32 |   });
  33 | 
  34 |   test('Dashboard sidebar navigation should match visual baseline @visual', async ({
  35 |     page,
  36 |   }) => {
  37 |     // Take snapshot of just the sidebar
  38 |     const sidebar = page.locator('[class*="sidebar"]').first();
  39 |     await sidebar.waitFor({ state: 'visible' });
  40 |     await percySnapshot(page, 'Dashboard Sidebar', {
  41 |       scope: sidebar,
  42 |     });
  43 |   });
  44 | 
  45 |   test('Admin module page should match visual baseline @visual', async ({
  46 |     adminPage,
  47 |     page,
  48 |   }) => {
> 49 |     await adminPage.navigateToUserManagement();
     |                     ^ TypeError: adminPage.navigateToUserManagement is not a function
  50 |     await page.waitForLoadState('networkidle');
  51 |     await page.waitForTimeout(500);
  52 |     await percySnapshot(page, 'Admin - User Management');
  53 |   });
  54 | 
  55 |   test('PIM employee list should match visual baseline @visual', async ({
  56 |     pimPage,
  57 |     page,
  58 |   }) => {
  59 |     await pimPage.navigateToEmployeeList();
  60 |     await page.waitForLoadState('networkidle');
  61 |     await page.waitForTimeout(500);
  62 |     await percySnapshot(page, 'PIM - Employee List');
  63 |   });
  64 | });
  65 | 
```