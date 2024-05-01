import { StyleSheet ,StatusBar, Platform} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  testingText: {
    color: 'red',
  },

  top_Bar: {
    height: responsiveHeight(6.5),
    backgroundColor: "#007BFF",

    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },

  low_outer: {
    height: '100%',
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
  },
  imageStyling: {
    width: responsiveWidth(80),
    height: responsiveHeight(35),
    borderRadius: 20,
  },
  iconBlockStyling: {
   display: 'flex',
    flexDirection: 'row',
    marginTop: responsiveHeight(2.5),
    justifyContent: 'center',
    
  },
  iconBlockInner: {
    alignItems: 'center',
    marginHorizontal: 20,

  },
  iconOuter_01: {
    backgroundColor: '#655757',
    borderRadius: 1000,
    padding: 10,
  },
  iconOuter_02: {
    backgroundColor: '#3AA859',
    borderRadius: 100,
    padding: 10,
  },
  iconOuter_03: {
    backgroundColor: '#5452CC',
    borderRadius: 100,
    padding: 10,
  },
  infoBlock: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 40,
    borderRadius: 10,
    padding: 10,
  },
  landInfoView: {
    backgroundColor: 'red',
  },
  infoView: {
    backgroundColor: 'lightblue',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoTop: {},
  infoBottom: {},
  blockView: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(1),
  },
  textView: {
    marginLeft: responsiveWidth(2),
  },
  text01Styling: {
    color: '#65676B',
    fontWeight: 'bold',
  },
  text02Styling: {
    color: 'black',
    fontWeight: 'bold',
  },
  firstDouble: {},
  secondDouble: {},
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  descriptionBlock: {
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    height: responsiveHeight(20),
  },
  subTextOuter: {
    marginTop: responsiveHeight(1),
  },
  subTextStyle: {
    textAlign: 'justify',
  },
});
