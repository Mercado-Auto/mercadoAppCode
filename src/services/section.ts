import api from './api';
import SectionsResponse from '../interfaces/response/SectionsResponse';
import SectionsRequest from '../interfaces/request/SectionsRequest';

export const readSections = async (params?: SectionsRequest) => {
  return api.get<SectionsResponse>('/app/section', {
    params: params,
  });
};
