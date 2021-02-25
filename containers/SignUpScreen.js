import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SingUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async () => {
    try {
      // Je dois améliorer les conditions si l'email est déjà dans la base de données ainsi que l'username
      if (password !== confirmPassword) {
        setErrorMessage("Passwords must be the same");
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          { email, username, description, password }
        );
        console.log(response.data);

        if (response.data.token) {
          setToken(response.data.token);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/airbnb.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Sign up</Text>
        <View style={styles.Signup}>
          <TextInput
            style={styles.textInput}
            placeholder="email"
            placeholderTextColor="#c8c8c8"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="username"
            placeholderTextColor="#c8c8c8"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            multiline={true}
            numberOfLines={8}
            maxLength={100}
            style={styles.textArea}
            placeholder="description"
            placeholderTextColor="#c8c8c8"
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            placeholderTextColor="#c8c8c8"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.textError}>{errorMessage}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="confirm password"
            placeholderTextColor="#c8c8c8"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonInscrire}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.buttonConnecter}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 900,
  },
  logo: {
    height: 140,
    marginTop: 10,
    marginLeft: 10,
  },

  logoText: {
    fontSize: 24,
    color: "#717171",
  },

  Signup: {
    padding: 24,
    flex: 1,
    alignItems: "center",
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
  buttonInscrire: {
    color: "#868686",
    fontSize: 24,
  },
  buttonConnecter: {
    marginTop: 15,
    color: "#868686",
  },
  textInput: {
    borderBottomColor: "#FFC2C7",
    borderBottomWidth: 2,
    width: 320,
    height: 45,
    marginBottom: 15,
    paddingLeft: 15,
    color: "black",
  },
  textArea: {
    width: 330,
    height: 80,
    borderColor: "#FFC2C7",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    textAlignVertical: "top",
    color: "black",
    marginBottom: 20,
  },
  textError: {
    marginTop: 15,
    color: "#FA7C80",
  },
});
