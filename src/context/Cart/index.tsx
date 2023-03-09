import React, { useReducer } from 'react';

import { CartContextProps, CartState } from './props';
import { CartReducer } from './reducer';

import Product from '../../interfaces/Product';
import { Address } from '../../interfaces/Address';
import PaymentCard from '../../interfaces/PaymentCard';

export const CartContext = React.createContext({} as CartContextProps);

const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, {
    cart: [],
    inCart: true,
    inCheckout: false,
    checkoutStep: 0,
    checkoutStep1Done: false,
    checkoutStep2Done: false,
    checkoutStep3Done: false,
    shippingAddress: undefined,
    paymentInfo: undefined,
    paymentType: 'credit_card',
  } as never);

  const cartScreenFinishSale = () => {
    dispatch({ type: 'NAVIGATE_TO_CHECKOUT' });
  };

  const addProductToCart = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const removeProductFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: productId });
  };

  const increaseProductQuantity = (productId: string) => {
    dispatch({ type: 'INC_PRODUCT_QTD', payload: productId });
  };

  const decreaseProductQuantity = (productId: string) => {
    dispatch({ type: 'DEC_PRODUCT_QTD', payload: productId });
  };

  const configureShippingAddress = (address: Address) => {
    dispatch({ type: 'CONFIGURE_SHIPPING_ADDRESS', payload: address });
  };

  const checkoutScreenNavigateTab = (step: number) => {
    dispatch({ type: 'CHECKOUT_NAVIGATE_TAB', payload: step });
  };

  const configurePaymentInfo = (paymentInfo: PaymentCard) => {
    dispatch({ type: 'CONFIGURE_PAYMENT_INFO', payload: paymentInfo });
  };

  const setPaymentType = (paymentType: string) => {
    dispatch({ type: 'SET_PAYMENT_TYPE', payload: paymentType });
  };

  const resetCheckout = () => {
    dispatch({ type: 'RESET_CHECKOUT_TAB', payload: 0 });
  };

  const clearFormPayment = () => {
    dispatch({ type: 'CLEAR_FORM_PAYMENT', payload: 0 });
  };

  const contextValues: CartContextProps = {
    resetCheckout,
    setPaymentType,
    addProductToCart,
    clearFormPayment,
    configurePaymentInfo,
    cartScreenFinishSale,
    removeProductFromCart,
    increaseProductQuantity,
    ...(state as CartState),
    decreaseProductQuantity,
    configureShippingAddress,
    checkoutScreenNavigateTab,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
