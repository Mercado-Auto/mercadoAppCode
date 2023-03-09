import { useFocusEffect } from '@react-navigation/native';
import {
  Button,
  Icon,
  Layout,
  List,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { setStatusBarHidden } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { RefreshControl, View, SafeAreaView } from 'react-native';
import AddressCard from '../../../../components/Profile/Address/AddressCard';
import { Address } from '../../../../interfaces/Address';
import { AddressService } from '../../../../services';
import styles from './styles';

const BackIcon = (props: any) => <Icon {...props} name='chevron-left' />;

const AddressUser: React.FC<any> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [data, setData] = useState<Address[]>([]);

  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() =>
        navigation.navigate(
          'MainLayout' as never,
          {
            screen: 'Profile',
          } as never,
        )
      }
    />
  );

  const renderRightAction = () => (
    <Button
      style={styles.icon}
      appearance={'ghost'}
      onPress={() => {
        navigation.navigate(
          'MainLayout' as never,
          {
            screen: 'AddAddress',
          } as never,
        );
      }}
      accessoryLeft={<Icon name='plus-outline' fill={'#222B45'} />}
    />
  );

  const loadData = async () => {
    const cancelController = new AbortController();
    setLoading(true);
    try {
      await AddressService.readAddressOfUser(cancelController).then(
        (response) => setData(response.data),
      );
      setLoading(false);
    } catch (errors: any) {
      alert(`Erro ao ler favoritos, ${errors}`);
    }
    return () => {
      cancelController && cancelController.abort();
    };
  };

  const renderItem = ({ item }: any) => <AddressCard item={item} />;

  const memoizedValue = useMemo(() => renderItem, [data]);

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
        accessoryRight={renderRightAction}
        title='Meus endereços'
        alignment='center'
      />
      <Layout style={styles.containerContent}>
        <List
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={memoizedValue}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => setShouldReload(!shouldReload)}
            />
          }
        />
      </Layout>
    </SafeAreaView>
  );
};

export default AddressUser;
