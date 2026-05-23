/**
 * Test Constants
 * Centralized constants used across all tests
 */

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid credentials",
  REQUIRED_FIELD: "Required",
  INVALID_EMAIL: "Invalid email address",
  USERNAME_EXISTS: "Username already exists",
  PASSWORD_WEAK: "Password is too weak",
};

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  SUCCESSFULLY_SAVED: "Successfully Saved",
  SUCCESSFULLY_DELETED: "Successfully Deleted",
  SUCCESSFULLY_CREATED: "Successfully Created",
  UPDATED: "Successfully Updated",
  RECORD_SAVED: "Record has been Saved",
};

// ============================================================================
// TIMEOUTS (in milliseconds)
// ============================================================================

export const TIMEOUTS = {
  ELEMENT_VISIBLE: 5000,
  ELEMENT_DISABLED: 3000,
  PAGE_LOAD: 10000,
  NAVIGATION: 10000,
  TABLE_LOAD: 10000,
  MODAL_APPEAR: 5000,
  MODAL_CLOSE: 5000,
  API_CALL: 10000,
  SHORT_WAIT: 2000,
  LONG_WAIT: 15000,
};

// ============================================================================
// USER ROLES & CREDENTIALS
// ============================================================================

export const USER_ROLES = {
  ADMIN: "Admin",
  ESS: "ESS User",
  MANAGER: "Manager",
  RECRUITER: "Recruiter",
};

// ============================================================================
// MODULES/MENUS
// ============================================================================

export const MODULES = {
  ADMIN: "Admin",
  RECRUITMENT: "Recruitment",
  PERFORMANCE: "Performance",
  LEAVE: "Leave",
  TIME: "Time",
  RECRUITMENT_PATH: "/web/index.php/recruit",
  ADMIN_PATH: "/web/index.php/admin",
  EMPLOYEE_PATH: "/web/index.php/pim/viewEmployeeList",
  DASHBOARD_PATH: "/web/index.php/dashboard",
};

// ============================================================================
// LOGIN PAGE SELECTORS
// ============================================================================

export const LOGIN_SELECTORS = {
  USERNAME_INPUT: 'input[name="username"]',
  PASSWORD_INPUT: 'input[name="password"]',
  LOGIN_BUTTON: 'button[type="submit"]',
  ERROR_MESSAGE: ".oxd-alert-content",
  REMEMBER_ME: 'input[type="checkbox"]',
};

// ============================================================================
// COMMON SELECTORS
// ============================================================================

export const COMMON_SELECTORS = {
  // Buttons
  ADD_BUTTON: '[class*="orangehrm-add-action"]',
  SAVE_BUTTON: 'button:has-text("Save")',
  CANCEL_BUTTON: 'button:has-text("Cancel")',
  DELETE_BUTTON: 'button:has-text("Delete")',
  EDIT_BUTTON: 'button:has-text("Edit")',
  SUBMIT_BUTTON: 'button[type="submit"]',

  // Alerts & Messages
  SUCCESS_ALERT: '.oxd-toast--success',
  ERROR_ALERT: '.oxd-toast--error',
  WARNING_ALERT: '.oxd-toast--warning',
  INFO_ALERT: '.oxd-toast--info',

  // Forms
  INPUT_FIELD: 'input[type="text"]',
  TEXT_AREA: 'textarea',
  DROPDOWN: '.oxd-select-wrapper',

  // Navigation
  USER_DROPDOWN: '.oxd-userdropdown-tab',
  LOGOUT_BUTTON: '.oxd-userdropdown-menu a:has-text("Logout")',

  // Tables
  TABLE: '.orangehrm-container',
  TABLE_ROWS: 'tbody tr',
  TABLE_CELLS: 'td',
  TABLE_HEADER: 'thead',

  // Loading
  LOADING_SPINNER: '.oxd-loading-spinner',
  PROGRESS_BAR: '.oxd-progress-bar',
};

// ============================================================================
// EMPLOYEE MANAGEMENT SELECTORS
// ============================================================================

