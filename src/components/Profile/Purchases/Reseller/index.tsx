import { Button, Divider, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Sale from '../../../../interfaces/Sale';
import { formatCNPJ } from '../../../../utils/format';
import Product from '../Product';

export type IResellerProps = {
  data: Sale['resellers'][number];
}

const Reseller: React.FC<IResellerProps> = ({ data }) => {
  const $id = React.useId();
  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title} category="h5">{data.name} ({formatCNPJ(data.cnpj)})</Text>
        <View style={styles.field}>
          <Text category="label">Status</Text>
          <Text>{'Aguardando pagamento' || data.status}</Text>
        </View>

        <View style={styles.field}>
          <Text category="h6">Produtos</Text>
          {(data.products || []).map((product, index) => (<Product key={`${$id}-product-${index}`} data={product!} />))}
        </View>

        <View style={styles.field}>
          <Button>
            Baixar nota fiscal
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  title: {
    marginBottom: 10,
  },
  field: {
    marginBottom: 10,
  }
})

export default Reseller;
