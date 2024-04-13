import { StyleSheet } from 'react-native';

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
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 12,
  },
  image_style: {
    width: 90,
    height: 90,
    left: 5,
  },
  col_01: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: -8,
  },
  col_02: {
    flex: 3,
    left: -10,
  },
  col_03: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 10,
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
