export default interface ListParams {
  page?: number;
  page_size?: number;
  sort?: string;
  order?: string;
  filter?: Record<string, any>;
}
