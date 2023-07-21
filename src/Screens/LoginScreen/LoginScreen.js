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
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
const backImage = require("../../Source/BG.png");
import { useSelector } from "react-redux";
import { selectIsAuth, selectUser } from "../../Redux/auth/authSelectors";
import { useDispatch } from "react-redux";
import {
  fetchLoginUser,
  fetchCurrentUser,
} from "../../Redux/auth/authOperations";
import { fetchGetAllPosts } from "../../Redux/posts/postsOperations";

const LoginScreen = ({ navigation }) => {
  const logedIn = useSelector(selectIsAuth);

  const [input1Focused, setInput1Focused] = useState(false);
  const [input2Focused, setInput2Focused] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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

  useEffect(() => {
    if (logedIn) {
      navigation.navigate("Home", { screen: "PostsScreen" });
    }
  }, [logedIn, navigation]);

  //state
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  //redux
  const dispatch = useDispatch();

  const handleMail = (text) => {
    setMail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const register = () => {
    if (!mail || !password) {
      alert("Enter all data pleace!!!");
      return;
    }
    dispatch(fetchLoginUser({ mail, password })).then((result) => {
      result.type === "auth/fetchLoginUser/fulfilled" &&
        navigation.navigate("Home", { screen: "PostsScreen" });
      result.type !== "auth/fetchLoginUser/fulfilled" &&
        alert("Incorrect login!!!");
    });
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
              <Text style={styles.title}>Login</Text>

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
                onPress={() => {
                  register();
                }}
              >
                <Text style={styles.registerButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.loginLink,
                  keyboardVisible && styles.hiddenButton,
                ]}
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Registratione", {})}
              >
                <Text style={styles.loginLinkText}>
                  Don't have an account? Register
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
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addbutton: {
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
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
    borderWidth: 1,
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
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  inputFocused: {
    borderColor: "#FF6C00",
    borderRadius: 8,
    backgroundColor: "#ebebeb",
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
  hiddenButton: {
    opacity: 0,
    height: 0,
    width: 0,
    position: "absolute",
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

export default LoginScreen;
