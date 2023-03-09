import { Address } from '../../interfaces/Address';
import PaymentCard from '../../interfaces/PaymentCard';
import Product from '../../interfaces/Product';
import { CartState, CartReducerAction } from './props';

export const CartReducer = (state: CartState, action: CartReducerAction) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            product: action.payload as Product,
            quantity: 1,
          },
        ],
        inCart: true,
        inCheckout: false,
      } as CartState;
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.product.id !== (action.payload as string),
        ),
      } as CartState;
    case 'INC_PRODUCT_QTD':
      const cartItemToIncrease = state.cart.findIndex(
        (cartItem) => cartItem.product.id === (action.payload as string),
      );
      if (cartItemToIncrease < 0) {
        return state;
      }

      const newCartToIncrease = [...state.cart];
      newCartToIncrease[cartItemToIncrease].quantity++;

      return {
        ...state,
        cart: newCartToIncrease,
      } as CartState;
    case 'DEC_PRODUCT_QTD':
      const cartItemToDecrease = state.cart.findIndex(
        (cartItem) => cartItem.product.id === (action.payload as string),
      );
      if (cartItemToDecrease < 0) {
        return state;
      }

      const newCartToDecrease = [...state.cart];
      newCartToDecrease[cartItemToDecrease].quantity--;

      let flagToRemove = false;

      if (newCartToDecrease[cartItemToDecrease].quantity <= 0) {
        flagToRemove = true;
      }

      return {
        ...state,
        cart: flagToRemove
          ? state.cart.filter(
              (cartItem) => cartItem.product.id !== (action.payload as string),
            )
          : newCartToDecrease,
      } as CartState;
    case 'NAVIGATE_TO_CHECKOUT':
      return {
        ...state,
        inCart: false,
        inCheckout: true,
      } as CartState;
    case 'CHECKOUT_NAVIGATE_TAB':
      return {
        ...state,
        checkoutStep: action.payload as number,
      } as CartState;
    case 'CONFIGURE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload as Address,
        checkoutStep1Done: true,
        checkoutStep: 1,
      } as CartState;
    case 'CONFIGURE_PAYMENT_INFO':
      return {
        ...state,
        paymentInfo: action.payload as PaymentCard,
        checkoutStep2Done: true,
        checkoutStep: 2,
        paymentType: 'credit_card',
      } as CartState;
    case 'SET_PAYMENT_TYPE':
      const changes: Partial<CartState> = {
        paymentType: action.payload as 'credit_card' | 'pix',
      };

      if (changes.paymentType === 'pix') {
        changes['checkoutStep2Done'] = true;
        changes['checkoutStep'] = 2;
      }

      return {
        ...state,
        ...changes,
      } as CartState;

    case 'RESET_CHECKOUT_TAB':
      return {
        cart: [],
        inCart: true,
        checkoutStep: 0,
        inCheckout: false,
        paymentInfo: undefined,
        checkoutStep1Done: false,
        checkoutStep2Done: false,
        checkoutStep3Done: false,
        shippingAddress: undefined,
        paymentType: 'credit_card',
      } as CartState;

    case 'CLEAR_FORM_PAYMENT':
      return {
        ...state,
        paymentInfo: undefined,
        checkoutStep2Done: false,
      };
    default:
      return state;
  }
};
