import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import MainLayoutScreen from '../screens/MainLayoutScreen';
import ProductDetail from '../screens/ProductDetail';

// Auth
// import LoginScreen from '../screens/Authentication/LoginScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import WelcomeScreen from '../screens/Authentication/WelcomeScreen';
import RecoverPasswordScreen from '../screens/Authentication/RecoverPassword';

const AuthNavigator = createStackNavigator();
const AuthScreen = () => (
  <AuthNavigator.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName='Welcome'
  >
    <AuthNavigator.Screen name='Welcome' component={WelcomeScreen} />
    {/* <AuthNavigator.Screen name='Login' component={LoginScreen} /> */}
    <AuthNavigator.Screen name='Register' component={RegisterScreen} />
    <AuthNavigator.Screen
      name='RecoverPassword'
      component={RecoverPasswordScreen}
    />
  </AuthNavigator.Navigator>
);

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
  <Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName='MainLayout'
  >
    <Screen
      name='Auth'
      component={AuthScreen}
      options={{
        presentation: 'modal',
      }}
    />
    <Screen name='MainLayout' component={MainLayoutScreen} />

    <Screen
      name='ProductDetailModal'
      component={ProductDetail}
      options={{
        presentation: 'modal',
      }}
    />
  </Navigator>
);

export const AppNavigation = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);
