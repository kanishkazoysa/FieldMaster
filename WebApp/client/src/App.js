import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Setup from './components/SetupCard';

export default function App() {
  return (
    <>
    <Navbar />
    <div className='container'>
      <Hero />
      <About />
      <Setup />
      <Pricing />
      <Footer />
    </div>
    </>
  );
}
