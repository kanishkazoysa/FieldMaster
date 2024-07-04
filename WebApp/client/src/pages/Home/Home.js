import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
  Polygon,
  OverlayView,
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
  const [userMaps, setUserMaps] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState(null);

  useEffect(() => {
    if (mapRef.current && mapRef.current.state.map) {
      const bounds = new window.google.maps.LatLngBounds();
  
      if (selectedMapId) {
        const selectedMap = userMaps.find(map => map._id === selectedMapId);
        if (selectedMap) {
          selectedMap.locationPoints.forEach(point => {
            bounds.extend(new window.google.maps.LatLng(point.latitude, point.longitude));
          });
        }
      } else {
        userMaps.forEach(map => {
          map.locationPoints.forEach(point => {
            bounds.extend(new window.google.maps.LatLng(point.latitude, point.longitude));
          });
        });
      }
  
      mapRef.current.state.map.fitBounds(bounds);
  
      // Add some padding to the bounds
      const padding = { top: 50, right: 50, bottom: 50, left: 50 };
      mapRef.current.state.map.fitBounds(bounds, padding);
  
      // Animate zoom
      mapRef.current.state.map.setZoom(mapRef.current.state.map.getZoom());
    }
  }, [userMaps, selectedMapId]);


  useEffect(() => {
    fetchUserDetails();
    fetchUserMaps();
  }, []);
  
  const fetchUserDetails = async () => {
    try {
      const response = await AxiosInstance.get("/api/users/details");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const fetchUserMaps = async () => {
    try {
      const response = await AxiosInstance.get("/api/auth/mapTemplate/getAllTemplates");
      console.log("User maps:", response.data); 
      setUserMaps(response.data);
    } catch (error) {
      console.error("Failed to fetch user maps:", error);
    }
  };

  const getCenterOfPolygon = (points) => {
    const latitudes = points.map(p => p.latitude);
    const longitudes = points.map(p => p.longitude);
    const centerLat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
    const centerLng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
    return { lat: centerLat, lng: centerLng };
  };

  const handleLabelClick = useCallback((mapId) => {
    setSelectedMapId(mapId === selectedMapId ? null : mapId);
  }, [selectedMapId]);

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
        {userMaps.map((map, index) => (
          <React.Fragment key={map._id}>
          <Polygon
          paths={map.locationPoints.map(point => ({ lat: point.latitude, lng: point.longitude }))}
          options={{
            fillColor: selectedMapId === map._id ? '#FF0000' : `#${Math.floor(Math.random()*16777215).toString(16)}`,
            fillOpacity: selectedMapId === map._id ? 0.6 : 0.4,
            strokeColor: "#000000",
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
            <OverlayView
  position={getCenterOfPolygon(map.locationPoints)}
  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
>
  <div 
    onClick={() => handleLabelClick(map._id)}
    style={{
      background: 'black',
      color: 'white',
      border: '1px solid #ccc',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      fontSize: '14px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      lineHeight: 1,
      cursor: 'pointer',  // Add this to show it's clickable
    }}
  >
    {index + 1}
  </div>
</OverlayView>
          </React.Fragment>
        ))}
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
