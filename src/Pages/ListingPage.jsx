import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../Redux/propertySlice";
import { useNavigate } from "react-router-dom";
import { FaList, FaCrown, FaStar } from "react-icons/fa";
import '../css/font.css';

const PropertyListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties, loading, error } = useSelector((state) => state.property || {});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  if (loading) return <div className="text-center py-10">Loading properties...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error.message || "Failed to load properties"}</div>;

  const filteredProperties = properties.filter((property) => {
    if (filter === "premium") return property.is_premium === 1;
    if (filter === "featured") return property.is_premium === 0;
    return true;
  });

  const handleCardClick = (propertyId) => {
    navigate(`/single-property/${propertyId}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 bg-gradient-to-t from-gray-200 to-gray-100 min-h-screen">
      {/* Responsive Header */}
    

      {/* Responsive Filter Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaList className="mr-2" />
          <span>All Properties</span>
        </button>
        <button
          onClick={() => setFilter("premium")}
          className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
            filter === "premium" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaCrown className="mr-2" />
          <span>Premium</span>
        </button>
        <button
          onClick={() => setFilter("featured")}
          className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
            filter === "featured" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaStar className="mr-2" />
          <span>Featured</span>
        </button>
      </div>

      {/* Responsive Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="flex flex-col">
              <div
                onClick={() => handleCardClick(property.id)}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 flex-grow"
              >
                <div className="relative h-40 sm:h-48 bg-gray-300 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                  <img
                    src={property.images?.[0]?.url || "https://via.placeholder.com/300"}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold truncate mb-1 sm:mb-2">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                  {property.location}
                </p>
                <p className="text-base sm:text-lg font-bold text-blue-600 mt-2 sm:mt-4">
                  ₹{property.price}/night
                </p>
              </div>
              <button
                onClick={() => handleCardClick(property.id)}
                className="mt-2 bg-[#0044C1] text-white py-2 px-3 sm:px-4 rounded-lg w-full transition-colors text-sm sm:text-base"
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full py-8 text-gray-500 text-sm sm:text-base">
            No properties available for this filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;