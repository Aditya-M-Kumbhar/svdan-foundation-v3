import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import slide1 from '../assets/slide1.jpeg'
import slide2 from '../assets/slide2.jpeg'
import slide3 from '../assets/slide3.jpeg'

const slides = [
  {
    image: slide1,
    title: 'Serving Society Since 2002',
    subtitle: 'Healthcare • Education • Community Development',
  },
  {
    image: slide2,
    title: 'Preserving Cultural Heritage',
    subtitle: 'Promoting Rural Folk Art Across Maharashtra',
  },
  {
    image: slide3,
    title: 'Work With Us',
    subtitle: 'Discover Yourself Through Social Service',
  },
]

export default function Slideshow() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-[220px] sm:h-[350px] md:h-[450px] lg:h-[520px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover object-top"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-orange-300 text-sm sm:text-base md:text-lg font-medium drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}