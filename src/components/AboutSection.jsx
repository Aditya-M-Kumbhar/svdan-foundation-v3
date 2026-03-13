import about1 from '../assets/about_the_org1.jpeg'
import about2 from '../assets/about_the_org2.jpeg'

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            About <span className="text-orange-500">Us</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* LEFT — Images */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <img
              src={about1}
              alt="Organization activity"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-lg"
            />
            <img
              src={about2}
              alt="Community event"
              className="w-full h-48 sm:h-64 object-cover rounded-2xl shadow-lg mt-8"
            />
          </div>

          {/* RIGHT — Text */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4">
              Leading NGO in India for Healthcare, Education & Community Service
            </h3>
            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                Our Foundation is a social and cultural organization established in
                <span className="font-semibold text-gray-800"> 2002 </span>
                with the vision of promoting rural folk art and serving society
                through humanitarian initiatives.
              </p>
              <p>
                The organization expanded its mission beyond cultural promotion and
                actively began working in social welfare, healthcare support,
                education, and community development.
              </p>
              <p>
                The foundation continues to work with dedication to preserve
                cultural heritage, improve the lives of underprivileged communities
                and to guide and assist needy and talented students.
              </p>
              <p className="text-orange-500 font-bold text-lg italic">
                Work with us and "DISCOVER YOURSELF"
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { number: '2002', label: 'Established' },
                { number: '20+', label: 'Years of Service' },
                { number: '6+', label: 'Major Projects' },
                { number: '1000+', label: 'Lives Touched' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-orange-50 rounded-xl py-3 px-2 border border-orange-100"
                >
                  <p className="text-orange-500 font-bold text-xl">{stat.number}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}