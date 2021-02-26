import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const stars = (ratingValue) => {
    // Je vais chercher l'info sur ratingValue dans l'api.
    const tab = [];
    //je crée un tableau vide
    for (let i = 1; i <= 5; i++) {
      //Je crée une boucle
      if (ratingValue >= i) {
        tab.push(<Entypo name="star" size={24} color="#FFB100" key={i} />);
        //Si ratingValue est supérieur ou égal à i, je push cette étoile.
      } else {
        tab.push(
          <Entypo name="star-outlined" size={24} color="grey" key={i} />
        );
      }
    }

    return tab;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="black" />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.container}
            // L'utilisateur va naviguer vers la page Room qui corresponds à son id de l'annonce.
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
              });
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri: item.photos[0].url,
              }}
            />
            <View style={styles.price}>
              <Text style={styles.priceText}>{item.price} €</Text>
            </View>
            <View style={styles.informationContainer}>
              <View style={styles.informations}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.reviews}>
                  {stars(item.ratingValue)}
                  <Text style={styles.textReviews}>{item.reviews} reviews</Text>
                </View>
              </View>
              <Image
                style={styles.userPhoto}
                source={{
                  uri: item.user.account.photo.url,
                }}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#CFCFCF",
    borderBottomWidth: 3,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  price: {
    height: 50,
    width: 100,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginTop: 140,
  },
  priceText: {
    fontSize: 20,
    color: "white",
  },
  informationContainer: {
    marginTop: 12,
    flexDirection: "row",
  },
  informations: {
    justifyContent: "center",
    flex: 1,
  },
  reviews: {
    alignItems: "center",
    flexDirection: "row",
  },
  textReviews: {
    color: "#CFCFCF",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },

  userPhoto: {
    width: 70,
    height: 70,
    borderRadius: 40,
    marginLeft: 10,
  },
});
