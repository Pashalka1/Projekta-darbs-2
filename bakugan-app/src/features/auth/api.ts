import axios from 'axios';
import { User, LoginCredentials } from './types';

const BASE_URL = 'http://localhost:3001';

export const loginUser = async (credentials: LoginCredentials): Promise<Omit<User, 'password'> | null> => {
  const response = await axios.get<User[]>(`${BASE_URL}/users`, {
    params: { username: credentials.username }
  });

  const users = response.data;
  const user = users.find(
    (u) => u.username === credentials.username && u.password === credentials.password
  );

  if (!user) return null;

  const { password: _password, ...safeUser } = user;
  return safeUser;
};
