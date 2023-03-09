import { StyleService } from "@ui-kitten/components";
import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const style = StyleService.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
  },

  containerList: {
    flex: 1,
  },

  header: {
    height: 90,
    display: "flex",
    flexDirection: "column",
  },

  logo: {
    height: 50,
    marginTop: 20,
    marginHorizontal: 8,
    resizeMode: "contain",
    width: Dimensions.get("window").width / 2.2,
  },

  titlePage: {
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  containerTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    textTransform: "capitalize",
    justifyContent: "space-between",
  },

  productListWrapper: {
    backgroundColor: "transparent",
  },

  productList: {
    paddingTop: 5,
    paddingBottom: 16,
    paddingHorizontal: 8,
  },

  productItem: {
    margin: 8,
    maxWidth: Dimensions.get("window").width * 0.54,
    minWidth: Dimensions.get("window").width * 0.54,
  },

  productItemBody: {
    height: 100,
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
    height: 72,
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

  modalView: {
    flex: 1,
  },
});

export default style;
