import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
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
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Masks } from 'react-native-mask-input';
import Toast from 'react-native-toast-message';
import InputMask from '../../../../../components/InputMask';
import LoadingStatus from '../../../../../components/LoadingStatus';
import SearchCity from '../../../../../components/SearchCity';
import { AddressService } from '../../../../../services';
import { readCitiesByCEP } from '../../../../../services/city';
import { AddressSchema } from './schema';
import styles from './styles';

const BackIcon = (props: any) => <Icon {...props} name='chevron-left' />;

const EditAddressScreen: React.FC = ({ route }: any) => {
  const { id } = route.params;
  const [initialValues, setInitialValues] = useState({
    id: '',
    cep: '',
    city: '',
    street: '',
    number: '',
    district: '',
    complement: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const { navigate, dispatch } = useNavigation();
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [querySearch, setQuerySearch] = React.useState<string>('');
  const [isLoadingDataCEP, setIsLoadingDataCEP] = React.useState(false);

  const getCEPinfo = async () => {
    setIsLoadingDataCEP(true);
    try {
      const { data } = await readCitiesByCEP({
        cep: values.cep,
      });

      setQuerySearch(`${data.localidade} - ${data.uf}`);

      setValues({
        id: values.id,
        number: values.number,
        createdAt: values.createdAt,
        updatedAt: values.updatedAt,
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

  const goBack = () => {
    navigate(
      'MainLayout' as never,
      {
        screen: 'AddressUser',
      } as never,
    );
    dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'EditAddress' },
          {
            name: 'Profile',
            params: { id: '' },
          },
        ],
      }),
    );
  };

  const renderBackAction = () => (
    <TopNavigationAction
      disabled={loadingEdit || loadingDelete}
      icon={BackIcon}
      onPress={goBack}
    />
  );

  const loadData = async (id: string) => {
    let cancelController: AbortController;
    try {
      setLoading(true);
      cancelController = new AbortController();
      const { data } = await AddressService.readAdressesOfUser(
        cancelController,
        id,
      );
      setQuerySearch(`${data.city.name} - ${data.city.uf}`);

      setValues({
        id: data.id,
        cep: data.cep,
        street: data.street,
        number: data.number,
        city: data.city.name,
        district: data.district,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        complement: data.complement,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao buscar dados.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
    } finally {
      setLoading(false);
    }

    return () => {
      cancelController && cancelController.abort();
    };
  };

  const handlerUpdate = async (): Promise<void> => {
    setLoadingEdit(true);
    try {
      await AddressService.doEditAddress(
        {
          ...values,
          cep: (values.cep as string).replace('-', ''),
        },
        id,
      );
      Toast.show({
        type: 'success',
        text1: `Endereço editado com sucessso!`,
      });
      goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao editar endereço.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
    } finally {
      setLoadingEdit(false);
    }
  };

  const {
    errors,
    values,
    isValid,
    touched,
    setValues,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    onSubmit: handlerUpdate,
    initialValues: initialValues,
    validationSchema: AddressSchema,
  });

  const handlerDelete = async (): Promise<void> => {
    setLoadingDelete(true);
    try {
      await AddressService.doDeleteAddress(id);
      Toast.show({
        type: 'success',
        text1: `Endereço removido com sucessso!`,
      });
      goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao remover endereço.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
    } finally {
      setLoadingDelete(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData(id);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading || isLoadingDataCEP ? (
        <LoadingStatus />
      ) : (
        <Layout style={styles.content} level='1'>
          <TopNavigation
            alignment='center'
            style={styles.header}
            title='Editar endereço'
            accessoryLeft={renderBackAction}
          />
          <ScrollView style={styles.form}>
            <View style={styles.containerField}>
              <InputMask
                label='CEP'
                value={values.cep}
                onBlur={() => {
                  if (values.cep.length === 9) {
                    getCEPinfo();
                  }
                }}
                mask={Masks.ZIP_CODE}
                keyboardType='numeric'
                placeholder='13234-456'
                onChangeText={handleChange('cep')}
                disabled={loadingEdit || loadingDelete}
              />

              {errors.cep && touched.cep && (
                <View style={styles.captionContainer}>
                  <Text style={styles.captionText}>
                    Por favor, digite seu CEP
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.containerField}>
              <SearchCity
                query={querySearch}
                setQuerySearch={setQuerySearch}
                setValue={(cityID) => {
                  setFieldValue('city', cityID);
                }}
                disabled={loadingEdit || loadingDelete}
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
                value={values.street}
                placeholder='Insira o logradouro'
                onChangeText={handleChange('street')}
                disabled={loadingEdit || loadingDelete}
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
                disabled={loadingEdit || loadingDelete}
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
                disabled={loadingEdit || loadingDelete}
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
                disabled={loadingEdit || loadingDelete}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={loadingEdit || loadingDelete}
                style={styles.finishBtn}
                onPress={() => handleSubmit()}
              >
                {loadingEdit ? <ActivityIndicator /> : `Salvar`}
              </Button>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                status='danger'
                appearance='outline'
                onPress={handlerDelete}
                style={styles.finishBtn}
                disabled={
                  loadingEdit || loadingDelete || !isValid ? true : false
                }
              >
                {loadingDelete ? <ActivityIndicator /> : `Deletar`}
              </Button>
            </View>
          </ScrollView>
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default EditAddressScreen;
