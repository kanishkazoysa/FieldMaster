import { StyleSheet ,StatusBar, Platform} from 'react-native';

export const styles = StyleSheet.create({
  testingText: {
    color: 'red',
  },

  top_Bar: {
    height: 45,
    backgroundColor: "#007BFF",

    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },

  headerText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    position: "absolute",
    bottom: 7,
    left: 0,
    right: 0,
  },

  low_outer: {
    height: '100%',
  },

  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageStyling: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  iconBlockStyling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 35,
  },
  iconBlockInner: {
    alignItems: 'center',
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
    marginVertical: 10,
  },
  textView: {
    marginLeft: 10,
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
    marginHorizontal: 40,
    marginTop: 20,
    height: 200,
  },
  subTextOuter: {
    marginTop: 10,
  },
  subTextStyle: {
    textAlign: 'justify',
  },
});
