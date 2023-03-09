import React from 'react';
import { Image, View, ImageStyle } from 'react-native';
import {
  Button,
  ListItem,
  ListItemProps,
  Text,
  Icon,
  IconElement,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { CartItem as CartItemType } from '../../../../../context/Cart/props';

import styles from './styles';
import { formatMoney } from '../../../../../utils/format';

export const CloseIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='close' />
);

export const MinusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='minus' />
);

export const PlusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name='plus' />
);

export type CartItemProps = ListItemProps & {
  index: number;
  data: CartItemType;
  maxQuantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
};

const CartItem = (props: CartItemProps): React.ReactElement => {
  const { navigate } = useNavigation();
  const {
    data,
    style,
    index,
    onRemove,
    onDecrement,
    onIncrement,
    maxQuantity,
    ...listItemProps
  } = props;

  return (
    <ListItem
      {...listItemProps}
      style={[styles.container, style]}
      onPress={() =>
        navigate(
          'ProductDetailModal' as never,
          {
            product: data.product,
          } as never,
        )
      }
    >
      <Image
        style={styles.image}
        source={
          data.product && data.product.photos.length > 0
            ? {
                uri: data.product.photos[0],
              }
            : require('../../../../../assets/images/default-fallback-image.png')
        }
      />
      <View style={styles.detailsContainer}>
        <Text category='s1'>{data.product.name}</Text>
        {data.product.reseller && data.product.reseller.name && (
          <Text appearance='hint' category='p2'>
            {data.product.reseller.name}
          </Text>
        )}
        <Text category='s2'>{formatMoney(data.product.price)}</Text>
        <View style={styles.amountContainer}>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size='tiny'
            accessoryLeft={<MinusIcon />}
            onPress={onDecrement}
            disabled={data.quantity < 1}
          />
          <Text style={styles.amount} category='s2'>
            {`${data.quantity}`}
          </Text>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size='tiny'
            accessoryLeft={<PlusIcon />}
            onPress={() => {
              if (data.quantity + 1 <= maxQuantity) {
                onIncrement();
              }
            }}
          />
        </View>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance='ghost'
        status='basic'
        accessoryLeft={<CloseIcon />}
        onPress={onRemove}
      />
    </ListItem>
  );
};

export default CartItem;
