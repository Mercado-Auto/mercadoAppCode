import { Login, Register, User } from '../interfaces/Auth';
import LoginResponse from '../interfaces/response/LoginResponse';
import api from './api';

export const doLogin = async (data: Login) => {
  return api.post<LoginResponse>('/app/accounts/login', data);
};

export const getProfile = async (abort: AbortController) => {
  return api.get<User>('/app/accounts/profile', {
    signal: abort.signal,
  });
};

export const doRegister = async (data: Register) => {
  return api.post('/app/accounts/register', data);
};

export const doRecoverPassrword = async (data: { email: string }) => {
  return api.post('/app/accounts/forget-password', data);
};
