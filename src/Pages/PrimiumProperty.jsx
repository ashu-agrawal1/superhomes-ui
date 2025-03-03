import React, { useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../Redux/propertySlice";
import { format, parseISO, endOfMonth } from "date-fns";

const PremiumProperties = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { properties, loading, error } = useSelector(
    (state) => state.property || {}
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const formatPropertyDate = (dateString) => {
    const date = parseISO(dateString);
    const startDay = format(date, "dd");
    const endDay = format(endOfMonth(date), "dd");
    const month = format(date, "MMM");
    return `${startDay}-${endDay} ${month}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div>Error fetching properties: {error.message || error}</div>;

  const premiumProperties = Array.isArray(properties)
    ? properties.filter((property) => property.is_premium === 1)
    : [];

  function handleClick(propertyId) {
    nav(`/single-property/${propertyId}`);
  }

  return (
    <section className="px-10 mt-10">
      <div className="relative inline-block mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="mr-2 text-[#292929] text-3xl">
            <FaCrown />
          </span>
          PREMIUM PROPERTIES
        </h2>
        <div className="absolute md:top-8 md:left-0 w-full h-1 bg-[#0044C1] md:mt-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {premiumProperties.length > 0 ? (
          premiumProperties.slice(0, 3).map((property) => (
            <div key={property.id} className="flex flex-col space-y-2 h-full">
              <div
                onClick={() => handleClick(property.id)}
                className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
              >
                <div className="aspect-[2/2] w-full relative">
                  <img
                    src={property.images?.[0]?.url || "default-image.jpg"}
                    alt={`${property.title} property`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="px-2 flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#292929] text-xl">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xl">
                    <span className="text-blue-600">★</span>
                    <span className="font-medium text-xl">
                      {property.rating || "4.6"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{property.location}</p>
              </div>

              <button
                onClick={() => handleClick(property.id)}
                className="w-full bg-[#0044C1] text-white py-2 px-3 text-[25.3px] transition-colors font-semibold"
              >
                BOOK NOW
              </button>
            </div>
          ))
        ) : (
          <div>No premium properties available.</div>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => nav("/listing")}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          See More
        </button>
      </div>
    </section>
  );
};

export default PremiumProperties;
