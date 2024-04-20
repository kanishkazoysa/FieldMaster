// SelectionModal.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal
} from "react-native";
import { IconButton, Avatar, Button, } from "react-native-paper";
import { useNavigation, } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectionModal = ({
  profileModalVisible,
  setProfileModalVisible,
  email,
}) => {
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setProfileModalVisible(false);
  };
  const navigation = useNavigation();

  const  handleSignOut = async () => {
    setLoading(true);
    await  AsyncStorage.removeItem('token');
   
 

     // Wait for 2 seconds before navigating to the login page
     setTimeout(() => {
      setLoading(false);
      setProfileModalVisible(false);
      navigation.navigate("Login");
    }, 2000);


  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={profileModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              icon="close"
              iconColor="#000"
              size={responsiveFontSize(3.5)}
              onPress={closeModal}
              style={styles.cancelButton}
            />

            <Text style={styles.headerText}>example@gmail.com</Text>
            <View>
              <Avatar.Image
                size={responsiveFontSize(10)}
                source={require("../images/profilePhoto.png")}
              />
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>Hi ,</Text>
              <Text style={styles.nameText}>Jhon</Text>
            </View>

            <Button
              mode="outlined"
              style={styles.ManageButton}
              textColor="#007BFF"
            >
              Manage your account
            </Button>

            <Button
              mode="contained"
              style={styles.signoutButton}
              buttonColor="#007BFF"
              onPress={handleSignOut}
              loading={loading}
            >
              Sign Out
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    marginTop: responsiveHeight(3),
  },
  dot: {
    top: responsiveHeight(-0.6),
  },
  bottomText: {
    color: "#65676B",
    fontSize: responsiveFontSize(1.5),
  },

  ManageButton: {
    borderColor: "#007BFF",
    marginTop: responsiveHeight(1.7),
    width: responsiveWidth(60),
    padding: 1,
  },

  signoutButton: {
    marginTop: responsiveHeight(1.7),
    width: responsiveWidth(40),
    padding: 1,
  },

  settingButton: {
    marginTop: responsiveHeight(1.7),
    width: responsiveWidth(40),
    padding: 1,
  },
  nameText: {
    fontSize: responsiveFontSize(2.3),
    color: "#000",
    marginLeft: 10,
  },
  nameContainer: {
    marginTop: responsiveHeight(2),
    flexDirection: "row",
  },
  headerText: {
    fontSize: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(2.5),
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7 )",
  },

  centeredView: {
    flex: 1,
    marginTop: responsiveHeight(10),
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: responsiveHeight(1),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 9,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: responsiveWidth(80),
    height: responsiveHeight(43),
  },

  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default SelectionModal;

// <Button
// mode="contained"
// style={styles.settingButton}
// buttonColor="#65676B"
// icon="cog-outline"
// >
// Setting
// </Button>


// <View style={styles.bottomContainer}>
// <Text style={styles.bottomText}>Privacy Policy</Text>

// <IconButton icon="circle" size={5} style={styles.dot} />
// <Text style={styles.bottomText}>Terms of Service</Text>
// </View>

