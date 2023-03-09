import { useNavigation } from '@react-navigation/native';
import { Icon, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import TabView from '../../../../components/TabView';

import { useAuth, useCart } from '../../../../hooks';
import AddressPicker from './AddressPicker';
import OrderSummary from './OrderSummary';
import PaymentTypePicker from './PaymentTypePicker';
import { uiStyles } from './styles';

const PinOutlineIcon = (props: any) => <Icon {...props} name='pin-outline' />;

const CreditCardOutlineIcon = (props: any) => (
  <Icon {...props} name='credit-card-outline' />
);
const ArchiveOutlineIcon = (props: any) => (
  <Icon {...props} name='archive-outline' />
);

const Checkout: React.FC = () => {
  const { logged } = useAuth();
  const { navigate } = useNavigation();
  const styles = useStyleSheet(uiStyles);
  const {
    checkoutStep,
    checkoutStep2Done,
    checkoutStep1Done,
    checkoutScreenNavigateTab,
  } = useCart();

  const withoutLogin = () => {
    navigate(
      'Auth' as never,
      {
        screen: 'Welcome',
      } as never,
    );
  };

  const tabs = {
    '0': <AddressPicker />,
    '1': <PaymentTypePicker />,
    '2': <OrderSummary />,
  };

  useEffect(() => {
    if (logged === false) {
      withoutLogin();
    }
  }, [logged]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopNavigation title='Carrinho' alignment='center' />
      <TabView
        selectedIndex={checkoutStep}
        onSelect={checkoutScreenNavigateTab}
        checkoutStep1Done={checkoutStep1Done}
        checkoutStep2Done={checkoutStep2Done}
        tabs={[
          {
            label: 'Endereço de entrega',
            Icon: PinOutlineIcon,
          },
          {
            label: 'Forma de pagamento',
            Icon: CreditCardOutlineIcon,
          },
          {
            label: 'Resumo',
            Icon: ArchiveOutlineIcon,
          },
        ]}
      />
      {tabs[`${checkoutStep as 0 | 1 | 2}`]}
    </SafeAreaView>
  );
};

export default Checkout;
