import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
  Polyline,
  Polygon,
} from '@react-google-maps/api';
import SideNavbar from '../../components/SideNavbar/sideNavbar';
import { MdLocationOn, MdSearch } from 'react-icons/md';
import ProfileModal from '../../components/profileManage/ProfileModal/ProfileModal';
import { styles, containerStyle, center } from './HomeStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, message, Button } from 'antd';
import { MdOutlineAddHome } from 'react-icons/md';

import { LuUndo2 } from 'react-icons/lu';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const messageShownRef = useRef(false);
  const [showMapButtons, setShowMapButtons] = useState(false);

  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPointEdgesMode, setIsPointEdgesMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isPolygonComplete, setIsPolygonComplete] = useState(false);

  const handleAddHome = () => {
    if (markers.length > 2) {
      setIsPolygonComplete(true);
      setMarkers((prevMarkers) => {
        if (prevMarkers[0] !== prevMarkers[prevMarkers.length - 1]) {
          return [...prevMarkers, prevMarkers[0]];
        }
        return prevMarkers;
      });
    } else {
      alert('You need at least 3 points to complete a polygon');
    }
  };
  useEffect(() => {
    // Check if we navigated here after a successful login and if the message hasn't been shown yet
    if (location.state?.loginSuccess && !messageShownRef.current) {
      message.success('User logged in successfully!');
      // Mark that the message has been shown
      messageShownRef.current = true;

      // Use navigate to replace the current entry in the history stack
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location, navigate]); // Dependency array

  const clearMarkers = () => {
    setMarkers([]);
  };

  const getPolylinePath = useCallback(() => {
    if (isPolygonComplete && markers.length > 2) {
      return [...markers, markers[0]].map((marker) => ({
        lat: marker.lat,
        lng: marker.lng,
      }));
    }
    return markers.map((marker) => ({ lat: marker.lat, lng: marker.lng }));
  }, [markers, isPolygonComplete]);

  const handleUndo = useCallback(() => {
    setMarkers((prevMarkers) => {
      const newMarkers = prevMarkers.slice(0, -1);
      if (newMarkers.length < 3) {
        setIsPolygonComplete(false);
      }
      return newMarkers;
    });
  }, []);

  const hideMapButtons = () => {
    setShowMapButtons(false);
    setIsPointEdgesMode(false);
    clearMarkers();
  };
  // Function to be passed to SideNavbar
  const toggleMapButtons = (show) => {
    setShowMapButtons(show);
    setIsPointEdgesMode(show);
  };

  const handleClearPoints = () => {
    setMarkers([]);
    setIsPolygonComplete(false);
  };
  const handleCancel = () => {
    setMarkers([]);
    setIsPolygonComplete(false);
  };

  const handleCompleteMap = () => {
    if (markers.length > 2) {
      setIsPolygonComplete(true);
    } else {
      alert('You need at least 3 points to complete a polygon');
    }
  };

  const handleMapClick = useCallback(
    (event) => {
      if (isPointEdgesMode && !isPolygonComplete) {
        const newMarker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      }
    },
    [isPointEdgesMode, isPolygonComplete]
  );
  const handlePlacesChanged = useCallback(() => {
    if (!searchBoxRef.current) return;

    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const selectedPlace = places[0];
    const location = selectedPlace.geometry.location.toJSON();
    setSelectedLocation(location);

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(location);
    if (mapRef.current && mapRef.current.state.map) {
      mapRef.current.state.map.fitBounds(bounds);
      mapRef.current.state.map.setZoom(15);
    }
  }, []);

  const handleMarkerClick = () => {
    setSelectedLocation(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target;
      input.blur();
    }
  };

  const onSearchBoxLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  const handleAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const removeMarker = (index) => {
    setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index));
  };
  const mapOptions = useCallback(() => {
    if (!window.google || typeof window.google === 'undefined') return {};

    return {
      minZoom: 2,
      maxZoom: 40,
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180,
        },
        strictBounds: true,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: window.google.maps.ControlPosition.TOP_RIGHT,
      },
      fullscreenControl: false,
      fullscreenControlOptions: {
        position: window.google.maps.ControlPosition.BOTTOM_LEFT,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      draggableCursor: isPointEdgesMode ? 'pointer' : 'grab',
    };
  }, [isPointEdgesMode]);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SideNavbar
          toggleMapButtons={toggleMapButtons}
          hideMapButtons={hideMapButtons}
        />
      </div>
      <LoadScript
        googleMapsApiKey='AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U'
        libraries={['places']}
      >
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={{
            ...containerStyle,
            cursor: isPointEdgesMode ? 'pointer' : 'grab',
          }}
          center={center}
          zoom={2}
          options={mapOptions()}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              onClick={() => removeMarker(index)}
            />
          ))}
          {!isPolygonComplete && markers.length > 1 && (
            <Polyline
              path={getPolylinePath()}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
              }}
            />
          )}
          {isPolygonComplete && markers.length > 2 && (
            <Polygon
              paths={getPolylinePath()}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: '#ADD8E6',
                fillOpacity: 0.35,
              }}
            />
          )}
          {selectedLocation && (
            <Marker position={selectedLocation} onClick={handleMarkerClick} />
          )}
          <MdLocationOn
            fontSize={27}
            style={{ marginLeft: '10px', marginTop: '10px' }}
            color='#fff'
          />

          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <div style={styles.searchContainer}>
              <MdSearch style={styles.searchIcon} />
              <input
                type='text'
                placeholder='Search location'
                style={styles.searchBox}
                onKeyDown={handleKeyDown}
              />
              <Avatar onClick={handleAvatarClick} style={styles.avatar} />
            </div>
          </StandaloneSearchBox>

          {isModalOpen && (
            <ProfileModal isOpen={isModalOpen} onRequestClose={closeModal} />
          )}
          {showMapButtons && (
            <>
              <div
                style={styles.completeButton}
                onClick={handleAddHome}
                title='Add Home'
              >
                <MdOutlineAddHome fontSize={20} color='white' />
              </div>
              <div style={styles.undoButton} onClick={handleUndo} title='Undo'>
                <LuUndo2 fontSize={20} color='white' />
              </div>
              <div style={styles.buttonContainer}>
                <div
                  style={{ ...styles.buttonGroup, ...styles.buttonGroupLeft }}
                >
                  <Button type='primary'>Reset</Button>
                  <Button type='primary'>Add Point</Button>
                </div>
                <div
                  style={{ ...styles.buttonGroup, ...styles.buttonGroupRight }}
                >
                  <Button type='primary'>Save</Button>
                  <Button type='primary' danger onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
