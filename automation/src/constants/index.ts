export const ROUTES = {
  LOGIN: '/',
  DASHBOARD: '/',
  EMPLOYEES: '/',
  SETTINGS: '/',
};

export const API_ENDPOINTS = {
  LOGIN: '/posts',
  USERS: '/users',
  EMPLOYEES: '/posts',
};

export const ROLES = {
  ADMIN: 'Admin' as const,
  USER: 'User' as const,
  MANAGER: 'Manager' as const,
};

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
};
