import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ProfileAvatar = ({ userData, onPress, textSize , image }) => {
  const serverUrl = "http://192.168.1.148:5000"; // Replace with your server URL

  const getEmailColor = (email) => {
    if (!email) {
      return "#000000"; // Return a default color if email is undefined
    }
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  return (
    <View>
      {userData ? (
        image || userData.imageUrl ? (
          <Avatar.Image
            size={responsiveFontSize(textSize)}
            source={{
              uri: image || `${serverUrl}/${userData.imageUrl}`, // Use the new image if it exists, otherwise use the existing one
            }}
          />
        ) : (
          <Avatar.Text
            size={responsiveFontSize(textSize)}
            label={`${(userData.fname ? userData.fname[0] : "").toUpperCase()}${
              (userData.lname ? userData.lname[0] : "").toUpperCase()
            }`}
            backgroundColor={getEmailColor(userData.email)}
          />
        )
      ) : null}
    </View>
  );
};

export default ProfileAvatar;