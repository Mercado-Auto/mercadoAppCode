import React from 'react';
import { SafeAreaView, ListRenderItemInfo } from 'react-native';
import {
  useStyleSheet,
  TopNavigation,
  Layout,
  Text,
  List,
  Button,
} from '@ui-kitten/components';

import { useAuth, useCart } from '../../../../hooks';
import { formatMoney } from '../../../../utils/format';
import { CartItem as CartItemProps } from '../../../../context/Cart/props';

import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

import { uiStyles } from './styles';
import { useNavigation } from '@react-navigation/native';

const Cart: React.FC = () => {
  const styles = useStyleSheet(uiStyles);
  const {
    cart,
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
    cartScreenFinishSale,
  } = useCart();
  const { navigate } = useNavigation();
  const { logged } = useAuth();

  const totalPrice = cart.reduce(
    (total, cartItem) => (total += cartItem.product.price * cartItem.quantity),
    0,
  );

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category='h5'>Total:</Text>
      <Text category='h5'>{formatMoney(totalPrice)}</Text>
    </Layout>
  );

  const renderCartProductItemItem = (
    info: ListRenderItemInfo<CartItemProps>,
  ): React.ReactElement => (
    <CartItem
      data={info.item}
      index={info.index}
      style={styles.item}
      maxQuantity={info.item.product.stock_quantity}
      onIncrement={() => {
        increaseProductQuantity(info.item.product.id);
      }}
      onDecrement={() => {
        decreaseProductQuantity(info.item.product.id);
      }}
      onRemove={() => {
        removeProductFromCart(info.item.product.id);
      }}
    />
  );

  const navigateToCheckout = () => {
    if (logged) {
      cartScreenFinishSale();
    } else {
      navigate(
        'Auth' as never,
        {
          screen: 'Welcome',
        } as never,
      );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopNavigation title='Carrinho' alignment='center' />

      {cart.length > 0 ? (
        <React.Fragment>
          <List
            data={cart}
            renderItem={renderCartProductItemItem}
            ListFooterComponent={renderFooter}
          />
          <Button
            style={styles.checkoutButton}
            size='giant'
            onPress={navigateToCheckout}
          >
            Finalizar compra
          </Button>
        </React.Fragment>
      ) : (
        <EmptyCart />
      )}
    </SafeAreaView>
  );
};

export default Cart;
