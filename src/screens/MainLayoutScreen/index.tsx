import React from 'react';
import {
  Icon,
  StyleService,
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import { SafeAreaView } from 'react-native';
import FavoriteScreen from './FavoriteScreen';
import AddressUser from './ProfileScreen/Address';
import EditProfile from './ProfileScreen/EditProfile';
import ShoppingCartScreen from './ShoppingCartScreen';
import AddAddressScreen from './ProfileScreen/Address/AddAddress';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditAddressScreen from './ProfileScreen/Address/EditAddress';
import PurchasesScreen from './ProfileScreen/Purchases';
import DetailsPurchase from './ProfileScreen/Purchases/Details';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props: any) => <Icon {...props} name='home-outline' />;
const HeartIcon = (props: any) => <Icon {...props} name='heart-outline' />;
const ShoppingIcon = (props: any) => (
  <Icon {...props} name='shopping-cart-outline' />
);
const PersonIcon = (props: any) => <Icon {...props} name='person-outline' />;
const SearchIcon = (props: any) => <Icon {...props} name='search-outline' />;

const BottomTabBar = ({ navigation, state }: any) => (
  <SafeAreaView style={styles.fullWrapper}>
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={SearchIcon} />
      <BottomNavigationTab icon={ShoppingIcon} />
      <BottomNavigationTab icon={HeartIcon} />
      <BottomNavigationTab icon={PersonIcon} />
    </BottomNavigation>
  </SafeAreaView>
);

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name='Inicio' component={HomeScreen} />
    <Screen name='Buscar' component={SearchScreen} />
    <Screen name='Carrinho' component={ShoppingCartScreen} />
    <Screen
      name='Favoritos'
      component={FavoriteScreen}
      options={{
        unmountOnBlur: true,
      }}
    />
    <Screen name='Profile' component={ProfileScreen} />
    <Screen name='EditProfileModal' component={EditProfile} />
    <Screen name='AddressUser' component={AddressUser} />
    <Screen name='AddAddress' component={AddAddressScreen} />
    <Screen name='EditAddress' component={EditAddressScreen} />

    {/* PURCHASES */}
    <Screen name='PurchasesUser' component={PurchasesScreen} />
    <Screen name='DetailsPurchase' component={DetailsPurchase} />
  </Navigator>
);

const MainLayoutScreen = () => <TabNavigator />;

const styles = StyleService.create({
  fullWrapper: {
    backgroundColor: 'white',
  },
});

export default MainLayoutScreen;
