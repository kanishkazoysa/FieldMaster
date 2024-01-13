import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

export default function WelcomeScreen() {
    const navigation = useNavigation();
    
    return (
        <View style={{alignItems:"center", justifyContent:"center", flex:1}} >
            <Button
             title="Click here to register"
             onPress={() => navigation.navigate("Register")}
            />
        </View>
    )
}