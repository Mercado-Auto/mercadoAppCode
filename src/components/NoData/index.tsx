import Lottie from 'lottie-react-native';
import React from 'react';

import { Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const NoData: React.FC = () => {
  return (
    <View style={styles.container}>
      <Lottie source={require('./animation.json')} autoPlay loop autoSize />
      <Text category='h4' appearance='hint'>
        Sem dados!
      </Text>
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

export default NoData;
