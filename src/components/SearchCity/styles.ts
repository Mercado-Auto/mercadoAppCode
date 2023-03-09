import { StyleService } from "@ui-kitten/components";

const styles = StyleService.create({
	Container: {
		position: "relative",
	},
	PopOverItems: {
		zIndex: 2,
		padding: 8,
		bottom: -54,
		width: "100%",
		borderWidth: 1,
		borderRadius: 4,
		position: "absolute",
		borderColor: "#E4E9F2",
		backgroundColor: "#F7F9FC",
	},
});

export default styles;
