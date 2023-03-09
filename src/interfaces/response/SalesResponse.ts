import Sale from '../Sale';

export type SaleResponse = Sale;
export type SalesResponse = Sale[];

export interface SalePurchaseResponse {
  sale_id?: string;
  code_pix?: string;
  qr_code_base_64?: string;
}
