import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { fetchUploadPhoto } from "../../Redux/storage/storageOperations";
import { fetchAddPost } from "../../Redux/posts/postsOperations";
import { selectUserId } from "../../Redux/auth/authSelectors";

const CreatePost = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [inputRegion, setInputRegion] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const uid = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      const locationPos = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: locationPos.coords.latitude,
        longitude: locationPos.coords.longitude,
      };

      setLocation(coords);

      const regionName = await Location.reverseGeocodeAsync(coords);
      setRegion(regionName);
    })();
  }, []);

  const active = title && region;

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      setInputRegion(region[0].country + ", " + region[0].city);
    }
  };

  const inputTitle = (text) => {
    setTitle(text);
  };

  const handleCreate = async () => {
    if (!title || !location || !photo) {
      alert("Please enter all data!!!");
      return;
    }

    const { payload } = await dispatch(fetchUploadPhoto(photo));
    await dispatch(
      fetchAddPost({ photo: payload, title, inputRegion, location, uid })
    );

    navigation.navigate("PostList");
  };

  return (
    <View style={styles.postContainer}>
      <Camera style={styles.postImg} ref={setCamera}>
        <View style={styles.takePhotoContainer}>
          
            <Image
              source={{ uri: photo }}
              style={{ height: 220, width: 220, marginTop: -80 }}
            />
          
        </View>
</Camera>
        <TouchableOpacity
          style={styles.postImgAdd}
          activeOpacity={0.5}
          onPress={takePhoto}
        >
          <FontAwesome name="camera" size={24} color="white" />
        </TouchableOpacity>
      
      <View style={styles.postForm}>
        <TextInput
          style={styles.postName}
          placeholder="Title..."
          inputMode="text"
          onChangeText={inputTitle}
        />
        <TextInput
          style={styles.postName}
          placeholder="Location"
          inputMode="text"
          value={inputRegion}
        />
        <TouchableOpacity
          style={active ? styles.postButtonActive : styles.postButton}
          activeOpacity={0.5}
          onPress={handleCreate}
        >
          <Text style={styles.postButtonText}>Publish</Text>
        </TouchableOpacity>
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
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#fff",
    height: 200,
    width: 200,
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

export default CreatePost;
