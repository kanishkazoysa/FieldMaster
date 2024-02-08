import React, { useState } from "react";
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import { Appbar } from 'react-native-paper';

  export default function Home() {
    const navigation = useNavigation();
return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to the Home Screen</Text>
      </View>
    </View>
  );

  }
    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: "#fff",
        },
       
        header: {
            color: "#fff",
        backgroundColor: "#007BFF",
        ...Platform.select({
            android: {
            marginTop: StatusBar.currentHeight,
            },
        }),
        },
        content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        },
        text: {
        fontSize: 20,
        },
    });