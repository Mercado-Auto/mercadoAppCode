import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GoogleIcon = () => (
  <Icon name='google-outline' fill='#4971B7' style={styles.icon} />
);

const FacebookIcon = () => (
  <Icon name='facebook-outline' fill='#4971B7' style={styles.icon} />
);

const TwitterIcon = () => (
  <Icon name='twitter-outline' fill='#4971B7' style={styles.icon} />
);

const WelcomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.content}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../../assets/logos/Group-2.png')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size='giant'
            style={styles.fullButton}
            onPress={() => {
              navigate(
                'MainLayout' as never,
                {
                  screen: 'Profile',
                  params: { openSwip: true },
                } as never,
              );
            }}
          >
            Já possuo conta
          </Button>
          <Button
            size='giant'
            appearance='ghost'
            style={styles.fullButton}
            onPress={() => {
              navigate(
                'Auth' as never,
                {
                  screen: 'Register',
                } as never,
              );
            }}
          >
            Não possui conta? Cadastre-se
          </Button>

          {/* <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text category="label">OU</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity activeOpacity={0} style={styles.socialButton}>
              <FacebookIcon />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0} style={styles.socialButton}>
              <GoogleIcon />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0} style={styles.socialButton}>
              <TwitterIcon />
            </TouchableOpacity>
          </View> */}
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: `center`,
    paddingBottom: 32,
  },

  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: `center`,
  },

  logo: {
    height: 80,
    resizeMode: 'contain',
  },

  buttonContainer: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: 32,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },

  divider: {
    flex: 1,
    height: 1,
    marginHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  fullButton: {
    marginVertical: 8,
  },

  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  socialButton: {
    marginVertical: 8,
  },

  icon: {
    width: 36,
    height: 36,
  },
});
