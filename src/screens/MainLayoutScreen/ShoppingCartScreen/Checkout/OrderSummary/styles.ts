import { StyleService } from '@ui-kitten/components';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const uiStyles = StyleService.create({
  container: {
    flex: 1,
  },
  containerWrapper: {
    margin: 8,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderColor: '#efefef',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  image: {
    width: 64,
    height: 64,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },

  cardInfo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
