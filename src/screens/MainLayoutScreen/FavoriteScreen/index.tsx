import React, { useEffect, useState } from "react";
import {
  Layout,
  Avatar,
  Button,
  List,
  ListItem,
  TopNavigation,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";

import { ListRenderItemInfo, RefreshControl, SafeAreaView } from "react-native";

import NotLoggedPanel from "../../../components/NotLoggedPanel";
import Product from "../../../interfaces/Product";
import { ProductService } from "../../../services";
import { useAuth } from "../../../hooks/index";

import styles from "./styles";
import LoadingStatus from "../../../components/LoadingStatus";
import FavoriteEmpty from "./FavoriteEmpty";

const DeleteIcon = (props: any) => (
  <Icon
    {...props}
    name="minus-circle-outline"
    fill="#8C1010"
    style={{ width: 24, height: 24 }}
  />
);

const ReloadIcon = (props: any) => <Icon {...props} name="refresh" />;

const FavoriteScreen: React.FC = () => {
  const { logged } = useAuth();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  const handleUnFavorite = async (product: Product) => {
    try {
      const abortController = new AbortController();
      setLoading(true);
      await ProductService.removeFavoriteProduct(abortController, product.id)
    } catch (error) {
      console.error(error)
    } finally {
      setShouldReload(!shouldReload);
    }
  };

  const renderReloadAction = () => (
    <TopNavigationAction
      icon={ReloadIcon}
      onPress={() => setShouldReload(!shouldReload)}
    />
  );

  const renderUnFavoriteButton = (product: Product) => {
    return () => (
      <Button
        size="tiny"
        appearance='ghost'
        status="danger"
        accessoryLeft={DeleteIcon}
        onPress={() => handleUnFavorite(product)}
      />
    );
  };

  const renderProductImage = (product: Product) => {
    return (props: any) => (
      <Avatar
        {...props}
        style={[props.style, { tintColor: null }]}
        resizeMode="contain"
        source={
          product.photos && product.photos.length > 0
            ? {
              uri: product.photos[0],
            }
            : require("../../../assets/images/default-fallback-image.png")
        }
      />
    );
  };

  const renderItem = (info: ListRenderItemInfo<Product>) => (
    <ListItem
      title={info.item.name}
      description={
        info.item.reseller && info.item.reseller.name
          ? info.item.reseller.name
          : ""
      }
      accessoryLeft={renderProductImage(info.item)}
      accessoryRight={renderUnFavoriteButton(info.item)}
    />
  );

  useEffect(() => {
    let cancelController: AbortController;

    if (logged) {
      cancelController = new AbortController();
      setLoading(true);
      ProductService.readFavoritesProducts(cancelController)
        .then((response) => setData(response.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }

    return () => {
      cancelController && cancelController.abort();
    };
  }, [logged, shouldReload]);

  return (
    <SafeAreaView style={styles.container}>
      {
        loading && <LoadingStatus />
      }
      {
        !loading && (<>
          {logged ? (data.length > 0 ? (
            <Layout>
              <TopNavigation
                title="Favoritos"
                alignment="center"
                accessoryRight={renderReloadAction}
              />

              <List
                data={data}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => setShouldReload(!shouldReload)}
                  />
                }
              />
            </Layout>
          ) : <FavoriteEmpty />) : (
            <NotLoggedPanel />
          )}</>)
      }

    </SafeAreaView>
  );
};

export default FavoriteScreen;
