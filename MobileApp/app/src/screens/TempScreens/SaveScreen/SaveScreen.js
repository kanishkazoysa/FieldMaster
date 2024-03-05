import * as React from 'react';
import { Text, View, StatusBar,KeyboardAvoidingView,Platform } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { styles } from './SaveScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native';

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
       <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
    >
      <StatusBar barStyle={'light-content'} backgroundColor={'#007BFF'} />
      {/* get rid of the top white space above the appbar */}
      <Appbar.Header style={styles.top_Bar_Whole}>
        <View style={styles.top_Bar_View}>
        <Text style={styles.top_Text_Styling}>Cancel</Text>

          <Text
            style={styles.top_Text_Styling}
            onPress={() => {
              navigation.navigate('SavedTemplatesScreen');
            }}
          >
            Save
          </Text>
        </View>
      </Appbar.Header>
      <ScrollView >
        
        <View style={styles.low_outer}>
         <View style={styles.Box1}>
          <View>
            <Text style={styles.titleText}>Land Info</Text>
            <View style={styles.propertyBox}>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="vector-square"
                  size={36}
                  color="gray"
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Perimeter</Text>
                  <Text style={styles.propertyValue}>1.5Km</Text>
                </View>
              </View>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="texture-box"
                  size={36}
                  color="gray"
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Area</Text>
                  <Text style={styles.propertyValue}>100 acres</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

     
            
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Measure Name  :</Text>
                <TextInput
                  style={styles.input_text}
                  value={measureNameText}
                  placeholder='Measures Name'
                  placeholderTextFontSize={12}
                  onChangeText={(text) => setMeasureNameText(text)}
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Land Type :</Text>
                <TextInput
                  style={styles.input_text}
                  value={landTypeText}
                  placeholder='Enter Land Type'
                  onChangeText={(text) => setLandTypeText(text)}
                  outlineColor='black'
                  underlineColor='black'
                />
             </View>

      
            <View style={styles.inner_view_03}>
              <Text style={styles.bold_text1}>Description:</Text>
             

              <TextInput
              placeholder="Type here..."
              value={descriptionText}
              onChangeText={(text) => setDescriptionText(text)}
              multiline={true}
              numberOfLines={6} // Optional: Set the number of lines to display initially
              style={styles.description_input}
              underlineColor="transparent"
              />

            </View>
          </View>
       
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SaveScreen;
