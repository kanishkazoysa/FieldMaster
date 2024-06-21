import "../Register/RegisterStyle.css";
import LoginForm from "./LoginForm";
import Logo from "../../../images/logo.png";

const LoginPage = () => {
  return (
    <div className="register-page">
      <div className="logo">
        <img alt="logo" className="logo-img" src={Logo} />
      </div>
      <div className="left-container">
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
