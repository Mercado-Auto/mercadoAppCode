import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
  },
});

export default styles;
