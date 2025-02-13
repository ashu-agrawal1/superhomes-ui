import React, { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute inset-0 flex">
        {/* Previous Image */}
        <div className="w-1/12 bg-black/50">
          <img
            src={images[(currentIndex - 1 + images.length) % images.length].url || "/placeholder.svg"}
            alt="Previous"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Current Image */}
        <div className="w-10/12">
          <img
            src={images[currentIndex].url || "/placeholder.svg"}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Next Image */}
        <div className="w-1/12 bg-black/50">
          <img
            src={images[(currentIndex + 1) % images.length].url || "/placeholder.svg"}
            alt="Next"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Previous image"
      >
        <MdChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Next image"
      >
        <MdChevronRight size={24} />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

export default Carousel
