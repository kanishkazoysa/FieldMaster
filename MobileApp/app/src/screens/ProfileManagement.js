import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Appbar, TextInput, Button, Avatar } from "react-native-paper";
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
import * as DocumentPicker from "expo-document-picker";

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

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.1.102:5000/api/users/details",
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
      "http://192.168.1.102:5000/api/users/updateProfile",
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
        <TouchableOpacity onPress={pickImage}>
          <ProfileAvatar userData={user} textSize={20} image={image} />
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
  Avatar: {},
});

export default ProfileManagement;
