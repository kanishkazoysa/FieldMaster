import * as React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { styles } from './SaveScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomPerimeterIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='vector-square'
    size={30}
    color='grey'
  />
);
const CustomAreaIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name='texture-box'
    size={30}
    color='grey'
  />
);

export function SaveScreen({ navigation }) {
  const [measureNameText, setMeasureNameText] = React.useState('');
  const [landTypeText, setLandTypeText] = React.useState('');
  const [descriptionText, setDescriptionText] = React.useState('');

  return (
    <View>
      <StatusBar barStyle={'light-content'} backgroundColor={'#0866FF'} />
      {/* get rid of the top white space above the appbar */}
      <Appbar.Header style={styles.top_Bar_Whole} statusBarHeight={0}>
        <View style={styles.top_Bar_View}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SavedTemplatesScreen');
            }}
          >
            <View>
              <Text style={styles.top_Text_Styling}>Save</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.top_Text_Styling}>Cancel</Text>
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
                    <Text style={styles.bold_text}> 1.5km</Text>
                  </View>
                </View>
                <View style={styles.row_02_col_02}>
                  <View style={styles.col_02_col_01}>
                    <CustomAreaIcon />
                  </View>
                  <View style={styles.area_col_styling}>
                    <Text style={styles.area_text_styling}>Area</Text>
                    <Text style={styles.bold_text}> 100 acres</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.inner_View, styles.inner_view_02]}>
            <View style={styles.inner_view_02_inner}>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Measure Name :</Text>
                <TextInput
                  style={styles.input_text}
                  value={measureNameText}
                  placeholder='Measures Name'
                  onChangeText={(text) => setMeasureNameText(text)}
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Land Type :</Text>
                <TextInput
                  style={styles.input_text}
                  value={landTypeText}
                  placeholder='Land Type'
                  onChangeText={(text) => setLandTypeText(text)}
                  outlineColor='black'
                  underlineColor='black'
                />
              </View>
            </View>
          </View>
          <View style={styles.inner_View}>
            <View style={styles.inner_view_03}>
              <Text style={styles.bold_text}>Description:</Text>
              <TextInput
                style={styles.description_input}
                value={descriptionText}
                placeholder='Description'
                onChangeText={(text) => setDescriptionText(text)}
              />
            </View>
          </View>
          <View style={styles.low_outer_02}></View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SaveScreen;
