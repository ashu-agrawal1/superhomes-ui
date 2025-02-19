import React from "react";
import { FaSearch, FaUser, FaBars, FaStar, FaHome } from "react-icons/fa"; // Added FaHome
import {
  MdHotel,
  MdMeetingRoom,
  MdPool,
  MdOutlineSurfing,
  MdBeachAccess,
} from "react-icons/md";

import FeatureProperty from "./FeatureProperty";
import PremiumProperties from "./PrimiumProperty";
import SearchBar from "../components/Searchbar";
const SRT = () => {
  const properties = [
    { location: "Jabalpur, India", rating: 4.6, distance: "530 km" },
    { location: "Agra, India", rating: 4.3, distance: "240 km" },
    { location: "Goa, India", rating: 4.6, distance: "1340 km" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Search Bar Section */}
      <SearchBar />

      {/* Featured Properties */}
      <FeatureProperty />
      <div
        className="h-5 mt-6 md:mt-12 md:p-6  bg-gradient-to-r from-[#0753cf] to-[#008ae9]
w-full md:mb-5"
      />
      {/* Premium Properties */}

      <PremiumProperties />
    </div>
  );
};

export default SRT;
