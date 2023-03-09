import { StyleService } from '@ui-kitten/components';
import { Platform, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const style = StyleService.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : getStatusBarHeight(),
  },
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersWrapper: {
    padding: 16
  },

  productItem: {
    margin: 8,
    maxWidth: Dimensions.get("window").width - 16,
    minWidth: Dimensions.get("window").width - 16,
  },

  titleCategory: {
    margin: 0,
    lineHeight: 33,
    textTransform: "capitalize",
  },

  seeMore: {
    margin: 0,
    padding: 0,
    width: 80,
    display: "flex",
    borderRadius: 100,
    textAlign: "center",
    alignItems: "center",
  },

  seeMoreText: {
    color: "#fff",
    fontSize: 11.6,
    fontWeight: "bold",
  },

  itemHeader: {
    height: 140,
  },

  itemFooter: {
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  footerAmount: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  qtd: {
    fontSize: 15,
    fontWeight: "bold",
  },

  stock: {
    fontSize: 10,
  },

  stockEmpty: {
    fontSize: 10,
    color: "red",
  },

  iconButton: {
    paddingHorizontal: 0,
    marginLeft: 8,
  },
});
