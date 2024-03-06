import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './ResizeMapStyles';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const ResizeMap = ({ navigation, route }) => {
  const templateId = route.params.templateId;
  const [region, setRegion] = useState(null);
  const [locationPoints, setLocationPoints] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSave = async () => {
    try {
      const mapTemplate = {
        locationPoints,
      };
      await axios.put(
        `http://192.168.81.109:3000/api/mapTemplate/updateTemplate/${templateId}`,
        mapTemplate
      );
      console.log('Map template updated successfully');
      console.log(locationPoints);
      navigation.navigate('SavedTemplatesScreen');
    } catch (error) {
      console.error('Error while updating map template:', error);
    }
  };

  const handleAddPoint = () => {
    setLocationPoints([
      ...locationPoints,
      { latitude: region.latitude, longitude: region.longitude },
    ]);
    console.log('Point added');
  };

  const handleCancel = () => {
    navigation.navigate('SavedTemplatesScreen');
  };

  return (
    <>
      <View>
        {/* Appbar */}
        <Appbar.Header style={styles.top_Bar} dark={true} mode='center-aligned'>
          <View style={styles.appBarContent}>
            <Text style={styles.appBarTextStyle} onPress={handleSave}>
              Save
            </Text>
            <Text style={styles.appBarTextStyle} onPress={handleCancel}>
              Cancel
            </Text>
          </View>
        </Appbar.Header>
      </View>
      {/* including map view */}
      {region && (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            region={region}
            showsUserLocation={true}
            mapType='satellite'
            onUserLocationChange={(event) => {
              setRegion({
                ...region,
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              });
            }}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                console.log('Button pressed');
              }}
            >
              <Text style={styles.buttonText}>Start point</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleAddPoint}
            >
              <Text style={styles.buttonText}>Add point</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>End point</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default ResizeMap;
