import { useFocusEffect } from '@react-navigation/native';
import {
  Icon,
  Layout,
  List,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { setStatusBarHidden } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Alert, RefreshControl, SafeAreaView } from 'react-native';
import LoadingStatus from '../../../../components/LoadingStatus';
import PurchaseCard from '../../../../components/Profile/Purchases/PurchaseCard';
import Sale from '../../../../interfaces/Sale';
import { SalesService } from '../../../../services';
import Empty from './Empty';
import styles from './styles';

const BackIcon = (props: any) => <Icon {...props} name='chevron-left' />;

const Purchases: React.FC<any> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Sale[]>([]);

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

  const loadData = async () => {
    const cancelController = new AbortController();
    setLoading(true);
    try {
      const { data } = await SalesService.readAllMyPurchases(cancelController);
      setData(data.data);
      console.log(data.data);
      setLoading(false);
    } catch (errors: any) {
      Alert.alert(`Erro ao ler suas compras, ${errors}`);
      setLoading(false);
    }
    return () => {
      cancelController && cancelController.abort();
    };
  };

  const renderItem = ({ item }: any) => <PurchaseCard item={item} />;

  useFocusEffect(
    React.useCallback(() => {
      loadData();
      setStatusBarHidden(false, 'fade');
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        alignment='center'
        style={styles.header}
        title='Minhas compras'
        accessoryLeft={renderBackAction}
      />
      <Layout style={styles.containerContent}>
        {!loading ? (
          <>
            {data.length ? (
              <List
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => loadData()}
                  />
                }
              />
            ) : (
              <Empty />
            )}
          </>
        ) : (
          <LoadingStatus />
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default Purchases;
