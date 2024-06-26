import * as React from "react";
import { useState, useEffect } from "react";
import { styles } from "../EffortOutput/effortOutputStyles";
import { MdArrowBack } from "react-icons/md";
import { CiClock1,CiCalendar } from "react-icons/ci";
import { BsBoundingBox } from "react-icons/bs";
import { PiSquareDuotone } from "react-icons/pi";
import { HiTruck } from "react-icons/hi2";
import { GrUserWorker } from "react-icons/gr";
export default function EffortOutput({
    onBackToSidebar,
    laborCount,
    workHours,
    displayValues2,
}) {

  const [effort, setEffort] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://192.168.8.173:3000/api/clearLand/effortOutput");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEffort(data.effortOutput);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, []);
    return (
        <div style={styles.content}>
            <div style={styles.header}>
            <MdArrowBack
              onClick={onBackToSidebar}
              style={styles.backButton}
              fontSize={20}
            />
            <p style={styles.titleText1}>Effort Output</p>
          </div>

          {/* first box */}
          <div style={styles.Box1}>
        <p style={styles.titleText}>Total Effort Count</p>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <div>
              <CiClock1 color="gray" size={25} />
            </div>
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Total Hours</p>
              <p style={styles.propertyValue}>6 hrs</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <CiCalendar color="gray" size={25} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>{workHours} hrs Per Day</p>
              <p style={styles.propertyValue}>1 day
                
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* second box */}
      <div style={styles.Box2}>
        <div style={styles.propertyBox}>
          <div style={styles.property}>
            <BsBoundingBox color="gray" size={25} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Perimeter</p>
              <p style={styles.propertyValue}>0.07Km</p>
            </div>
          </div>
          <div className="property" style={styles.property}>
            <PiSquareDuotone color="gray" size={28} />
            <div style={styles.propertyDetails}>
              <p style={styles.propertyLabel}>Area</p>
              <p style={styles.propertyValue}>300m<sup>2</sup></p>
            </div>
          </div>
        </div>
      </div>

      {/* third box */}
      <div style={styles.box3}>
        <p style={styles.innertopText}>Result based on</p>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <GrUserWorker size={20} color="gray" />
            <p style={styles.propertyLabel1}>Labors &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
          </div>
          <div style={styles.innersquareright}>
            <p style={styles.propertyLabel}>{laborCount}</p>
          </div>
        </div>

        <div style={styles.innercenter}>
          <div style={styles.innersquareleft}>
            <HiTruck name="boom-gate" size={24} color="gray" />
            <p style={styles.propertyLabel1}>
              Macinery &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            </p>
          </div>
          <div style={styles.innersquareright1}>
            {displayValues2.length === 0 ? (
              <div>No Machines</div>
            ) : (
              displayValues2.map((machine,index)=>(
                <div key={index}>{machine}</div>
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
    );
}