import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import uuid from "react-native-uuid";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Add from "../assets/images/add.svg";
import Delete from "../assets/images/delete.svg";

import { authSignUpUser } from "../redux/auth/authOperations";

export const RegistrationScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const [pickedImagePath, setPickedImagePath] = useState("");

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  const [isFocusedLogin, setIsFocusedLogin] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  const downloadAvatar = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert(
          "Ви відмовилися дозволити цій програмі доступ до ваших фотографій"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPickedImagePath(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error-message", error.message);
    }
  };

  const deleteAvatar = () => setPickedImagePath("");

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  const loginHandler = (login) => setLogin(login);
  const emailHandler = (email) => setEmail(email);
  const passwordHandler = (password) => setPassword(password);

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(pickedImagePath);
      const file = await response.blob();
      const uniquePostId = uuid.v4();
      const storage = getStorage();
      const storageRef = ref(storage, `avatarImage/${uniquePostId}`);

      await uploadBytes(storageRef, file);

      const photoRef = await getDownloadURL(storageRef);
      return photoRef;
    } catch (error) {
      console.log("error-message.upoload-photo", error.message);
    }
  };

  const onSignup = async () => {
    try {
      if (!login.trim() || !email.trim() || !password.trim()) {
        Alert.alert(`Усі поля мають бути заповнені!`);
        return;
      }

      const imageRef = await uploadPhotoToServer();
      const newUser = {
        avatarImage: imageRef,
        login,
        email,
        password,
      };
      dispatch(authSignUpUser(newUser));
      setLogin("");
      setEmail("");
      setPassword("");
      setPickedImagePath("");
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      onLayout={onLayout}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ImageBackground
            style={{
              ...styles.imageBG,
              width: windowWidth,
              height: windowHeight,
            }}
            source={require("../assets/images/imageBG.jpg")}
          >
            <ScrollView>
              <View
                style={{
                  ...styles.wrapper,
                  width: windowWidth,
                  marginTop: windowWidth > 500 ? 100 : 263,
                }}
              >
                {pickedImagePath ? (
                  <>
                    <View
                      style={{
                        ...styles.imageThumb,
                        left: (windowWidth - 120) / 2,
                      }}
                    >
                      <Image
                        style={styles.avatarImage}
                        source={{ uri: pickedImagePath }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={deleteAvatar}
                      style={{
                        ...styles.addButton,
                        left: windowWidth / 2 + 47.5,
                      }}
                    >
                      <Delete />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        ...styles.imageThumb,
                        left: (windowWidth - 120) / 2,
                      }}
                    ></View>
                    <TouchableOpacity
                      onPress={downloadAvatar}
                      style={{
                        ...styles.addButton,
                        left: windowWidth / 2 + 47.5,
                      }}
                    >
                      <Add />
                    </TouchableOpacity>
                  </>
                )}
                <View style={{ width: windowWidth - 16 * 2 }}>
                  <Text style={{ ...styles.title, fontFamily: "RobotoMedium" }}>
                  Реєстрація
                  </Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedLogin ? "#FF6C00" : "#E8E8E8",
                      fontFamily: "Roboto",
                    }}
                    onFocus={() => setIsFocusedLogin(true)}
                    onBlur={() => setIsFocusedLogin(false)}
                    value={login}
                    placeholder="Логин"
                    textContentType={"emailAddress"}
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={loginHandler}
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                      fontFamily: "Roboto",
                    }}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    value={email}
                    placeholder="Адреса електронної пошти"
                    textContentType={"emailAddress"}
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    onChangeText={emailHandler}
                    keyboardType="email-address"
                  ></TextInput>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                      fontFamily: "Roboto",
                    }}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                    value={password}
                    textContentType={"password"}
                    placeholder="Пароль"
                    cursorColor={"#BDBDBD"}
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={isPasswordHidden}
                    onChangeText={passwordHandler}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.showPassword}
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text
                      style={{
                        ...styles.textShowPassword,
                        fontFamily: "Roboto",
                      }}
                    >
                      {isPasswordHidden ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={onSignup}>
                    <Text
                      style={{ ...styles.textButton, fontFamily: "Roboto" }}
                    >
                      Зареєструватись
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={{ ...styles.link, fontFamily: "Roboto" }}>
                    Вже є обліковий запис? Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  imageThumb: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  addButton: {
    position: "absolute",
    top: 21,
    width: 25,
    height: 25,
  },
  title: {
    marginTop: 92,
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    color: "#212121",
  },
  showPassword: {
    position: "absolute",
    right: 0,
    bottom: 205,
    paddingRight: 16,
  },
  textShowPassword: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  button: {
    height: 51,
    marginTop: 27,
    paddingVertical: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  link: {
    marginTop: 16,
    marginBottom: 60,
    textAlign: "center",
    color: "#1B4371",
  },
});
