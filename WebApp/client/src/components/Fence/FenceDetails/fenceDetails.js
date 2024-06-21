// SideNavbar.js
import React from "react";
import { useState, useEffect,useCallback } from "react";
import { HiMiniBars4 } from "react-icons/hi2";
import { TbArrowBarBoth, TbBarrierBlock, TbFence } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { styles } from "./fenceDetailsStyles";
import { FaEdit } from "react-icons/fa";
import AxiosInstance from "../../../AxiosInstance";
import Swal from 'sweetalert2'
import Fence from "../Fence/fence";



export default function FenceDetails({
  onBackToSidebar,
  inputValuePostspace,
  displayValues,
  PostSpaceUnitselectedValue,
  FenceTypeselectedValue,
  id,
}) {

  const [numberOfSticks, setnumberOfSticks] = useState(null);
  const [fenceType , setfenceType] = useState(null);
  const [postSpace, setpostSpac] = useState(null);
  const [PostSpaceUnit, setPostSpaceUnit] = useState(null);
  const [Area, setArea] = useState(null);
  const [Perimeter, setPerimeter] = useState(null);
  const [data1 , setdata1] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/fence/numberOfSticks/${id}`);
        const data = response.data;
        console.log(data);
        
        setnumberOfSticks(data.numberOfSticks);
        setfenceType(data.fenceType);
        setpostSpac(data.postSpace);
        setPostSpaceUnit(data.postSpaceUnit);
        setArea(data.Area);
        setPerimeter(data.Perimeter);
        setdata1(data.gateDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {};
  }, [id]);


  const FenceDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/fence/deleteFence/${id}`);
      console.log(response);
      return response;
    } catch (error) {
      // Log the detailed error response
      console.error('Error deleting fence:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error to handle it in the caller function
    }
  };

  const handleIconPress = (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you Want to Update Fence?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          FenceDelete(id)
            .then(() => {
              // Swal.fire({
              //   title: "Deleted!",
              //   text: "Your file has been deleted.",
              //   icon: "success"
              // });
              // Navigate to the desired screen
              setCurrentPage("Fence");
              setAnimatePage(true);
              e.preventDefault();
            })
            .catch((error) => {
              // Show detailed error message
              const errorMessage = error.response ? error.response.data.message : error.message;
              Swal.fire({
                title: "Failed to delete fence",
                text: errorMessage,
                icon: "error"
              });
            });
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  };

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };
  
  return (
    <div>
    {!currentPage && (
    <div style={styles.content}>
      <div style={styles.header}>
        <MdArrowBack
          onClick={onBackToSidebar}
          style={styles.backButton}
          fontSize={20}
        />
        <p style={styles.titleText1}>Fence Details</p>
      </div>

      {/* first box */}

      <div style={styles.topSection}>
      <FaEdit
          onClick={handleIconPress}
          style={styles.editbutton}
          fontSize={20}
        />
    </div>

      <div style={styles.Box1}>
        <p style={styles.titleText}>Total Posts / Sticks</p>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <div style={{ transform: "rotate(90deg)" }}>
              <HiMiniBars4 color="gray" size={30} />
            </div>
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Total Amount</p>
              <p style={styles.propertyValue}>{numberOfSticks} Sticks</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <TbArrowBarBoth color="gray" size={30} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>post Gap</p>
              <p style={styles.propertyValue}>
                {postSpace} {PostSpaceUnit}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second box */}

      <div style={styles.Box2}>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <BsBoundingBox color="gray" size={28} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Perimeter</p>
              <p style={styles.propertyValue}>{Perimeter} Km</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <PiSquareDuotone color="gray" size={40} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Area</p>
              <p style={styles.propertyValue}>{Area} perches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third box */}

      <div style={styles.box3}>
        <p style={styles.innertopText}>Result based on</p>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <TbFence name="gate" size={35} color="gray" />
            <p style={styles.propertyLabel1}>Fence Type &nbsp;&nbsp;:</p>
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>{fenceType}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <TbBarrierBlock name="boom-gate" size={35} color="gray" />
            <p style={styles.propertyLabel1}>
              Gates &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              :
            </p>
          </div>
          <div style={styles.innersquareright1}>
            {displayValues.length === 0 ? (
              <div>No Gate</div>
            ) : (
              data1.map((value, index) => (
                <div key={index}>{value}</div>
              ))
            )}
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <button style={styles.Button1}>
          <p style={styles.Box4ButtonText}>Save Data</p>
        </button>
      </div>
    </div>
    )}

    <div
      style={{
        transform: animatePage ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out",
        backgroundColor: "whitesmoke",
        overflow: "auto", // Add scrollbar if content exceeds container height
      }}
    >
      {currentPage === "Fence" && (
        <Fence
          onBackToSidebar={handleBackClick}
          id={id}
        />
      )}
    </div>
  </div>
  );
}
