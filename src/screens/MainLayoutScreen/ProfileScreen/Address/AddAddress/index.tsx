import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Masks } from 'react-native-mask-input';
import Toast from 'react-native-toast-message';

import InputMask from '../../../../../components/InputMask';
import LoadingStatus from '../../../../../components/LoadingStatus';
import SearchCity from '../../../../../components/SearchCity';
import { AddressService } from '../../../../../services';
import { readCitiesByCEP } from '../../../../../services/city';
import { AddressSchema } from './schema';
import styles from './styles';

interface AddAddressProps {}

const BackIcon = (props: any) => <Icon {...props} name='chevron-left' />;

const AddAddressScreen: React.FC<AddAddressProps> = () => {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [querySearch, setQuerySearch] = React.useState<string>('');
  const [isLoadingDataCEP, setIsLoadingDataCEP] = React.useState(false);
  const [initialValues, setInitialValues] = useState({
    cep: '',
    city: '',
    street: '',
    number: '',
    district: '',
    complement: '',
  });

  const submitValues = async () => {
    setIsLoading(true);
    try {
      await AddressService.doRegisterAddress({
        ...values,
        cep: (values.cep as string).replace('-', ''),
      });
      Toast.show({
        type: `success`,
        text1: 'Endereço cadastrado com sucesso!',
      });
      navigate(
        'MainLayout' as never,
        {
          screen: 'AddressUser',
        } as never,
      );
      resetForm({});
      setQuerySearch(``);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar endereço.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const {
    errors,
    values,
    isValid,
    touched,
    resetForm,
    setValues,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    onSubmit: submitValues,
    initialValues: initialValues,
    validationSchema: AddressSchema,
  });

  const getCEPinfo = async () => {
    setIsLoadingDataCEP(true);
    try {
      const { data } = await readCitiesByCEP({
        cep: values.cep,
      });
      setQuerySearch(`${data.localidade} - ${data.uf}`);
      setValues({
        number: values.number,
        city: data.localidade ? data.id : '',
        cep: data.cep ? data.cep : values.cep,
        district: data.bairro ? data.bairro : '',
        street: data.logradouro ? data.logradouro : '',
        complement: data.complemento ? data.complemento : '',
      });

      setIsLoadingDataCEP(false);
    } catch {
      setIsLoadingDataCEP(false);
      navigate('AddressUser' as never);
    }
  };

  const renderBackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      disabled={isLoading}
      onPress={() =>
        navigate(
          'MainLayout' as never,
          {
            screen: 'AddressUser',
          } as never,
        )
      }
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {!isLoadingDataCEP ? (
        <Layout style={styles.content} level='1'>
          <TopNavigation
            alignment='center'
            style={styles.header}
            title='Adicionar endereço'
            accessoryLeft={renderBackAction}
          />

          <ScrollView style={styles.form}>
            <View style={styles.containerField}>
              <InputMask
                label='CEP'
                value={values.cep}
                disabled={isLoading}
                onBlur={() => {
                  if (values.cep.length === 9) {
                    getCEPinfo();
                  }
                }}
                mask={Masks.ZIP_CODE}
                keyboardType='numeric'
                placeholder='13234-456'
                onChangeText={handleChange('cep')}
              />

              {errors.cep && touched.cep && (
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>
                    Por favor, digite seu CEP {errors.cep}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.containerField}>
              <SearchCity
                query={querySearch}
                disabled={isLoading}
                setQuerySearch={setQuerySearch}
                setValue={(cityID) => {
                  setFieldValue('city', cityID);
                }}
              />
              {errors.city && touched.city && (
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>
                    Por favor, selecione uma cidade
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.containerField}>
              <Input
                label='Logradouro'
                disabled={isLoading}
                value={values.street}
                placeholder='Insira o logradouro'
                onChangeText={handleChange('street')}
              />
              {errors.street && touched.street && (
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>Digite o logradouro</Text>
                </View>
              )}
            </View>
            <View style={styles.containerField}>
              <Input
                label='Bairro'
                value={values.district}
                placeholder='Insira o bairro'
                onChangeText={handleChange('district')}
                disabled={isLoading}
              />
              {errors.district && touched.district && (
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>Digite o bairro</Text>
                </View>
              )}
            </View>

            <View style={styles.containerField}>
              <Input
                label='Número'
                value={values.number}
                keyboardType={'numeric'}
                placeholder='Insira o numero da casa'
                onChangeText={handleChange('number')}
                disabled={isLoading}
              />
              {errors.number && touched.number && (
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>
                    Por favor, digite o numero da sua casa
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.containerField}>
              <Input
                label='Complemento'
                value={values.complement}
                placeholder='Insira um complemento'
                onChangeText={handleChange('complement')}
                disabled={isLoading}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                style={styles.fullButton}
                onPress={() => handleSubmit()}
                disabled={isLoading || !isValid ? true : false}
              >
                {isLoading ? <ActivityIndicator /> : `Adicionar`}
              </Button>
            </View>
          </ScrollView>
        </Layout>
      ) : (
        <LoadingStatus />
      )}
    </SafeAreaView>
  );
};

export default AddAddressScreen;
