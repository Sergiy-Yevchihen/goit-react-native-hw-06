import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
  TextInput,
} from "react-native";

import { useSelector } from "react-redux";

import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/config";

import Send from "../../assets/images/send.svg";

export const CommentsScreen = ({ route }) => {
  const [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [allComments, setAllComments] = useState([]);

  const [comment, setComment] = useState("");

  const commentHandler = (comment) => setComment(comment);

  const { postId, postPhoto, commentsQuantity } = route.params;

  const { login, avatarImage } = useSelector((state) => state.auth);

  const uploadCommentToServer = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    try {
      const postDocRef = await doc(firestore, "posts", postId);
      await addDoc(collection(postDocRef, "comments"), {
        comment,
        login,
        date,
        time,
        commentAvatar: avatarImage,
      });
      await updateDoc(postDocRef, { commentsQuantity: commentsQuantity + 1 });
    } catch (error) {
      console.log("error-message", error.message);
    }
  };

  const onSendComment = () => {
    if (!comment.trim()) {
      Alert.alert(`Введіть свій коментар, будь ласка`);
      return;
    }
    uploadCommentToServer();
    Keyboard.dismiss();
    Alert.alert(`Ваш коментар успішно надіслано!`);
    setComment("");
  };

  const getAllComments = async () => {
    try {
      const postDocRef = await doc(firestore, "posts", postId);
      onSnapshot(collection(postDocRef, "comments"), (snapshot) => {
        setAllComments(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (error) {
      console.log("error-message.get-comments", error.message);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
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
    <View
      onLayout={onLayout}
      style={{ backgroundColor: "#FFFFFF", alignItems: "center" }}
    >
      <View style={{ width: windowWidth - 16 * 2 }}>
        <FlatList
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ ...styles.container, width: windowWidth - 16 * 2 }}>
              <Image style={styles.commentImage} source={{ uri: postPhoto }} />
            </View>
          }
          ListFooterComponent={
            <View style={{ width: "100%", marginBottom: 32 }}>
              <TextInput
                value={comment}
                style={styles.input}
                placeholder="Коментувати..."
                cursorColor={"#BDBDBD"}
                placeholderTextColor={"#BDBDBD"}
                onChangeText={commentHandler}
              ></TextInput>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={onSendComment}
              >
                <Send style={{ width: 34, height: 34 }} />
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={{ width: windowWidth - 16 * 2 }}
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.commentWrapper,
                width: windowWidth - 16 * 2,
              }}
            >
              <Image
                source={{ uri: item.commentAvatar }}
                style={styles.commentAvatarImage}
              />
              <View
                style={{
                  ...styles.textWrapper,
                  width: windowWidth - 28 - 16 * 3,
                }}
              >
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text style={styles.commentDate}>
                  {item.date} | {item.time}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  commentImage: {
    height: 240,
    width: "100%",
    marginBottom: 31,
    borderRadius: 8,
  },
  commentWrapper: {
    flexDirection: "row",
    marginBottom: 24,
  },
  textWrapper: {
    padding: 16,
    backgroundColor: "#00000008",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  commentAvatarImage: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: 16,
    resizeMode: "cover",
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  input: {
    marginTop: 7,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  sendButton: {
    position: "absolute",
    top: 15,
    right: 8,
  },
});
