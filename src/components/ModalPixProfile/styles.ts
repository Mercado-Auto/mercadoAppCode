import { StyleService } from '@ui-kitten/components';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const stylesUi = StyleService.create({
  backdrop: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: Dimensions.get('screen').height * 1.1,
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight() + 38,
  },

  containerHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleModal: {
    marginBottom: 5,
  },

  loadingContainer: {
    width: 10,
    height: 10,
  },

  or: {
    marginVertical: 8,
    textAlign: 'center',
  },

  containerQr: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeBtn: {
    backgroundColor: '#FFFFFF',
  },
});
