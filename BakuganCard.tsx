export interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  wins: number;
  losses: number;
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
