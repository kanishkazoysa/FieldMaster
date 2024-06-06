import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View ,StyleSheet } from 'react-native';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: 'Select Type',
    value: null,
    color: 'red',
    
  };

  const options = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];

  return (
    <View style={styles.Dropdown1} >
      <RNPickerSelect 
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
        style={{
          inputIOS: {
            textAlign: "center",
          },
          inputAndroid: {
            textAlign: "center",
          },
        }}
       />
    </View>
  );
};

const styles = StyleSheet.create({
  Dropdown1: {
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    width: '40%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:-60,
    marginTop:30,
    borderWidth: 1,
    borderColor: "#CED0D4",
    
  },

})

export default Dropdown;









  