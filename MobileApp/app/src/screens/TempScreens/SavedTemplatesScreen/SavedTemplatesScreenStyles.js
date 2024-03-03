import { StyleSheet } from 'react-native';
/* import AppLoading from 'expo-app-loading'; */
/* import { useFonts } from 'expo-font'; */

export const styles = StyleSheet.create({
  top_Bar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0866FF',
    color: 'white',
  },
  title_text: {
    color: 'white',
    fontSize: 20,
  },
  low_outer: {
    backgroundColor: 'lightgrey',
    height: '100%',
  },
  template_style: {
    backgroundColor: 'white',
    marginLeft: 20,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    width: '90%',
    paddingHorizontal: 2,
  },
  image_style: {
    width: 90,
    height: 90,
    left: -29,
  },
  col_01: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col_02: {
    flex: 3,
    left: -54,
  },
  col_03: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    right: -20,
  },
  bold_text: {
    fontWeight: 'bold',
  },
  sub_text_style: {
    color: 'grey',
    top: 10,
  },
  scrollViewOuterStyle: {
    flex: 1,
    marginBottom: 70,
  },
});
