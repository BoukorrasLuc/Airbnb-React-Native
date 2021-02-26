import React from "react";
// import { useRoute } from "@react-navigation/core";
import { Text, View, Button } from "react-native";

export default function ProfileScreen({ setToken }) {
  return (
    <View>
      {/* <Text>user id : {params.userId} </Text> */}
      {/* params.userId ne fonctionne pas  */}
      <Text>user id : 123 </Text>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
