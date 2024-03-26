import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import SideNavbar from "../components/SideNavbar/sideNavbar";

export default function Home() {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePlacesChanged = useCallback(() => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const selectedPlace = places[0];
    const location = selectedPlace.geometry.location.toJSON();
    setSelectedLocation(location);

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(location);
    mapRef.current.fitBounds(bounds);
  }, []);

  const handleMarkerClick = () => {
    setSelectedLocation(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const input = event.target;
      input.blur();
    }
  };

  const onLoad = useCallback((map) => {
  mapRef.current = map;
}, []);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SideNavbar />
      </div>
      <LoadScript googleMapsApiKey="AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U" libraries={["places"]}>
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          options={{
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
          }}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              onClick={handleMarkerClick}
            />
          )}
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              type="text"
              placeholder="Search location"
              style={styles.searchBox}
              onKeyDown={handleKeyDown}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    height: '100vh',
  },
  sidebar: {
    height: "100vh",
  },
  searchBox: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '240px',
    height: '32px',
    padding: '0 12px',
    borderRadius: '11px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipsis',
    position: 'absolute',
    left: '75%',
    top: '2%',
  },
};

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 6.2667,
  lng: 80.0333
};