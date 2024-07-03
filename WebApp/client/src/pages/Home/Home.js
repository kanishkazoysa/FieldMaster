import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
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
import * as turf from '@turf/turf';
import { LuUndo2 } from 'react-icons/lu';
import axios from 'axios';
import html2canvas from 'html2canvas';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const messageShownRef = useRef(false);
  const [showMapButtons, setShowMapButtons] = useState(false);
  const [landInfo, setLandInfo] = useState(null);

  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPointEdgesMode, setIsPointEdgesMode] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isPolygonComplete, setIsPolygonComplete] = useState(false);

  const StyledButton = styled(Button)`
    &&& {
      background-color: #064dbe;
      border-color: #064dbe;
      &:hover,
      &:focus {
        background-color: #3b69ad;
        border-color: #3b69ad;
      }
    }
  `;

  const StyledDangerButton = styled(Button)`
    &&& {
      background-color: #c62828;
      border-color: #c62828;
      &:hover,
      &:focus {
        background-color: #ca1818;
        border-color: #ca1818;
      }
    }
  `;
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

  const handleCancel = () => {
    setMarkers([]);
    setIsPolygonComplete(false);
  };

  const handleCompleteMap = () => {
    if (markers.length > 2) {
      setIsPolygonComplete(true);
      setMarkers((prevMarkers) => {
        if (prevMarkers[0] !== prevMarkers[prevMarkers.length - 1]) {
          return [...prevMarkers, prevMarkers[0]];
        }
        return prevMarkers;
      });

      setMarkers((updatedMarkers) => {
        const polygonCoordinates = updatedMarkers.map((marker) => [
          marker.lng,
          marker.lat,
        ]);

        try {
          const turfPolygon = turf.polygon([polygonCoordinates]);

          const areaInSquareMeters = turf.area(turfPolygon);
          const areaInPerches = areaInSquareMeters / 25.29285264;
          const perimeterInKm = turf.length(
            turf.lineString(polygonCoordinates),
            {
              units: 'kilometers',
            }
          );

          // Capture the map snapshot
          html2canvas(document.querySelector('.map-container')).then(
            (canvas) => {
              canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('image', blob, 'map_snapshot.png');

                try {
                  const response = await axios.post(
                    'https://api.imgbb.com/1/upload',
                    formData,
                    {
                      params: {
                        key: 'a08fb8cde558efecce3f05b7f97d4ef7',
                      },
                    }
                  );

                  const imageUrl = response.data.data.url;

                  const newLandInfo = {
                    area: areaInPerches.toFixed(2),
                    perimeter: perimeterInKm.toFixed(2),
                    locationPoints: updatedMarkers,
                    imageUrl: imageUrl,
                  };

                  setLandInfo(newLandInfo);
                  console.log('Land Info:', newLandInfo);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
              });
            }
          );
        } catch (error) {
          console.error('Error creating polygon:', error);
        }

        return updatedMarkers;
      });
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
          landInfo={landInfo}
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
          mapContainerClassName='map-container'
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
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 0.5,
              }}
            />
          )}
          {isPolygonComplete && markers.length > 2 && (
            <Polygon
              paths={getPolylinePath()}
              options={{
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 0.5,
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
                onClick={handleCompleteMap}
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
                  <StyledButton type='primary'>Reset</StyledButton>
                  <StyledButton type='primary'>Add Point</StyledButton>
                </div>
                <div
                  style={{ ...styles.buttonGroup, ...styles.buttonGroupRight }}
                >
                  <StyledButton type='primary'>Save</StyledButton>
                  <StyledDangerButton
                    type='primary'
                    danger
                    onClick={handleCancel}
                  >
                    Cancel
                  </StyledDangerButton>
                </div>
              </div>
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
