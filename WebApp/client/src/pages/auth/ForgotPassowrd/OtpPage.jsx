import "../Register/RegisterStyle.css";
import OtpForm from "./OtpForm";
import Logo from "../../../images/logo.png";

const FPPage = () => {
  return (
    <div className="register-page">
      <div className="logo">
        <img alt="logo" className="logo-img" src={Logo} />
      </div>
      <div className="left-container">
        <OtpForm />
      </div>
    </div>
  );
};
export default FPPage;
