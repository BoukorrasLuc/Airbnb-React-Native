import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Logo = () => {
  return (
    <View style={styles.View}>
      <Image
        source={require("../assets/airbnb.png")}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  View: {
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 40,
  },
});
