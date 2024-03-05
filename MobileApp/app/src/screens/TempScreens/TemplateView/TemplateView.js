import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Appbar, ThemeProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './TemplateViewStyles';

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
    style={{ marginRight: 10 }}
    onPress={() => {
      navigation.navigate('EditTemplate');
    }}
  />
);

const TemplateView = ({ navigation }) => {
  return (
    <>
      <View>
        {/* Appbar */}
        <Appbar.Header style={styles.top_Bar} dark={true} mode='center-aligned'>
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate('SavedTemplatesScreen');
            }}
          />
          <Appbar.Content title='Template Name' />
          {/* pencil/ pen icon  */}
          <CustomEditIcon navigation={navigation} />
        </Appbar.Header>
      </View>
      <View style={styles.low_outer}>
        <View style={styles.imageView}>
          <Image
            source={{ uri: 'https://i.ibb.co/9TQd2Bb/map-image.jpg' }}
            style={styles.imageStyling}
          />
        </View>
        {/* icons_block */}
        <View style={styles.iconBlockStyling}>
          <TouchableOpacity onPress={() => {
              navigation.navigate('Clearland');
            }}>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_01}>
              <ClearLandIcon />
            </View>
            <Text>Clear land</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_02}>
              <PlantationIcon />
            </View>
            <Text>Plantation</Text>
          </View>
          <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_03}>
              <FenceSetupIcon />
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
    </>
  );
};

export default TemplateView;
