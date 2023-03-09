import { useNavigation } from '@react-navigation/native';
import { Icon, ListItem, Text } from '@ui-kitten/components';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React from 'react';
import { View } from 'react-native';
import Sale from '../../../../interfaces/Sale';
import SaleStatusBadge from '../../../SaleStatusBadge';
import styles from './styles';

const ForwardIcon = (props: any) => (
  <Icon {...props} name='arrow-ios-forward' />
);

interface PurchaseCardProps {
  item: Sale;
}

const PurchaseCardTextSlot: React.FC<PurchaseCardProps> = ({ item }) => {
  return (
    <View style={styles.containerText}>
      <Text>Compra: {item.id?.toUpperCase()}</Text>
      <View style={styles.containerStatus}>
        <SaleStatusBadge status={item.status} />
      </View>
    </View>
  );
};

const PurchaseCard: React.FC<PurchaseCardProps> = ({ item }) => {
  const { navigate } = useNavigation();
  const detailsSale = () => {
    navigate(
      'MainLayout' as never,
      {
        screen: 'DetailsPurchase',
        params: { id: item.id },
      } as never,
    );
  };

  const formateDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy, p', {
      locale: ptBR,
    });
  };

  return (
    <ListItem
      style={styles.container}
      accessoryRight={ForwardIcon}
      title={<PurchaseCardTextSlot item={item} />}
      description={`Compra feita em: ${formateDate((item as any).createdAt)}`}
      onPress={detailsSale}
    />
  );
};

export default PurchaseCard;
