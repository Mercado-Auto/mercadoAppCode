import { Address } from './Address';
import Product from './Product';

export interface ProductSale extends Product {
  quantity: number;
}

export default interface Sale {
  id: string;
  amount: number;
  status: string;
  nf_link: string;
  code_pix?: string;
  tracker_code: string;
  qr_code_base_64?: string;
  shipping_address: Address;
  payment_type: 'pix' | 'credit_card';
  quantity_products: {
    product_id: string;
    quantity: number;
  }[];

  products: ProductSale[];

  created_at: string;
  updated_at: string;
}
