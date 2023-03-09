import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ListRenderItemInfo,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Card, List, Text, useStyleSheet } from '@ui-kitten/components';

import Product from '../../../interfaces/Product';
import Section from '../../../interfaces/Section';

import style from './styles';

import { ProductService } from '../../../services';
import LoadingStatus from '../../../components/LoadingStatus';
import { formatMoney } from '../../../utils/format';

const HomeScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const styles = useStyleSheet(style);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Section[]>([]);
  const [shouldReload, setShouldReload] = useState(false);

  const navigateToSeeMore = (sectionId: string) => {
    navigate(
      'MainLayout' as never,
      {
        screen: 'Buscar',
        params: {
          sectionId,
        },
      } as never,
    );
  };

  const renderItemFooter = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Text category='h6' style={styles.amount}>{`${formatMoney(
        info.item.price,
      )}`}</Text>
      <View style={styles.footerAmount}>
        {info.item.stock_quantity > 0 ? (
          <>
            <Text category='s1' appearance='hint' style={styles.qtd}>
              {info.item.stock_quantity}
            </Text>
            <Text appearance='hint' category='c1' style={styles.stock}>
              Em estoque
            </Text>
          </>
        ) : (
          <Text appearance='hint' category='c1' style={styles.stockEmpty}>
            Em falta
          </Text>
        )}
      </View>
    </View>
  );

  const renderItemHeader = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
    <ImageBackground
      style={styles.itemHeader}
      resizeMode='contain'
      source={
        info.item.photos.length > 0
          ? {
              uri: info.item.photos[0],
            }
          : require('../../../assets/images/default-fallback-image.png')
      }
    />
  );

  const renderProductItem = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => {
    return (
      <Card
        style={styles.productItem}
        onPress={() =>
          navigate(
            'ProductDetailModal' as never,
            {
              product: info.item,
            } as never,
          )
        }
        header={() => renderItemHeader(info)}
        footer={() => renderItemFooter(info)}
      >
        <View style={styles.productItemBody}>
          <Text category='s1'>{info.item.name}</Text>
          <Text appearance='hint' category='c1'>
            {info.item.reseller && info.item.reseller.name
              ? info.item.reseller.name
              : ''}
          </Text>
        </View>
      </Card>
    );
  };

  const onRefresh = async () => {
    setShouldReload(!shouldReload);
  };

  const onLoadData = async () => {
    setLoading(true);
    try {
      const { data } = await ProductService.readProductFromHomeTab();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
      Alert.alert('Erro ao ler produtos');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      onLoadData();
    }, [shouldReload]),
  );

  return (
    <View style={styles.container}>
      {loading && <LoadingStatus />}
      {!loading && (
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.containerList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Image
              style={style.logo}
              source={require('../../../assets/logos/Group-2.png')}
            />
          </View>

          {data &&
            data
              .filter((section) => section.products!.length > 0)
              .map((section) => (
                <View style={styles.containerList} key={section.id}>
                  <View style={styles.containerTitle}>
                    <Text category='h5' style={styles.titleCategory}>
                      {section.name}
                    </Text>
                    <Button
                      size={'tiny'}
                      style={styles.seeMore}
                      onPress={() => navigateToSeeMore(section.id)}
                    >
                      {(evaProps) => (
                        <Text {...evaProps} style={styles.seeMoreText}>
                          Ver todos
                        </Text>
                      )}
                    </Button>
                  </View>

                  <List
                    horizontal
                    renderItem={renderProductItem}
                    showsHorizontalScrollIndicator={false}
                    style={styles.productListWrapper}
                    contentContainerStyle={styles.productList}
                    data={section.products}
                    refreshControl={
                      <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                      />
                    }
                  />
                </View>
              ))}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
