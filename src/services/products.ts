import HomeProductsResponse from '../interfaces/response/CitiesResponse';
import api from './api';
import Product from '../interfaces/Product';
import ProductsResponse from '../interfaces/response/ProductsResponse';
import ProductsRequest from '../interfaces/request/ProductsRequest';

export const readProductFromHomeTab = async () => {
  return api.get<HomeProductsResponse>('/app/products/home');
};

export const searchProduct = async (
  abort: AbortController,
  filters: ProductsRequest,
) => {
  return api.get<ProductsResponse>('/app/product', {
    signal: abort.signal,
    params: filters,
  });
};

export const readFavoritesProducts = async (abort: AbortController) => {
  return api.get<Product[]>('/app/accounts/favorites', {
    signal: abort.signal,
  });
};

export const addFavoriteProduct = async (
  abort: AbortController,
  productId: string,
) => {
  return api.post<void>(
    '/app/accounts/favorites',
    {
      product_id: productId,
    },
    {
      signal: abort.signal,
    },
  );
};

export const removeFavoriteProduct = async (
  abort: AbortController,
  productId: string,
) => {
  return api.delete<void>('/app/accounts/favorites', {
    data: {
      product_id: productId,
    },
    signal: abort.signal,
  });
};
