import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import gravatar from "gravatar-api";

const GravatarComponent = ({ email }) => {
  const gravatarUrl = gravatar.imageUrl({
    email: email,
    parameters: { size: "200", d: "retro" },
    secure: true
  });

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{
          uri: gravatarUrl
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default GravatarComponent;
