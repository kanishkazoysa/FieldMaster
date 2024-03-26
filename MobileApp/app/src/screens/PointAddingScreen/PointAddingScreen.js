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
import { BlurView } from '@react-native-community/blur';

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

  const handleUndoLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
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
  const handleSetMapType = (type) => {
    setMapType(type);
    setModalVisible(false);
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // This will create a semi-transparent black background
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => handleSetMapType(MAP_TYPES.SATELLITE)}
              >
                <Text style={styles.btmBtnStyle}>Satellite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => handleSetMapType(MAP_TYPES.STANDARD)}
              >
                <Text style={styles.btmBtnStyle}>Standard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => handleSetMapType(MAP_TYPES.HYBRID)}
              >
                <Text style={styles.btmBtnStyle}>Hybrid</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <Appbar.Header style={{ backgroundColor: '#0866FF' }}>
          <Appbar.BackAction color='#ffffff' onPress={handleCancel} />
          <Appbar.Content title='Create Map' color='#ffffff' />
        </Appbar.Header>
      </View>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleClearPoints}
              style={styles.btnStyle}
            >
              <Text style={styles.btmBtnStyle}>Clear Points</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCompleteMap}
              style={styles.btnStyle}
            >
              <Text style={styles.btmBtnStyle}>Complete Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUndoLastPoint}
              style={styles.btnStyle}
            >
              <Text style={styles.btmBtnStyle}>Undo Last Point</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default ResizeMap;
