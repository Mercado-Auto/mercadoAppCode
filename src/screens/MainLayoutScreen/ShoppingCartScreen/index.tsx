import React from 'react';
import { SafeAreaView } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';

import { useCart } from '../../../hooks';

import Cart from './Cart';
import Checkout from './Checkout';

import { uiStyles } from './styles';

const ShoppingCartScreen: React.FC = () => {
  const styles = useStyleSheet(uiStyles);
  const { inCart, inCheckout } = useCart();

  return (
    <SafeAreaView style={styles.wrapper}>
      {inCart && <Cart />}
      {inCheckout && <Checkout />}
    </SafeAreaView>
  );
}

export default ShoppingCartScreen;