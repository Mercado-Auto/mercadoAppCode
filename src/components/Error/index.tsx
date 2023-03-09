import Lottie from 'lottie-react-native';
import React, { PropsWithChildren } from 'react';

import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const Error: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text category='h4' appearance='hint'>
        Houve um error!
      </Text>
      <Text category='h6' appearance='hint'>
        Estamos corrigindo para você.
      </Text>
      <Lottie
        source={require('./animation.json')}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
});

export default Error;
