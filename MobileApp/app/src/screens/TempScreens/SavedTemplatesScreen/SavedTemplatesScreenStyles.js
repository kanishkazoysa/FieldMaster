import { StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

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
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  col_01: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col_02: {
    flex: 3,
    paddingHorizontal: 5,
  },
  col_03: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image_style: {
    width: 80,
    height: 80,
  },
  bold_text: {
    fontWeight: 'bold',
  },
  sub_text_style: {
    color: 'grey',
  },
  scrollViewOuterStyle: {
    flex: 1,
    paddingBottom: 100,
  },
});
