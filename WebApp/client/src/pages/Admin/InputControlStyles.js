import getFontSizes from "antd/es/theme/themes/shared/genFontSizes";

export const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
  },
  leftColumn: {
    width: "30%",
    boxSizing: "border-box",
    borderRight: "5px solid #f1f1f1",
  },
  rightColumn: {
    width: "70%",
    display: "flex",
  },
  rightInnerLeft: {
    width: "50%",
    boxSizing: "border-box",
    borderRight: "5px solid #f1f1f1",
  },
  rightInnerRight: {
    width: "50%",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#15314f",
    borderBottom: "1px solid #f1f1f1",
  },
  headertxt: {
    margin: 0,
    color: "gray",
  },
  InnerHeader: {
    color: "gray",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    display: "flex",
    width: "100%",
    borderBottom: "5px solid #f1f1f1",
  },
    leftHeader: {
        color: "gray",
        alignItems: "center",
        backgroundColor: "#15314f",
        justifyContent: "center",
        padding: "20px",
        display: "flex",
        width: "100%",
        borderBottom: "5px solid #f1f1f1",
    },
    form :
    {
        marginTop: "30px",
        color: "gray",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        display: "flex",
        width: "100%",
    },
    formheader: {
        marginTop: "50px",
        fontSize: "20px",
        color: "gray",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
    },
    submitBtn:
    {
        marginTop: "30px",
        marginLeft: "10%",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "80%",
    }
};
