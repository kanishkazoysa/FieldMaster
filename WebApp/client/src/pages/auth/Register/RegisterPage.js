import './RegisterStyle.css'
import RegisterForm from './RegisterForm';
import Logo from '../../../images/logo.png';

const RegisterPage = () => {
  return (
    <div className='left-container'>
    <div className='logo'>
    <img
      alt="logo"
      className='logo-img'
    src={Logo}
    />
    </div>
    <RegisterForm />
    </div>
  )
}
export default RegisterPage
