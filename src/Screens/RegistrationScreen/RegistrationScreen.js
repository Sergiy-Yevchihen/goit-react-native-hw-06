import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRegisterUser } from "../../Redux/auth/authOperations";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

const backImage = require("../../Source/BG.png");
const buttonImg = require("../../Source/add.png");

const RegistrationScreen = ({ navigation, route }) => {
  const { photo } = route.params;
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [inputFocused, setInputFocused] = useState(false);
  const [input1Focused, setInput1Focused] = useState(false);
  const [input2Focused, setInput2Focused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleLogin = (text) => {
    setLogin(text);
  };
  const handleMail = (text) => {
    setMail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleInput1Focus = () => {
    setInput1Focused(true);
  };

  const handleInput1Blur = () => {
    setInput1Focused(false);
  };

  const handleInput2Focus = () => {
    setInput2Focused(true);
  };

  const handleInput2Blur = () => {
    setInput2Focused(false);
  };

  const register = () => {
    if (!login || !mail || !password) {
      alert("Enter all data pleace!!!");
      return;
    }
    dispatch(fetchRegisterUser({ mail, password, login, photo }))
      .unwrap()
      .then(() => {
        navigation.navigate("Home", { screen: "PostsScreen" });
      })
      .catch((error) => {
        alert("Incorrect registration!!!");
      });
  };

  const takePhoto = () => {
    navigation.navigate("ProfilePhotoScreen");
  };

  const passwShow = () => alert(`Your password is: ${password}`);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.maincontainer}>
        <ImageBackground source={backImage} style={styles.backImg}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.containerKeyB}
          >
            <View style={styles.container}>
              <View style={styles.pfotoContainer}>
                {photo && (
                  <Image
                    source={{ uri: `${photo}` }}
                    style={styles.photoProf}
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.addbutton}
                activeOpacity={0.5}
                onPress={() => {
                  takePhoto();
                }}
              >
                <AntDesign name="pluscircleo" size={24} color="red" />
              </TouchableOpacity>
              <Text style={styles.title}>Registration</Text>

              <TextInput
                style={[styles.inputLogin, inputFocused && styles.inputFocused]}
                placeholder="Login"
                inputMode="text"
                value={login}
                onChangeText={handleLogin}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <TextInput
                style={[
                  styles.inputMailPassw,
                  input1Focused && styles.inputFocused,
                ]}
                placeholder="Email address"
                inputMode="email"
                value={mail}
                onChangeText={handleMail}
                onFocus={handleInput1Focus}
                onBlur={handleInput1Blur}
              />
              <TextInput
                style={[
                  styles.inputMailPassw,
                  input2Focused && styles.inputFocused,
                ]}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={handlePassword}
                onFocus={handleInput2Focus}
                onBlur={handleInput2Blur}
              />

              <TouchableOpacity
                style={styles.passwShow}
                activeOpacity={0.5}
                onPress={passwShow}
              >
                <Text style={styles.passwShowText}>Show</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.registerButton,
                  keyboardVisible && styles.hiddenButton,
                ]}
                activeOpacity={0.5}
                onPress={register}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.loginLink,
                  keyboardVisible && styles.hiddenButton,
                ]}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginLinkText}>
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: "center",
  },
  hiddenButton: {
    opacity: 0,
    height: 0,
    width: 0,
    position: "absolute",
  },
  photoProf: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    alignSelf: "center",
  },
  backImg: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  containerKeyB: {
    justifyContent: "flex-end",
  },
  pfotoContainer: {
    position: "relative",
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden",
  },

  addbutton: {
    position: "absolute",
    left: "62%",
    top: 10,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    borderRadius: 8,
    backgroundColor: "#ebebeb",
  },
  inputLogin: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    borderWidth: 1,
    lineHeight: 19,
    borderColor: "#E8E8E8",
  },
  inputMailPassw: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    borderWidth: 1,
    position: "relative",
    borderColor: "#E8E8E8",
  },
  passwShowText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  passwShow: {
    top: -34,
    left: 130,
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  loginLink: {
    marginTop: 16,
    marginBottom: 66,
  },
  loginLinkText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default RegistrationScreen;
