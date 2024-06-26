import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import SideNavbar from "../../components/SideNavbar/sideNavbar";
import { MdLocationOn, MdSearch } from "react-icons/md";
import ProfileModal from "../../components/profileManage/ProfileModal/ProfileModal";
import { styles, containerStyle, center } from "./HomeStyles";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import Avatar from "../../components/profileManage/ProfileManageModal/Avatar";
import AxiosInstance from "../../AxiosInstance";


export default function Home() {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate hook
  const messageShownRef = useRef(false); // Ref to track if the message has been shown
  const [user, setUser] = useState({});
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);
  
  const fetchUserDetails = async () => {
    try {
      const response = await AxiosInstance.get("/api/users/details");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    // Check if we navigated here after a successful login and if the message hasn't been shown yet
    if (location.state?.loginSuccess && !messageShownRef.current) {
      message.success("User logged in successfully!");
      // Mark that the message has been shown
      messageShownRef.current = true;

      // Use navigate to replace the current entry in the history stack
      navigate(location.pathname, { state: {}, replace: true });
    }
  }, [location, navigate]); // Dependency array

  

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
    if (event.key === "Enter") {
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
    fetchUserDetails(); // Refresh user data when modal closes
  };

  const mapOptions = useCallback(() => {
    if (!window.google || typeof window.google === "undefined") return {};

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
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
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
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SideNavbar />
      </div>
      <LoadScript
        googleMapsApiKey="AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U"
        libraries={["places"]}
      >
        <GoogleMap
          ref={mapRef}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          options={mapOptions()}
        >
          {selectedLocation && (
            <Marker position={selectedLocation} onClick={handleMarkerClick} />
          )}
          <MdLocationOn
            fontSize={27}
            style={{ marginLeft: "10px", marginTop: "10px" }}
            color="#fff"
          />

          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <div style={styles.searchContainer}>
              <MdSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search location"
                style={styles.searchBox}
                onKeyDown={handleKeyDown}
              />
              <div style={styles.avatar}  onClick={handleAvatarClick}>
                <Avatar 
                userData={user} 
                size={30}
                
                />
              </div>
            </div>
          </StandaloneSearchBox>

          {isModalOpen && (
            <ProfileModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              user={user}
              updateUserInHome={setUser}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
