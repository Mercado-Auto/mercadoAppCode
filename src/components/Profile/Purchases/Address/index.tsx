import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sale from '../../../../interfaces/Sale';

export type IAddressProps = {
  data: Sale;
};

const Address: React.FC<IAddressProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} category='h5'>
        Endereço da entrega
      </Text>
      <View style={styles.field}>
        <Text category='label'>Logradouro</Text>
        <Text>{data.shipping_address?.street}</Text>
      </View>
      <View style={styles.field}>
        <Text category='label'>Número</Text>
        <Text>{data.shipping_address?.number}</Text>
      </View>
      <View style={styles.field}>
        <Text category='label'>Bairro</Text>
        <Text>{data.shipping_address?.district}</Text>
      </View>
      <View style={styles.field}>
        <Text category='label'>Cidade/UF</Text>
        <Text>
          {data.shipping_address?.city?.name} /{' '}
          {data.shipping_address?.city?.uf}
        </Text>
      </View>
      <View style={styles.field}>
        <Text category='label'>CEP</Text>
        <Text>{data.shipping_address?.cep}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    marginVertical: 10,
  },
  field: {
    marginBottom: 10,
  },
});

export default Address;
