import * as React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { styles } from './SaveScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { errorUtils } from '../../../common.app';
import AxiosInstance from '../../../AxiosInstance';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const CustomPerimeterIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='vector-square'
    size={responsiveFontSize(3.7)}
    color='grey'
  />
);
const CustomAreaIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='texture-box'
    size={responsiveFontSize(3.7)}
    color='grey'
  />
);

export function SaveScreen({ navigation, route }) {
  const {
    id,
    area: initialArea,
    perimeter: initialPerimeter,
    userId,
  } = route.params;
  const [perimeter, setPerimeter] = React.useState(
    parseFloat(initialPerimeter).toFixed(2)
  );
  const [area, setArea] = React.useState(parseFloat(initialArea).toFixed(2));
  // rest of the code
  const [templateName, setTemplateName] = React.useState('');
  const [measureName, setMeasureName] = React.useState('');
  const [landType, setLandType] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [descriptionText, setDescriptionText] = React.useState('');

  /* this function is used to save the data */
  const onSaveButtonPress = () => {
    console.log(id);
    console.log(userId);
    console.log('pressed save');
    /* this object is used to store the data item */
    const dataItem = {
      perimeter: perimeter,
      area: area,
      templateName: templateName,
      measureName: measureName,
      landType: landType,
      location: location,
      description: descriptionText,
      id: userId,
    };
    console.log(dataItem);

    /* this is the axios request to update the data */
    AxiosInstance.put(`/api/auth/mapTemplate/updateTemplate/${id}`, dataItem)
      .then((response) => {
        console.log('data updated');
        console.log(response.data);
        navigation.navigate('SavedTemplatesScreen');
      })
      .catch((error) => {
        console.error(errorUtils.getError(error));
      });
  };
  return (
    <View>
      <StatusBar barStyle={'light-content'} backgroundColor={'#0866FF'} />
      <Appbar.Header style={styles.top_Bar_Whole} statusBarHeight={0}>
        <View style={styles.top_Bar_View}>
          <TouchableOpacity onPress={onSaveButtonPress}>
            <View>
              <Text style={styles.top_Text_Styling}>Save</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View>
              <Text style={styles.top_Text_Styling}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Appbar.Header>
      {/* three inner views */}
      <ScrollView style={{ backgroundColor: '#ffffff8a' }}>
        <View style={styles.low_outer}>
          <View style={[styles.inner_View, styles.inner_View_01]}>
            <View style={styles.inner_View_01_inner}>
              <View style={styles.row_01}>
                <Text style={styles.bold_text}>Land Info</Text>
              </View>
              <View style={styles.row_02}>
                <View style={styles.row_02_col_02}>
                  <View style={styles.col_02_col_01}>
                    <CustomPerimeterIcon />
                  </View>
                  <View style={styles.area_col_styling}>
                    <Text style={styles.area_text_styling}>Perimeter</Text>
                    <Text style={styles.bold_text}> {perimeter}km</Text>
                  </View>
                </View>
                <View style={styles.row_02_col_02}>
                  <View style={styles.col_02_col_01}>
                    <CustomAreaIcon />
                  </View>
                  <View style={styles.area_col_styling}>
                    <Text style={styles.area_text_styling}>Area</Text>
                    <Text style={styles.bold_text}> {area} perches</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.inner_View, styles.inner_view_02]}>
            <View style={styles.inner_view_02_inner}>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Template Name :</Text>
                <TextInput
                  style={styles.input_text}
                  value={templateName}
                  onChangeText={(text) => setTemplateName(text)}
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Measure Name :</Text>
                <TextInput
                  style={styles.input_text}
                  value={measureName}
                  onChangeText={(text) => setMeasureName(text)}
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Location :</Text>
                <TextInput
                  style={styles.input_text}
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  outlineColor='black'
                  underlineColor='black'
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Land Type :</Text>
                <TextInput
                  style={styles.input_text}
                  value={landType}
                  onChangeText={(text) => setLandType(text)}
                  outlineColor='black'
                  underlineColor='black'
                />
              </View>
            </View>

            <View style={styles.inner_view_03}>
              <Text style={styles.bold_text1}>Description:</Text>

              <TextInput
                placeholder='Type here...'
                value={descriptionText}
                onChangeText={(text) => setDescriptionText(text)}
                multiline={true}
                numberOfLines={6}
                style={styles.description_input}
                underlineColor='transparent'
              />
            </View>
          </View>
        </View>
      </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default SaveScreen;
