import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGetCommentsByUid } from "../../Redux/comments/commentsOperations";
import { db } from "../../Api/firebase";
import { useSelector } from "react-redux";
import {
  selectCommentsById,
  selectComments,
} from "../../Redux/comments/commentsSelectors";
const img = require("../../Source/Rectangle23.png");

const Comments = ({ navigation, route }) => {
  const { postId, postImg } = route.params;
  const allComments = useSelector(selectComments);
  const comments = allComments.filter((item) => item.postId === postId);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postBody}>
        <Image
          source={{ uri: `${postImg}` }}
          style={{ width: 380, height: 280, borderRadius: 15, marginTop: 15 }}
        />
        <View style={styles.commentList}>
          <FlatList
            data={comments}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item, id }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-around",
                  marginBottom: 30,
                }}
              >
                {comments.indexOf(item) % 2 == 0 ? (
                  <>
                    <View style={{ borderRadius: "50%" }}>
                      <Image
                        source={{ uri: `${item.userPhoto}` }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 25,
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    </View>
                    <View style={styles.commentBody}>
                      <Text>{item.postText}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.commentBody}>
                      <Text>{item.postText}</Text>
                    </View>
                    <View style={{ borderRadius: "50%" }}>
                      <Image
                        source={{ uri: `${item.userPhoto}` }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 25,
                          margin: 0,
                          padding: 0,
                        }}
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          ></FlatList>
        </View>
        {/* </ScrollView>  (comments.indexOf(item))? {<View style = {{ borderRadius: "50%" }}>
                 <Image source={{ uri: `${ item.userPhoto }`}} style={{ width: 40, height: 40, borderRadius: 25, margin: 0, padding: 0 }}/>
            </View>

            <View style={styles.commentBody}>
                 <Text >{ item.postText }</Text>
            </View>} : <View style={styles.commentBody}>
                 <Text >{ item.postText }</Text>
            </View><View style = {{ borderRadius: "50%" }}>
                 <Image source={{ uri: `${ item.userPhoto }`}} style={{ width: 40, height: 40, borderRadius: 25, margin: 0, padding: 0 }}/>
            </View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  commentList: {
    marginTop: 30,
    width: "90%",
    flex: 1,
    justifyContent: "center",
  },
  commentStyle: {
    width: "70%",
    backgroundColor: "#ff0",
  },
  postHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 80,
    width: "100%",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  postHeaderText: {
    fontSize: 22,
    fontWeight: "500",
    marginTop: 20,
  },
  postBody: {
    width: "100%",
    alignItems: "center",
    flex: 10,
    borderTopColor: "#E8E8E8",
    borderRadius: 50,
    borderTopWidth: 1,
  },
  commentBody: {
    minHeight: 60,
    backgroundColor: "#00000008",
    width: "80%",
    paddingBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  postImg: {
    flex: 3,
    width: "100%",
    height: 600,
    color: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  postImgAdd: {
    display: "flex",
    marginTop: -80,
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 3,
    borderColor: "#ffffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  postImgText: {
    alignItems: "flex-start",
    color: "#fff",
  },
  postForm: {
    flex: 3,
  },
  postButton: {
    backgroundColor: "#E8E8E8",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 44,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "400",
  },
  postName: {
    width: 343,
    height: 50,
    borderRadius: 8,
    marginTop: 33,
    padding: 16,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 2,
  },
});

export default Comments;
