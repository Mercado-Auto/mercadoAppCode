import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Avatar, Icon, ListItem, Text } from '@ui-kitten/components';
import { id } from 'date-fns/locale';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import NotLoggedPanel from '../../../components/NotLoggedPanel';
import { useAuth } from '../../../hooks/index';
import styles from './styles';

const LogoutIcon = (props: any) => (
  <Icon {...props} name='log-out-outline' fill='#8C1010' />
);
const ChevronIcon = (props: any) => (
  <Icon {...props} name='chevron-right-outline' />
);

const ProfileScreen: React.FC = ({ route }: any) => {
  const params = route.params;
  const navigation = useNavigation();
  const lotLoggedComponent = React.useRef<any>();
  const { logged, currentUser, logout } = useAuth();

  const navigateToAddress = () => {
    navigation.navigate('AddressUser' as never);
  };

  const navigateToMyPurchases = () => {
    navigation.navigate('PurchasesUser' as never);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (params && params.openSwip && lotLoggedComponent.current) {
        lotLoggedComponent.current.initPanel();
      }
    }, [params]),
  );

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  };

  return (
    // style={styles.container}
    <>
      {logged && currentUser ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.header}>
            <Text category='h5'>Meu Perfil</Text>
          </View>

          <Avatar
            style={styles.avatar}
            source={require('../../../assets/logos/user.png')}
            resizeMode='contain'
          />
          <View style={styles.containerInfo}>
            <ListItem title='Nome' description={currentUser.name} />
            <ListItem title='E-Mail' description={currentUser.email} />
            <ListItem
              title='CNPJ'
              description={
                currentUser.identity ? formatCNPJ(currentUser.identity) : ''
              }
            />
            <ListItem
              title='Meus endereços'
              description='Gerenciamento de endereços'
              accessoryRight={ChevronIcon}
              onPress={navigateToAddress}
            />
            <ListItem
              title='Minhas compras'
              description='Ver os status das suas compras'
              accessoryRight={ChevronIcon}
              onPress={navigateToMyPurchases}
            />

            <ListItem
              style={{
                marginTop: 32,
              }}
              title={<Text status='danger'>Sair da conta</Text>}
              accessoryRight={LogoutIcon}
              onPress={logout}
            />

            <Text
              style={{
                marginTop: 32,
                textAlign: 'center',
              }}
              category='label'
            >
              Versao do APP: {require('../../../../package.json').version}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <NotLoggedPanel ref={lotLoggedComponent} />
      )}
    </>
  );
};

export default ProfileScreen;
