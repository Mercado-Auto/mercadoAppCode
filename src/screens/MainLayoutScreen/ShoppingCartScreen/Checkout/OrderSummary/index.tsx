import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Button,
  Divider,
  ListItem,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';

import Toast from 'react-native-toast-message';
import LoadingStatus from '../../../../../components/LoadingStatus';
import ModalPix from '../../../../../components/ModalPix';
import { useCart } from '../../../../../hooks';
import { SalesService } from '../../../../../services';
import { CC_BRANDS_IMAGES, typeBrand } from '../../../../../utils/cc-brands';
import { formatMoney } from '../../../../../utils/format';
import CheckoutSuccess from '../CheckoutSuccess';
import { uiStyles } from './styles';
const OrderSummary = () => {
  const { navigate } = useNavigation();
  const styles = useStyleSheet(uiStyles);
  const [dataPix, setDataPix] = useState<{
    sale_id: string;
    code_pix: string;
    qr_code_base_64: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successScreen, setSuccessScreen] = useState<boolean>(false);
  const { resetCheckout, shippingAddress, paymentType, paymentInfo, cart } =
    useCart();
  const [cardMapped, setCardMapped] = useState<
    { product_id: string; quantity: number }[]
  >([]);

  const [totalPrice, setTotalPrice] = useState<string>('');

  const sumPrices = (): number => {
    let sum = 0;
    for (const item of cart) {
      sum += parseFloat(item.product.price) * item.quantity;
    }
    return sum;
  };

  const onFinishWithCard = async () => {
    setIsLoading(true);

    try {
      await SalesService.checkoutSale({
        ...paymentInfo,
        cart: cardMapped,
        type_payment: 'credit_card',
        cc_cvv: `${paymentInfo?.cc_cvv}`,
        addressId: shippingAddress?.id as string,
        cc_brand: typeBrand(paymentInfo?.cc_brand as string),
      });
      setIsLoading(false);
      setSuccessScreen(true);
      await setTimeout(() => {
        setSuccessScreen(false);
        navigate(
          'MainLayout' as never,
          {
            screen: 'Inicio',
          } as never,
        );
        resetCheckout();
      }, 700);
    } catch (err: any) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Erro ao realizar o pagamento',
      });
      if (err.response) {
        console.log('err', err.response.data);
        Toast.show({
          type: 'error',
          text1: err.response.data.message,
        });
      } else if (err.request) {
        console.log('Made it but not return value', err.request);
      } else {
        console.log('Error', err.message);
      }
    }
  };

  const onFinishWithPix = async () => {
    setIsLoading(true);
    try {
      const { data } = await SalesService.checkoutSale({
        cart: cardMapped,
        type_payment: 'pix',
        addressId: shippingAddress?.id as string,
      });
      if (data.code_pix && data.qr_code_base_64 && data.sale_id) {
        setDataPix({
          sale_id: data.sale_id,
          code_pix: data.code_pix,
          qr_code_base_64: data.qr_code_base_64,
        });
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log(err);

      setIsLoading(false);

      if (err.response) {
        return Toast.show({
          type: 'error',
          text1: err.response.data.message,
        });
      }

      return Toast.show({
        type: 'error',
        text1: 'Erro ao realizar o pagamento',
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setCardMapped(() =>
        cart.map((elem) => ({
          quantity: elem.quantity,
          product_id: elem.product.id,
        })),
      );
      setTotalPrice(formatMoney(sumPrices(), true));
    }, []),
  );

  return (
    <ScrollView style={styles.container}>
      {!successScreen ? (
        <>
          {!isLoading ? (
            <View style={styles.containerWrapper}>
              <Text style={styles.title}>Resumo</Text>
              {cart.map(({ product, quantity }) => (
                <ListItem
                  key={product.id}
                  style={styles.item}
                  accessoryLeft={() => (
                    <Image
                      source={{ uri: product.photos[0] }}
                      style={{ width: 64, height: 64 }}
                    />
                  )}
                  accessoryRight={() => (
                    <Text style={styles.price}>${product.price}</Text>
                  )}
                >
                  <View style={styles.itemContent}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.description}>
                      Quantidade: {quantity}
                    </Text>
                    <Divider style={{ marginTop: 16 }} />
                  </View>
                </ListItem>
              ))}

              {shippingAddress && (
                <View>
                  <Text style={styles.subtitle}>Endereço de entrega</Text>
                  <ListItem
                    title={shippingAddress.street}
                    description={`${shippingAddress.number}, ${shippingAddress.district}`}
                    accessoryRight={() => <Text>{shippingAddress.cep}</Text>}
                  />
                  <ListItem
                    title={shippingAddress.city.name}
                    description={shippingAddress.city.uf}
                  />
                </View>
              )}
              <Divider style={{ marginTop: 16 }} />

              <View>
                <Text style={styles.subtitle}>Informações de pagamento</Text>
                {paymentInfo && (
                  <ListItem
                    title={paymentInfo.cc_name}
                    description={
                      paymentInfo?.cc_number.split('').splice(0, 4).join('') +
                      ' **** **** ' +
                      paymentInfo?.cc_number.split('').splice(12, 4).join('')
                    }
                    accessoryRight={() => (
                      <View style={styles.cardInfo}>
                        {paymentInfo &&
                        paymentInfo.cc_brand &&
                        paymentType === 'credit_card' ? (
                          <Image
                            source={
                              (CC_BRANDS_IMAGES as any)[paymentInfo.cc_brand]
                            }
                          />
                        ) : (
                          <Text category='label'>Pix</Text>
                        )}
                        <Text>{`${paymentInfo.installments}x`}</Text>
                      </View>
                    )}
                  />
                )}
                {paymentType === 'pix' && (
                  <ListItem
                    title={'Forma de pagamento'}
                    accessoryRight={() => <Text category='p2'>Pix</Text>}
                  />
                )}

                <View
                  style={{
                    marginBottom: paymentType === 'credit_card' ? 10 : 0,
                  }}
                >
                  {totalPrice && (
                    <ListItem
                      title={'Total'}
                      accessoryRight={() => (
                        <Text category='h5'>{totalPrice}</Text>
                      )}
                    />
                  )}
                </View>
              </View>

              <Button
                size='giant'
                onPress={() =>
                  paymentType === 'credit_card'
                    ? onFinishWithCard()
                    : onFinishWithPix()
                }
              >
                Finalizar pedido
              </Button>
              {paymentType === 'pix' && dataPix && (
                <ModalPix isVisible data={dataPix} />
              )}
            </View>
          ) : (
            <LoadingStatus />
          )}
        </>
      ) : (
        <CheckoutSuccess />
      )}
    </ScrollView>
  );
};

export default OrderSummary;
