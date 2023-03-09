import PaymentCard from './PaymentCard';

export interface Checkout extends PaymentCard {
  addressId: string;
  type_payment: 'pix' | 'credit_card';
  cart: {
    product_id: string;
    quantity: number;
  }[];
}

export interface CheckoutPix {
  addressId: string;
  type_payment: 'pix' | 'credit_card';
  cart: {
    product_id: string;
    quantity: number;
  }[];
}
