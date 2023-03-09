import { Platform } from 'react-native';
import { StyleService } from '@ui-kitten/components';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },
  content: {
    flex: 1,
  },

  header: {
    height: 80,
    display: 'flex',
  },

  form: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    color: 'red',
    fontSize: 12,
    fontWeight: '400',
  },
  buttonContainer: {
    flex: 1,
  },
  fullButton: {
    marginVertical: 20,
  },
  containerField: {
    marginTop: 8,
  },
});

export default styles;
