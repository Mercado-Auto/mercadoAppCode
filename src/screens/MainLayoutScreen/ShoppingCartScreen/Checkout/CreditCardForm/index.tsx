import {
  Button,
  Divider,
  Icon,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import CardValidator from 'card-validator';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Masks } from 'react-native-mask-input';
import Toast from 'react-native-toast-message';

import InputMask from '../../../../../components/InputMask/index';
import { CC_BRANDS_IMAGES } from '../../../../../utils/cc-brands';

import { useCart } from '../../../../../hooks';
import PaymentCard from '../../../../../interfaces/PaymentCard';
import { PaymentInfoSchema } from './schema';
import { uiStyles } from './styles';
import { getMonthAndYear } from '../../../../../utils/getMonthAndYear';

type IFormCard = {
  cvv: string;
  name: string;
  number: string;
  dateMon: string;
  dateYear: string;
  installments: IndexPath;
};

const CreditCardForm: React.FC<{ defaultValue?: PaymentCard }> = ({
  defaultValue,
}) => {
  const styles = useStyleSheet(uiStyles);
  const { configurePaymentInfo } = useCart();
  const [cvvVisible, setCVVVisible] = useState<boolean>(false);
  const [installments] = useState(
    new Array(12).fill(null).map((_v, _index) => ({
      label: `${_index + 1}x sem juros`,
      value: _index + 1,
    })),
  );
  const [initialValues, setInitialValues] = useState({
    number: '',
    dateMon: '',
    dateYear: '',
    cvv: '',
    name: '',
    installments: 1
      ? new IndexPath(
          installments.findIndex((installment) => installment.value === 1),
        )
      : new IndexPath(0),
  });

  const isLoadingCheckout = false;

  const renderCVVIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={() => setCVVVisible(!cvvVisible)}>
      <Icon {...props} name={cvvVisible ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (
    field: string,
    touched: FormikTouched<any> = {},
    errors: FormikErrors<any> = {},
  ) => {
    return () => {
      return (
        (errors as any)[field] &&
        (touched as any)[field] && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>{(errors as any)[field]}</Text>
          </View>
        )
      );
    };
  };

  const onSubmit = (values: IFormCard) => {
    if (!values.cvv) {
      Toast.show({
        type: 'info',
        text1: `Preencha o código de segurança!`,
      });
      return;
    }

    const cc_number: string = values['number']
      .replace(' ', '')
      .replace(' ', '')
      .replace(' ', '');

    const paymentInfo: PaymentCard = {
      cc_cvv: values.cvv,
      cc_number: cc_number,
      cc_name: values.name!.toUpperCase(),
      cc_due_date: `${values.dateMon}/${values.dateYear}`,
      cc_brand: CardValidator.number(values.number).card!.type,
      installments: installments[values.installments.row].value,
    };

    configurePaymentInfo(paymentInfo);
  };

  const {
    errors,
    values,
    touched,
    setValues,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    onSubmit: onSubmit,
    initialValues: initialValues,
    validationSchema: PaymentInfoSchema,
  });

  useEffect(() => {
    if (defaultValue) {
      const dates = getMonthAndYear(defaultValue.cc_due_date);
      setValues(
        {
          dateMon: dates.dateMon,
          dateYear: dates.dateYear,
          cvv: defaultValue.cc_cvv,
          installments: new IndexPath(
            installments.findIndex(
              (installment) => installment.value === defaultValue.installments,
            ),
          ),
          name: defaultValue.cc_name,
          number: defaultValue.cc_number,
        },
        true,
      );
    }
  }, [defaultValue]);

  return (
    <View style={styles.container}>
      <View style={styles.cardItem}>
        <View style={styles.cardLogoContainer}>
          {values.number &&
            (CardValidator.number(values.number).card &&
            CardValidator.number(values.number).card?.type &&
            (CC_BRANDS_IMAGES as any)[
              CardValidator.number(values.number).card!.type
            ] !== undefined ? (
              <Image
                // style={styles.cardLogo}
                source={
                  (CC_BRANDS_IMAGES as any)[
                    CardValidator.number(values.number.replace(' ', '')).card!
                      .type
                  ]
                }
              />
            ) : null)}
        </View>
        <Text style={styles.cardNumber} category='h6' status='control'>
          {values.number || '____ ____ ____ ____'}
        </Text>
        <View style={styles.cardNameContainer}>
          <Text style={styles.cardDetailsLabel} category='p2' status='control'>
            Nome
          </Text>
          <Text category='s1' status='control'>
            {(values.name || 'SEU NOME').toUpperCase()}
          </Text>
        </View>
        <View style={styles.cardExpirationContainer}>
          <Text style={styles.cardDetailsLabel} category='p2' status='control'>
            Data de expiração
          </Text>
          <Text category='s1' status='control'>
            {values.dateMon || '--'}/{values.dateYear || '--'}
          </Text>
        </View>
      </View>

      <Layout style={styles.form} level='1'>
        <InputMask
          style={styles.input}
          label='Número do Cartão'
          placeholder='1234 1234 1234 1234'
          keyboardType='numeric'
          mask={Masks.CREDIT_CARD}
          caption={renderCaption('number', touched, errors)}
          onChangeText={handleChange('number')}
          onBlur={handleBlur('number')}
          value={values.number}
          disabled={isLoadingCheckout}
        />

        <Input
          style={styles.input}
          label='Nome'
          placeholder='Digite seu nome como está no cartão'
          caption={renderCaption('name', touched, errors)}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          disabled={isLoadingCheckout}
        />

        <View style={styles.middleContainer}>
          <View style={[styles.middleContainer, styles.middleInput]}>
            <Input
              style={[styles.input, styles.middleInput]}
              label='Mês Venc.'
              placeholder='10'
              keyboardType='numeric'
              maxLength={2}
              caption={renderCaption('dateMon', touched, errors)}
              onChangeText={handleChange('dateMon')}
              onBlur={handleBlur('dateMon')}
              value={values.dateMon}
              disabled={isLoadingCheckout}
            />
            <Input
              style={[styles.input, styles.middleInput, { flex: 1.1 }]}
              label='Ano Venc.'
              placeholder='2022'
              keyboardType='numeric'
              maxLength={4}
              caption={renderCaption('dateYear', touched, errors)}
              onChangeText={handleChange('dateYear')}
              onBlur={handleBlur('dateYear')}
              value={values.dateYear}
              disabled={isLoadingCheckout}
            />
          </View>
          <Input
            style={[styles.input, styles.middleInput, { flex: 0.6 }]}
            label='CVV'
            keyboardType='numeric'
            placeholder='***'
            maxLength={3}
            secureTextEntry={!cvvVisible}
            accessoryRight={renderCVVIcon}
            caption={renderCaption('cvv', touched, errors)}
            onChangeText={handleChange('cvv')}
            onBlur={handleBlur('cvv')}
            value={`${values.cvv}`}
            disabled={isLoadingCheckout}
          />
        </View>

        <Select
          style={styles.input}
          label='Parcelas'
          placeholder='Selecione uma parcela...'
          caption={renderCaption('installments', touched, errors)}
          onSelect={(index) => setFieldValue('installments', index, true)}
          value={installments[values.installments.row].label}
          disabled={isLoadingCheckout}
        >
          {installments.map((installment, index) => (
            <SelectItem
              key={`installment-${index}`}
              title={installment.label}
            />
          ))}
        </Select>
      </Layout>
      <Divider />
      <Button
        size='giant'
        style={styles.addButton}
        disabled={isLoadingCheckout}
        onPress={() => handleSubmit()}
      >
        {isLoadingCheckout ? <ActivityIndicator /> : 'Revisar pedido'}
      </Button>
    </View>
  );
};

export default CreditCardForm;
