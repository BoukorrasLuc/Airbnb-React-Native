import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  // useNavigation Permet de naviguer
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        { email: email, password: password }
      );
      if (response.data.token) {
        setToken(response.data.token);
      } else {
        alert("An error has occurred, please try again");
      }
    } catch (error) {
      // alert(error.message);
      if (error.response.status === 401) {
        setErrorMessage("Please fill all fields");
      }
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.scrollView}>
      <StatusBar
        barStyle="dark-content"
        // dark-content, light-content and default
        backgroundColor="white"
        //Background color of statusBar
      />
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/airbnb.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Sign in</Text>
        <View style={styles.login}>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            placeholderTextColor="#c8c8c8"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            placeholderTextColor="#c8c8c8"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />

          <Text style={styles.textError}>{errorMessage}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonConnecter}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.buttonInscrire}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 900,
  },
  logo: {
    height: 140,
    marginTop: -100,
    marginLeft: 10,
  },
  logoText: {
    color: "#717171",
    fontSize: 20,
  },
  button: {
    width: 190,
    height: 65,
    borderRadius: 50,
    borderColor: "#F9585D",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  buttonConnecter: {
    color: "#868686",
    fontSize: 24,
  },
  buttonInscrire: {
    marginTop: 15,
    color: "#868686",
  },
  textInput: {
    borderBottomColor: "#FFC2C7",
    borderBottomWidth: 1,
    width: 330,
    height: 45,
    marginBottom: 30,
    color: "black",
  },
  textError: {
    marginTop: 15,
    color: "#FA7C80",
  },
  login: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
