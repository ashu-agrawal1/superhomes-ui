import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaConciergeBell,
} from "react-icons/fa";

const propertyData = [
  {
    id: "1",
    name: "Luxury Villa in Jabalpur",
    location: "Jabalpur, India",
    rating: 4.8,
    address: "123 Main St, Jabalpur, MP, India",
    amenities: ["Wi-Fi", "Swimming Pool", "Parking", "Room Service"],
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-764316006703590007/original/11669b73-4a0e-4012-89da-b15121f3daa6.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-764316006703590007/original/e75d7af9-3b61-4b3e-95ec-07d5b5dcb87f.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-764316006703590007/original/8ff7d69c-03f2-4b5a-a80d-8adedd700e93.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/d5f3c823-602d-4051-bd9a-1744d9c954d5.jpg?im_w=240",
      "https://a0.muscache.com/im/pictures/miso/Hosting-764316006703590007/original/1e874018-8420-401f-861e-6bef0574d06f.jpeg?im_w=720",
    ],
  },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const selectedProperty = propertyData.find((p) => p.id === id);
    if (!selectedProperty) {
      return <p>Property not found.</p>;
    }
    setProperty(selectedProperty);
  }, [id]);

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        {property.name}
      </h1>
      <div className="text-gray-600 mb-4 flex items-center space-x-2 text-center md:text-left">
        <FaMapMarkerAlt />
        <span>{property.location}</span>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <FaStar className="text-yellow-500" />
        <span>{property.rating}</span>
      </div>
      <p className="text-gray-700 mb-4">{property.address}</p>

      <div className="flex flex-col md:flex-row max-w-7xl mb-8 space-y-4 md:space-y-0 md:space-x-4">
        {/* Main Image */}
        <div className="flex-1 max-h-96">
          <img
            src={property.images[0]}
            alt={`Property ${property.name} - Main Image`}
            className="w-full h-full object-cover rounded-xl border border-gray-300"
          />
        </div>

        {/* Smaller Images */}
        <div className="grid grid-cols-2 gap-y-1 gap-x-2 flex-1">
          {property.images.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property ${property.name} - Image ${index + 2}`}
              className={`w-full h-48 object-cover rounded-xl border border-gray-300`}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
      <ul className="flex flex-wrap gap-4 justify-center md:justify-start">
        {property.amenities.includes("Wi-Fi") && (
          <li className="flex items-center space-x-2">
            <FaWifi className="text-blue-500" />
            <span>Wi-Fi</span>
          </li>
        )}
        {property.amenities.includes("Swimming Pool") && (
          <li className="flex items-center space-x-2">
            <FaSwimmingPool className="text-blue-500" />
            <span>Swimming Pool</span>
          </li>
        )}
        {property.amenities.includes("Parking") && (
          <li className="flex items-center space-x-2">
            <FaParking className="text-blue-500" />
            <span>Parking</span>
          </li>
        )}
        {property.amenities.includes("Room Service") && (
          <li className="flex items-center space-x-2">
            <FaConciergeBell className="text-blue-500" />
            <span>Room Service</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PropertyDetail;
