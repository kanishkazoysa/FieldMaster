import { StyleSheet } from 'react-native';
/* import responsive library of react nativ */
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  testingText: {
    color: 'red',
  },
  low_outer: {
    backgroundColor: 'lightgrey',
    height: '100%',
  },
  top_Bar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0866FF',
    color: 'white',
  },
  textInput: {
    backgroundColor: 'white',
    height: responsiveHeight(6),
    width: '60%',
    marginHorizontal: responsiveWidth(2),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    marginBottom: responsiveHeight(2),
  },
  btnStyle: {
    backgroundColor: '#0866FF',
    padding: responsiveWidth(2),
    margin: responsiveWidth(2),
    borderRadius: 11,
    alignItems: 'center',
  },
  cancelBtnStyle: {
    backgroundColor: '#FF0000',
    padding: responsiveWidth(2),
    margin: responsiveWidth(2),
    borderRadius: 11,
    alignItems: 'center',
  },
  sideIconWrap: {
    position: 'absolute',
    bottom: responsiveHeight(15),
    right: responsiveWidth(3),
    alignContent: 'space-around',
  },
  sideIconStyle: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    padding: responsiveWidth(2.5),
    marginTop: responsiveWidth(2),
  },
  btmBtnStyle: {
    color: 'white',
    paddingHorizontal: responsiveWidth(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(22),
  },
  dropdownItem: {
    padding: responsiveWidth(2),
    color: '#fff',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 0,
    right: responsiveWidth(2),
    backgroundColor: 'rgba(0,0,0, 0.7)',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  locationFocusBtn: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.7)',
    padding: responsiveWidth(2.5),
    borderRadius: responsiveWidth(2.5),
    top: Platform.OS === 'android' ? '20%' : '20%',
    right: responsiveWidth(3),
  },
  clearIconContainer: {
    position: 'absolute',
    left: '75%',
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  layerIconContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.7)',
    padding: responsive,
    borderRadius: 5,
    right: responsiveWidth(3),
    top: Platform.OS === 'android' ? '15%' : '15%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbar: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS === 'android' ? '4%' : '8%',
    alignSelf: 'center',
    left: responsiveWidth(1.5),
    zIndex: 1,
  },
  locationIconContainer: {
    position: 'absolute',
    left: '10%',
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  searchbarInput: {
    borderRadius: 30,
    paddingLeft: responsiveWidth(5),
    height: responsiveHeight(6),
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    color: '#000',
    borderWidth: 1,
    borderColor: '#CED0D4',
  },
  searchbarInputFocused: {
    backgroundColor: '#fff',
    borderColor: '#007BFF',
  },
});

export default styles;
