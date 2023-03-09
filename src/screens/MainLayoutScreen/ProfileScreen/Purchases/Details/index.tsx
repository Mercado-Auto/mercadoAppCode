import React from 'react';
import {
  CommonActions,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {
  Icon,
  Text,
  Layout,
  Button,
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { setStatusBarHidden } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Alert, SafeAreaView, View } from 'react-native';

import styles from './styles';
import Sale from '../../../../../interfaces/Sale';
import { SalesService } from '../../../../../services';
import LoadingStatus from '../../../../../components/LoadingStatus';
import SaleStatusBadge from '../../../../../components/SaleStatusBadge';
import ModalPixProfile from '../../../../../components/ModalPixProfile';
import Address from '../../../../../components/Profile/Purchases/Address';
import Product from '../../../../../components/Profile/Purchases/Product';
import GeneralData from '../../../../../components/Profile/Purchases/GeneralData';

const BackIcon = (props: any) => <Icon {...props} name='chevron-left' />;

const Details: React.FC = ({ route }: any) => {
  const $id = React.useId();
  const { id } = route.params;
  const { navigate, dispatch } = useNavigation();
  const [data, setData] = React.useState<Sale>({} as Sale);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [modalPix, setModalPix] = React.useState<boolean>(false);
  const [downloading, setDownloading] = React.useState<boolean>(false);
  const [paymentByPix, setPaymentByPix] = React.useState<boolean>(false);
  const [dataPix, setDataPix] = React.useState<{
    sale_id: string;
    code_pix: string;
    qr_code_base_64: string;
  } | null>(null);

  const goBack = () => {
    navigate(
      'MainLayout' as never,
      {
        screen: 'PurchasesUser',
      } as never,
    );
    dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'EditAddress' },
          {
            name: 'DetailsPurchase',
            params: { id: '' },
          },
        ],
      }),
    );
  };

  const loadData = async () => {
    const cancelController = new AbortController();
    setLoading(true);
    try {
      const { data } = await SalesService.readMyPurchases(id, cancelController);
      setData(data);
      if (
        data.id &&
        data.code_pix &&
        data.qr_code_base_64 &&
        data.status === 'waiting_payment'
      ) {
        setDataPix({
          sale_id: data.id,
          code_pix: data.code_pix,
          qr_code_base_64: data.qr_code_base_64,
        });
        setPaymentByPix(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);

      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar dados.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
      goBack();
    } finally {
      setLoading(false);
    }
    return () => {
      cancelController && cancelController.abort();
    };
  };

  const handleDownloadNF = async () => {
    setDownloading(true);
    let path = data.nf_link.split('/');
    const file_name = path[path.length - 1];

    try {
      const { uri } = await FileSystem.downloadAsync(
        data.nf_link,
        FileSystem.documentDirectory + file_name,
      );
      await MediaLibrary.createAssetAsync(uri);
      Toast.show({
        type: 'success',
        visibilityTime: 1400,
        text1: 'Nota baixada com sucesso.',
      });
      setDownloading(false);
    } catch {
      setDownloading(false);
      Alert.alert(
        'Desculpe! :(',
        downloading
          ? 'O arquivo foi baixado mais houve um erro ao tentar abrir o arquivo!'
          : 'Houve um erro ao tentar fazer o download do arquivo!',
      );
    }
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => goBack()} />
  );

  useFocusEffect(
    React.useCallback(() => {
      loadData();
      setStatusBarHidden(false, 'fade');
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        style={styles.header}
        accessoryLeft={renderBackAction}
        title='Detalhes da compra'
        alignment='center'
      />
      <ScrollView style={{ flex: 1 }}>
        <Layout style={styles.containerContent}>
          {!loading ? (
            <>
              <Text style={styles.title} category='h2'>
                Compra: {data.id?.toUpperCase()}
              </Text>

              <View>
                <SaleStatusBadge status={data.status} large />
              </View>
              <View>
                {paymentByPix && (
                  <Button
                    appearance='outline'
                    style={styles.payNow}
                    onPress={() => setModalPix(true)}
                  >
                    Pagar agora
                  </Button>
                )}
              </View>

              <GeneralData data={data!} />

              <Address data={data!} />

              <Text style={{ marginVertical: 10 }} category='h4'>
                Produtos
              </Text>

              {data.products.map((product, index) => (
                <React.Fragment key={`${$id}-product-${index}`}>
                  <Product data={product} />
                  {index !== (data?.products || []).length - 1 && (
                    <Divider style={styles.divider} />
                  )}
                </React.Fragment>
              ))}

              {data?.nf_link && (
                <Button
                  disabled={downloading}
                  onPress={handleDownloadNF}
                  style={styles.downloadButtton}
                >
                  {downloading ? <ActivityIndicator /> : 'Baixar nota fiscal'}
                </Button>
              )}
              {dataPix && modalPix ? (
                <ModalPixProfile
                  data={dataPix}
                  isVisible={modalPix}
                  onSuccess={loadData}
                  onClose={() => setModalPix(false)}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <LoadingStatus />
          )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
