import React from "react";
import { StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import Comments from "../../NestedScreens/Comments/Comments";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchAddComment,
  fetchGetAllComments,
} from "../../Redux/comments/commentsOperations";
import { selectUserId, selectUserPhoto } from "../../Redux/auth/authSelectors";

const CommentsTabs = createBottomTabNavigator();

const CommentsNav = ({ navigation, route }) => {
  const [postText, setPostText] = useState("");

  const userPhoto = useSelector(selectUserPhoto);
  const uid = useSelector(selectUserId);
  const { postId, postImg } = route.params;

  const dispatch = useDispatch();

  const setComment = () => {
    if (postText) {
      dispatch(fetchAddComment({ postId, postText, uid, userPhoto }));
      setPostText("");
      return;
    }
    alert("Comment text is empty");
  };

  useEffect(() => {
    dispatch(fetchGetAllComments());
  }, [dispatch]);

  return (
    <CommentsTabs.Navigator
      initialRouteName="Comments"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          borderBottomColor: "#E8E8E8",
          borderBottomWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <CommentsTabs.Screen
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.barStyle}>
                <TextInput
                  style={styles.inputMailPassw}
                  value={postText}
                  onChangeText={(text) => {
                    setPostText(text);
                  }}
                ></TextInput>
                <TouchableOpacity
                  style={styles.addButton}
                  activeOpacity={0.5}
                  onPress={setComment}
                >
                  <Ionicons name="arrow-up-sharp" size={24} color="white" />
                </TouchableOpacity>
              </View>
            );
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerTitleAlign: "center",
          headerTitleStyle: { paddingBottom: 5 },
        }}
        name="Comments"
        component={Comments}
        initialParams={{ postId: postId, postImg: postImg }}
      />
    </CommentsTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#FF6C00",
    height: 34,
    width: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    top: -43,
    left: 150,
  },
  inputMailPassw: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 50,
    borderRadius: 100,
    padding: 16,
    marginTop: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    position: "relative",
    marginTop: 28,
  },
  barStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsNav;
