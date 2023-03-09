import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sale from '../../../../interfaces/Sale';
import { formatMoney } from '../../../../utils/format';

export type IProductProps = {
  data: Sale['products'][number];
};

const Product: React.FC<IProductProps> = ({ data }) => {
  const { navigate } = useNavigation();
  // console.log(data);

  return (
    <Layout level='3' style={styles.container}>
      <Text style={styles.title} category='h5'>
        {data.name}
      </Text>
      <View style={styles.field}>
        <Text category='label'>Preço do produto</Text>
        <Text>{formatMoney(data.price)}</Text>
      </View>
      <View style={styles.field}>
        <Text category='label'>Quantidade</Text>
        <Text>{data.quantity}</Text>
      </View>
      <View style={styles.field}>
        <Button
          appearance='outline'
          onPress={() =>
            navigate(
              'ProductDetailModal' as never,
              {
                product: data,
              } as never,
            )
          }
        >
          Ver produto
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    minHeight: 100,
  },
  title: {
    marginVertical: 10,
  },
  field: {
    marginBottom: 10,
  },
});

export default Product;
