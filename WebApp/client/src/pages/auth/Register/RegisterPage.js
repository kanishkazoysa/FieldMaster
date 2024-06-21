import './RegisterStyle.css'
import RegisterForm from './RegisterForm';
import Logo from '../../../images/logo.png';

const RegisterPage = () => {
  return (
    <div className='register-page'>
    <div className='logo'>
    <img
      alt="logo"
      className='logo-img'
    src={Logo}
    />
    </div>
    <div className="left-container">
      <RegisterForm />
    </div>
    </div>
  )
}
export default RegisterPage
