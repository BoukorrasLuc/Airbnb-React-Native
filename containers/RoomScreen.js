// // Correction de corrine. comprendre comment elle a fait.

// import React, { useState } from "react";
// import { Button, Text, View } from "react-native";

// export default function RoomScreen({ route }) {
//   const [displayFullText, setDisplayFullText] = useState(false);

//   console.log(route);
//   // Object {
//   //   "key": "Room-ioiaD6KS6Ec325484VK6V",
//   //   "name": "Room",
//   //   "params": Object {
//   //     "id": "58ff73cc1765a9979391c532",
//   //   },
//   // }

//   return (
//     <View>
//       <Text>Hello Room</Text>
//       {/* <Text>{route.params.id}</Text> */}
//       {/* <Text>{route.params.id}</Text>

//       <Text
//         style={{ color: "green" }}
//         numberOfLines={!displayFullText ? 3 : null}
//         onPress={() => {
//           setDisplayFullText(!displayFullText);
//         }}
//       >
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
//         excepturi sunt tempora, doloribus incidunt dolores tenetur quas sapiente
//         consequatur odit velit voluptatum nesciunt facere maxime enim iusto quis
//         nemo soluta. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//         Corrupti odio ratione aspernatur dolorem, minus eius, deserunt
//         asperiores porro harum rerum sed delectus quo aperiam recusandae
//         pariatur modi maxime quos nihil dolor in et sunt earum debitis totam. Ad
//         deleniti quae fugiat, a id, ullam perferendis nisi dolorem sed
//         temporibus harum?
//       </Text>

//       <Text>{displayFullText === false ? "FALSE" : "TRUE"}</Text> */}
//     </View>
//   );
// }

import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

const RoomScreen = ({ route }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const [displayFullText, setDisplayFulllText] = useState(false);

  const star = (ratingValue) => {
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
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: data.photos[0].url,
            }}
          />
          <View style={styles.price}>
            <Text style={styles.priceText}>{data.price} €</Text>
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.informations}>
              <Text style={styles.title} numberOfLines={1}>
                {data.title}
              </Text>
              <View style={styles.reviews}>
                {star(data.ratingValue)}
                <Text style={styles.textReviews}>{data.reviews} reviews</Text>
              </View>
            </View>
            <Image
              style={styles.userPhoto}
              source={{
                uri: data.user.account.photo.url,
              }}
            />
          </View>
          <View>
            <Text
              style={styles.descriptionReviews}
              numberOfLines={!displayFullText ? 3 : null}
              onPress={() => {
                setDisplayFulllText(!displayFullText);
              }}
            >
              {data.description}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  price: {
    height: 50,
    width: 100,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginTop: 190,
  },
  priceText: {
    fontSize: 20,
    color: "white",
  },
  informationContainer: {
    marginTop: 12,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  informations: {
    justifyContent: "center",
    flex: 1,
  },
  reviews: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  textReviews: {
    color: "#CFCFCF",
  },
  descriptionReviews: {
    color: "black",
    paddingHorizontal: 10,
    marginTop: 10,
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
