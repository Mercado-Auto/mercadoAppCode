import { StyleService } from '@ui-kitten/components';

export const uiStyles = StyleService.create({
  container: {
    marginHorizontal: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  cardItem: {
    height: 192,
    padding: 24,
    borderRadius: 4,
    marginVertical: 16,
    backgroundColor: 'color-primary-400',
  },
  cardLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLogo: {
    tintColor: 'text-control-color',
  },
  cardOptionsButton: {
    position: 'absolute',
    right: -16,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cardNumber: {
    marginVertical: 24,
  },
  cardDetailsLabel: {
    marginVertical: 4,
  },
  cardNameContainer: {
    position: 'absolute',
    left: 24,
    bottom: 24,
  },
  cardExpirationContainer: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  placeholderCard: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 192,
    margin: 8,
    backgroundColor: 'background-basic-color-3',
  },
  creditCardIcon: {
    alignSelf: 'center',
    width: 48,
    height: 48,
    tintColor: 'text-hint-color',
  },
  buyButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  form: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 24,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  middleContainer: {
    flexDirection: 'row',
  },
  middleInput: {
    flex: 1,
  },
  addButton: {
    marginVertical: 24,
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
    fontSize: 12,
    fontWeight: '400',
    color: 'color-danger-400',
  },
});
