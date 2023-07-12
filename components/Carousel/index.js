"use client"

import './styles.css'
import { useState, useEffect } from 'react'

export default function Carousel() {

    const [ currentSlide, setCurrentSlide ] = useState(1)

    const slides = [
        {
            text: 'This is an awesome carousel',
            slide: 1,
        },
        {
            text: 'Wait... there is more',
            slide: 2,
        },
        {
            text: 'Can you believe that',
            slide: 3,
        },
    ]

    useEffect(() => {
        setTimeout(() => {
            if (currentSlide !== slides.length) {
                setCurrentSlide(prevState => prevState + 1)
            } else {
                setCurrentSlide(1)
            }
        }, 3500)
    }, [currentSlide])

    return (
        <section className="carousel-container">
            <div>
                {
                    slides.find(slide => slide.slide === currentSlide).text
                }
            </div>
            <ul className='dots-container'>
            {slides.map(slide => <li key={slide.slide}>
                <div className={`carousel-dot ${slide.slide === currentSlide ? "active" : ""}`} dataSlideNumber={slide.slide}>
            </div> 
            </li>)}
            </ul>
            
        </section>
    )
}