import dotenv from 'dotenv';

// Load environment variables from .env.local or .env.example
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.example' });

export const TestData = {
  // URLs
  urls: {
    login: '/web/index.php/auth/login',
    dashboard: '/web/index.php/dashboard/index',
    pim: '/web/index.php/pim/viewEmployeeList',
  },

  // Credentials - loaded from environment variables
  auth: {
    adminUsername: process.env.ADMIN_USERNAME || 'Admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    invalidUsername: process.env.INVALID_USERNAME || 'WrongAdmin',
    invalidPassword: process.env.INVALID_PASSWORD || 'wrongPassword123',
  },

  // Constants - loaded from environment variables
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '15000', 10),
  actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '30000', 10),
  navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '60000', 10),
};
