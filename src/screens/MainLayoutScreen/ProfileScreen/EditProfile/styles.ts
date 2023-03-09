import { Platform } from "react-native";
import { StyleService } from "@ui-kitten/components";
import { getStatusBarHeight } from "react-native-status-bar-height";

const styles = StyleService.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "ios" ? 0 : getStatusBarHeight(),
	},
	editBtn: {
		height: 44,
		marginRight: 10,
	},
	containerContent: {
		flex: 1,
		padding: 24,
		backgroundColor: "background-basic-color-3",
	},
});

export default styles;
