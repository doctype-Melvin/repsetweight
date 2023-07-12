"use client";

import "./styles.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const slides = [
    {
      text: "Choose one of the preset templates",
      slide: 1,
    },
    {
      text: "Keep track of your progress",
      slide: 2,
    },
    {
      text: "Create your own templates",
      slide: 3,
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentSlide !== slides.length) {
        setCurrentSlide((prevState) => prevState + 1);
      } else {
        setCurrentSlide(1);
      }
    }, 5500);

    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <section className="carousel-container">
      <motion.div
        className="carousel-content"
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
        {slides.find((slide) => slide.slide === currentSlide).text}
      </motion.div>
      <ul className="dots-container">
        {slides.map((slide) => (
          <li key={slide.slide}>
            <div
              className={`carousel-dot ${
                slide.slide === currentSlide ? "active" : ""
              }`}
            ></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
