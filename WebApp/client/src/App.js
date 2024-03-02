import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/HomeComponents/navbar/Navbar';
import Hero from './components/HomeComponents/Hero/Hero';
import About from './components/HomeComponents/About';
import Footer from './components/HomeComponents/Footer';
import Pricing from './components/HomeComponents/Pricing';
import Setup from './components/HomeComponents/SetupCard';
import ContactForm from './components/HomeComponents/contact/contact';
import './index.css';
import { Carousel } from 'bootstrap';
export default function App() {
  return (

    <>
      <Navbar />
      <div className='container'>
        <Hero />
        <About />
       
        <Setup />
        <Pricing />
      </div>
      <div className='ContactContainer'>
        <ContactForm />
      </div>
      
    </>

  );
}
