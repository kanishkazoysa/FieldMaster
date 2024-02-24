import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { Appbar, ThemeProvider, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './EditTemplateStyle';
/* import { Icon } from '@uiw/react-native'; */

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
  <MaterialCommunityIcons {...props} name='crop' size={25} color='grey' />
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
  return (
    <ThemeProvider>
      <View>
        {/* Appbar */}
        <Appbar.Header style={styles.top_Bar} dark={true} mode='center-aligned'>
          <View style={styles.appBarContent}>
            <Text
              style={styles.appBarTextStyle}
              onPress={() => {
                navigation.navigate('SavedTemplatesScreen');
              }}
            >
              Save
            </Text>
            <Text
              style={styles.appBarTextStyle}
              onPress={() => {
                navigation.navigate('SavedTemplatesScreen');
              }}
            >
              Cancel
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
              value={'Rubber estate'}
              onChangeText={(text) => setText(text)}
              backgroundColor='#edeff2'
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputBlock}>
            <Text stye={styles.text02Styling}>Land Type :</Text>
            <TextInput
              value={'Flat'}
              onChangeText={(text) => setText(text)}
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
