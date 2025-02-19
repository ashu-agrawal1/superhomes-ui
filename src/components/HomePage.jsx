import React from "react";
import Header from "./Header";
import FAQ from "./FAQ";
import Footer from "./Footer";
import STR from "../Pages/SRT";
import Testimonials from "../components/Testimonials";
const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <Header />

      <div className="bg-gradient-to-r from-[#0753cf] to-[#008ae9] py-2 w-full text-center text-white">
        EXTRA 5% DISCOUNT AND FREE SHIPING ON ALL ONLINE PAYMENTS
      </div>

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
