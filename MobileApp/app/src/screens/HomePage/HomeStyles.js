import { StyleSheet, Platform } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  locationIconContainer: {
    position: 'absolute',
    left: responsiveWidth(5),
    top: '50%',
    transform: [{ translateY: responsiveHeight(-1.4) }],
    zIndex: 1,
  },
  layerIconContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.7)',
    padding: responsiveHeight(1.5),
    borderRadius: 5,
    right: responsiveWidth(3),
    top: responsiveHeight(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 0,
    right: 50,
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
  dropdownItem: {
    padding: 10,
    color: '#fff',
  },
  button2: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.7)',
    padding: responsiveHeight(1.5),
    borderRadius: 5,
    top: responsiveHeight(17),
    right: responsiveWidth(3),
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: responsiveHeight(4),
    left: 16,
    right: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: responsiveWidth(3),
  },
  button: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  searchbar: {
    width: '99%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS === 'android' ? '4%' : '8%',
    zIndex: 1,
  },
  searchbarInput: {
    borderRadius: 30,
    paddingLeft: 40,
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
  map: {
    width: '100%',
    height: '100%',
  },
  clearIconContainer: {
    position: 'absolute',
    right: '20%',
    top: '50%',
    transform: [{ translateY: responsiveHeight(-1.4) }],
    zIndex: 1,
  },
  markerContainer: {
    backgroundColor: 'black',
    borderRadius: 40,
    padding: 5,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapDetailsPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;
