import { apiClient } from '../../shared/api/client';
import { getApiErrorMessage } from '../../shared/api/errors';
import { User, LoginCredentials } from './types';

export const loginUser = async (credentials: LoginCredentials): Promise<Omit<User, 'password'> | null> => {
  try {
    const response = await apiClient.get<User[]>('/users', {
      params: { username: credentials.username.trim() }
    });

    const users = response.data;
    const user = users.find(
      (u) => u.username === credentials.username.trim() && u.password === credentials.password
    );

    if (!user) return null;

    const { password: _password, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Neizdevās ielādēt lietotāja datus.'));
  }
};
