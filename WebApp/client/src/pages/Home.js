import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar/sideNavbar";

export default function Home() {
  

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <SideNavbar />
      </div>

      <div style={styles.content}></div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    height: "100vh",
  },
  content: {
    flex: 1,
  },
};
