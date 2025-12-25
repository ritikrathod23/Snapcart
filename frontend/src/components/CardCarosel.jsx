import React, { useState, useEffect, useRef } from 'react';

const CardCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);
  const slidesQty = window.innerWidth >= 1024 ? 5 : 3;

  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(items.length - slidesQty, prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
    setTranslateX(-currentIndex * 100);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches[0].clientX;
    const diff = x - startX;
    setTranslateX(-currentIndex * 100 + (diff / carouselRef.current.offsetWidth) * 100);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    const x = e.clientX || e.changedTouches[0].clientX;
    const diff = x - startX;

    if (diff > 50) {
      goToPrev();
    } else if (diff < -50) {
      goToNext();
    } else {
      setCurrentIndex(currentIndex);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // Adjust currentIndex on resize to prevent empty space
      const newSlidesQty = window.innerWidth >= 1024 ? 3 : 1;
      setCurrentIndex(prev => Math.min(prev, items.length - newSlidesQty));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [items?.length]);

  return (
    <div className="relative w-full overflow-hidden bg-white rounded-lg">
      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="relative min-h-36 md:max-h-72"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Slides */}
        <div
          className={`flex transition-transform duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            transform: `translateX(${isDragging ? translateX : -currentIndex * (100 / slidesQty)}%)`,
            width: `${(items?.length / slidesQty) * 100}%`
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="px-1"
              style={{ width: `${100 / slidesQty}%` }}
            >
              <div className="flex justify-center w-36 md:w-72 md:h-80 p-2 ">
                <span className="self-center text-sm  w-full h-full text-gray-800">
                  <Card
                    key={item.key}
                    title={item.Brand}
                    image={item.Image}
                    price={item.Price}
                    description={item.Description}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        type="button"
        onClick={goToPrev}
        disabled={currentIndex === 0}
        className={`absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg ${currentIndex === 0 ? 'opacity-50 pointer-events-none' : ''
          }`}
      >
        <span className="text-2xl" aria-hidden="true">
          <svg
            className="shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="240"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>

      <button
        type="button"
        onClick={goToNext}
        disabled={currentIndex >= items.length - slidesQty}
        className={`absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg ${currentIndex >= items.length - slidesQty ? 'opacity-50 pointer-events-none' : ''
          }`}
      >
        <span className="sr-only">Next</span>
        <span className="text-2xl" aria-hidden="true">
          <svg
            className="shrink-0 size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </span>
      </button>

      {/* Pagination dots */}
      <div className="flex justify-center absolute bottom-3 start-0 end-0 gap-x-2">
        {Array.from({ length: Math.max(1, items.length - slidesQty + 1) }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`size-3 border rounded-full cursor-pointer transition-colors ${index === currentIndex
                ? 'bg-blue-700 border-blue-700'
                : 'border-gray-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Example Card component (replace with your actual Card component)
const Card = ({ title, image, price, description }) => (
  <div className="bg-white w-full h-full border border-solid border-stone-300 rounded shadow">
    <img src={image} alt={title} className="w-full h-32 md:h-52 object-cover mb-2" />
    <h3 className="font-bold">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <p className="text-blue-600 font-semibold">{price}</p>
  </div>
);

export default CardCarousel;