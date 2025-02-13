// Card.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, location, rating }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/property/${id}`); // Navigate to the dynamic property detail page by ID
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{location}</h3>
      <p className="text-sm text-gray-600 mt-1">Explore amazing spaces</p>
      <p className="text-blue-600 mt-2">Rating: {rating}</p>
      <button
        onClick={handleViewMore}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View More
      </button>
    </div>
  );
};

export default Card;
