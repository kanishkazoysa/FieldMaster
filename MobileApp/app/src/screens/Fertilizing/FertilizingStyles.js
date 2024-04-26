import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    /*Top section*/
  
    scrollContent: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
  
    top: {
      alignItems: "center",
      width: "100%",
  
    },
  
    Box1: {
      width: "87%",
      height: 161,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: 40,
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    innerContainer: {
      width: "100%",
      height: "85%",
      backgroundColor: "white",
    },
    titleText: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 16,
    },
    propertyBox: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: 110,
      width: "100%",
      backgroundColor: "white",
      marginTop: 7,
    },
    propertyboxtop: {
      flexDirection: "row",
    },
  
    property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      backgroundColor: "white",
      width: "46%",
      height: 50,
    },
    propertyDetails: {
      flexDirection: "column",
      marginLeft: 5,
      width: "70%",
      height: 40,
      backgroundColor: "white",
    },
    propertyLabel: {
      fontSize: 14,
    },
    propertyValue: {
      fontSize: 16,
      fontWeight: "bold",
    },
  
    /*Second section*/
  
    Box2: {
      width: "95%",
      height: 95,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      marginTop: 30,
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    Box2innerContainer: {
      flexDirection: "column",
      height: "80%",
      width: "90%",
      backgroundColor: "white",
    },
  
    TopText: {
      flexDirection: "row",
    },
  
    Box2titleText: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 5,
    },
  
    selectbuttonBox: {
      flexDirection: "row",
      width: Platform.OS === "ios" ? "80%" : "100%",
      backgroundColor: "white",
      marginTop: 10,
      height: 40,
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    button: {
      borderColor: "#CED0D4",
      borderWidth: 1,
      height: "100%",
      backgroundColor: "#fff",
      borderRadius: 8,
      width: 1,
    },
  
    /*Third section*/
  
    Box3: {
      width: "95%",
      flexDirection: "row",
      height: 50,
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      marginTop: 12,
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      padding: 12,
    },
  
  
    Box3TopText: {
      flexDirection: "row",
    },
  
    Box3titleText: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 10,
    },
  
    /*Fifth Section*/
    Box5: {
      width: "95%",
      height: 85,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      marginTop: 10,
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    Box5propertyBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "Space-between",
      backgroundColor: "white",
      marginTop: 8,
      width: "100%",
    },
  
    dropdownContainer: {
      backgroundColor: "#F0F2F5",
      borderRadius: 10,
      borderColor: "black",
      width: "36%",
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#CED0D4",
    },
  
    Box5bottomText: {
      fontSize: 6,
    },
  
    /* bottom section */
  
    bottom: {
      alignItems: "center",
      bottom: 30,
    },
  
  });