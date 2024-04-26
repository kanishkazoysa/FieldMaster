import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    /*Top section*/
  
    scrollContent: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
  
    },
  
    top: {
      alignItems: "center",
      width: "100%",
    },
  
    Box1: {
      width: "87%",
      height: 101,
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: 30,
      padding: 12,
      marginBottom: 20,
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
    },
  
  
    titleText: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 16,
    },
  
    propertyBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      width: "100%",
      backgroundColor: "white",
      marginTop: 7,
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
      width: "50%",
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
      width: "93%",
      height: 85,
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      marginTop: 10,
      borderRadius: 11,
      padding: 18,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 4,
    },
  
    TopText: {
      flexDirection: "row",
    },
  
    Box2titleText: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 10,
    },
  
    Box2input: {},
  
    /*Third section*/
  
  
  
    Box3propertyBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "Space-between",
      backgroundColor: "white",
      marginTop: 10,
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
  
    /* bottom section */
  
    bottom: {
      alignItems: "center",
      bottom: 30,
    },
  });
  