import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { useStyleSheet, Text, Radio, Button } from '@ui-kitten/components';

import { useCart } from '../../../../../hooks';
import CreditCardForm from '../CreditCardForm';

import { uiStyles } from './styles';

const PaymentTypePicker = () => {
  const styles = useStyleSheet(uiStyles);
  const { paymentType, paymentInfo, setPaymentType, clearFormPayment } =
    useCart();
  const [pt, setPt] = useState<string>(paymentType);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title} category='label'>
          Escolha a forma de pagamento
        </Text>

        <View style={styles.formPicker}>
          <Radio
            checked={pt === 'credit_card'}
            onChange={() => setPt('credit_card')}
          >
            Cartão de Crédito
          </Radio>
          <Radio
            checked={pt === 'pix'}
            onChange={() => {
              clearFormPayment();
              setPt('pix');
            }}
          >
            Pix
          </Radio>
        </View>
        <View style={styles.form}>
          {pt === 'credit_card' && (
            <CreditCardForm defaultValue={paymentInfo} />
          )}
          {pt === 'pix' && (
            <Button
              size='giant'
              style={styles.buttonCheck}
              onPress={() => setPaymentType(pt)}
            >
              Revisar pedido
            </Button>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PaymentTypePicker;
