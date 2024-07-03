import { StyleSheet, StatusBar, Platform } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  layerIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1),
    borderRadius: 5,
    right: responsiveWidth(4),
    top: responsiveHeight(78),
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "absolute",
    top: responsiveHeight(-16.5),
    right: responsiveWidth(12),
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  dropdownItem: {
    padding: 10,
    color: "#fff",
  },
  markerTouchArea: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  header: {
    height: responsiveHeight(6.5),
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  appbarButton: {
    padding: responsiveWidth(3.5),
  },
  buttonText: {
    color: "white",
    fontSize: responsiveFontSize(2),
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: responsiveHeight(3),
    left: responsiveWidth(3),
    right: responsiveWidth(3),
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#007BFF",
    flex: 1,
  },
  undoIcon: {
    position: "absolute",
    top: -responsiveHeight(17),
    right: responsiveWidth(1),
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: responsiveWidth(1),
    padding: responsiveWidth(2.1),
  },
});

export default styles;
