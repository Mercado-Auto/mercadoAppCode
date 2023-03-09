import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sale from '../../../../interfaces/Sale';
import { formatMoney } from '../../../../utils/format';
import SaleStatusBadge from '../../../SaleStatusBadge';

export type IGeneralDataProps = {
  data: Sale;
};

const GeneralData: React.FC<IGeneralDataProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} category='h5'>
        Dados gerais
      </Text>
      <View style={styles.field}>
        <Text category='label'>Valor total da compra</Text>
        <Text>{formatMoney(data.amount)}</Text>
      </View>
      <View style={styles.field}>
        <Text category='label'>Código de rastreio</Text>
        <Text>{data.tracker_code || '---'}</Text>
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

export default GeneralData;
