import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function SetupCard() {
  return (
    <div className="setup-card">
      <h2 style={{ textAlign: "center", color: "#007BFF", padding: "1rem" }}>
        FeieldMaster Setup Instructions
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "3rem 2rem 5rem 2rem",
        }}
      >
        <MDBCard style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            style={{ maxWidth: "22rem", height: "16rem" }}
            position="top"
            alt="..."
            src="https://thumbs.dreamstime.com/b/young-red-haired-man-glasses-backpack-traveling-alone-smiling-guy-walking-road-background-green-hills-bushes-191902309.jpg"
          />
          <MDBCardBody>
            <MDBCardTitle>Walk around the Land</MDBCardTitle>
            <MDBCardText>
              Explore the area by walking around with your device.The app will
              measure the land based on your movement.
            </MDBCardText>
          </MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem>
              Tap "Walk around the Land" on the page.
            </MDBListGroupItem>
            <MDBListGroupItem>
              Follow on-screen instructions to start and stop measurements.
            </MDBListGroupItem>
            <MDBListGroupItem>
              Ensure a clear line of sight for accurate results
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCard>

        <MDBCard style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            style={{ maxWidth: "22rem", height: "16rem" }}
            position="top"
            alt="..."
            src="https://previews.123rf.com/images/tonsnoei/tonsnoei1506/tonsnoei150600064/41781231-pin-points-on-a-map-a-map-with-the-place-holiday-pin-pointed-on-a-map.jpg"
          />
          <MDBCardBody>
            <MDBCardTitle>Point edges on map</MDBCardTitle>
            <MDBCardText>
              Pinpoint specific edges on a map for precise measurements Use the
              map interface to mark key points and define the area.
            </MDBCardText>
          </MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem>
              Select "Point Edges on Map" from the page.
            </MDBListGroupItem>
            <MDBListGroupItem>
              Pinpoint edges on the map by tapping or dragging markers
            </MDBListGroupItem>
            <MDBListGroupItem>
              Confirm and save your measurements.
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCard>

        <MDBCard style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            style={{ maxWidth: "22rem", height: "16rem" }}
            position="top"
            alt="..."
            src="https://img.freepik.com/premium-vector/analytics-data-results-mobile-phone-screen-vector_101884-195.jpg"
          />
          <MDBCardBody>
            <MDBCardTitle>Manual Calculator</MDBCardTitle>
            <MDBCardText>
              Enter Area and Perimeter and tap “Calculate” to get results. You
              can view all the results by giving the correct input.
            </MDBCardText>
          </MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem>Clear Land</MDBListGroupItem>
            <MDBListGroupItem>Plantation</MDBListGroupItem>
            <MDBListGroupItem>Fence Setup</MDBListGroupItem>
          </MDBListGroup>
        </MDBCard>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "3rem 2rem 5rem 2rem",
        }}
      >
        <MDBCard style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            style={{ maxWidth: "22rem", height: "16rem" }}
            position="top"
            alt="..."
            src="https://img.freepik.com/free-vector/sandbox-playground-kids-sand-box-with-toys-plastic-bucket-excavator-shovel-sandpit-house-back-yard-with-white-fence-blue-cloudy-sky-summer-time-cartoon-vector-illustration_107791-8236.jpg"
          />
          <MDBCardBody>
            <MDBCardTitle>Clear Land</MDBCardTitle>
            <MDBCardText>
              Select density of weed (Low/Medium/High), Plants type, Stones
              type. Choose a clearing method .
            </MDBCardText>
          </MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem>
              Enter the number of labors/ Machine type and number of machines
              based on the clearing method you entered .
            </MDBListGroupItem>
            <MDBListGroupItem>
              Then you can calculate the effort and estimated time to clear your
              land.{" "}
            </MDBListGroupItem>
            <MDBListGroupItem>
              You can get the details as a PDF file.
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCard>

        <MDBCard style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            style={{ maxWidth: "22rem", height: "16rem" }}
            position="top"
            alt="..."
            src="https://img.freepik.com/free-vector/hand-drawn-illustration-man-planting-tree_23-2149214879.jpg"
          />
          <MDBCardBody>
            <MDBCardTitle>Plantation</MDBCardTitle>
            <MDBCardText>
              Enter plant type, space between two plants and space between two
              rows as your preference.
            </MDBCardText>
          </MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem>
              App will calculate the number of plants you need and the plant
              density
            </MDBListGroupItem>
            <MDBListGroupItem>You can save details as a PDF.</MDBListGroupItem>
            <MDBListGroupItem>
              To calculate the fertilization amount need for a month, use the
              “Fertilization” feature..
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCard>

        <MDBCard style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            style={{ maxWidth: "22rem", height: "16rem" }}
            position="top"
            alt="..."
            src="https://us.123rf.com/450wm/chekky777/chekky7771707/chekky777170700006/83073381-vector-illustration-of-a-beautiful-summer-city-park.jpg?ver=6"
          />
          <MDBCardBody>
            <MDBCardTitle>Fence Setup</MDBCardTitle>
            <MDBCardText>
              Use this feature to calculate effort for setting up the fence on
              your land.
            </MDBCardText>
          </MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem>
              You can estimate the cost for setting up the fence
            </MDBListGroupItem>
            <MDBListGroupItem>
              Can include the details about Gates as well
            </MDBListGroupItem>
            <MDBListGroupItem>
              You can get the details as a PDF file
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCard>
      </div>
    </div>
  );
}
