import React from 'react';
import { Address } from '../../interfaces/Address';
import PaymentCard from '../../interfaces/PaymentCard';
import Product from '../../interfaces/Product';

export type CartActionType =
  | 'ADD_PRODUCT'
  | 'REMOVE_PRODUCT'
  | 'INC_PRODUCT_QTD'
  | 'DEC_PRODUCT_QTD'
  | 'NAVIGATE_TO_CART'
  | 'SET_PAYMENT_TYPE'
  | 'RESET_CHECKOUT_TAB'
  | 'CLEAR_FORM_PAYMENT'
  | 'NAVIGATE_TO_CHECKOUT'
  | 'CHECKOUT_NAVIGATE_TAB'
  | 'CONFIGURE_PAYMENT_INFO'
  | 'CONFIGURE_SHIPPING_ADDRESS';

export interface CartReducerAction {
  type: CartActionType;
  payload?: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  inCart: boolean;
  inCheckout: boolean;
  checkoutStep: number;
  checkoutStep1Done: boolean;
  checkoutStep2Done: boolean;
  checkoutStep3Done: boolean;
  shippingAddress?: Address;
  paymentInfo?: PaymentCard;
  paymentType: 'credit_card' | 'pix';
}

export interface CartContextProps extends CartState {
  resetCheckout: () => void;
  clearFormPayment: () => void;
  cartScreenFinishSale: () => void;
  checkoutScreenNavigateTab: (step: number) => void;

  // manage product list
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;

  configureShippingAddress: (addess: Address) => void;
  configurePaymentInfo: (paymentInfo: PaymentCard) => void;
  setPaymentType: (paymentType: string) => void;
}
