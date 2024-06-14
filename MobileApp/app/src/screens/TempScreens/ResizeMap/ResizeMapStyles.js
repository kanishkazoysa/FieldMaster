import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: responsiveHeight(0),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    marginBottom: responsiveHeight(2),
  },
  btnStyle: {
    backgroundColor: "#0866FF",
    padding: responsiveHeight(1.25),
    margin: responsiveHeight(1.25),
    borderRadius: responsiveWidth(2.75),
    alignItems: "center",
  },
  cancelBtnStyle: {
    backgroundColor: "#FF0000",
    padding: responsiveHeight(1.25),
    margin: responsiveHeight(1.25),
    borderRadius: responsiveWidth(2.75),
    alignItems: "center",
  },
  sideIconWrap: {
    position: "absolute",
    bottom: responsiveHeight(15),
    right: responsiveWidth(2.5),
    alignContent: "space-around",
  },
  sideIconStyle: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.5),
    marginTop: responsiveHeight(1.25),
  },
  btmBtnStyle: {
    color: "white",
    paddingHorizontal: responsiveWidth(12.5),
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(12.5),
  },
  dropdownItem: {
    padding: responsiveHeight(1.25),
    color: "#fff",
  },
  dropdownContainer: {
    position: "absolute",
    top: responsiveHeight(0),
    right: responsiveWidth(13),
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderRadius: responsiveWidth(1.25),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: responsiveWidth(0),
      height: responsiveHeight(0.25),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button2: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.25),
    borderRadius: responsiveWidth(1.25),
    top: Platform.OS === "android" ? "15%" : "18%",
    right: responsiveWidth(2.5),
    marginTop: responsiveHeight(0.25),
  },
  clearIconContainer: {
    position: "absolute",
    left: "75%",
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  layerIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.25),
    borderRadius: responsiveWidth(1.25),
    right: responsiveWidth(2.5),
    top: Platform.OS === "android" ? "10%" : "27%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
