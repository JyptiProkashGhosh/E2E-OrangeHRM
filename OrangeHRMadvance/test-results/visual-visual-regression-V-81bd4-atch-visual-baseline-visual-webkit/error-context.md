# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual\visual-regression.spec.ts >> Visual Regression - UI Components @visual >> PIM employee list should match visual baseline @visual
- Location: tests\visual\visual-regression.spec.ts:55:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: 'Employee List' }) to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary [ref=e4]:
      - navigation "Sidepanel" [ref=e5]:
        - generic [ref=e6]:
          - link "client brand banner" [ref=e7]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e9]
          - text: 
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]:
              - textbox "Search" [ref=e15]
              - button "" [ref=e16] [cursor=pointer]:
                - generic [ref=e17]: 
            - separator [ref=e18]
          - list [ref=e19]:
            - listitem [ref=e20]:
              - link "Admin" [ref=e21]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e24]: Admin
            - listitem [ref=e25]:
              - link "PIM" [ref=e26]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e40]: PIM
            - listitem [ref=e41]:
              - link "Leave" [ref=e42]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e45]: Leave
            - listitem [ref=e46]:
              - link "Time" [ref=e47]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e53]: Time
            - listitem [ref=e54]:
              - link "Recruitment" [ref=e55]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e61]: Recruitment
            - listitem [ref=e62]:
              - link "My Info" [ref=e63]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e69]: My Info
            - listitem [ref=e70]:
              - link "Performance" [ref=e71]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e79]: Performance
            - listitem [ref=e80]:
              - link "Dashboard" [ref=e81]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e84]: Dashboard
            - listitem [ref=e85]:
              - link "Directory" [ref=e86]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e89]: Directory
            - listitem [ref=e90]:
              - link "Maintenance" [ref=e91]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e95]: Maintenance
            - listitem [ref=e96]:
              - link "Claim" [ref=e97]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e100]
                - generic [ref=e104]: Claim
            - listitem [ref=e105]:
              - link "Buzz" [ref=e106]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e109]: Buzz
    - banner [ref=e110]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - text: 
          - heading "Dashboard" [level=6] [ref=e114]
        - link "Upgrade" [ref=e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e117] [cursor=pointer]: Upgrade
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125] [cursor=pointer]:
              - img "profile picture" [ref=e126]
              - paragraph [ref=e127]: Test_7 user
              - generic [ref=e128]: 
      - navigation "Topbar Menu" [ref=e130]:
        - list [ref=e131]:
          - button "" [ref=e133] [cursor=pointer]:
            - generic [ref=e134]: 
  - generic [ref=e135]:
    - generic [ref=e137]:
      - generic [ref=e139]:
        - generic [ref=e141]:
          - generic [ref=e142]: 
          - paragraph [ref=e143]: Time at Work
        - separator [ref=e144]
        - generic [ref=e146]:
          - generic [ref=e147]:
            - img "profile picture" [ref=e149]
            - generic [ref=e150]:
              - paragraph [ref=e151]: Punched Out
              - paragraph [ref=e152]: "Punched Out: Mar 29th at 01:19 PM (GMT 7)"
          - generic [ref=e153]:
            - generic [ref=e154]: 0h 0m Today
            - button "" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: 
          - separator [ref=e157]
          - generic [ref=e158]:
            - generic [ref=e159]:
              - paragraph [ref=e160]: This Week
              - paragraph [ref=e161]: Jun 08 - Jun 14
            - generic [ref=e162]:
              - generic [ref=e163]: 
              - paragraph [ref=e164]: 0h 0m
      - generic [ref=e168]:
        - generic [ref=e170]:
          - generic [ref=e171]: 
          - paragraph [ref=e172]: My Actions
        - separator [ref=e173]
        - generic [ref=e175]:
          - generic [ref=e176]:
            - button [ref=e177] [cursor=pointer]
            - paragraph [ref=e183] [cursor=pointer]: (1) Pending Self Review
          - generic [ref=e184]:
            - button [ref=e185] [cursor=pointer]
            - paragraph [ref=e194] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=e196]:
        - generic [ref=e198]:
          - generic [ref=e199]: 
          - paragraph [ref=e200]: Quick Launch
        - separator [ref=e201]
        - generic [ref=e203]:
          - generic [ref=e204]:
            - button "Assign Leave" [ref=e205] [cursor=pointer]
            - generic "Assign Leave" [ref=e208]:
              - paragraph [ref=e209]: Assign Leave
          - generic [ref=e210]:
            - button "Leave List" [ref=e211] [cursor=pointer]
            - generic "Leave List" [ref=e218]:
              - paragraph [ref=e219]: Leave List
          - generic [ref=e220]:
            - button "Timesheets" [ref=e221] [cursor=pointer]
            - generic "Timesheets" [ref=e227]:
              - paragraph [ref=e228]: Timesheets
          - generic [ref=e229]:
            - button "Apply Leave" [ref=e230] [cursor=pointer]
            - generic "Apply Leave" [ref=e233]:
              - paragraph [ref=e234]: Apply Leave
          - generic [ref=e235]:
            - button "My Leave" [ref=e236] [cursor=pointer]
            - generic "My Leave" [ref=e241]:
              - paragraph [ref=e242]: My Leave
          - generic [ref=e243]:
            - button "My Timesheet" [ref=e244] [cursor=pointer]
            - generic "My Timesheet" [ref=e247]:
              - paragraph [ref=e248]: My Timesheet
      - generic [ref=e250]:
        - generic [ref=e252]:
          - generic [ref=e253]: 
          - paragraph [ref=e254]: Buzz Latest Posts
        - separator [ref=e255]
        - generic [ref=e257]:
          - generic [ref=e258]:
            - generic [ref=e259] [cursor=pointer]:
              - img "profile picture" [ref=e261]
              - generic [ref=e262]:
                - paragraph [ref=e263]: Phong test01
                - paragraph [ref=e264]: 2026-13-06 08:54 AM
            - separator [ref=e265]
            - paragraph [ref=e266]: hello! I'm test
          - generic [ref=e267]:
            - generic [ref=e268] [cursor=pointer]:
              - img "profile picture" [ref=e270]
              - generic [ref=e271]:
                - paragraph [ref=e272]: Test_7 akhil user
                - paragraph [ref=e273]: 2020-08-10 09:08 AM
            - separator [ref=e274]
            - paragraph [ref=e275]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
          - generic [ref=e276]:
            - generic [ref=e277] [cursor=pointer]:
              - img "profile picture" [ref=e279]
              - generic [ref=e280]:
                - paragraph [ref=e281]: Sania Shaheen
                - paragraph [ref=e282]: 2020-08-10 09:08 AM
            - separator [ref=e283]
            - paragraph [ref=e284]: "World Championship: What makes the perfect snooker player? Mark Selby: Robertson has one of the best techniques in the game. It is very, very straight and he fully commits to every single shot he plays. John Higgins: Every shot is repetitive. He always keeps the same technique and cues through the ball bang straight. Barry Hawkins: Robertson is textbook with his grip and has a ramrod solid cue action, delivering it in a straight line. Honourable mentions: Shaun Murphy, Ding Junhui, Jack Lisowski."
          - generic [ref=e285]:
            - generic [ref=e286] [cursor=pointer]:
              - img "profile picture" [ref=e288]
              - generic [ref=e289]:
                - paragraph [ref=e290]: Rebecca Harmony
                - paragraph [ref=e291]: 2020-08-10 09:04 AM
            - separator [ref=e292]
            - paragraph [ref=e293]: Throwback Thursdays!!
            - img [ref=e294]
          - generic [ref=e295]:
            - generic [ref=e296] [cursor=pointer]:
              - img "profile picture" [ref=e298]
              - generic [ref=e299]:
                - paragraph [ref=e300]: Russel Hamilton
                - paragraph [ref=e301]: 2020-08-10 09:03 AM
            - separator [ref=e302]
            - paragraph [ref=e303]: Live SIMPLY Dream BIG Be GREATFULL Give LOVE Laugh LOT.......
      - generic [ref=e305]:
        - generic [ref=e306]:
          - paragraph [ref=e311]: Employees on Leave Today
          - generic [ref=e312] [cursor=pointer]: 
        - separator [ref=e313]
        - generic [ref=e315]:
          - img "No Content" [ref=e316]
          - paragraph [ref=e317]: No Employees are on Leave Today
      - generic [ref=e319]:
        - generic [ref=e321]:
          - generic [ref=e322]: 
          - paragraph [ref=e323]: Employee Distribution by Sub Unit
        - separator [ref=e324]
        - list [ref=e329]:
          - listitem [ref=e330] [cursor=pointer]:
            - generic "Engineering" [ref=e332]
          - listitem [ref=e333] [cursor=pointer]:
            - generic "Human Resources" [ref=e335]
          - listitem [ref=e336] [cursor=pointer]:
            - generic "Administration" [ref=e338]
          - listitem [ref=e339] [cursor=pointer]:
            - generic "Client Services" [ref=e341]
          - listitem [ref=e342] [cursor=pointer]:
            - generic "Unassigned" [ref=e344]
      - generic [ref=e346]:
        - generic [ref=e348]:
          - generic [ref=e349]: 
          - paragraph [ref=e350]: Employee Distribution by Location
        - separator [ref=e351]
        - list [ref=e356]:
          - listitem [ref=e357] [cursor=pointer]:
            - generic "Texas R&D" [ref=e359]
          - listitem [ref=e360] [cursor=pointer]:
            - generic "New York Sales Office" [ref=e362]
          - listitem [ref=e363] [cursor=pointer]:
            - generic "Unassigned" [ref=e365]
    - generic [ref=e366]:
      - paragraph [ref=e367]: OrangeHRM OS 5.8
      - paragraph [ref=e368]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e369]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export abstract class BasePage {
  4  |   readonly page: Page;
  5  | 
  6  |   constructor(page: Page) {
  7  |     this.page = page;
  8  |   }
  9  | 
  10 |   /**
  11 |    * Navigates to a specific path using the configured base URL.
  12 |    */
  13 |   async navigate(path: string): Promise<void> {
  14 |     console.log(`[Navigation] Navigating to: ${path}`);
  15 |     await this.page.goto(path);
  16 |   }
  17 | 
  18 |   /**
  19 |    * Waits for the network to be idle.
  20 |    */
  21 |   async waitForPageLoad(): Promise<void> {
  22 |     await this.page.waitForLoadState('load');
  23 |     await this.page.waitForLoadState('domcontentloaded');
  24 |   }
  25 | 
  26 |   /**
  27 |    * Gets the current page title.
  28 |    */
  29 |   async getTitle(): Promise<string> {
  30 |     return this.page.title();
  31 |   }
  32 | 
  33 |   /**
  34 |    * Takes a full page screenshot and saves it.
  35 |    */
  36 |   async takeScreenshot(name: string): Promise<Buffer> {
  37 |     const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
  38 |     console.log(`[Screenshot] Saving screenshot to: ${screenshotPath}`);
  39 |     return this.page.screenshot({ path: screenshotPath, fullPage: true });
  40 |   }
  41 | 
  42 |   /**
  43 |    * Premium click wrapper with automatic logging and optional click configurations.
  44 |    */
  45 |   async clickElement(locator: Locator, description: string, options?: Parameters<Locator['click']>[0]): Promise<void> {
  46 |     console.log(`[Action] Clicking on: ${description}`);
> 47 |     await locator.waitFor({ state: 'visible' });
     |                   ^ TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  48 |     await locator.click(options);
  49 |   }
  50 | 
  51 |   /**
  52 |    * Premium input filler wrapper with automatic logging and clearing.
  53 |    */
  54 |   async fillInput(locator: Locator, text: string, description: string): Promise<void> {
  55 |     console.log(`[Action] Entering text into: ${description}`);
  56 |     await locator.waitFor({ state: 'visible' });
  57 |     await locator.clear();
  58 |     await locator.fill(text);
  59 |   }
  60 | 
  61 |   /**
  62 |    * Premium wait wrapper for checking visibility.
  63 |    */
  64 |   async waitForElementVisible(locator: Locator, timeout = 10000): Promise<void> {
  65 |     await locator.waitFor({ state: 'visible', timeout });
  66 |   }
  67 | 
  68 |   /**
  69 |    * Waits for the global or form-level loading spinner to disappear.
  70 |    */
  71 |   async waitForLoaderToDisappear(): Promise<void> {
  72 |     const loader = this.page.locator('.oxd-form-loader, .oxd-loading-spinner');
  73 |     // First wait a brief moment for the loader to potentially render/appear
  74 |     await this.page.waitForTimeout(300);
  75 |     // Wait for the loader to be hidden/detached
  76 |     await loader.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {
  77 |       // Ignore if it's already gone or wasn't present
  78 |     });
  79 |   }
  80 | }
  81 | 
```