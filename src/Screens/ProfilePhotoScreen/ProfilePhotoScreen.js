import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { fetchUploadPhoto } from "../../Redux/storage/storageOperations";
import { Camera } from "expo-camera";
import firebase from "../../Api/config";

const ProfilePhotoScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    if (!camera) return;

    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const uploadPhotoToServer = async (photoUri) => {
    try {
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const uniquePostId = Date.now().toString();
      const ref = firebase.storage().ref(`postImage/${uniquePostId}`);
      await ref.put(blob);
      const photoUrl = await ref.getDownloadURL();
      return photoUrl;
    } catch (error) {
      console.error("Error uploading photo: ", error);
      throw error;
    }
  };

  const handleCreate = async () => {
    if (!photo) {
      alert("Take a photo!");
      return;
    }

    try {
      const uploadedPhotoUrl = await uploadPhotoToServer(photo);
      const { payload } = await dispatch(fetchUploadPhoto(uploadedPhotoUrl));
      navigation.navigate("Registratione", { photo: payload });
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  return (
    <View style={styles.postContainer}>
      <Camera style={styles.postImg} ref={setCamera}>
        <Image
          source={{ uri: photo }}
          style={{ height: 220, width: 220, marginTop: -80 }}
        />
      </Camera>

      <TouchableOpacity
        style={styles.postImgAdd}
        activeOpacity={0.5}
        onPress={takePhoto}
      >
        <FontAwesome name="camera" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={photo ? styles.postButtonActive : styles.postButton}
        activeOpacity={0.5}
        onPress={handleCreate}
      >
        <Text style={styles.postButtonText}>Publish</Text>
      </TouchableOpacity>

      <Text style={styles.postImgText}>Add photo</Text>
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
  postImg: {
    flex: 3,
    width: "100%",
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  postImgAdd: {
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
});

export default ProfilePhotoScreen;
