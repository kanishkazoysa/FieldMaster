// SideNavbar.js
import React from "react";
import { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { styles } from "./plantationDetailsStyles";
import { MdGrass,MdFormatLineSpacing } from "react-icons/md";
import { GiGrassMushroom } from "react-icons/gi";
import { FaTree } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RxRowSpacing } from "react-icons/rx";
import Fertilizing from "../../Fertilizing/Fertilizing/fertilizing";
import AxiosInstance from "../../../AxiosInstance";
import Swal from 'sweetalert2';
import Plantation from "../PlantationPage/plantation";
import { RiEditBoxLine } from "react-icons/ri"; 
import { BeatLoader } from 'react-spinners';
import TemplateDetails from "../../SavedTemplates/TemplateDetails"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import { getPlantationDetailsHtml } from "./plantationDetailsTemplate";
const { confirm } = Modal;
export default function PlantationDetails({
  onBackToSidebar,
  onEditTemplateClick,
  template,
  onback,
  id,
}) {
  const [numberOfPlants,setnumberOfPlants]=useState(null);
  const [PlantDensity,setPlantDensity]=useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [area, setArea] = useState(null);
  const [textPlant, settextPlant] = useState(null);
  const [PlantSpaceUnitselectedValue, setPlantSpaceUnitselectedValue] =
    useState("");
  const [RowSpaceUnitselectedValue, setRowSpaceUnitselectedValue] =
    useState("");
  const [PlantSpaceUnitselectedValue1, setPlantSpaceUnitselectedValue1] =
    useState("");
  const [RowSpaceUnitselectedValue1, setRowSpaceUnitselectedValue1] =
    useState("");

  const [textplantspace, settextplantspace] = useState("");
  const [textRowspace, settextRowspace] = useState("");

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);

  const handleFertilization = () => {
      setCurrentPage("Fertilizing");
      setAnimatePage(true);
  };

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/plantation/numberOfPlants/${id}`);
        const data = response.data;
        setnumberOfPlants(data.numberOfPlants);
        setPlantDensity(data.PlantDensity);
        setArea(data.area);
        setPerimeter(data.perimeter);
        settextRowspace(data.rowSpace);
        settextplantspace(data.plantspace);
        settextPlant(data.PlnatType);
        setPlantSpaceUnitselectedValue(data.Unit);
        setRowSpaceUnitselectedValue(data.Unit);

        setLoading(false);
        console.log(data);

        //setnumberOfPlants(data.data); // Assuming you want to set numberOfPlants here
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  
  const PlantationDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(`/api/plantation/deletePlantation/${id}`);
      console.log(response);
      return response;
    } catch (error) {
      // Log the detailed error response
      console.error('Error deleting plantation:', error.response ? error.response.data : error.message);
      throw error; // Re-throw the error to handle it in the caller function
    }
  };
  
  const handleIconPress = (e) => {
    confirm({
      title: 'Are you sure?',
      content: 'Do you want to update Plantation?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        try {
          PlantationDelete(id)
            .then(() => {
              // Navigate to the desired screen
              setCurrentPage('Plantation');
              setAnimatePage(true);
              e.preventDefault();
            })
            .catch((error) => {
              // Show detailed error message
              const errorMessage = error.response ? error.response.data.message : error.message;
              Modal.error({
                title: 'Failed to delete plantation',
                content: errorMessage,
              });
            });
        } catch (error) {
          console.error('Error:', error);
        }
      },
      onCancel() {
        console.log('Cancelled');
      },
    });
  };
  const handleback = () => {
    setCurrentPage("TemplateDetails");
    setAnimatePage(true);
  };
  const handleSave = () => {
    const htmlContent = getPlantationDetailsHtml(
      PlantDensity,numberOfPlants,textPlant,textRowspace,textplantspace,perimeter,area);
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    newWindow.print();
  };
  return (
  <div>
    {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
          <BeatLoader color="#007BFF" loading={loading} size={20} />
        </div>
      ) : (
    !currentPage && (
    <div style={styles.content}>
      <div style={styles.header}>
        <MdArrowBack
          onClick={onback}
          style={styles.backButton}
          fontSize={20}
        />
        <p style={styles.titleText1}>Plantation Details</p>
        <RiEditBoxLine
                onClick={handleIconPress}
                style={styles.editorbutton}
                fontSize={19}
              />
      </div>

      {/* first box  */}
      <div style={styles.topSection}>
     
    </div>


      <div style={styles.Box1}>
        <p style={styles.titleText}>Total Plants</p>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <div >
              <MdGrass color="gray" size={30} />
            </div>
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Plant count</p>
              <p style={styles.propertyValue}>{numberOfPlants} Plants</p>
            </div>
          </div>

          <div className="property" style={styles.property}>
            <GiGrassMushroom color="gray" size={30} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Plant Density</p>
              <p style={styles.propertyValue}>
                {PlantDensity} / m<sup>2</sup>
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
              <p style={styles.propertyValue}>{area} Km</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <PiSquareDuotone color="gray" size={40} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Area</p>
              <p style={styles.propertyValue}>{perimeter} Perches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third box */}

      <div style={styles.box3}>
        <p style={styles.innertopText}>Results based on</p>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <FaTree name="tree" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>Plant Type</p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {textPlant}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <RxRowSpacing  style={{ transform: "rotate(90deg)" }}name="boom-gate" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>
              Plant Spacing
            </p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {textplantspace}{PlantSpaceUnitselectedValue}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <MdFormatLineSpacing name="boom-gate" size={30} color="gray" />
            <div style={styles.propertybox}><p style={styles.propertyLabel1}>
              Row Spacing
            </p></div>
            
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>: {textRowspace}{RowSpaceUnitselectedValue}</p>
          </div>
        </div>

      </div>

      <div style={styles.bottom} >
        <button style={styles.Button1} onClick={handleFertilization}>
          <p style={styles.Box4ButtonText}>Fertilization</p>
        </button>
      </div>

      <div style={styles.bottom2}>
        <button style={styles.Button2} onClick={handleSave}>
          <p style={styles.Box4ButtonText}>Save as PDF</p>
        
        </button>
        <button style={styles.Button3} onClick={handleback}>
                <p style={styles.Box4ButtonText}>Back to Template</p>
              </button>
      </div>

    </div>
    ))}
    <div
        style={{
          transform: animatePage ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "whitesmoke",
          overflow: "auto", // Add scrollbar if content exceeds container height
        }}
      >
        {currentPage === "Fertilizing" && (
          <Fertilizing
            onBackToSidebar={handleBackClick}
            textPlant={textPlant}
            PlantDensity={PlantDensity}
            numberOfPlants={numberOfPlants}
            id={id}
            area={area}
            Perimeter={perimeter}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
          />
        )}
        {currentPage === "Plantation" && (
          <Plantation
            onBackToSidebar={onBackToSidebar}
            id={id}
            area={area}
            Perimeter={perimeter}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
          />
        )}
  
        {currentPage === "TemplateDetails" && (
          <TemplateDetails
            onBackToSidebar={onBackToSidebar}
            id={id}
            onEditTemplateClick={onEditTemplateClick}
            template={template}
          />
        )}
      </div>
    </div>
  );
}
