import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import women from '../assets/projects/women_emp.jpeg'
import blood from '../assets/projects/blood_donation.jpeg'
import clean from '../assets/projects/cleanliness_drive.jpeg'
import fort from '../assets/projects/fort_conservation.jpeg'
import school from '../assets/projects/school_kit.jpeg'
import ambulance from '../assets/projects/ambulance_donation.jpeg'
import teams from '../assets/work/team.jpeg'

const projects = [
  {
    id: 'work-women',
    image: women,
    title: 'Women Empowerment Session',
    description: 'These sessions focus on creating awareness about women\'s rights, education, health, financial independence, and self-development. Women are encouraged to recognize their potential and actively participate in social and economic development.',
    color: 'bg-pink-500',
  },
  {
    id: 'work-blood',
    image: blood,
    title: 'Blood Donation Camp',
    description: 'The foundation encourages people to donate blood voluntarily to help patients in urgent need. Certified medical teams and blood banks ensure the donation process is safe, hygienic, and well-organized.',
    color: 'bg-red-500',
  },
  {
    id: 'work-clean',
    image: clean,
    title: 'Cleanliness Drive',
    description: 'Volunteers and community members come together to clean public places such as streets, parks, and schools. The drive creates awareness about maintaining cleanliness and encouraging healthy daily habits.',
    color: 'bg-green-500',
  },
  {
    id: 'work-fort',
    image: fort,
    title: 'Fort Conservation Initiative',
    description: 'Forts are important symbols of history and cultural identity. The foundation works with government departments and heritage experts to support cleanliness drives, awareness programs, and restoration efforts at historical fort sites.',
    color: 'bg-yellow-600',
  },
  {
    id: 'work-school',
    image: school,
    title: 'School Kit Donation Drive',
    description: 'The foundation distributes school bags, notebooks, stationery, and other learning supplies to children in need. The goal is to reduce financial burden on families and ensure every child has basic resources for learning.',
    color: 'bg-blue-500',
  },
  {
    id: 'work-ambulance',
    image: ambulance,
    title: 'Ambulance Donation Initiative',
    description: 'During the pandemic, many people faced difficulties accessing healthcare. By donating an ambulance, the foundation helped ensure patients from rural and economically weaker sections could reach hospitals quickly and safely.',
    color: 'bg-orange-500',
  },
  {
  id: 'work-teams',
  image: teams,
  title: 'Social Internship Program',
  description: 'Assist students in their education and organize social internships that help them understand real societal challenges and develop a sense of social responsibility.',
  color: 'bg-purple-500',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Our Flagship <span className="text-orange-500">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={false}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="pb-12"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
                <div id={project.id} className="bg-white rounded-2xl shadow-md overflow-hidden h-full mx-2 mb-2">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-gray-800 font-bold text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}