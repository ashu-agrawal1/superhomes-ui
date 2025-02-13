import { useCallback, useEffect, useState } from "react"
import { useSwipeable } from "react-swipeable"

export function StackedCarousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const previousSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const handleSwipedLeft = () => {
    if (!isAnimating) nextSlide();
  };

  const handleSwipedRight = () => {
    if (!isAnimating) previousSlide();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    preventDefaultTouchmoveEvent: true,
  });

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getStyles = (position) => {
    if (position === 0) {
      return {
        zIndex: 2,
        transform: "translateX(0)",
        opacity: 1,
      };
    } else if (position === 1) {
      return {
        zIndex: 1,
        transform: "translateX(40%) scale(0.85)", // Adjust scaling for adjacent slides
        opacity: 0.8,
      };
    } else if (position === images.length - 1) {
      return {
        zIndex: 1,
        transform: "translateX(-40%) scale(0.85)",
        opacity: 0.8,
      };
    }
    return {
      zIndex: 0,
      transform: "translateX(100%)",
      opacity: 0,
    };
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto h-[70vh] flex items-center justify-center overflow-hidden"
      {...swipeHandlers}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((image, index) => {
          const position = (index - currentSlide + images.length) % images.length;
          const styles = getStyles(position);

          return (
            <div
              key={index}
              className="absolute w-[70%] h-[80%] transition-all duration-600 ease-in-out"
              style={{
                ...styles,
                transformOrigin: "center center",
              }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        onClick={previousSlide}
        disabled={isAnimating}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        onClick={nextSlide}
        disabled={isAnimating}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
// App.jsx
function App() {
  const images = [
    "https://assets.codepen.io/108082/jake-and-fin-1.jpg",
    "https://assets.codepen.io/108082/jake-and-fin-2.jpg",
    "https://assets.codepen.io/108082/jake-and-fin-3.jpg",
    "https://assets.codepen.io/108082/jake-and-fin-4.jpg",
  ]
  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <StackedCarousel images={images} />
    </div>
  )
}

export default App
