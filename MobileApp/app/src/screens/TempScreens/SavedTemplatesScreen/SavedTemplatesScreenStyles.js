import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(6.5),
    backgroundColor: "#007BFF",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },

  loadingScreen: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dotsWrapper: {
    width: 100,
  },
  
  top_Bar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    color: 'white',
  },
  icon_style: {
    padding: 5,
  },
  icon_style1: {
    padding: 5,
    top: 10,
  },
  title_text: {
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(16.5),
  },
  low_outer: {
    marginTop: 10,
    height: '100%',
  },
  template_style: {
    backgroundColor: 'white',
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(3),
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: responsiveHeight(2),
    //add shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image_style: {
    width: responsiveWidth(22),
    height: responsiveHeight(11),
    left: responsiveWidth(1),
  },
  col_01: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: responsiveWidth(-2),
  },
  col_02: {
    flex: 3,
    left: responsiveWidth(-2),
  },
  col_03: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: responsiveWidth(2),
  },
  bold_text: {
    fontWeight: 'bold',
  },
  sub_text_style: {
    color: 'grey',
    top: responsiveHeight(1),
  },
  scrollViewOuterStyle: {
    flex: 1,
    paddingBottom: responsiveHeight(10),
  },
});
