import api from './api';
import { ViaCEPResponse } from '../common/models/viaCepResponse';
import CitiesResponse from '../interfaces/response/CitiesResponse';

export const readCities = async (value: any) => {
  return api.get<CitiesResponse>('/app/city', {
    params: value,
  });
};

export const readCitiesByCEP = async (value: any) => {
  return api.get<ViaCEPResponse>('/app/city/find', {
    params: value,
  });
};
