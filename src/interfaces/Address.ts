export type RegisterAddress = AddressADD;

import City from './City';

export interface Address {
  id: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  complement: string;
  city: City;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressADD {
  cep: string;
  city: string;
  street: string;
  number: string;
  district: string;
  complement: string;
}

export interface UpdateAddress {
  id: string;
  cep: string;
  street: string;
  number: string;
  district: string;
  complement: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

export const addrToString = (addr: Address): string => {
  return `${addr.street}, ${addr.number}, ${addr.district} - ${addr.city.name} / ${addr.city.uf}, CEP: ${addr.cep}`;
};
