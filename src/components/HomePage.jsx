import React from 'react';
import Header from './Header';
import FAQ from './FAQ';
import Footer from './Footer';
import STR from '../Pages/SRT';
import Testimonials from '../components/Testimonials';
const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <Header />
      
      <div className="h-2  md:p-6  bg-gradient-to-r from-[#0753cf] to-[#008ae9]
 w-full " />
      
      {/* Subheading */}
      <div className="text-center md:py-4">
        <p className="text-blue-800 italic text-sm"></p>
      </div>

      <STR />
      <Testimonials />
      <FAQ />
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

