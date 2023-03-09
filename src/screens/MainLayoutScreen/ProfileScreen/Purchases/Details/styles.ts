import { Platform } from 'react-native';
import { StyleService } from '@ui-kitten/components';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },
  header: {
    height: 80,
    display: 'flex',
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 20,
  },

  icon: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },

  divider: {
    marginBottom: 0,
    backgroundColor: `rgba(0, 0, 0, .2)`,
  },

  downloadButtton: {
    marginTop: 30,
  },

  paymentContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  payNow: {
    width: 140,
    marginTop: 20,
  },
});

export default styles;
