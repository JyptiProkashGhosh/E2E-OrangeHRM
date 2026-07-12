export interface SystemUserData {
  userRole: 'Admin' | 'ESS';
  employeeName: string;
  status: 'Enabled' | 'Disabled';
  username: string;
  password: string;
}

export interface JobTitleData {
  title: string;
  description: string;
  note: string;
}

export interface LocationData {
  name: string;
  country: string;
  city: string;
}

export const adminTestData = {
  // Login credentials
  credentials: {
    username: process.env.ADMIN_USERNAME || 'Admin',
    password: process.env.ADMIN_PASSWORD || 'admin123'
  },

  // Valid user details for TC_Admin_001
  newUser: {
    userRole: 'Admin' as const,
    employeeName: 'm', // Input to trigger autocomplete suggestions
    status: 'Enabled' as const,
    username: `admin_user_${Date.now()}`,
    password: 'SecurePassword123!'
  },

  // Search filter options for TC_Admin_002
  searchUser: {
    username: 'Admin',
    userRole: 'Admin' as const
  },

  // Job setup details for TC_Admin_005 / TC_Admin_006
  newJobTitle: {
    title: `QA Lead ${Date.now()}`,
    description: 'Responsible for leading quality assurance activities and test strategy execution.',
    note: 'Temporary automated test entry.'
  },

  // Location details for TC_Admin_007
  newLocation: {
    name: `Austin HQ ${Date.now()}`,
    country: 'United States',
    city: 'Austin'
  }
};
