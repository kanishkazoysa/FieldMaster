import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Appbar, TextInput, Button,  } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import ProfileAvatar from "../components/ProfileAvatar";
import * as ImagePicker from "expo-image-picker";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Alert } from "react-native";
import AxiosInstance from "../AxiosInstance";
import { ActivityIndicator } from 'react-native';

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
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await AxiosInstance.get("/api/users/details");
      setUser(response.data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleChangePassword = () => {
    AxiosInstance.post("/api/mail/otp", { email: user.email })
      .then(async (response) => {
        if (response.status == 200) {
          const data = await response.data.otp;
          Alert.alert("OTP sent successfully");
          navigation.navigate("Otp", { email: user.email, Otp: data });
        } else {
          Alert.alert("Error", data.error || "Something went wrong");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          Alert.alert("Error", err.response.data.error);
          return;
        }else{
          Alert.alert("Error", "An error occurred while sending OTP");
        }
      
      });
  };

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
    const response = AxiosInstance.post(
      "/api/users/updateProfile",
      formData,
      { headers: {'Content-Type': 'multipart/form-data', } }
    );
    navigation.navigate('Home');
  } catch (error) {
    console.log(error);
    alert("An error occurred");
  }
};
  return (
    <View style={{ flex: 1 }}>
    {loading && (
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )}
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content style={styles.appbarText} title="Profile" color="white" titleStyle={{ fontSize: 20 }}  />
      </Appbar.Header>

      <ScrollView>
      <View style={styles.section1}>
        <TouchableOpacity onPress={handlePressAvatar}>
        <View style={{borderWidth: 3, borderColor: '#007BFF', borderRadius: 150, padding: 4.5}}>
        <ProfileAvatar userData={user} textSize={16} image={image} />
      </View>
          <Fontisto style={styles.cameraIcon} name="camera" size={responsiveFontSize(2.4)} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.avtarTxt}>
          {user.fname} {user.lname}
          </Text>
          <Text>
          {user.email}
          </Text>
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
          onPress={handleChangePassword}
          mode="outlined"
          textColor="#007BFF"
          loading={loading}
          style={styles.button1}
        >
          Change Password
        </Button>
        <Button
          onPress={handleConfirm}
          mode="contained"
          loading={loading}
          style={styles.button}
        >
          Update
        </Button>
      </View>
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#007BFF",
zIndex:  1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  appbarText: {
    alignItems: "center",
    marginRight: responsiveWidth(12),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section1: {
    flex: 1,
    borderRadius: 30,
    marginTop: responsiveHeight(3),
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
    width: responsiveWidth(82),
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(2),
    borderRadius: 15,
  },
  button1: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(82),
    height: responsiveHeight(5.5),
    alignSelf: "center",
    borderRadius:10,
    borderWidth:1.7,
    borderColor:"#007BFF"
  },
  button: {
    marginTop: responsiveHeight(5),
    backgroundColor: "#007BFF",
    width: responsiveWidth(60),
    padding: responsiveHeight(0),
    alignSelf: "center",
  },
  cameraIcon:
  { 
    top: responsiveHeight(-2.7),
    right: responsiveWidth(-27),
  },
  avtarTxt: {
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(-2),
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProfileManagement;
