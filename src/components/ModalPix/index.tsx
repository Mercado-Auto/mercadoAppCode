import {
  Button,
  Card,
  Modal,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { uiStyles } from './styles';
import { useCart } from '../../hooks';
import Base64Image from '../Base64Image';
import { SalesService } from '../../services';
import { ActivityIndicator, View } from 'react-native';

interface Props {
  data: {
    sale_id: string;
    code_pix: string;
    qr_code_base_64: string;
  };
  isVisible: boolean;
}

const ModalPix: React.FC<Props> = ({ isVisible, data }) => {
  let tryAgain: number = 0;
  const { resetCheckout } = useCart();
  const { navigate } = useNavigation();
  const styles = useStyleSheet(uiStyles);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasSuccessfully, setHasSuccessfully] = useState<boolean>(false);
  const checkPix = async () => {
    try {
      const { data: checked } = await SalesService.checkSale(data.sale_id);
      setIsLoading(false);

      if (checked) {
        Toast.show({
          type: 'success',
          visibilityTime: 1400,
          text1: 'Pagamento concluído.',
        });
        navigate(
          'MainLayout' as never,
          {
            screen: 'Inicio',
          } as never,
        );
        resetCheckout();
        setHasSuccessfully(true);
      } else {
        Toast.show({
          type: 'error',
          visibilityTime: 2000,
          text1: 'Pagamento não realizado.',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        visibilityTime: 2000,
        text1: 'Erro no Pagamento.',
      });
    }
  };

  const counterFunction = () => {
    setIsLoading(true);
    const interval = setInterval(() => {
      tryAgain++;
      if (tryAgain === 60) {
        clearInterval(interval);
        checkPix();
      }
    }, 1000);
  };

  const copyPix = async (pix: string) => {
    await Clipboard.setStringAsync(pix);
    Toast.show({
      type: 'success',
      visibilityTime: 1400,
      text1: 'Pix copiado com sucesso!',
    });
  };

  const onClose = () => {
    resetCheckout();
    navigate(
      'MainLayout' as never,
      {
        screen: 'Profile',
      } as never,
    );
  };

  useEffect(() => {
    counterFunction();
  }, []);

  return (
    <Modal
      visible={isVisible}
      backdropStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      style={styles.backdrop}
    >
      <Card disabled={true} style={{ width: 300 }}>
        <View style={styles.containerHeader}>
          <Text style={styles.titleModal} category='h6'>
            Pague com este pix
          </Text>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size='small'
                color='#0000ff'
                style={{ width: 10, height: 10 }}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.containerQr}>
          <Base64Image width={200} height={200} base64={data.qr_code_base_64} />
        </View>

        <Button onPress={() => copyPix(data.code_pix)}>Copiar pix</Button>

        {!isLoading && !hasSuccessfully ? (
          <>
            <Text category='c1' appearance='hint' style={styles.or}>
              Não identificado nenhum pagamento pix para está compra, verifique
              novamente.
            </Text>
            <Button onPress={counterFunction}>Tentar novamente</Button>
          </>
        ) : (
          <></>
        )}
        <Text category='c1' appearance='hint' style={styles.or}>
          ou
        </Text>
        <Button
          status='danger'
          appearance='outline'
          style={styles.closeBtn}
          onPress={() => onClose()}
        >
          Fechar
        </Button>
      </Card>
    </Modal>
  );
};

export default ModalPix;
