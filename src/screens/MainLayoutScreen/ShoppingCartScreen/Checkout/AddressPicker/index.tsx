import React, { useState, useEffect } from 'react';
import {
  View,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  useStyleSheet,
  List,
  Icon,
  SelectItem,
  Layout,
  Text,
  Button,
  Divider,
} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';

import { useAuth, useCart } from '../../../../../hooks';
import { AddressService } from '../../../../../services';
import { Address, addrToString } from '../../../../../interfaces/Address';
import LoadingStatus from '../../../../../components/LoadingStatus';

const PinIcon = (props: any) => <Icon {...props} name='pin' />;
const ForwardIcon = (props: any) => (
  <Icon {...props} name='arrow-ios-forward' />
);

import { uiStyles } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AddressPicker = () => {
  const { logged } = useAuth();
  const { navigate } = useNavigation();
  const styles = useStyleSheet(uiStyles);
  const [loading, setLoading] = useState(false);
  const { configureShippingAddress } = useCart();
  const [items, setItems] = useState<Address[]>([]);
  const [shouldReload, setShouldReload] = useState(false);

  const navigateToAddNewAddress = () => {
    if (logged) {
      navigate(
        'MainLayout' as never,
        {
          screen: 'AddAddress',
        } as never,
      );
    } else {
      navigate(
        'Auth' as never,
        {
          screen: 'Welcome',
        } as never,
      );
    }
  };

  const renderAddressItem = (info: ListRenderItemInfo<Address>) => (
    <SelectItem
      accessoryLeft={PinIcon}
      accessoryRight={ForwardIcon}
      title={addrToString(info.item)}
      onPress={() => configureShippingAddress(info.item)}
    />
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await AddressService.readAddressOfUser();
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar dados.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  if (loading) {
    return (
      <View
        style={{
          height: Dimensions.get('screen').height * 0.8,
        }}
      >
        <LoadingStatus />
      </View>
    );
  }

  const getHeader = () => {
    return (
      <View>
        <Divider />
        <Text
          style={{
            marginTop: 16,
            marginBottom: 18,
            marginHorizontal: 16,
          }}
          category='label'
        >
          Selecione o endereço para entrega do seu pedido
        </Text>
      </View>
    );
  };

  const getFooter = () => {
    return (
      <View>
        {items.length == 0 && (
          <Text style={styles.sectionTitle} category='label'>
            Você não possui nenhum endereço cadastrado!
          </Text>
        )}
        <Button
          size='giant'
          style={styles.checkoutButton}
          onPress={navigateToAddNewAddress}
        >
          Adicionar novo endereço
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderAddressItem}
        ListHeaderComponent={getHeader}
        ListFooterComponent={getFooter}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setShouldReload(!shouldReload)}
          />
        }
      />
    </SafeAreaView>
  );
};

export default AddressPicker;
