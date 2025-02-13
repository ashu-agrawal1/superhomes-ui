import React from 'react';

export default function ViewMore() {
    return (
        <div className="flex justify-center items-center py-10 bg-gray-100">
            <div className="flex flex-col md:flex-row w-11/12 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full md:w-1/2 h-48 md:h-auto bg-gray-300">
                    {/* Replace with actual image */}
                </div>
                <div className="flex flex-col justify-center p-6 md:w-1/2 text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-800">Explore More Properties</h3>
                    <p className="mt-3 text-gray-600">
                        Discover a variety of premium spaces designed to meet your needs and preferences.
                    </p>
                    <button className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
                        View More
                    </button>
                </div>
            </div>
        </div>
    );
}
