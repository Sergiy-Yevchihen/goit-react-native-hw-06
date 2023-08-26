import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { firestore } from "../firebase/config";

import { authSignOutUser } from "../redux/auth/authOperations";

import Message from "../assets/images/message.svg";
import Like from "../assets/images/like.svg";
import Location from "../assets/images/location.svg";
import Logout from "../assets/images/logout.svg";

export const ProfileScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const [phoneWidth, setPhoneWidth] = useState(Dimensions.get("window").width);
  const [phoneHeight, setPhoneHeight] = useState(
    Dimensions.get("window").height
  );

  const [userPosts, setUserPosts] = useState([]);

  const { login, userId, avatarImage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getUserPosts = async () => {
    try {
      const ref = query(
        collection(firestore, "posts"),
        where("userId", "==", `${userId}`)
      );
      onSnapshot(ref, (snapshot) => {
        setUserPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    } catch (error) {
      console.log("error-message", error.message);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setPhoneWidth(width);
      const height = Dimensions.get("window").height;
      setPhoneHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

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
    <View onLayout={onLayout} style={styles.container}>
      <ImageBackground
        style={{
          ...styles.imageBG,
          width: phoneWidth,
          height: phoneHeight,
        }}
        source={require("../assets/images/imageBG.jpg")}
      >
        <FlatList
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                height: 240,
                width: phoneWidth,
              }}
            >
              <Text style={{ ...styles.textUserName, fontSize: 16 }}>
                У Вас немає постів
              </Text>
            </View>
          }
          ListHeaderComponent={
            <View
              style={{
                ...styles.headerWrapper,
                marginTop: phoneWidth > 500 ? 100 : 147,
                width: phoneWidth,
              }}
            >
              <View
                style={{
                  ...styles.imageThumb,
                  left: (phoneWidth - 120) / 2,
                }}
              >
                <Image
                  style={styles.avatarImage}
                  source={{ uri: avatarImage }}
                />
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => dispatch(authSignOutUser())}
              >
                <Logout />
              </TouchableOpacity>
              <View
                style={{
                  ...styles.userTitleWrapper,
                  width: phoneWidth - 16 * 2,
                }}
              >
                <Text
                  style={{ ...styles.userTitle, fontFamily: "RobotoMedium" }}
                >
                  {login}
                </Text>
              </View>
            </View>
          }
          data={userPosts}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.cardContainer,
                width: phoneWidth,
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{
                  ...styles.cardImage,
                  width: phoneWidth - 16 * 2,
                }}
              />
              <Text
                style={{
                  ...styles.cardTitle,
                  width: phoneWidth - 16 * 2,
                  fontFamily: "RobotoMedium",
                }}
              >
                {item.title}
              </Text>
              <View style={{ ...styles.cardThumb, width: phoneWidth - 16 * 2 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={styles.cardWrapper}
                    onPress={() =>
                      navigation.navigate("Коментарі", {
                        postId: item.id,
                        postPhoto: item.photo,
                        commentsQuantity: item.commentsQuantity,
                      })
                    }
                  >
                    <Message
                      fill={item.commentsQuantity === 0 ? "#BDBDBD" : "#FF6C00"}
                    />
                    <Text style={styles.cardText}>{item.commentsQuantity}</Text>
                  </TouchableOpacity>
                  <View style={{ ...styles.cardWrapper, marginLeft: 24 }}>
                    <Like
                      fill={item.likesQuantity === 0 ? "#BDBDBD" : "#FF6C00"}
                    />
                    <Text style={styles.cardText}>{item.likesQuantity}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.cardWrapper}
                  onPress={() =>
                    navigation.navigate("Мапа", { location: item.location })
                  }
                >
                  <Location />
                  <Text style={styles.cardText}></Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
  },
  headerWrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },

  imageThumb: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  logoutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  userTitleWrapper: {
    alignItems: "center",
    marginTop: 92,
    marginBottom: 32,
  },
  userTitle: {
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  cardContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  cardImage: {
    height: 240,
    resizeMode: "cover",
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  cardThumb: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 35,
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});
