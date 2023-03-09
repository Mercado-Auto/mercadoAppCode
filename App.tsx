import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import App from './src';
export default () => (
  <>
    <SafeAreaProvider>
      <App />
      <StatusBar style='auto' />
    </SafeAreaProvider>
    <Toast />
  </>
);
