import { Button, Text } from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import React, { useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginScreen from '../../screens/Authentication/LoginScreen';

const NotLoggedPanel = React.forwardRef((props, ref) => {
  const [isPanelActive, setIsPanelActive] = React.useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        initPanel: () => setIsPanelActive(true),
      };
    },
    [],
  );

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../../assets/animations/user-profile.json')}
      />
      <Text style={styles.mesage} category='p1'>
        Humm, parece que você não entrou na sua conta.
      </Text>

      <Button style={styles.button} onPress={() => setIsPanelActive(true)}>
        Fazer Login
      </Button>
      {isPanelActive && (
        <LoginScreen
          isPanelActive={isPanelActive}
          setIsPanelActive={setIsPanelActive}
        />
      )}
    </View>
  );
});

export default NotLoggedPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mesage: {
    marginTop: 16,
  },
  button: {
    marginTop: 16,
  },
});
