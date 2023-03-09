import { Dimensions, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },

  icon: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 24,
  },

  containerInfo: {
    flex: 1,
  },

  avatar: {
    width: 100,
    height: 100,
    marginBottom: 50,
    alignSelf: 'center',
  },

  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 12,
    paddingBottom: 10,
  },

  titleBtn: {
    backgroundColor: 'red',
  },
});

export default styles;
