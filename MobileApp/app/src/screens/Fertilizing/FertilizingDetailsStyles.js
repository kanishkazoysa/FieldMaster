import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({

    container: {
      flex: 1,
    },
  
    /*Top Section*/
  
    scrollContent: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
  
    top: {
      alignItems: "center",
      width: "100%",
    },
  
    box1: {
      flexDirection: "column",
      backgroundColor: "white",
      width: "87%",
      height: 123,
      marginTop: 40,
      alignItems: "center",
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    titleText: {
      fontSize: 15,
      fontWeight: "bold",
      marginTop: 10,
    },
  
    propertyBox: {
      width: "98%",
      height: "70%",
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  
    property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center", 
      backgroundColor: "white",
      width: "46%",
      height: 50,
      padding: 7,
    },
  
    propertyDetails: {
      flexDirection: "column",
      marginLeft: 5,
      width: "70%",
      height: 40,
      backgroundColor: "white",
    },
  
    propertyLabel: {
      fontSize: 15,
    },
  
    propertyValue: {
      fontSize: 16,
      fontWeight: "bold",
    },
  
    /*Second Section*/
  
    box2: {
      width: "87%",
      height: 80,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: 15,
      borderRadius: 11,
      padding: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    box2Property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      backgroundColor: "white",
      width: "46%",
      height: 50,
    },
    box2PropertyDetails: {
      flexDirection: "column",
      marginLeft: 5,
      width: "50%",
      height: 40,
      backgroundColor: "white",
    },
    Box2PropertyLabel: {
      fontSize: 14,
    },
    Box2PropertyValue: {
      fontSize: 16,
      fontWeight: "bold",
    },
  
    /*Third Section*/
  
    box3: {
      width: "87%",
      height: 200,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: 15,
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    inner: {
      width: "80%",
      height: "80%",
      backgroundColor: "white",
    },
  
    innertopText: {
      fontSize: 15,
      fontWeight: "bold",
    },
  
    center: {
      marginTop: 15,
    },
  
    innercenter: {
      flexDirection: "row",
      width: "100%",
      height: 45,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      marginVertical: 1,
    },
  
    innersquareleft: {
      width: "50%",
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
    },
  
    innersquareright: {
      width: "45%",
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
    },
  
    RightText: {},
  
    LeftText: {
      backgroundColor: "white",
      width: "70%",
      textAlign: "right",
    },
  
    /* bottom section */
  
    bottom: {
      alignItems: "center",
      bottom: 30,
    },
  
  
  });