import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ProfileAvatar = ({ userData, onPress, textSize }) => {
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
        userData.imageUrl ? (
          <Avatar.Image
            size={responsiveFontSize(textSize)}
            source={{ uri: userData.imageUrl }}
          />
        ) : (
          <Avatar.Text
            size={responsiveFontSize(textSize)}
            label={`${(userData.fname ? userData.fname[0] : "").toUpperCase()}${(userData.lname ? userData.lname[0] : "").toUpperCase()}`}
            backgroundColor={getEmailColor(userData.email)}
          />
        )
      ) : null}
    </View>
  );
};

export default ProfileAvatar;
