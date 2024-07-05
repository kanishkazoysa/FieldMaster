import getFontSizes from "antd/es/theme/themes/shared/genFontSizes";

export const styles = {
  pageWrapper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  container: {
    display: "flex",
    width: "100%",
    flex: 1,
    overflow: 'hidden',
  },
  leftColumn: {
    width: "30%",
    boxSizing: "border-box",
    borderRight: "5px solid #f1f1f1",
    display: 'flex',
    flexDirection: 'column',
  },
  rightColumn: {
    width: "70%",
    display: "flex",
  },
  rightInnerLeft: {
    width: "50%",
    boxSizing: "border-box",
    borderRight: "5px solid #f1f1f1",
    display: 'flex',
    flexDirection: 'column',
  },
  rightInnerRight: {
    width: "50%",
    boxSizing: "border-box",
    borderRight: "5px solid #f1f1f1",
    display: 'flex',
    flexDirection: 'column',
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
  listWrapper: {
    flex: 1,
    overflowY: 'auto',
    border: '1px solid #e8e8e8',
    borderRadius: '4px',
    margin: '20px',
  },
  headertxt: {
    margin: 0,
    color: "white",
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
    color: "white",
    alignItems: "center",
    backgroundColor: "#15314f",
    justifyContent: "center",
    padding: "20px",
    display: "flex",
    width: "100%",
    borderBottom: "5px solid #f1f1f1",
  },
  form: {
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
  submitBtn: {
    marginTop: "30px",
    marginLeft: "10%",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "80%",
  },
  plantListWrapper: {
    flex: 1,
    overflowY: 'auto',
    border: '1px solid #e8e8e8',
    borderRadius: '4px',
    margin: '20px',
  },
  plantNameMeta: {
    marginLeft: '20px',
  },

};