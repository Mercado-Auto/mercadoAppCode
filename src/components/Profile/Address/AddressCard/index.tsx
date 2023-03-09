import React from "react";
import {
	Card,
	Layout,
	ListItem,
	Text,
	Button,
	Icon,
	TopNavigationAction,
	SelectItem,
} from "@ui-kitten/components";
import styles from "./styles";
import { View } from "react-native";
import { Address, addrToString } from "../../../../interfaces/Address";
import { AddressService } from "../../../../services";
import { useNavigation } from "@react-navigation/native";

const PinIcon = (props: any) => <Icon {...props} name="pin" />;

const ForwardIcon = (props: any) => (
	<Icon {...props} name="arrow-ios-forward" />
);

interface AddressCardProps {
	item: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ item }) => {
	const { navigate } = useNavigation();
	const editAddress = () => {
		navigate(
			"MainLayout" as never,
			{
				screen: "EditAddress",
				params: { id: item.id },
			} as never
		);
	};

	return (
		<SelectItem
			style={styles.container}
			accessoryLeft={PinIcon}
			accessoryRight={ForwardIcon}
			title={addrToString(item)}
			onPress={editAddress}
		/>
	);
};

export default AddressCard;
