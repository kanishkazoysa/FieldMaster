import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Appbar, ThemeProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './TemplateViewStyles';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

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
    size={responsiveFontSize(3.7)}
    color='grey'
  />
);
const PerimeterIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='vector-square'
    size={responsiveFontSize(3.7)}
    color='grey'
  />
);

const AreaIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='texture-box'
    size={responsiveFontSize(3.7)}
    color='grey'
  />
);

const CustomMapIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='map-marker-radius'
    size={responsiveFontSize(3.7)}
    color='grey'
  />
);

const CustomEditIcon = ({ navigation }) => (
  <MaterialCommunityIcons
    name='square-edit-outline'
    size={responsiveFontSize(3)}
    color={'white'}
    style={{ marginRight: responsiveWidth(3) }}
  />
);

const TemplateView = ({ route, navigation }) => {
  const { item } = route.params;
  return (
    <>
      <Appbar.Header style={styles.top_Bar} dark={true} mode="center-aligned">
          <Appbar.BackAction
            onPress={() => {
              navigation.navigate("SavedTemplatesScreen");
            }}
          />
          <Appbar.Content title={item.templateName} />
          {/* pencil/ pen icon  */}
          <CustomEditIcon navigation={navigation} />
        </Appbar.Header>
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
          <TouchableOpacity onPress={() => navigation.navigate('Clearland')}>
            <View style={styles.iconOuter_01}>
              <ClearLandIcon />
            </View>
            </TouchableOpacity>
            <Text>Clear land</Text>
          </View>


          <TouchableOpacity onPress={() => navigation.navigate('Plantation')}>


          <View style={styles.iconBlockInner}>
          <TouchableOpacity onPress={() => navigation.navigate('Plantation')}>
            <View style={styles.iconOuter_02}>
              <PlantationIcon />
            </View>
            </TouchableOpacity> 
            <Text>Plantation</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Fence')}>
            <View style={styles.iconBlockInner}>
            <View style={styles.iconOuter_03}>
              <FenceSetupIcon />
            </View>
            <Text>Set fence</Text>
          </View>
        </TouchableOpacity>
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
                  <Text style={styles.text02Styling}>{item.landType}</Text>
                </View>
              </View>
              <View style={styles.blockView}>
                <PerimeterIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Perimeter</Text>
                  <Text style={styles.text02Styling}>{item.perimeter} km</Text>
                </View>
              </View>
            </View>
            <View style={styles.secondDouble}>
              <View style={styles.blockView}>
                <AreaIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Area</Text>
                  <Text style={styles.text02Styling}>{item.area} perches</Text>
                </View>
              </View>
              <View style={styles.blockView}>
                <CustomMapIcon />
                <View style={styles.textView}>
                  <Text style={styles.text01Styling}>Location</Text>
                  <Text style={styles.text02Styling}>{item.location}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Description block */}
        <View style={styles.descriptionBlock}>
          <Text style={styles.text02Styling}>Description</Text>
          <View style={styles.subTextOuter}>
            <Text style={styles.subTextStyle}>{item.description}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default TemplateView;
