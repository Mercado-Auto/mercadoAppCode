import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { getSaleStatus } from '../../utils/get-sale-status';

export type ISaleStatusBadgeProps = {
  status?: string;
  large?: boolean;
};

const SaleStatusBadge: React.FC<ISaleStatusBadgeProps> = ({
  status,
  large,
}) => {
  const { label, color } = getSaleStatus(status);
  const styles = React.useMemo(
    () =>
      ({
        ...(large
          ? {
              paddingHorizontal: 10,
              paddingVertical: 5,
            }
          : {
              padding: 5,
            }),
        borderWidth: 1,
        display: 'flex',
        borderStyle: 'solid',
        borderRadius: large ? 5 : 3,
        ...color,
      } as any),
    [large],
  );

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
    >
      <View style={styles}>
        <Text style={{ color: color.color, fontSize: large ? 20 : 12 }}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default SaleStatusBadge;
