import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
	container: {
		width: width,
	},
	containerText: {
		marginBottom: 5,
		marginLeft: 8,
	},
	containerStatus: {
		marginTop: 5
	},
});

export default styles;
