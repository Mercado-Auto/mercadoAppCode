import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
	container: {
		width: width,
	},
});

export default styles;
