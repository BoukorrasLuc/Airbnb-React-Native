import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

export default function AroundMeScreen() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      // Demande d'autorisation d'accès à la localisation de l'appareil
      let { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        // Obtenir les coordonnées GPS
        let location = await Location.getCurrentPositionAsync({});
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      } else {
        setError(true);
      }
      setIsLoading(false);
    };
    askPermission();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : error ? (
        <Text>Permission refusée</Text>
      ) : (
        <View>
          <Text>Latitude de l'utilisateur : {coords.latitude}</Text>
          <Text>Longitude de l'utilisateur : {coords.longitude}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCDCDC",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
