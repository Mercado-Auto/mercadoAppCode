import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
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
import { Formik, FormikState } from 'formik';
import { RecoverPasswordSchema } from './schema';
import { AuthService } from '../../../services';
import Toast from 'react-native-toast-message';
import { getErrorMsg } from '../../../utils/get-error';

const BackIcon = (props: any) => <Icon {...props} name='arrow-back' />;

const RecoverPasswordScreen: React.FC = () => {
  const { navigate, goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => goBack()} />
  );

  const onSubmit = async (
    values: { email: string },
    resetField: (
      nextState?:
        | Partial<
            FormikState<{
              email: string;
            }>
          >
        | undefined,
    ) => void,
  ) => {
    setIsLoading(true);
    try {
      await AuthService.doRecoverPassrword(values);
      setIsLoading(false);
      goBack();
      resetField();
      Toast.show({
        visibilityTime: 5000,
        type: 'success',
        text1: 'Instruções enviadas com sucesso.',
        text2: 'Instruções de recuperação enviadas para o e-mail cadastrado!',
      });
    } catch (error: any) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar as instruções.',
        text2: 'Por favor, tente novamente mais tarde!',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.content} level='1'>
        <TopNavigation
          title='Recuperar senha'
          alignment='center'
          accessoryLeft={renderBackAction}
        />
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values, resetForm);
          }}
          validationSchema={RecoverPasswordSchema}
        >
          {({ values, touched, errors, setFieldValue, handleSubmit }) => (
            <View style={styles.form}>
              <View style={styles.containerField}>
                <Input
                  label='Insira seu e-mail para receber o link de recuperação'
                  disabled={isLoading}
                  autoCorrect={false}
                  value={values.email}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  placeholder='Digite seu e-mail'
                  onChangeText={(nextValue) =>
                    setFieldValue('email', nextValue)
                  }
                />
                {touched.email && errors.email ? (
                  <View style={styles.captionContainer}>
                    <Text style={styles.captionText}>{errors.email}</Text>
                  </View>
                ) : null}
              </View>

              <Button
                size='giant'
                disabled={isLoading}
                style={styles.fullButton}
                onPress={() => handleSubmit()}
              >
                {isLoading ? <ActivityIndicator /> : 'Recuperar senha'}
              </Button>
            </View>
          )}
        </Formik>
      </Layout>
    </SafeAreaView>
  );
};

export default RecoverPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },

  subTitle: {
    marginBottom: 10,
  },

  containerField: {
    marginVertical: 10,
  },

  form: {
    flex: 1,
    padding: 16,
  },

  captionContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  captionText: {
    fontSize: 12,
    color: 'red',
    fontWeight: '400',
  },

  buttonContainer: {
    flex: 1,
  },
  fullButton: {
    marginVertical: 8,
  },
});
