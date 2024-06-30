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
import { BiUndo } from 'react-icons/bi';
import { MdCheckCircle } from 'react-icons/md';
import { polygon, area, length } from '@turf/turf';

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
  const [isPolygonComplete, setIsPolygonComplete] = useState(false);
  const [points, setPoints] = useState([]);
  const [markers, setMarkers] = useState([]);

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

  const handleSaveMap = () => {
    if (markers.length < 3) {
      message.error(
        'You need at least 3 points to calculate area and perimeter'
      );
      return;
    }

    const formattedPoints = markers.map((marker) => [marker.lng, marker.lat]);
    formattedPoints.push(formattedPoints[0]);

    const poly = polygon([formattedPoints]);
    const areaMeters = area(poly);
    const perimeterMeters = length(poly, { units: 'meters' });
    const areaPerches = areaMeters / 25.29285264;
    const perimeterKilometers = perimeterMeters / 1000;

    message.success(
      `Area: ${areaPerches.toFixed(
        2
      )} perches, Perimeter: ${perimeterKilometers.toFixed(2)} kilometers`
    );

    console.log('Map data:', {
      markers,
      area: areaPerches,
      perimeter: perimeterKilometers,
    });
  };
  const clearMarkers = () => {
    setPoints([]);
    setMarkers([]);
    setIsPolygonComplete(false);
  };
  const hideMapButtons = () => {
    setShowMapButtons(false);
    setIsPointEdgesMode(false);
    clearMarkers();
  };

  const handleClearPoints = () => {
    setPoints([]);
    setMarkers([]);
    setIsPolygonComplete(false);
    setSelectedLocation(null);
  };

  // Function to be passed to SideNavbar
  const toggleMapButtons = (show) => {
    setShowMapButtons(show);
    setIsPointEdgesMode(show);
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
  const handleUndo = () => {
    setMarkers((prevMarkers) => {
      const newMarkers = prevMarkers.slice(0, -1);
      if (newMarkers.length < 3) {
        setIsPolygonComplete(false);
      }
      return newMarkers;
    });
  };
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
  const handleCompletePolygon = () => {
    if (markers.length > 2) {
      setMarkers((prevMarkers) => [...prevMarkers, prevMarkers[0]]);
      setIsPolygonComplete(true);
    } else {
      message.error('You need at least 3 points to complete a polygon');
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
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          options={mapOptions()}
          onClick={handleMapClick}
        >
          {points.map((point, index) => (
            <Marker key={index} position={point} />
          ))}
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
          {markers.length > 2 && (
            <>
              <Polyline
                path={markers}
                options={{
                  strokeColor: '#000',
                  strokeWeight: 1,
                }}
              />
              {isPolygonComplete && (
                <Polygon
                  paths={markers}
                  options={{
                    strokeColor: '#000',
                    strokeWeight: 1,
                    fillColor: 'rgba(199, 192, 192, 0.5)',
                  }}
                />
              )}
            </>
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
              <div style={styles.completePolygonIconContainer}>
                <MdCheckCircle
                  style={styles.undoIcon}
                  size={40}
                  onClick={handleCompletePolygon}
                />
              </div>
              <div style={styles.undoIconContainer}>
                <BiUndo
                  style={styles.undoIcon}
                  size={40}
                  onClick={handleUndo}
                />
              </div>
              <div style={styles.buttonContainer}>
                <div style={styles.buttonGroupLeft}>
                  <Button
                    type='primary'
                    style={styles.mapButton}
                    onClick={handleClearPoints}
                  >
                    Reset
                  </Button>
                </div>
                <div style={styles.buttonGroupRight}>
                  <Button
                    type='primary'
                    style={styles.mapButton}
                    onClick={handleSaveMap}
                  >
                    Save
                  </Button>
                  <Button type='primary' danger onClick={handleClearPoints}>
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
