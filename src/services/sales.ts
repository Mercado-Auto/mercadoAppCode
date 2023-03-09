import BaseGetResponse from '../common/models/BaseGetResponse';
import { Checkout, CheckoutPix } from '../interfaces/Checkout';
import {
  SalePurchaseResponse,
  SaleResponse,
} from '../interfaces/response/SalesResponse';
import api from './api';

export const checkoutSale = async (checkout: Checkout | CheckoutPix) => {
  return api.post<SalePurchaseResponse>('/app/sales/checkout', {
    ...checkout,
  });
};

export const readAllMyPurchases = async (abort: AbortController) => {
  return await api.get<BaseGetResponse<SaleResponse>>('/app/sales', {
    signal: abort.signal,
    params: {
      sort_by: 'descent',
      order_by: 'createdAt',
    },
  });
};

export const readMyPurchases = async (id: string, abort: AbortController) => {
  return api.get<SaleResponse>(`/app/sales/${id}`, {
    signal: abort.signal,
  });
};

export const checkSale = async (idSale: string) => {
  return api.get<boolean>(`/app/sales/${idSale}/payment-paid`);
};
