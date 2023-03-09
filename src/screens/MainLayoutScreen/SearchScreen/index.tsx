import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, ImageBackground, ListRenderItemInfo, Platform, RefreshControl, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Icon, Text, TopNavigation, TopNavigationAction, useStyleSheet, Modal, List, Card } from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


import EmptyList from './EmptyList';
import Filters, { IFiltersOptions } from './Filters';
import { searchProduct } from '../../../services/products';
import Product from '../../../interfaces/Product';
import LoadingStatus from '../../../components/LoadingStatus';
import { formatMoney } from '../../../utils/format';
import { style } from './styles';
import { removeEmpty } from '../../../utils/remove-empty';

const FilterIcon = (props: any) => <Icon {...props} name='search-outline' />;
const CloseIcon = (props: any) => <Icon {...props} name='close-outline' />;

const SearchScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const route = useRoute() as any
  const sectionId = route?.params?.sectionId ?? undefined;

  const styles = useStyleSheet(style);
  const [results, setResults] = useState<Product[]>([])
  const [filterModalOpened, setFilterModalOpened] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<IFiltersOptions | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  const handleRefech = () => setShouldReload(!shouldReload)

  useEffect(() => {
    const cancelController = new AbortController();

    if (currentFilters) {
      (async () => {
        setIsLoading(true);
        try {
          const response = await searchProduct(
            cancelController,
            removeEmpty(currentFilters || {}),
          );
          setResults(response.data.data);
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: 'Erro ao buscar dados.',
            text2: 'Por favor, tente novamente mais tarde!',
          });
        } finally {
          setIsLoading(false);
        }
      })();
    }

    return () => {
      cancelController.abort()
    }
  }, [currentFilters, shouldReload])

  useEffect(() => {
    if (sectionId !== undefined) {
      setCurrentFilters({
        ...currentFilters,
        sections: [sectionId]
      })
    }
  }, [sectionId])

  const handleOpenFilterModal = () => {
    setFilterModalOpened(true)
  }

  const renderFilterAction = () => (
    <TopNavigationAction
      icon={FilterIcon}
      onPress={handleOpenFilterModal}
    />
  );

  const renderCloseModalAction = () => (
    <TopNavigationAction
      icon={CloseIcon}
      onPress={() => setFilterModalOpened(false)}
    />
  );

  const handleFilter = (newFilters?: IFiltersOptions) => {
    setFilterModalOpened(false);
    setCurrentFilters(newFilters);
  }

  const renderItemFooter = (
    info: ListRenderItemInfo<Product>,
  ): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Text category='h6' style={styles.amount}>{formatMoney(
        info.item.price,
      )}</Text>
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
      resizeMode="contain"
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
        <Text category='s1'>{info.item.name}</Text>
        <Text appearance='hint' category='c1'>
          {info.item.reseller && info.item.reseller.name
            ? info.item.reseller.name
            : ''}
        </Text>
      </Card>
    );
  };

  const memoizedValue = useMemo(() => renderProductItem, [results.length]);

  return <SafeAreaView style={styles.wrapper}>

    {
      isLoading && <LoadingStatus />
    }

    {
      !isLoading && (<>
        <TopNavigation title="Buscar" alignment='center' accessoryRight={renderFilterAction} />
        {results.length > 0 ? (
          <List
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={memoizedValue}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefech} />}
          />
        ) : (
          <EmptyList />
        )}

        <Modal
          visible={filterModalOpened}
          onBackdropPress={() => setFilterModalOpened(false)}
          backdropStyle={{
            backgroundColor: 'rgb(255,255,255)',
          }}
          style={{
            backgroundColor: 'rgb(255,255,255)',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            padding: 16,
            paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight() + 38,
          }}
        >
          <TopNavigation title="Aplique seus filtros" alignment='center' accessoryRight={renderCloseModalAction} />
          <Filters
            onFilter={(newFilters) => handleFilter(newFilters)}
            filters={currentFilters ?? {}}
          />
        </Modal>
      </>)
    }
  </SafeAreaView>;
}

export default SearchScreen;