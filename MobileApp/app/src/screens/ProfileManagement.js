import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Appbar, TextInput, Button,  } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import React, { useEffect, useState } from "react";
import axios from "axios"; // make sure to install axios
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProfileAvatar from "../components/ProfileAvatar";
import * as ImagePicker from "expo-image-picker";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Alert } from "react-native";
import Dialog from "react-native-dialog";

const ProfileManagement = () => {
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prevValue) => prevValue + 1);
  }, [user.imageUrl]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handlePressAvatar = () => {
    Alert.alert(
      "Choose an option",
      "Would you like to open the gallery or use the camera?",
      [
        {
          text: "Open Gallery",
          onPress: pickImage,
        },
        {
          text: "Open Camera",
          onPress: takeImage,
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.1.148:5000/api/users/details",
        {
          headers: { Authorization: token },
        }
      );
      setUser(response.data.user);
    };

    fetchUser();
  }, []);

  const handleConfirm = async () => {
  setLoading(true);
  const token = await AsyncStorage.getItem("token");
  let localUri = image;
  let filename;

  // Prepare the data
  let formData = new FormData();
  formData.append('user', JSON.stringify(user));

  // Check if image is not null
  if (localUri) {
    filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formData.append('photo', { uri: localUri, name: filename, type });
  }

  try {
    const response = await axios.post(
      "http://192.168.1.148:5000/api/users/updateProfile",
      formData,
      { headers: { Authorization: token, 'Content-Type': 'multipart/form-data', } }
    );
    navigation.navigate('Home');
  } catch (error) {
    console.log(error);
    alert("An error occurred");
  }
};
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
      </Appbar.Header>

      <View style={styles.section1}>
        <TouchableOpacity onPress={handlePressAvatar}>
          <ProfileAvatar userData={user} textSize={20} image={image} />
          <Fontisto style={styles.cameraIcon} name="camera" size={responsiveFontSize(3.5)} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.section2}>
        <Text style={styles.text1}>Your Information</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="First Name"
            mode="outlined"
            outlineColor="#d9d7d2"
            activeOutlineColor="#007BFF"
            style={styles.inputField}
            theme={{ roundness: 10 }}
            value={user.fname}
            onChangeText={(text) => setUser({ ...user, fname: text })}
          />
          <TextInput
            label="Last Name"
            mode="outlined"
            outlineColor="#d9d7d2"
            activeOutlineColor="#007BFF"
            style={styles.inputField}
            theme={{ roundness: 10 }}
            value={user.lname}
            onChangeText={(text) => setUser({ ...user, lname: text })}
          />
          <TextInput
            label="Email"
            mode="outlined"
            outlineColor="#d9d7d2"
            activeOutlineColor="#007BFF"
            style={styles.inputField}
            theme={{ roundness: 10 }}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
        </View>
        <Button
          onPress={handleConfirm}
          mode="contained"
          loading={loading}
          style={styles.button}
        >
          Update
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#007BFF",

    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section1: {
    flex: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  section2: {
    flex: 2,
  },
  text1: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(8),
  },
  inputContainer: {
    marginTop: responsiveHeight(3),
    alignItems: "center",
  },
  inputField: {
    width: responsiveWidth(87),
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(2),
    borderRadius: 15,
  },
  button: {
    marginTop: responsiveHeight(10),
    backgroundColor: "#007BFF",
    width: responsiveWidth(60),
    padding: responsiveHeight(0),
    alignSelf: "center",
  },
  cameraIcon:
  { 
    top: responsiveHeight(-4),
    right: responsiveWidth(-31),
  }
});

export default ProfileManagement;
