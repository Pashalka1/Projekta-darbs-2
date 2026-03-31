import axios from 'axios';
import { Bakugan, Attribute } from './types';

const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllBakugan = async (): Promise<Bakugan[]> => {
  const response = await api.get<Bakugan[]>('/bakugan');
  return response.data;
};

export const fetchBakuganById = async (id: number): Promise<Bakugan> => {
  const response = await api.get<Bakugan>(`/bakugan/${id}`);
  return response.data;
};

export const fetchBakuganByAttribute = async (attribute: Attribute): Promise<Bakugan[]> => {
  const response = await api.get<Bakugan[]>('/bakugan', {
    params: { attribute },
  });
  return response.data;
};

export const searchBakugan = async (query: string): Promise<Bakugan[]> => {
  const response = await api.get<Bakugan[]>('/bakugan', {
    params: { q: query },
  });
  return response.data;
};
