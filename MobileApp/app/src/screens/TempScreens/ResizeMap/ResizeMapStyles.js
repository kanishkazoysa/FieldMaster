import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
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
  overlay: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  overlayText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    marginHorizontal: 20,
  },
  btnStyle: {
    backgroundColor: "#0866FF",
    paddingVertical: responsiveHeight(1.5),
    margin: responsiveHeight(1.25),
    borderRadius: 17,
    width: responsiveWidth(38),
    alignItems: "center",
  },
  cancelBtnStyle: {
    backgroundColor: "#990C15",
    width: responsiveWidth(38),
    paddingVertical: responsiveHeight(1.5),
    margin: responsiveHeight(1.25),
    borderRadius:17,
    alignItems: "center",
  },
  sideIconWrap: {
    position: "absolute",
    marginRight: responsiveWidth(2.5),
    bottom: responsiveHeight(17),
    right: responsiveWidth(2.5),
    alignContent: "space-around",
  },
  sideIconStyle: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.2),
    borderRadius: 4,
  },
  btmBtnStyle: {
    color: "white",
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
    right: responsiveWidth(5),
    top: Platform.OS === "android" ? "65%" : "27%",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
