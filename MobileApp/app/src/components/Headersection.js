import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';

const Headersection = ({ navigation, title }) => {
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="white"
        />
        <Text style={styles.headerText}>{title}</Text>
      </Appbar.Header>
    </View>
  );
};

const styles = {
  header: {
    height: 50,
    backgroundColor: "#007BFF",

    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    position: "absolute",
    bottom: 7,
    left: 0,
    right: 0,
  },
};

export default Headersection;
