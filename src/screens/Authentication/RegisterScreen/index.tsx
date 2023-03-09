import React from 'react';
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
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { Formik, FormikState } from 'formik';
import Toast from 'react-native-toast-message';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { RegisterUserSchema } from './schema';
import InputMask from '../../../components/InputMask';
import { Masks } from 'react-native-mask-input';
import { AuthService } from '../../../services';

const BackIcon = (props: any) => <Icon {...props} name='arrow-back' />;

interface PropsForm {
  name: string;
  email: string;
  password: string;
  identity: string;
  password2: string;
}

const RegisterScreen = () => {
  const { navigate, goBack } = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (text: string) => {
    return (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{text}</Text>
      </View>
    );
  };

  const renderBackAction = () => (
    <TopNavigationAction
      disabled={isLoading}
      icon={BackIcon}
      onPress={() => goBack()}
    />
  );

  const handleRegister = async (
    values: PropsForm,
    resetForm: (
      nextState?: Partial<FormikState<PropsForm>> | undefined,
    ) => void,
  ) => {
    setIsLoading(true);

    try {
      await AuthService.doRegister({
        name: values.name,
        email: values.email,
        password: values.password,
        identity: values.identity.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
      Toast.show({
        type: 'success',
        text1: 'Usuário cadastrado com sucessso.',
        text2: 'Agora só ir para a tela de login e entrar!',
      });
      navigate(
        'MainLayout' as never,
        {
          screen: 'Profile',
        } as never,
      );
      resetForm({});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro cadastrar sua conta.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.content} level='1'>
        <TopNavigation
          title='Crie sua conta'
          alignment='center'
          accessoryLeft={renderBackAction}
        />
        <Formik
          onSubmit={(values, { resetForm }) => {
            handleRegister(values, resetForm);
          }}
          initialValues={{
            name: '',
            email: '',
            password: '',
            identity: '',
            password2: '',
          }}
          validationSchema={RegisterUserSchema}
        >
          {({
            errors,
            values,
            touched,
            handleSubmit,
            handleChange,
            setFieldValue,
          }) => (
            <ScrollView style={styles.form}>
              <Text category='h5'>
                Digite seus dados pessoais para criar a conta!
              </Text>
              <View style={styles.containerField}>
                <Input
                  label='Nome'
                  value={values.name}
                  style={styles.input}
                  keyboardType='default'
                  placeholder='Digite seu nome'
                  onChangeText={(nextValue) => setFieldValue('name', nextValue)}
                  disabled={isLoading}
                />
                {errors.name &&
                  touched.name &&
                  renderCaption('Por favor, digite um nome valido.')}
              </View>
              <View style={styles.containerField}>
                <Input
                  label='E-Mail'
                  autoCorrect={false}
                  style={styles.input}
                  value={values.email}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  placeholder='Digite seu e-mail'
                  onChangeText={(nextValue) =>
                    setFieldValue('email', nextValue)
                  }
                  disabled={isLoading}
                />
                {errors.email &&
                  touched.email &&
                  renderCaption('Por favor, digite um email valido.')}
              </View>
              <View style={styles.containerField}>
                <InputMask
                  label='CNPJ'
                  disabled={isLoading}
                  mask={Masks.BRL_CNPJ}
                  value={values.identity}
                  keyboardType='numeric'
                  placeholder='00.000.000/0000-00'
                  onChangeText={handleChange('identity')}
                />
                {errors.identity &&
                  touched.identity &&
                  renderCaption(errors.identity)}
              </View>
              <View style={styles.containerField}>
                <Input
                  label='Senha'
                  style={styles.input}
                  value={values.password}
                  accessoryRight={renderIcon}
                  placeholder='Digite sua senha'
                  secureTextEntry={secureTextEntry}
                  onChangeText={(nextValue) =>
                    setFieldValue('password', nextValue)
                  }
                  disabled={isLoading}
                />
                {errors.password &&
                  touched.password &&
                  renderCaption('Por favor, digite uma senha valida.')}
              </View>
              <View style={styles.containerField}>
                <Input
                  style={styles.input}
                  value={values.password2}
                  label='Confirme a Senha'
                  accessoryRight={renderIcon}
                  secureTextEntry={secureTextEntry}
                  placeholder='Confirme a senha escolhida'
                  onChangeText={(nextValue) =>
                    setFieldValue('password2', nextValue)
                  }
                  disabled={isLoading}
                />
                {errors.password2 &&
                  touched.password2 &&
                  renderCaption('As senhas devem ser iguais.')}
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  size='giant'
                  style={styles.fullButton}
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                >
                  {isLoading ? <ActivityIndicator /> : 'Cadastrar-se'}
                </Button>
              </View>
            </ScrollView>
          )}
        </Formik>
      </Layout>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },
  content: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
  },
  buttonContainer: {
    flex: 1,
  },
  fullButton: {
    marginVertical: 8,
  },
  containerField: {
    marginTop: 8,
  },
});
