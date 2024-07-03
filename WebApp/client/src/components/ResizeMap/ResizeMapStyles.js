export const styles = {
    container: {
        display: "flex",
        height: "100vh",
      },
      mapContainer: {
        flex: "1",
        position: "relative",
      },
      top: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      },
      area:{
        marginRight: 30,
        color:"white",
      },
      perimeter:{
        color:"white",
      },
      controls: {
        position: "absolute",
        bottom: "20px",
        right: "30px",
        display: "flex",
        gap: "10px",
      },
      controlBtn: {
        padding: "5px 20px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "40px",
      },
      controlBtnCancel: {
        backgroundColor: "#DC3545",
      },
      mapControls: {
        position: "absolute",
        top: "10px",
        left: "10px",
        zindex: "5",
        background: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
      }
};