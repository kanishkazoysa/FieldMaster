import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/HomeComponents/navbar/Navbar";
import Hero from "./components/HomeComponents/Hero/Hero";
import About from "./components/HomeComponents/About";
import Pricing from "./components/HomeComponents/Pricing";
import Setup from "./components/HomeComponents/SetupCard";
import ContactForm from "./components/HomeComponents/contact/contact";
import "./index.css";
import Home from "./pages/Home/Home";
import EmailVerified from "./pages/EmailVerified";
import Managemap from "./pages/Managemap";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/Login/LoginPage";
import FPPage from "./pages/auth/ForgotPassowrd/FPPage";
import OtpPage from "./pages/auth/ForgotPassowrd/OtpPage";
import CPPage from "./pages/auth/ForgotPassowrd/CPPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <div className="main-container">
              <div className="page-container">
                <RegisterPage />
              </div>
              <div className="auth-layout">
                <AuthLayout />
              </div>
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <div className="main-container">
              <div className="page-container">
                <LoginPage />
              </div>
              <div className="auth-layout">
                <AuthLayout />
              </div>
            </div>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <div className="main-container">
              <div className="page-container">
                <FPPage />
              </div>
              <div className="auth-layout">
                <AuthLayout />
              </div>
            </div>
          }
        />

        <Route
          path="/enter-otp/:email"
          element={
            <div className="main-container">
              <div className="page-container">
                <OtpPage />
              </div>
              <div className="auth-layout">
                <AuthLayout />
              </div>
            </div>
          }
        />

        <Route
          path="/change-password/:email"
          element={
            <div className="main-container">
              <div className="page-container">
                <CPPage />
              </div>
              <div className="auth-layout">
                <AuthLayout />
              </div>
            </div>
          }
        />

        {/* Route for the main content */}
        <Route path="/" element={<MainContent />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/emailVerification" element={<EmailVerified />} />
        <Route path="/managemap" element={<Managemap />} />
      </Routes>
    </Router>
  );
}

// MainContent component
const MainContent = () => (
  <>
    {/* <Managemap/> */}
    <Navbar />
    <div className="container">
      <Hero />
      <About />
      <Setup />
      <Pricing />
    </div>
    <div className="ContactContainer">
      <ContactForm />
    </div>
  </>
);
