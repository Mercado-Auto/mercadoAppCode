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
    flexDirection: 'column',
    alignItems: 'center',
  },

  icon: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
});

export default styles;
