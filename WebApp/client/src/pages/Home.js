import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import SideNavbar from "../components/SideNavbar/sideNavbar";
import { MdLocationOn } from "react-icons/md";

export default function Home() {
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handlePlacesChanged = useCallback(() => {
    if (!searchBoxRef.current) return;
  
    const places = searchBoxRef.current.getPlaces();
    console.log(places); // log the places
    if (places.length === 0) return;
  
    const selectedPlace = places[0];
    console.log(selectedPlace.geometry); // log the selected place's geometry
    const location = selectedPlace.geometry.location.toJSON();
    setSelectedLocation(location);
  
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(location);
    if (mapRef.current && mapRef.current.state.map) {
      mapRef.current.state.map.fitBounds(bounds);
      mapRef.current.state.map.setZoom(15); // Set the zoom level to 15
    }
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
  
  
  const onSearchBoxLoad = useCallback((ref) => {
    searchBoxRef.current = ref;
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
          <MdLocationOn fontSize={27} style={{ marginLeft: '10px', marginTop: '10px' }} color="#fff" />

          <StandaloneSearchBox
          onLoad={onSearchBoxLoad}
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
    width: '280px',
    height: '35px',
    padding: '0 12px',
    borderRadius: '11px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipsis',
    position: 'absolute',
    right:'15%',
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