export const EMPLOYEE_SELECTORS = {
  FIRST_NAME_FIELD: 'input[name="firstName"]',
  LAST_NAME_FIELD: 'input[name="lastName"]',
  EMPLOYEE_ID_FIELD: 'input[name="employeeId"]',
  EMAIL_FIELD: 'input[type="email"]',
  PHONE_FIELD: 'input[name="phone"]',
  ADD_EMPLOYEE_BUTTON: 'button:has-text("Add")',
  EMPLOYEE_LIST_TABLE: '.orangehrm-container',
  SEARCH_FIELD: 'input[placeholder="Search"]',
};

// ============================================================================
// TEST DATA
// ============================================================================

export const TEST_DATA = {
  VALID_USERNAME: "admin",
  VALID_PASSWORD: "admin123",
  INVALID_USERNAME: "invalid_user",
  INVALID_PASSWORD: "wrong_password",

  EMPLOYEE: {
    firstName: "Test",
    lastName: "Employee",
    email: "test@orangehrm.com",
    phone: "+1-555-0100",
  },

  EMPLOYEE_UPDATED: {
    firstName: "Updated",
    lastName: "Employee",
  },
};

// ============================================================================
// URL PATHS
// ============================================================================

export const URL_PATHS = {
  LOGIN: "/web/index.php/auth/login",
  DASHBOARD: "/web/index.php/dashboard",
  ADMIN: "/web/index.php/admin",
  EMPLOYEE_LIST: "/web/index.php/pim/viewEmployeeList",
  ADD_EMPLOYEE: "/web/index.php/pim/addEmployee",
  RECRUITMENT: "/web/index.php/recruit",
  LEAVE: "/web/index.php/leave",
  TIME: "/web/index.php/time",
};

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION = {
  DEFAULT_ITEMS_PER_PAGE: 50,
  MAX_ITEMS_PER_PAGE: 100,
  FIRST_PAGE: 1,
};

// ============================================================================
// VALIDATION PATTERNS
// ============================================================================

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[0-9]{1,3}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/,
  NUMBERS_ONLY: /^[0-9]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};

// ============================================================================
// STATUS CODES
// ============================================================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// ============================================================================
// ENVIRONMENT-SPECIFIC CONFIG
// ============================================================================

export const ENVIRONMENT_CONFIG = {
  demo: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    username: "Admin",
    password: "admin123",
  },
  dev: {
    baseUrl: process.env.BASE_URL || "http://localhost:8080",
    username: process.env.USER_NAME || "admin",
    password: process.env.PASSWORD || "admin",
  },
};

// ============================================================================
// REPORT SETTINGS
// ============================================================================

export const REPORT_CONFIG = {
  SCREENSHOT_ON_FAILURE: true,
  VIDEO_ON_FAILURE: true,
  TRACE_ON_FAILURE: true,
  SCREENSHOTS_FOLDER: "./screenshots",
  VIDEOS_FOLDER: "./videos",
  REPORT_FOLDER: "./playwright-report",
};

// ============================================================================
// BROWSER SETTINGS
// ============================================================================

export const BROWSER_SETTINGS = {
  WIDTH: 1920,
  HEIGHT: 1080,
  DEVICES: ["chromium", "firefox", "webkit"],
};

/**
 * Get configuration for current environment
 * @param env - Environment name (demo, dev, custom)
 * @returns Environment configuration
 */
export function getEnvironmentConfig(env: string = "demo") {
  return ENVIRONMENT_CONFIG[env as keyof typeof ENVIRONMENT_CONFIG] || ENVIRONMENT_CONFIG.demo;
}

/**
 * Get timeout for specific operation
 * @param operation - Operation name
 * @returns Timeout in milliseconds
 */
export function getTimeout(operation: keyof typeof TIMEOUTS): number {
  return TIMEOUTS[operation];
}

/**
 * Get success message
 * @param operation - Operation name
 * @returns Success message text
 */
export function getSuccessMessage(operation: keyof typeof SUCCESS_MESSAGES): string {
  return SUCCESS_MESSAGES[operation];
}

/**
 * Get error message
 * @param error - Error type
 * @returns Error message text
 */
export function getErrorMessage(error: keyof typeof ERROR_MESSAGES): string {
  return ERROR_MESSAGES[error];
}
