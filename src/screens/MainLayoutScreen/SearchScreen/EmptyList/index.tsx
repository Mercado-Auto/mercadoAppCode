import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { Text } from "@ui-kitten/components";

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../../../../assets/animations/search-not-found.json")}
      />
      <Text style={styles.mesage} category="p1">
        Nenhum resultado encontrado!
      </Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mesage: {
    marginTop: 16,
  },
});
