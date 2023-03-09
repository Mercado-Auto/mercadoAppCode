import { Platform, StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },

  coverImage: {
    marginTop: 16,
    alignSelf: 'center',
    width: screenWidth,
    height: 360,
    borderRadius: 8,
    resizeMode: 'contain',
  },

  productName: {
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 64,
    marginTop: 24,
  },

  productReseller: {
    alignSelf: 'center',
    marginVertical: 8,
  },

  categoryList: {
    alignSelf: 'center',
    marginVertical: 8,
  },

  ratingBar: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
  },

  detailsList: {
    alignSelf: 'center',
    marginVertical: 24,
  },

  imagesList: {
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },

  imageItem: {
    width: 180,
    height: 120,
    borderWidth: 0.4,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: 'rgba(0,0,0,0.75)',
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    resizeMode: 'contain',
  },

  sectionLabel: {
    marginHorizontal: 16,
  },

  descriptionLabel: {
    margin: 16,
  },

  buyButton: {
    marginVertical: 24,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 50 : 24,
  },

  buyButtonIcon: {
    width: 18,
    height: 18,
  },

  goBackGallery: {
    top: 30,
    left: 20,
    zIndex: 9,
    width: 30,
    height: 30,
    borderRadius: 100,
    position: 'absolute',
  },
});

export default styles;
