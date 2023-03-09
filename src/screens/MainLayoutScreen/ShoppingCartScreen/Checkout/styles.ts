import { StyleService } from '@ui-kitten/components';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const uiStyles = StyleService.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },
  tab: {
    height: 70,
  },

  content: {
    flex: 1,
  },
});
