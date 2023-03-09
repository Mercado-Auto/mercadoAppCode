import api from './api';
import {
  AddressResponse,
  AdressesResponse,
} from '../interfaces/response/AdressResponse';
import { Address, RegisterAddress, UpdateAddress } from '../interfaces/Address';
export const readAddressOfUser = async () => {
  return await api.get<AdressesResponse>('/app/address');
};

export const readAdressesOfUser = async (
  abort: AbortController,
  ID: string,
) => {
  return await api.get<AddressResponse>(`/app/address/${ID}`, {
    signal: abort.signal,
  });
};

export const doRegisterAddress = async (data: RegisterAddress) => {
  return await api.post(`/app/address`, data);
};

export const doEditAddress = async (data: UpdateAddress, ID: string) => {
  return await api.patch(`/app/address/${ID}`, data);
};

export const doDeleteAddress = async (ID: string) => {
  return await api.delete(`/app/address/${ID}`);
};
