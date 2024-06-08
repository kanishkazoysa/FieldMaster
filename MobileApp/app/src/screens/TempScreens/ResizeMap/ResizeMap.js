import React, { useEffect, useState } from 'react';
import { Polygon } from 'react-native-maps';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Text, FlatList, TouchableOpacity, Modal, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Polyline } from 'react-native-maps';

import {
  faLayerGroup,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { styles } from './ResizeMapStyles';
import MapView, { MAP_TYPES } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import AxiosInstance from '../../../AxiosInstance';
import Headersection from '../../../components/Headersection';

const ResizeMapScreen = ({ navigation, route }) => {
  const { templateId } = route.params;

  const [isPolygonComplete, setIsPolygonComplete] = useState(true);
  const [region, setRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const mapRef = React.useRef(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isMarkerMoved, setIsMarkerMoved] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const selectMapType = (index) => {
    setMapTypeIndex(index);
    setShowDropdown(false);
  };

  //focuses the map on the current location of the user
  const focusOnCurrentLocation = () => {
    setSearchedLocation(null);
    setShowCurrentLocation((prevShowCurrentLocation) => {
      const newShowCurrentLocation = !prevShowCurrentLocation;
      if (newShowCurrentLocation && currentLocation && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        });
      }
      return newShowCurrentLocation;
    });
  };

  //handling location and fetching template data
  useEffect(() => {
    console.log('Template ID:', templateId);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation(location);

     
        AxiosInstance.get(
          `/api/auth/mapTemplate/getOneTemplate/${templateId}`
        )
          .then((response) => {
            setPoints(response.data.locationPoints);
            console.log(response.data.locationPoints);
    
            // Calculate the average latitude and longitude
            const avgLatitude =
              response.data.locationPoints.reduce(
                (total, point) => total + point.latitude,
                0
              ) / response.data.locationPoints.length;
            const avgLongitude =
              response.data.locationPoints.reduce(
                (total, point) => total + point.longitude,
                0
              ) / response.data.locationPoints.length;
    
            setRegion({
              latitude: avgLatitude,
              longitude: avgLongitude,
              latitudeDelta: 0.0005,
              longitudeDelta: 0.0005,
            });
          })
      .catch((error) => {
        console.error('An error occurred while fetching the template:', error);
      });
    })();
  }, []);

  //remove last point from the array
  const handleUndoLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
    }
  };

  //save the updates points to the backend is a marker was moved
  const handleSaveMap = async () => {
    if (isMarkerMoved) {
      try {
        const locationPoints = points.map((point) => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }));
        const response = await axios.put(
          `${backendUrl}/api/mapTemplate/updateTemplate/${templateId}`,
          {
            locationPoints,
          }
        );

        if (response.status === 200) {
          console.log('Location updated successfully');
          setIsMarkerMoved(false);
          navigation.navigate('SavedTemplatesScreen');
        } else {
          console.log('Failed to update location');
        }
      } catch (error) {
        console.error('An error occurred while updating the location:', error);
      }
    }
  };

  //update the point's coordinates when a marker is dragged to a new location
  const handleMarkerDragEnd = (event, index) => {
    const newPoints = [...points];
    newPoints[index] = event.nativeEvent.coordinate;
    setPoints(newPoints);
    setIsMarkerMoved(true);
  };

  //select a map type
  const handleSetMapType = (type) => {
    selectMapType(type);
    setModalVisible(false);
  };

  const handleCancel = () => {
    navigation.navigate('SavedTemplatesScreen');
  };
  const mapTypes = [
    { name: 'Satellite', value: 'satellite' },
    { name: 'Standard', value: 'standard' },
    { name: 'Hybrid', value: 'hybrid' },
    { name: 'Terrain', value: 'terrain' },
  ];

  const toggleMapType = () => {
    setShowDropdown(!showDropdown);
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <Headersection navigation={navigation} title="Resize Map"></Headersection>
      </View>
      {region && (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={{ flex: 1, paddingTop: 100 }}
            region={region}
            showsUserLocation={true}
            mapType={mapTypes[mapTypeIndex].value}
            onPress={(event) => {
              if (!isButtonPressed) {
                setPoints([...points, event.nativeEvent.coordinate]);
              }
            }}
            mapPadding={{ top: 0, right: -100, bottom: 0, left: 0 }}
          >
            {points.map((point, index) => (
              <Marker
                key={index}
                coordinate={point}
                draggable
                onDragEnd={(e) => handleMarkerDragEnd(e, index)}
              />
            ))}
            {!isPolygonComplete && points.length > 1 && (
              <Polyline
                coordinates={points}
                strokeColor='#000'
                strokeWidth={1}
              />
            )}
            {isPolygonComplete && points.length > 2 && (
              <Polygon
                coordinates={points}
                strokeColor='#000'
                fillColor='rgba(199, 192, 192, 0.5)'
                strokeWidth={1}
              />
            )}
          </MapView>

          <TouchableOpacity
            style={styles.layerIconContainer}
            onPress={() => {
              setIsButtonPressed(true);
              toggleMapType();
            }}
          >
            <FontAwesomeIcon icon={faLayerGroup} size={25} color='#fff' />
            {showDropdown && (
              <View style={styles.dropdownContainer}>
                <FlatList
                  data={mapTypes}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => selectMapType(index)}
                    >
                      <Text style={{ color: '#fff' }}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.value}
                />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={focusOnCurrentLocation}
          >
            <FontAwesomeIcon
              icon={faLocationCrosshairs}
              size={25}
              color='#fff'
            />
          </TouchableOpacity>
          <View>
            <View style={styles.sideIconWrap}>
              <TouchableWithoutFeedback
                onPressIn={() => setIsButtonPressed(true)}
                onPressOut={() => setIsButtonPressed(false)}
              >
                <MaterialCommunityIcons
                  name='arrow-u-left-top'
                  size={24}
                  color='white'
                  style={styles.sideIconStyle}
                  onPress={handleUndoLastPoint}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSaveMap} style={styles.btnStyle}>
              <Text style={styles.btmBtnStyle}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelBtnStyle}
            >
              <Text style={styles.btmBtnStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default ResizeMapScreen;
