import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function FilterProperty() {
  const { filteredProperties, loading, error } = useSelector((state) => state.property);
  const navigate = useNavigate();

  if (loading) return <p>Loading properties...</p>;
  
  if (error) {
    console.error('Error object:', error); // For debugging
    return <p>Error: {error.message || (typeof error === 'string' ? error : 'An unknown error occurred')}</p>;
  }

  const handleCardClick = (propertyId) => {
    navigate(`/single-property/${propertyId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Filtered Properties ({filteredProperties.length})
      </h1>
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div 
              key={property.id} 
              className="border rounded-md p-4 shadow-md cursor-pointer" 
              onClick={() => handleCardClick(property.id)}
            >
              <div className="h-40 bg-gray-300 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={property.images?.[0]?.url || "/default-image.jpg"}
                  alt={`${property.title} property`}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-bold">{property.title}</h2>
              <p>Price: ₹{property.price}</p>
              <p>Location: {property.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties found matching your criteria.</p>
      )}
    </div>
  );
}

