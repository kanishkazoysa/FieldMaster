import React from 'react';
import { View, Image, Text, ScrollView,StyleSheet ,StatusBar} from 'react-native';
import { Appbar, ThemeProvider, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/* import { Icon } from '@uiw/react-native'; */
import { useState } from 'react';

const ClearLandIcon = (props) => (
  <MaterialCommunityIcons {...props} name='palm-tree' size={25} color='white' />
);

const PlantationIcon = (props) => (
  <MaterialCommunityIcons {...props} name='leaf' size={25} color='white' />
);

const FenceSetupIcon = (props) => (
  <MaterialCommunityIcons {...props} name='fence' size={25} color='white' />
);

const TypeIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='power-socket-eu'
    size={25}
    color='grey'
  />
);
const PerimeterIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='vector-square'
    size={25}
    color='grey'
  />
);

const AreaIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='dice-4-outline'
    size={25}
    color='grey'
  />
);

const EditTemplate = ({ navigation }) => {
  const [measureNameText, setMeasureNameText] = useState('');
  const [landTypeText, setLandTypeText] = React.useState('');

  return (
    <ThemeProvider>
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
      <ScrollView>
        <View style={styles.low_outer}>
          <View style={styles.imageView}>
            <Image
              source={{ uri: 'https://i.ibb.co/9TQd2Bb/map-image.jpg' }}
              style={styles.imageStyling}
            />
          </View>

          {/* info_block */}
          <View style={styles.infoBlock}>
            <View style={styles.rowView}>
              <View style={styles.firstDouble}>
                <View style={styles.blockView}>
                  <PerimeterIcon />
                  <View style={styles.textView}>
                    <Text style={styles.text01Styling}>Perimeter</Text>
                    <Text style={styles.text02Styling}>13km</Text>
                  </View>
                </View>
              </View>
              <View style={styles.secondDouble}>
                <View style={styles.blockView}>
                  <AreaIcon />
                  <View style={styles.textView}>
                    <Text style={styles.text01Styling}>Area</Text>
                    <Text style={styles.text02Styling}>100 Acres</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* input fields */}
          <View style={styles.inputBlock}>
            <Text stye={styles.text02Styling}>Measure Name :</Text>
            <TextInput
              placeholder='Enter Measure Name'
              onChangeText={(text) => setMeasureNameText(text)}
              backgroundColor='#edeff2'
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text stye={styles.text02Styling}>Land Type :</Text>
            <TextInput
              placeholder='Enter Land Type'
              onChangeText={(text) => setLandTypeText(text)}
              backgroundColor='#edeff2'
              style={styles.textInput02}
            />
          </View>
          <View></View>
          {/* Description block */}
          <View style={styles.descriptionBlock}>
            <Text style={styles.text02Styling}>Description</Text>
            <View style={styles.subTextOuter}>
              <Text style={styles.subTextStyle}>
                Nestled amidst the beaches of Balapitiya lies a parcel of land
                that captivates with its vastness and natural splendor. Spanning
                an impressive 100 acres. alike.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default EditTemplate;

export const styles = StyleSheet.create({
  testingText: {
    color: 'red',
  },
  low_outer: {
  
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
    marginHorizontal: 10,
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
    marginHorizontal: 10,
    marginTop: 20,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
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
    marginHorizontal: 120,
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputBlock: {
    marginHorizontal: 10,
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
    width: '65%',
    marginHorizontal: 10,
  },
  textInput02: {
    backgroundColor: 'white',
    height: 40,
    width: '65%',
    marginLeft: 40,
  },
});


