import './styles.css'

export default function Carousel() {

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

    return (
        <section className="carousel-container">
            <div>
                Some engaging content
            </div>
            <ul className='dots-container'>
            {slides.map(slide => <li key={slide.slide}>
                <div className='carousel-dot' dataSlideNumber={slide.slide}>
            </div> 
            </li>)}
            </ul>
            
        </section>
    )
}