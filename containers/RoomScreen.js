// Correction de corrine. comprendre comment elle a fait.

import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export default function RoomScreen({ route }) {
  const [displayFullText, setDisplayFullText] = useState(false);

  //   console.log(route.params.id);
  return (
    <View>
      <Text>Hello Room</Text>

      {/* <Text>{route.params.id}</Text>

      <Text
        style={{ color: "green" }}
        numberOfLines={!displayFullText ? 3 : null}
        onPress={() => {
          setDisplayFullText(!displayFullText);
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        excepturi sunt tempora, doloribus incidunt dolores tenetur quas sapiente
        consequatur odit velit voluptatum nesciunt facere maxime enim iusto quis
        nemo soluta. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Corrupti odio ratione aspernatur dolorem, minus eius, deserunt
        asperiores porro harum rerum sed delectus quo aperiam recusandae
        pariatur modi maxime quos nihil dolor in et sunt earum debitis totam. Ad
        deleniti quae fugiat, a id, ullam perferendis nisi dolorem sed
        temporibus harum?
      </Text>

      <Text>{displayFullText === false ? "FALSE" : "TRUE"}</Text> */}
    </View>
  );
}
