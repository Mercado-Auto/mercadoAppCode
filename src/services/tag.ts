import api from './api';
import TagsResponse from '../interfaces/response/TagsResponse';
import TagsRequest from '../interfaces/request/TagsRequest';

export const readTags = async (params?: TagsRequest) => {
  return api.get<TagsResponse>('/app/tag', {
    params: params,
  });
};
