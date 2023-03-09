import { useNavigation } from "@react-navigation/native";
import { Divider, Layout, LayoutProps, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export interface ProfileSettingProps extends LayoutProps {
	hint: string;
	value: string;
	info: string;
}

export const ProfileSetting = (
	props: ProfileSettingProps
): React.ReactElement => {
	const { navigate } = useNavigation();
	const { style, hint, value, info, ...layoutProps } = props;

	const editInfo = () => {
		navigate(
			"EditProfileModal" as never,
			{
				info,
			} as never
		);
	};

	return (
		<TouchableOpacity onPress={editInfo}>
			<Layout level="1" {...layoutProps} style={[styles.container, style]}>
				<Text appearance="hint" category="s1">
					{hint}
				</Text>
				<Text category="s1">{value}</Text>
			</Layout>
			<Divider />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
