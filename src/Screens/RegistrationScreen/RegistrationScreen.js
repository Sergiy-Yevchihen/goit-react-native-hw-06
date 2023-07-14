import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { fetchRegisterUser } from "../../Redux/auth/authOperations";
import { AntDesign } from "@expo/vector-icons";

const backImage = require("../../Source/BG.png");
const buttonImg = require("../../Source/add.png");

const RegistrationScreen = ({ navigation, route }) => {
  const { photo } = route.params;
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(true);
  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [input1Focused, setInput1Focused] = useState(false);
  const [input2Focused, setInput2Focused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

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
      alert("Enter all data please!!!");
      return;
    }
    if (!isValidEmail(mail)) {
      alert("Enter a valid email address!");
      return;
    }

    dispatch(fetchRegisterUser({ mail, password, login, photo })).then(
      (result) => {
        result.type === "auth/fetchRegisterUser/fulfilled" &&
          navigation.navigate("Home", { screen: "PostsScreen" });
        result.type !== "auth/fetchRegisterUser/fulfilled" &&
          alert("Incorrect registration!!!");
      }
    );
  };

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

  const takePhoto = () => {
    navigation.navigate("ProfilePhotoScreen");
  };

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
                  <Image source={{ uri: photo }} style={styles.photoProf} />
                )}
              </View>
              <TouchableOpacity
                style={styles.addbutton}
                activeOpacity={0.5}
                onPress={takePhoto}
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
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={handlePassword}
                onFocus={handleInput2Focus}
                onBlur={handleInput2Blur}
              />

              <TouchableOpacity
                style={styles.passwShow}
                activeOpacity={0.5}
                onPress={toggleShowPassword}
              >
                <Text style={styles.passwShowText}>
                  {showPassword ? "Show" : "Hide"}
                </Text>
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
    left: "63%",
    top: 10,
    pointerEvents: "auto",
  },
  title: {
    fontWeight: "500",
    fontSize: 30,
    marginTop: 32,
    lineHeight: 35,
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
    lineHeight: 19,
  },
  hiddenButton: {
    opacity: 0,
    height: 0,
    width: 0,
    position: "absolute",
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
    position: "relative",
  },
  inputFocused: {
    borderColor: "#FF6C00",
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
