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
import { styles } from './ResizeMapStyles';
import MapView, { MAP_TYPES } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const ResizeMap = ({ navigation, route }) => {
  const templateId = route.params.templateId;
  const [region, setRegion] = useState(null);
  const [locationPoints, setLocationPoints] = useState([]);
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleSave = async () => {
    try {
      const mapTemplate = {
        locationPoints,
      };
      await axios.put(
        /* `http://192.168.115.109:3000/api/mapTemplate/updateTemplate/${templateId}`, */
        `http://192.168.56.1:3000/api/mapTemplate/updateTemplate/${templateId}`,
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
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
          >
            <Text>Select Map Type</Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setMapType(MAP_TYPES.STANDARD);
                closeModal();
              }}
            >
              <Text style={styles.textStyle}>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setMapType(MAP_TYPES.SATELLITE);
                closeModal();
              }}
            >
              <Text style={styles.textStyle}>Satellite</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setMapType(MAP_TYPES.HYBRID);
                closeModal();
              }}
            >
              <Text style={styles.textStyle}>Hybrid</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
            onUserLocationChange={(event) => {
              setRegion({
                ...region,
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              });
            }}
            mapType={mapType}
          />
          <TouchableOpacity
            style={styles.mapIconContainer}
            onPress={handleSwitchMapType}
          >
            <Icon name='map-outline' size={28} color='#666666' />
          </TouchableOpacity>
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
