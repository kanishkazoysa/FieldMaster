import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './PointAddingScreenStyles';
import MapView, { MAP_TYPES } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import backendUrl from '../../../urlFile';

const ResizeMap = ({ navigation, route }) => {
  /* const templateId = route.params.templateId; */
  const [region, setRegion] = useState(null);
  const [locationPoints, setLocationPoints] = useState([]);
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState([]);

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      });
    })();
  }, []);

  const handleClearPoints = () => {
    setPoints([]);
  };
  const handleCompleteMap = () => {
    if (points.length > 0) {
      setPoints([...points, points[0]]);
    }
  };

  const handleSave = async () => {
    try {
      const mapTemplate = {
        locationPoints,
      };
      await axios.put(
        `${backendUrl}/api/mapTemplate/updateTemplate/${templateId}`,
        mapTemplate
      );
      console.log('Map template updated successfully');
      console.log(locationPoints);
      navigation.navigate('SavedTemplatesScreen');
    } catch (error) {
      console.error('Error while updating map template:', error);
    }
  };

  const handleSwitchMapType = () => {
    setModalVisible(true);
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
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {/* ... */}
      </Modal>
      <View>{/* Appbar */}</View>
      {/* including map view */}
      {region && (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1, paddingTop: 100 }}
            region={region}
            showsUserLocation={true}
            onUserLocationChange={(event) => {
              setRegion({
                ...region,
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              });
            }}
            mapType={mapType}
            onPress={(event) => {
              setPoints([...points, event.nativeEvent.coordinate]);
            }}
          >
            {points.map((point, index) => (
              <Marker key={index} coordinate={point} />
            ))}
            <Polyline
              coordinates={points}
              strokeColor='#000' // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                '#7F0000',
                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                '#B24112',
                '#E5845C',
                '#238C23',
                '#7F0000',
              ]}
              strokeWidth={6}
            />
          </MapView>
          <TouchableOpacity
            style={styles.mapIconContainer}
            onPress={handleSwitchMapType}
          >
            <Icon name='map-outline' size={28} color='#666666' />
          </TouchableOpacity>
          <Button title='Clear Points' onPress={handleClearPoints} />
          <Button title='Complete Map' onPress={handleCompleteMap} />
        </View>
      )}
    </>
  );
};

export default ResizeMap;
