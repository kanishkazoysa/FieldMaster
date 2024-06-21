import "../Register/RegisterStyle.css";
import CPForm from "./CPForm";
import Logo from "../../../images/logo.png";

const CPPage = () => {
  return (
    <div className="register-page">
      <div className="logo">
        <img alt="logo" className="logo-img" src={Logo} />
      </div>
      <div className="left-container">
        <CPForm />
      </div>
    </div>
  );
};
export default CPPage;
