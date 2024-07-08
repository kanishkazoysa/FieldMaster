import { StyleSheet, Platform, StatusBar } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    responsiveScreenFontSize,
  } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container2: {
      alignItems: "center",
      flex: 1,
    },
    header: {
      height: 45,
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
    cardContent1: {
      marginTop: responsiveHeight(0),
      marginLeft: responsiveWidth(0),
      marginBottom: responsiveHeight(0),
      paddingBottom: responsiveHeight(1.5),
     
    },
    card:{
      height:responsiveHeight(10),
      borderRadius: 11,
      marginTop: responsiveHeight(1),
      paddingBottom: responsiveHeight(0.3),
      width: "93%",
      backgroundColor: "#fff",
    },
    cardTop:{
      flexDirection: "row",
      alignItems: "center",
      marginTop: responsiveHeight(-2),
      marginBottom: responsiveHeight(-3),
      backgroundColor: "white",
    },
    cardHeader:{
      flexDirection: "row",
    },
    card1Top:{
      flexDirection: "row",
      alignItems: "center",
      marginTop: responsiveHeight(-1),
      height: responsiveHeight(3.5),
      width: "100%",
    },
    card1Header:{
      flexDirection: "row",
      width: "100%",
    },
    card1: {
      height: "max-content",
      borderRadius: 11,
      marginTop: responsiveHeight(1),
      paddingBottom: responsiveHeight(-20),
      paddingHorizontal: responsiveHeight(1), 
      width: "93%",
      backgroundColor: "#fff",
    },
  
    weedButton: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: responsiveHeight(0.5),
      marginBottom: responsiveHeight(-1),
      marginLeft: responsiveWidth(20),
    },
    card2: {
      height: "max-content",
      justifyContent: "center",
      marginTop: responsiveHeight(1),
      width: "93%",
      backgroundColor: "#fff",
      borderRadius: 11,
    },
    card2Top:{
      flexDirection: "row",
      alignItems: "center",
      marginTop: responsiveHeight(-1),
      height: responsiveHeight(4),
    },
    card2Header:{
      flexDirection: "row",
      width: "100%",
    },
    countText: {
      marginLeft: responsiveWidth(3.5),
      fontSize: responsiveFontSize(2.2),
    },
    card3: {
      height: "max-content",
      marginTop: responsiveHeight(1),
      marginBottom: responsiveHeight(3),
      paddingBottom: responsiveHeight(0.3),
      width: "93%",
      borderRadius: 11,
      backgroundColor: "#fff",
    },
    cardTopText: {
      marginLeft: responsiveWidth(1),
    },
   
    cardContent: {
      display: "flex",
      flexDirection: "row",
      marginTop: responsiveHeight(-1),
      marginLeft: responsiveWidth(-1),
      
    },
    calButtton: {
      marginTop: responsiveHeight(4),
      bottom: responsiveHeight(2),
      alignItems: "center",
    },
    Searchbar: {
      backgroundColor: "#F0F2F5",
      height: responsiveHeight(4.5),
      width: responsiveWidth(65),
    },
    addButton: {
      width: responsiveWidth(5),
      height: responsiveHeight(3.5),
      borderRadius: 11,
      marginTop: responsiveHeight(3.5),
      marginLeft: responsiveWidth(4.5),
      justifyContent: "center",
      alignItems: "center",
    },
    addButtonText: {
      color: "#fff",
      width: "45%",
      height: responsiveFontSize(2.5),
      marginTop: responsiveHeight(0.4),
      marginBottom: responsiveHeight(1),
    },
  
    displayValuesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: responsiveHeight(1),
      alignItems: "center",
      backgroundColor: "white",
      height: "max-content",
      borderRadius: 11,
      width: "100%",
    },
    displayValueContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginRight: responsiveWidth(1.2),
      marginLeft: responsiveWidth(1.2),
      marginBottom: responsiveHeight(1),
      borderRadius: 8,
      padding: responsiveWidth(0.6),
      borderWidth: 1,
      borderColor: "#007BFF",
    },
    displayValueText: {
      fontSize: responsiveFontSize(1.4),
      marginRight: responsiveWidth(1),
      color: "#007BFF",
    },
    closeButton: {},
    closeButtonText: {
      color: "white",
    },
    button: {
      borderColor: "#CED0D4",
      borderWidth: 1,
      backgroundColor: "#fff",
      borderRadius: 11,
      width: responsiveWidth(25),
      height: responsiveHeight(4.5),
      marginLeft: responsiveWidth(-20),
      marginTop: responsiveHeight(3),
    },
    pressedButton: {
      borderColor: "#0866FF",
    },
    text: {
      marginLeft: responsiveScreenFontSize(0.2),
      marginRight: responsiveFontSize(1),
      fontSize: responsiveFontSize(1.8),
      paddingVertical: responsiveHeight(0),
      paddingHorizontal: responsiveWidth(0),
      marginTop: responsiveHeight(0.4),
      marginBottom: responsiveHeight(1),
      color: "#CED0D4",
    },
    pressedText: {
      color: "#0866FF",
    },
    Dropdown1: {
      backgroundColor: "#F0F2F5",
      borderRadius: 10,
      width: "40%",
      height: responsiveHeight(4),
      alignItems: "center",
      justifyContent: "center",
      marginLeft: responsiveWidth(-82),
      marginTop: responsiveHeight(3.5),
    },
    Dropdown2: {
        backgroundColor: "#F0F2F5",
        borderRadius: 10,
        width: "40%",
        height: responsiveHeight(4),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: responsiveWidth(-87),
        marginTop: responsiveHeight(3.5),
      
    },
    Dropdown3: {
      backgroundColor: "#F0F2F5",
        borderRadius: 10,
        width: "100%",
        height: responsiveHeight(4),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: responsiveWidth(-4),
        marginTop: responsiveHeight(1),
    },
    machineAddButton: {
      width: responsiveWidth(30),
      height: responsiveHeight(3.5),
      borderRadius: 11,
      marginTop: responsiveHeight(2),
      justifyContent: "center",
      alignItems: "center",
    },
    SearchbarContainer: {
      marginBottom: responsiveHeight(0.2),
    },
    suggestionItem: {
      borderWidth: responsiveWidth(0.1),
      borderColor: "#ccc",
      borderRadius: 5,
      padding: responsiveHeight(1),
      marginTop: responsiveHeight(0.5),
      backgroundColor: "#f9f9f9",
    },
  });