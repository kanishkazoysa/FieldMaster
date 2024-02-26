import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity ,StatusBar,ScrollView} from 'react-native';
import { Appbar, ThemeProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const ClearLandIcon = (props) => (
  <MaterialCommunityIcons {...props} name='island' size={25} color='white' />
);

const PlantationIcon = (props) => (
  <MaterialCommunityIcons {...props} name='sprout' size={25} color='white' />
);

const FenceSetupIcon = (props) => (
  <MaterialCommunityIcons {...props} name='fence' size={25} color='white' />
);

const TypeIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='format-list-bulleted-type'
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
    name='texture-box'
    size={25}
    color='grey'
  />
);

const CustomMapIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='map-marker-radius'
    size={25}
    color='grey'
  />
);

const CustomEditIcon = ({ navigation }) => (
  <MaterialCommunityIcons
    name='square-edit-outline'
    size={25}
    color={'white'}
    style={{ marginLeft: 35 }}
    onPress={() => {
      navigation.navigate('EditTemplate');
    }}
  />
);
  
const TemplateView = ({ navigation }) => {

 
  return (
    <>
      <View>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

        {/* Appbar */}
        <Appbar.Header style={styles.top_Bar} dark={true} mode='center-aligned'>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('SavedTemplatesScreen');
            }}
          />
         <View style={{marginTop:40,left:10,width:"67%"}}>
        <Text style={styles.headerText}>Template View</Text>
        </View>
          {/* pencil/ pen icon  */}
          <CustomEditIcon navigation={navigation} />
        </Appbar.Header>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.low_outer}>
        <View style={styles.imageView}>
          <Image
            source={{ uri: 'https://i.ibb.co/9TQd2Bb/map-image.jpg' }}
            style={styles.imageStyling}
          />
        </View>
        {/* icons_block */}
        <View style={styles.iconBlockStyling}>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_01}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('ClearLand');}}><ClearLandIcon /></TouchableOpacity>
            </View>
            <Text>Clear land</Text>
          </View>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_02}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Plantation');
            }}><PlantationIcon /></TouchableOpacity>
            </View>
            <Text>Plantation</Text>
          </View>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_03}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Fence');
            }}><FenceSetupIcon /></TouchableOpacity>
            </View>
            <Text>Fence setup</Text>
          </View>
        </View>
        {/* info_block */}
        <View style={styles.infoBlock}>
          <View>
            <Text style={styles.text02Styling}>Land Type</Text>
          </View>
          <View style={styles.rowView}>
            <View style={styles.firstDouble}>
              <View style={styles.blockView}>
                <TypeIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Type</Text>
                  <Text style={styles.text02Styling}>Flat</Text>
                </View>
              </View>
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
              <View style={styles.blockView}>
                <CustomMapIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Location</Text>
                  <Text style={styles.text02Styling}>Balapitiya</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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

    </>
  );
};

export default TemplateView;

const styles = StyleSheet.create({
 
  testingText: {
    color: 'red',
  },
  low_outer: {
    height: '100%',
  },
  top_Bar: {
    height: 50,
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
    height:"max-content",
  },
  subTextOuter: {
    marginTop: 10,
  },
  subTextStyle: {
    textAlign: 'justify',
  },

});

