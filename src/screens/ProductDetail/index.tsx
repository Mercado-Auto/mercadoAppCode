import React, { useEffect, useState } from 'react';
import {
  Image,
  ListRenderItemInfo,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import {
  useStyleSheet,
  Text,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Button,
  Divider,
  List,
} from '@ui-kitten/components';

import Product from '../../interfaces/Product';

const screenWidth = Dimensions.get('screen').width;

const BackIcon = (props: any) => <Icon {...props} name='chevron-left' />;
const FavoriteIcon = (props: any) => (
  <Icon {...props} name='heart-outline' fill='#E7394D' />
);
const FavoritedIcon = (props: any) => (
  <Icon {...props} name='heart' fill='#E7394D' />
);

const BackGalleryIcon = (props: any) => (
  <Icon {...props} name='chevron-left' fill='#FFF' />
);

import style from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RatingBar } from '../../components/RatingBar/index';
import { CategoryList } from './CategoryList';
import { DetailsList } from './DetailsList';
import { useCart } from '../../hooks/index';
import { formatMoney } from '../../utils/format';
import FavoriteSuccess from './FavoriteSuccess';
import { ProductService } from '../../services';
import { tryToNumber } from '../../utils/try-to-number';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';

const ProductDetail: React.FC = () => {
  const navigation = useNavigation();
  const styles = useStyleSheet(style);
  const { addProductToCart, cart } = useCart();
  const [favorited, setFavorited] = useState(false);
  const [isGalleryPhoto, setIsGalleryPhoto] = useState(false);
  const { product } = useRoute().params as { product: Product };
  const [animateFavorite, setAnimateFavorite] = useState(false);
  const inCart = cart.find(cartItem => cartItem.product.id === product.id) ? true : false

  const handleFavoriteToggle = async () => {
    if (!favorited) {
      setFavorited(true);
      setAnimateFavorite(true);
    }
  };

  const onCloseGallery = () => {
    setIsGalleryPhoto(false);
  };

  const renderRightActions = () => (
    <TopNavigationAction
      icon={favorited ? FavoritedIcon : FavoriteIcon}
      onPress={handleFavoriteToggle}
    />
  );
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  const renderImageItem = (
    info: ListRenderItemInfo<string>,
  ): React.ReactElement => (
    <TouchableOpacity onPress={() => setIsGalleryPhoto(true)}>
      <Image
        style={style.imageItem}
        source={{
          uri: info.item,
        }}
      />
    </TouchableOpacity>
  );

  const handlerAddToCart = () => {
    addProductToCart(product);
    navigation.navigate(
      'MainLayout' as never,
      {
        screen: 'Carrinho',
      } as never,
    );
  };

  useEffect(() => {
    const abortController = new AbortController();
    let tid: any;
    if (animateFavorite) {
      ProductService.addFavoriteProduct(abortController, product.id)
        .then()
        .catch()
        .finally(() => {
          tid = setTimeout(() => {
            setAnimateFavorite(false);
          }, 600);
        });
    }

    return () => {
      abortController.abort();
      if (tid) clearTimeout(tid);
    };
  }, [animateFavorite]);

  return (
    <SafeAreaView style={styles.container}>
      {animateFavorite && <FavoriteSuccess />}
      {!animateFavorite && (
        <Layout level='1'>
          <TopNavigation
            accessoryLeft={renderBackAction}
            accessoryRight={renderRightActions}
          />
          <ScrollView nestedScrollEnabled={true} style={{ width: screenWidth }}>
            <Image
              style={style.coverImage}
              source={
                product.photos.length > 0
                  ? {
                      uri: product.photos[0],
                    }
                  : require('../../assets/images/default-fallback-image.png')
              }
            />

            <Text style={styles.productName} category='h6'>
              {product.name}
            </Text>

            <Text style={styles.productName} category='h4'>
              {formatMoney(product.price)}
            </Text>

            {product.reseller && product.reseller.name && (
              <Text style={styles.productReseller} category='p2'>
                {product.reseller.name}
              </Text>
            )}

            <CategoryList
              style={styles.categoryList}
              data={product.tags?.map((tag) => tag.name)}
            />

            <RatingBar value={2} style={styles.ratingBar} readonly={true} />

            <Divider />

            <DetailsList style={styles.detailsList} data={[]} />

            <Text style={styles.sectionLabel} category='s1'>
              Descrição
            </Text>
            <Text style={styles.descriptionLabel} appearance='hint'>
              {product.description || 'Sem descrição'}
            </Text>

            {product.photos && product.photos.length > 0 && (
              <>
                <Text
                  style={[
                    styles.sectionLabel,
                    {
                      marginBottom: 8,
                    },
                  ]}
                  category='s1'
                >
                  Fotos
                </Text>

                <List
                  horizontal={true}
                  data={product.photos}
                  renderItem={renderImageItem}
                  keyExtractor={(_, idx) => 'product-image-' + idx}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.imagesList}
                />
              </>
            )}
            <Button
              disabled={(tryToNumber(product.stock_quantity) <= 0 || inCart)}
              style={styles.buyButton}
              onPress={handlerAddToCart}
            >
              <Text>
                {
                  inCart ? 'Produto no carrinho!' : 'Adicionar ao carrinho'
                }
              </Text>
            </Button>
          </ScrollView>
          {isGalleryPhoto && (
            <Modal visible={isGalleryPhoto} onRequestClose={onCloseGallery}>
              <Button
                status='danger'
                appearance='ghost'
                onPress={onCloseGallery}
                style={styles.goBackGallery}
                accessoryLeft={BackGalleryIcon}
              />
              <ImageViewer
                imageUrls={product.photos.map((el) => ({ url: el }))}
              />
            </Modal>
          )}
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
