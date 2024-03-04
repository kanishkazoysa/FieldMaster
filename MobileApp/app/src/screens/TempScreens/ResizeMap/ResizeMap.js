import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from './ResizeMapStyles';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const ResizeMap = ({ navigation }) => {
  const [region, setRegion] = useState(null);

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

  return (
    <>
      <View>
        {/* Appbar */}
        <Appbar.Header style={styles.top_Bar} dark={true} mode='center-aligned'>
          <View style={styles.appBarContent}>
            <Text
              style={styles.appBarTextStyle}
              onPress={() => {
                navigation.navigate('SavedTemplatesScreen');
              }}
            >
              Save
            </Text>
            <Text
              style={styles.appBarTextStyle}
              onPress={() => {
                navigation.navigate('SavedTemplatesScreen');
              }}
            >
              Cancel
            </Text>
          </View>
        </Appbar.Header>
      </View>
      {/* including map view */}
      {region && <MapView style={{ flex: 1 }} region={region} />}
    </>
  );
};

export default ResizeMap;
