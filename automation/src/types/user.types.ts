export type UserRole = 'Admin' | 'User' | 'ESS';

export interface UserCredentials {
  username: string;
  password?: string;
  role: UserRole;
}

export interface UserProfile {
  username: string;
  employeeName: string;
  status: 'Enabled' | 'Disabled';
  role: UserRole;
  createdAt?: string;
}
