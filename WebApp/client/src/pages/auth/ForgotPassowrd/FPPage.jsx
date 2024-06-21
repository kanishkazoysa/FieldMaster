import "../Register/RegisterStyle.css";
import FPForm from "./FPForm";
import Logo from "../../../images/logo.png";

const FPPage = () => {
  return (
    <div className="register-page">
      <div className="logo">
        <img alt="logo" className="logo-img" src={Logo} />
      </div>
      <div className="left-container">
        <FPForm />
      </div>
    </div>
  );
};
export default FPPage;
