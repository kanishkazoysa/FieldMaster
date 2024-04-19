import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import Headersection from '../../components/Headersection';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../AxiosInstance';

export default function Fence() {
  const route = useRoute();
  const templateId = route.params.id;
  const [FenceTypeselectedValue, setFenceTypeSelectedValue] = useState(null);
  const [PostSpaceUnitselectedValue, setPostSpaceUnitSelectedValue1] =
    useState(null);
  const [inputValueFenceLength, setinputValueFenceLength] = useState('');
  const [inputValueFenceAmount, setinputValueFenceAmount] = useState('');
  const [inputValuePostspace, setinputValuePostspace] = useState('');
  useEffect(() => {
    console.log('Fence Route', templateId);
  }, []);
  const [perimeter, setperimeter] = useState('1500');
  const [totalstickamount, settotalstickamount] = useState(0);
  const navigation = useNavigation();

  const [displayValues, setDisplayValues] = useState([]);
  let inputValueFenceAmountRef = useRef(null); // Declare a ref for the second input field

  const handleInputPostspaceChange = (text) => {
    setinputValuePostspace(text);
  };
  const handleFenceLengthChange = (text) => {
    setinputValueFenceLength(text);
  };

  const handleFenceAmountChange = (text) => {
    setinputValueFenceAmount(text);
  };

  const handleAdd = () => {
    //validation part Add button
    if (!inputValueFenceLength.trim() || !inputValueFenceAmount.trim()) {
      Alert.alert('Validation Error', 'Both input fields are required.', [
        { text: 'OK' },
      ]);
      return;
    }

    const combinedValue = inputValueFenceLength + ' x ' + inputValueFenceAmount;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setinputValueFenceLength('');
    setinputValueFenceAmount('');
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);
  };

  const placeholderFenceType = {
    label: 'Select Type',
    value: null,
    color: 'blue',
  };

  const fenceTypeOptions = [
    { label: 'Wood', value: 'Wood' },
    { label: 'Metal', value: 'Metal' },
    { label: 'Fiber', value: 'Fiber' },
  ];

  const placeholderPostSpaceUnit = {
    label: 'M',
    value: null,
    color: 'blue',
  };

  const lengthUnitOptions = [
    { label: 'm', value: 'm' },
    { label: 'Foot', value: 'Foot' },
  ];
  const handleFenceDetails = async () => {
    if (
      !PostSpaceUnitselectedValue ||
      !FenceTypeselectedValue ||
      !inputValuePostspace
    ) {
      // Display error message
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const response = await AxiosInstance.post(
      '/api/auth/fence',
      {
        templateId,
        FenceTypeselectedValue,
        PostSpaceUnitselectedValue,
        inputValueFenceLength,
        inputValueFenceAmount,
        inputValuePostspace,
      },
      {}
    );

    console.log('saving fence Details', {
      templateId,
      FenceTypeselectedValue,
      PostSpaceUnitselectedValue,
      inputValueFenceLength,
      inputValueFenceAmount,
      inputValuePostspace,
    });

    navigation.navigate('FenceDetails', {
      data: displayValues,
      fenceType: FenceTypeselectedValue,
      fenceLength: inputValueFenceLength,
      fenceAmount: inputValueFenceAmount,
      PostSpaceUnit: PostSpaceUnitselectedValue,
      postSpace: inputValuePostspace,
      totalstickamount: perimeter / inputValuePostspace,
    });
  };

  /* for print pdf*/

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'margin'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle='light-content' backgroundColor='#007BFF' />

      {/*Header section*/}
      <Headersection navigation={navigation} title='Fence' />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top section */}

        <View style={styles.top}>
          <View style={styles.Box1}>
            <View>
              <Text style={styles.titleText}>Land Info</Text>
              <View style={styles.propertyBox}>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name='vector-square'
                    size={36}
                    color='gray'
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Perimeter</Text>
                    <Text style={styles.propertyValue}>1.5Km</Text>
                  </View>
                </View>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name='texture-box'
                    size={36}
                    color='gray'
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Area</Text>
                    <Text style={styles.propertyValue}>100 acres</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}

          <View style={styles.box2}>
            <View style={styles.box2Property}>
              <MaterialCommunityIcons
                name='gate'
                size={40}
                color='gray'
                style={styles.squareIcon}
              />
              <View style={styles.box2PropertyDetails}>
                <Text style={styles.Box2PropertyLabel}>Fence Type</Text>
              </View>
            </View>
            <View style={styles.box2Property}>
              <View style={styles.Box2DropdownContainer}>
                <RNPickerSelect
                  placeholder={placeholderFenceType}
                  items={fenceTypeOptions}
                  onValueChange={(value) => setFenceTypeSelectedValue(value)}
                  value={FenceTypeselectedValue}
                  style={{
                    inputIOS: {
                      textAlign: 'center',
                    },
                    inputAndroid: {
                      textAlign: 'center',
                    },
                  }}
                />
              </View>
            </View>
          </View>

          {/* Third section */}

          <View style={styles.box3}>
            <View style={styles.box3Property}>
              <MaterialCommunityIcons
                name='format-line-spacing'
                size={30}
                color='gray'
                rotation={270}
              />
              <View style={styles.box3PropertyDetails}>
                <Text style={styles.Box3PropertyLabel}>Post Space</Text>
              </View>
            </View>
            <View style={styles.box3Property}>
              <View style={styles.box3inputContainer}>
                <TextInput
                  style={styles.box3input}
                  keyboardType='numeric'
                  placeholder='00'
                  value={inputValuePostspace}
                  onChangeText={handleInputPostspaceChange}
                />
                <View style={styles.dropdownContainer}>
                  <RNPickerSelect
                    placeholder={placeholderPostSpaceUnit}
                    items={lengthUnitOptions}
                    onValueChange={(value) =>
                      setPostSpaceUnitSelectedValue1(value)
                    }
                    value={PostSpaceUnitselectedValue}
                    style={{
                      inputIOS: {
                        textAlign: 'center',
                      },
                      inputAndroid: {
                        textAlign: 'center',
                      },
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Forth section */}

          <View style={styles.box4}>
            <View style={styles.box4innertop}>
              <MaterialCommunityIcons name='boom-gate' size={36} color='gray' />
              <Text style={styles.Box4TopText}>Gates</Text>
            </View>
            <View style={styles.box4InnerCenter}>
              <View style={styles.line}>
                <Text style={styles.linetext}>Length :</Text>
                <TextInput
                  keyboardType='numeric'
                  style={styles.linetextinput}
                  placeholder='Enter Lenght of Gate'
                  marginLeft={10}
                  borderBottomWidth={1}
                  height={20}
                  borderBottomColor='lightgray'
                  returnKeyType='next'
                  onChangeText={handleFenceLengthChange}
                  value={inputValueFenceLength}
                  onSubmitEditing={() => {
                    // Focus on the next input field
                    inputValueFenceAmountRef.focus();
                  }}
                />
              </View>
              <View style={styles.line}>
                <Text style={styles.linetext}>Count :</Text>
                <TextInput
                  keyboardType='numeric'
                  style={styles.linetextinput}
                  placeholder='Enter Count of Gate'
                  marginLeft={10}
                  borderBottomWidth={1}
                  alignItems='center'
                  justifyContent='center'
                  height={20}
                  returnKeyType='done'
                  borderBottomColor='lightgray'
                  onChangeText={handleFenceAmountChange}
                  value={inputValueFenceAmount}
                  ref={(input) => {
                    inputValueFenceAmountRef = input;
                  }}
                  onSubmitEditing={handleAdd}
                />
              </View>
            </View>
            <View style={styles.Box4InnerBottom}>
              <TouchableOpacity style={styles.Box4Button} onPress={handleAdd}>
                <Text style={styles.Box4ButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.displayValuesContainer}>
              {displayValues.map((value, index) => (
                <View key={index} style={styles.displayValueContainer}>
                  <Text style={styles.displayValueText}>{value}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveValue(index)}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons
                      name='close-circle-outline'
                      size={20}
                      color='#007BFF'
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Bottom section */}

        <View style={styles.bottom}>
          <CustomButton
            onPress={handleFenceDetails}
            text='Calculate'
            iconName='calculator'
            iconColor='white'
            buttonColor='#0866FF'
            style={styles.calculateButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /*First section*/

  scrollContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },

  top: {
    alignItems: 'center',
    width: '100%',
  },

  Box1: {
    width: '87%',
    height: 101,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 30,
    borderRadius: 11,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    padding: 0,
  },

  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 16,
  },

  propertyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 7,
  },

  property: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    backgroundColor: 'white',
    width: '46%',
    height: 50,
  },

  propertyDetails: {
    flexDirection: 'column',
    marginLeft: 5,
    width: '50%',
    height: 40,
    backgroundColor: 'white',
  },

  propertyLabel: {
    fontSize: 14,
  },

  propertyValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* Second section */

  box2: {
    width: '92%',
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 25,
    borderRadius: 11,
    padding: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },

  box2Property: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '46%',
    padding: 7,
  },

  box2PropertyDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
    width: '70%',
    backgroundColor: 'white',
  },

  Box2PropertyLabel: {
    fontSize: 16,
    marginLeft: 7,
  },

  Box2DropdownContainer: {
    backgroundColor: '#F0F2F5',
    borderRadius: 11,
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CED0D4',
  },

  /* Third section */

  box3: {
    width: '92%',
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 11,
    padding: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },

  box3Property: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '46%',
    padding: 7,
  },

  box3inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    height: '100%',
  },

  box3PropertyDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
    width: '70%',
    backgroundColor: 'white',
  },

  Box3PropertyLabel: {
    fontSize: 16,
    marginLeft: 7,
  },
  box3input: {
    backgroundColor: 'white',
    width: '35%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownContainer: {
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    borderColor: 'black',
    width: '70%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CED0D4',
  },

  /* Forth section */

  box4: {
    width: '92%',
    height: 225,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 11,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },

  box4innertop: {
    width: '40%',
    height: '17%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 1,
  },

  Box4TopText: {
    fontSize: 16,
    marginLeft: 7,
  },

  box4InnerCenter: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  line: {
    width: '80%',
    height: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  linetext: {
    fontSize: 14,
    textAlign: 'right',
    width: 80,
  },

  linetextinput: {
    width: 140,
  },

  Box4InnerBottom: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  Box4Button: {
    width: 119,
    height: 33,
    backgroundColor: '#0866FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 11,
  },

  Box4ButtonText: {
    color: 'white',
    fontSize: 16,
  },

  displayValuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 'max-content',
    borderRadius: 11,
    width: '100%',
  },
  displayValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    borderRadius: 8,
    padding: 2,
    width: '22%',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  displayValueText: {
    fontSize: 11,
    marginRight: 5,
    color: '#007BFF',
  },
  closeButton: {},
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },

  /* bottom section */

  bottom: {
    alignItems: 'center',
    bottom: 30,
  },
});
