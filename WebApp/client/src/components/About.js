import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import { List, ListItem, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const About = () => {
  return (
    <section id="about">
        <div>
        <h2 style={{ textAlign: 'center' ,color: '#007BFF',padding: '1rem'}}>Our Vision</h2>
            <p style={{ textAlign: 'center',fontSize:'1.3rem',padding: '2rem'}}>
               
            Welcome to FieldMaster, your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.
            </p>
            <hr style={{ width: '100%' }} />
        </div>
        <div>
            <p style={{ textAlign: 'center',fontSize:'1.3rem'}}>At FieldMaster, our mission is to provide a user-friendly, technologically advanced platform that empowers users to: </p>
        <MDBContainer>
      <MDBListGroup className="my-4 mx-4" style={{ maxWidth: "90rem" , padding: '0rem 2rem 5rem 2rem', display: 'flex', justifyContent: 'space-evenly'}}>
        <MDBListGroupItem color="primary">• Measure land areas and perimeters effortlessly using mobile devices.</MDBListGroupItem>
        <MDBListGroupItem color="secondary">• Plan and estimate efforts required for land clearing, planting, fertilization, weeding, and fencing</MDBListGroupItem>
        <MDBListGroupItem color="danger">• Create, label, group, and subgroup maps for effective land management.</MDBListGroupItem>
        <MDBListGroupItem color="warning">• Determine suitable plant numbers and fertilization requirements based on mapped land data.</MDBListGroupItem>
        <MDBListGroupItem color="info">• Offer superior accuracy and user-friendliness compared to existing products in the market.</MDBListGroupItem>
        <MDBListGroupItem color="light">• Can enable the notifications to put fertilizer into your plantation periodicaly.</MDBListGroupItem>
        <MDBListGroupItem color="dark">• Use the manual calculator to get all the calculations when you previously know about the dimentions of the land</MDBListGroupItem>
      </MDBListGroup>
    </MDBContainer>
    <h2 style={{ textAlign: 'center' ,color: '#007BFF',padding: '1rem'}}>How we Stand Out</h2>
    <p style={{ textAlign: 'center',fontSize:'1.3rem'}}>We aim to exceed expectations by continuously enhancing the application's accuracy, usability, and functionalities. Our commitment to early validation against known fields ensures reliability and accuracy from the initial stages of your project.</p>
    <div style={{alignContent: 'center' , textAlign: 'center'}}>
    <img style={{width:'50%',height:'auto'}} src='https://t3.ftcdn.net/jpg/04/47/51/22/360_F_447512287_bRkW2GaFN5Z38AIAZZLTTZHZBGY5TDFL.jpg' className='img-fluid shadow-4' alt='...' />
   
    </div>

        </div>
         

      <List style={styles.keyFeaturesContainer}>
        
      <Typography variant="h4" style={styles.heading}>
          &nbsp; &nbsp;Key Features
      </Typography>
        <ListItem className="key-feature">
          <CheckIcon style={styles.icon} />
          <div className="feature-text">Efficient Mapping: Walk around land boundaries or paths to map areas or routes accurately.</div>
        </ListItem>
        <ListItem className="key-feature">
          <CheckIcon style={styles.icon} />
          <div className="feature-text">Customization and Organization: Name, label, group, and subgroup mapped areas for easy management.</div>
        </ListItem>
        <ListItem className="key-feature">
          <CheckIcon style={styles.icon} />
          <div className="feature-text">Web and Mobile Accessibility: Access and edit features seamlessly on both mobile and web platforms.</div>
        </ListItem>
        <ListItem className="key-feature">
          <CheckIcon style={styles.icon} />
          <div className="feature-text">Enhanced Accuracy: Utilize advanced technologies like GIS for superior accuracy beyond standard GPS.</div>
        </ListItem>
        <ListItem className="key-feature">
          <CheckIcon style={styles.icon} />
          <div className="feature-text">Google Maps Integration: Overlay land plots onto Google Maps for enhanced visualization.</div>
        </ListItem>
        <ListItem className="key-feature">
          <CheckIcon style={styles.icon} />
          <div className="feature-text">Third-party Sharing: Share measured information easily with third parties for viewing without the app.</div>
        </ListItem>
        <ListItem className="key-feature">
          <CheckIcon style={styles.icon} />
          <div className="feature-text">Manual Adjustment Tools: Correct or modify mapped perimeters manually for improved accuracy.</div>
        </ListItem>
      </List>
    
    </section>
 
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    marginBottom: 20,

  },
  visionContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "20px",
    borderRadius: 5,
    marginBottom: 20,
  },
  heading: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    
  },
  paragraph: {
    color: "#333",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  visionContainer: {
    padding: "2rem 0 2rem 0", 
    width: "80vw",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.3)",
    padding: "20px",
    borderRadius: 5,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems:"space-between"
  },
  visionHeading: {
    color: "#007BFF",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  mobileAppImage: {
    width: "100%",
    borderRadius: 10,
  },
  visionList: {
    paddingLeft: 0,
  },
  keyFeaturesContainer: {
    width: "80vw",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.3)",
    padding: "1rem 0 1rem 0",
  },
  icon: {
    color: "#4CAF50",
    marginRight: 10,
  },
  featureText: {
    marginLeft: 10,
  },
};

export default About;
