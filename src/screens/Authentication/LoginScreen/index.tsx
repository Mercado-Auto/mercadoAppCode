import React from 'react';
import {
  Icon,
  Text,
  Input,
  Layout,
  Button,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {
  View,
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../../hooks/index';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const BackIcon = (props: any) => <Icon {...props} name='arrow-back' />;
const AlertIcon = (props: any) => (
  <Icon {...props} name='alert-circle-outline' />
);

interface Props {
  isPanelActive: boolean;
  setIsPanelActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen: React.FC<Props> = ({ isPanelActive, setIsPanelActive }) => {
  const { login, isLoadingLogin } = useAuth();
  const { navigate, goBack } = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const [panelProps, setPanelProps] = React.useState({
    fullWidth: true,
    openLarge: true,
    onlySmall: true,
    showCloseButton: false,
    isActive: isPanelActive,
    noBackgroundOpacity: true,
    closeOnTouchOutside: true,
    smallPanelHeight: Dimensions.get('screen').height * 0.72,
    onClose: () => closePanel(),
  });

  const closePanel = () => {
    setIsPanelActive(false);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Deve conter pelo menos 8 caracteres
        </Text>
      </View>
    );
  };

  const renderBackAction = () => (
    <TopNavigationAction
      disabled={isLoadingLogin}
      icon={BackIcon}
      onPress={() => goBack()}
    />
  );

  const navigateToRestorePassword = () => {
    navigate(
      'Auth' as never,
      {
        screen: 'RecoverPassword',
      } as never,
    );
  };

  const handleLogin = async () => {
    try {
      await login({
        email,
        password,
      });

      navigate(
        'MainLayout' as never,
        {
          screen: 'Profile',
        } as never,
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao entrar na sua conta',
        text2: 'Por favor, verifique suas credenciais!',
      });
    }
  };

  return (
    <SwipeablePanel {...panelProps}>
      <SafeAreaView style={styles.container}>
        <Layout style={styles.content} level='1'>
          <View style={styles.form}>
            <Text category='h5'>Entre com suas credenciais</Text>
            <Input
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              style={styles.input}
              value={email}
              label='E-Mail'
              placeholder='Digite seu e-mail'
              onChangeText={(nextValue) => setEmail(nextValue)}
              disabled={isLoadingLogin}
            />

            <Input
              style={styles.input}
              value={password}
              label='Senha'
              placeholder='Digite sua senha'
              caption={renderCaption}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) => setPassword(nextValue)}
              disabled={isLoadingLogin}
            />
            <View style={styles.containerLeft}>
              <TouchableOpacity onPress={navigateToRestorePassword}>
                <Text category='c1' style={styles.forgotPassword}>
                  Esqueceu a senha?
                  <Text category='label' style={styles.forgotPasswordStrong}>
                    {' '}
                    clique aqui.
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                size='giant'
                style={styles.fullButton}
                onPress={handleLogin}
                disabled={isLoadingLogin}
              >
                {isLoadingLogin ? <ActivityIndicator /> : 'Entrar'}
              </Button>
              <Button
                size='giant'
                appearance='ghost'
                style={styles.fullButton}
                disabled={isLoadingLogin}
                onPress={() => {
                  navigate(
                    'Auth' as never,
                    {
                      screen: 'Register',
                    } as never,
                  );
                }}
              >
                Cadastre-se
              </Button>
            </View>
          </View>
        </Layout>
      </SafeAreaView>
    </SwipeablePanel>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },

  content: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  input: {
    marginVertical: 8,
  },

  containerLeft: {
    display: 'flex',
  },

  forgotPassword: {
    marginTop: 5,
    marginBottom: 12,
    color: '#8F9BB3',
    textAlign: 'right',
  },

  forgotPasswordStrong: {
    color: '#8F9BB3',
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
    color: '#8F9BB3',
  },
  buttonContainer: {
    flex: 1,
  },
  fullButton: {
    marginVertical: 8,
  },
});
