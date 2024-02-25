import React from 'react';
import { View, Image, Text, StyleSheet,StatusBar } from 'react-native';
import { Appbar, ThemeProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ResizeMap = ({ navigation }) => {
  return (
    <>
      <View>

      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

        {/* Appbar */}
        <Appbar.Header style={styles.top_Bar} dark={true} mode='center-aligned'>
          <View style={styles.appBarContent}>
            
            <Text
              style={styles.appBarTextStyle}
              onPress={() => {
                navigation.navigate('SavedTemplatesScreen');
              }}
            >
              Cancel
            </Text>
            <Text
              style={styles.appBarTextStyle}
              onPress={() => {
                navigation.navigate('SavedTemplatesScreen');
              }}
            >
              Save
            </Text>
          </View>
        </Appbar.Header>
      </View>
      {/* Image view */}
      <View style={styles.imageView}>
        <Image
          style={styles.imageStyling}
          source={{ uri: 'https://i.ibb.co/GkDvJSp/map-img.jpg' }}
        />
      </View>
    </>
  );
};

export default ResizeMap;

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
    backgroundColor: '#007BFF',
    color: 'white',
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyling: {
    width: 395,
    height: 800,
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
    marginHorizontal: 30,
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
    justifyContent: 'space-around',
  },
  descriptionBlock: {
    marginHorizontal: 30,
    marginTop: 20,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  subTextOuter: {
    marginTop: 10,
  },
  subTextStyle: {
    textAlign: 'justify',
  },
  appBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  appBarTextStyle: {
    color: 'white',
    marginHorizontal: 150,
    fontSize: 18,
  },
  inputBlock: {
    marginHorizontal: 30,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    height: 40,
    width: '60%',
    marginHorizontal: 10,
  },
  textInput02: {
    backgroundColor: 'white',
    height: 40,
    width: '60%',
    marginLeft: 40,
  },
});

