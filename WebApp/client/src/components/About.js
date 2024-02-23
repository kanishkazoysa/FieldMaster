import React from "react";
import { Typography, Container, List, ListItem, Paper } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const About = () => {
  return (
    <section id="about">
           <Container maxWidth="lg" style={styles.container}>
      <Typography variant="h4" style={styles.heading}>
        Welcome to FieldMaster
      </Typography>
      <Typography variant="body1" style={styles.paragraph}>
        Your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.
      </Typography>

      <Paper elevation={5} style={styles.visionContainer}>
      <Typography variant="h4" style={styles.visionHeading}>
              Our Vision
            </Typography>
        <div className="visionContent" style={styles.visionContent}>
            
          <div className="mobile-app-container" style={{ width: "35%" }}>
            <img
              src="https://i0.wp.com/www.alphr.com/wp-content/uploads/2022/06/featured-13.png?fit=600%2C300&ssl=1"
              alt="Mobile App Interface"
              style={styles.mobileAppImage}
            />
          </div>
          <div>
        
          <List style={{ ...styles.visionList, width: "*" }}>
            
            <ListItem className="vision-list-item">• Measure land areas and perimeters effortlessly using mobile devices.</ListItem>
            <ListItem className="vision-list-item">• Plan and estimate efforts required for land clearing, planting, fertilization, weeding, and fencing.</ListItem>
            <ListItem className="vision-list-item">• Create, label, group, and subgroup maps for effective land management.</ListItem>
            <ListItem className="vision-list-item">• Determine suitable plant numbers and fertilization requirements based on mapped land data.</ListItem>
            <ListItem className="vision-list-item">• Offer superior accuracy and user-friendliness compared to existing products in the market.</ListItem>
          </List>
          </div>
          
        </div>
      </Paper>

      <List style={styles.keyFeaturesContainer}>
        
      <Typography variant="h4" style={styles.heading}>
        Key Features
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
    </Container>
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
    color: "#007BFF",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    padding: "2rem 0 2rem 0",
   
    width: "80vw",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.3)",
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
