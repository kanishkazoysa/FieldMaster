// SelectionModal.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import { IconButton, Avatar, Button, Icon } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Gravatar from "./Gravatar";

const SelectionModal = ({ profileModalVisible, setProfileModalVisible, email }) => {
  const closeModal = () => {
    setProfileModalVisible(false);
  };
  const navigation = useNavigation();

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
          activeOpacity={1} // Prevents clicks on the overlay from propagating to the modal
          onPress={closeModal}
        />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              icon="close"
              iconColor="#000"
              size={30}
              onPress={closeModal}
              style={styles.cancelButton}
            />

            <Text style={styles.headerText}>example@gmail.com</Text>
            <View>
         
              <Gravatar email={email} />
             
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
            >
              Sign Out
            </Button>

            <Button
              mode="contained"
              style={styles.settingButton}
              buttonColor="#65676B"
              icon="cog-outline"
            >
              Setting
            </Button>

            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>Privacy Policy</Text>
         
             <IconButton icon="circle" size={5} style={styles.dot} />
              <Text style={styles.bottomText}>Terms of Service</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    marginTop:Platform.OS === "ios" ? "9%" : "10%",
  },
  dot: {
   top:Platform.OS === "ios" ? -8 : -6,
  },
  bottomText: {
    color: "#65676B",
    fontSize: 12,
  },

  ManageButton: {
    borderColor: "#007BFF",
    marginTop: 10,
    width: 250,
    padding: 2,
  },

  signoutButton: {
    marginTop: 15,
    width: 150,
    padding: 2,
  },

  settingButton: {
    marginTop: 15,
    width: 150,
    padding: 2,
  },
  nameText: {
    fontSize: 20,
    color: "#000",
    marginLeft: 10,
  },
  nameContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 14,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7 )", // Semi-transparent overlay color
  },

  centeredView: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? "30%" : "20%",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 9,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: "80%",
    height: "57%",
  },

  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default SelectionModal;
