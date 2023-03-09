import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { Text } from "@ui-kitten/components";

const FavoriteEmpty = () => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../../../../assets/animations/favorite-heart.json")}
      />
      <Text style={styles.mesage} category="p1">
        Sua lista de favoritos está vazia!{"\n"}Favorite seus produtos queridos :)
      </Text>
    </View>
  );
};

export default FavoriteEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mesage: {
    marginTop: 16,
    textAlign: 'center'
  },
});
