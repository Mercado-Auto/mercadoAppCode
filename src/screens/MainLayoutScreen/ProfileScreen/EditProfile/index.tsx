import React, { useEffect, useState } from "react";
import {
	Text,
	Icon,
	Input,
	Layout,
	TopNavigation,
	TopNavigationAction,
	Button,
} from "@ui-kitten/components";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../../../hooks";

const BackIcon = (props: any) => <Icon {...props} name="chevron-left" />;

const EditProfile: React.FC = ({ route }: any) => {
	const { info } = route.params;
	const navigation = useNavigation();
	const { currentUser } = useAuth();
	const [value, setValue] = useState<string>("");
	const [value2, setValue2] = useState<string>("");
	const [secureTextEntry, setSecureTextEntry] = React.useState(true);
	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
	);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	const renderIcon = (props: any) => (
		<TouchableWithoutFeedback onPress={toggleSecureEntry}>
			<Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
		</TouchableWithoutFeedback>
	);

	const nameInfo = (info: string) => {
		switch (info) {
			case "name": {
				return "Nome";
			}
			case "email": {
				return "Email";
			}

			case "password": {
				return "Senha";
			}
			default: {
				return "";
			}
		}
	};
	const infoName: string = nameInfo(info);

	useEffect(() => {
		if (info === "email") {
			setValue(currentUser?.email!);
		} else if (info === "name") {
			setValue(currentUser?.name!);
		}
	}, []);
	return (
		<View style={styles.container}>
			<TopNavigation
				title={() => <Text category="h6">{infoName}</Text>}
				accessoryLeft={renderBackAction}
				accessoryRight={() => (
					<Button
						appearance="ghost"
						style={styles.editBtn}
						disabled={value.length > 6 ? false : true}
					>
						<Text>Alterar</Text>
					</Button>
				)}
			/>
			<Layout style={styles.containerContent}>
				<Input
					size="large"
					value={value}
					label={infoName}
					placeholder={`Digite ${
						info == "email" || info == "name" ? "seu" : "sua"
					} ${info == "email" || info == "name" ? "novo" : "nova"} ${String(
						infoName
					).toLowerCase()}`}
					autoCorrect={false}
					autoCapitalize="none"
					onChangeText={(val) => setValue(val)}
					keyboardType={info == "email" ? "email-address" : "default"}
					accessoryRight={info === "password" ? renderIcon : undefined}
					secureTextEntry={info === "password" ? secureTextEntry : false}
				/>
				{info === "password" ? (
					<Input
						size="large"
						value={value2}
						autoCorrect={false}
						autoCapitalize="none"
						keyboardType={"default"}
						style={{ marginTop: 20 }}
						label={"Senha novamente"}
						onChangeText={(val) => setValue2(val)}
						placeholder={"Digite sua senha novamente"}
						accessoryRight={info === "password" ? renderIcon : undefined}
						secureTextEntry={info === "password" ? secureTextEntry : false}
					/>
				) : (
					<></>
				)}
			</Layout>
		</View>
	);
};

export default EditProfile;
