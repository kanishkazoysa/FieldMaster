import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  top_Bar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    color: 'white',
  },
  title_text: {
    color: 'white',
    fontSize: responsiveFontSize(2.5),
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
    paddingVertical: responsiveHeight(1),
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
