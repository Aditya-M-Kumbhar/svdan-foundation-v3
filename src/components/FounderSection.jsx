import founderImg from '../assets/founder.jpg'

const awards = [
  'Kishor Nagari Award (1999)',
  'Chikotra Bhushan Award (2004)',
  'Belgaum Bhushan Award (2005)',
  'Kalratna Award (2006)',
  'Dr. Babasaheb Ambedkar Adarsh Kalabhushan Award (2010)',
  'Shahir Vikramaditya Award (2010)',
  'Satyashodhak Shivshahir Award (2011)',
  'Lokshahir Vitthal Umap Memorial Award (2011)',
  'Shahir Visharad Title by Kolhapur Royal Family (2017)',
]

export default function FounderSection() {
  return (
    <section id="founder" className="py-16 px-4 bg-gradient-to-br from-orange-600 via-red-700 to-red-900">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-orange-200 font-semibold text-sm uppercase tracking-widest mb-2">
            The Visionary Behind It All
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Our <span className="text-orange-300">Founder</span>
          </h2>
          <div className="w-20 h-1 bg-orange-300 mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* LEFT — Founder Photo */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3">
            <img
              src={founderImg}
              alt="Dr. Azad Nayakawadi"
              className="w-52 h-52 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-orange-300 shadow-2xl"
            />
            <div className="text-center">
              <h3 className="text-white font-bold text-2xl">
                Dr. Azad Nayakawadi
              </h3>
              <p className="text-orange-200 text-sm mt-1">
                Founder & Shahir Visharad
              </p>
              <p className="text-orange-300 text-xs mt-1">
                Born: 5 December 1980 • Kolhapur, Maharashtra
              </p>
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="lg:w-2/3 space-y-6">

            {/* About */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-orange-300 font-bold text-lg mb-3">About</h4>
              <p className="text-white text-sm leading-relaxed">
                Dr. Azad Nayakawadi is a renowned folk artist, cultural promoter, and social worker
                dedicated to preserving Maharashtra's traditional folk art. Since 1992, he has served
                as the 'Darbar Shahir' of the Royal Family of Kolhapur — the only Shahir to have
                performed Powada five times before the President of India.
              </p>
            </div>

            {/* Education */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-orange-300 font-bold text-lg mb-3">Education</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Sangeet Visharad (Classical Music)</li>
                <li>• M.A. in Music (Tabla)</li>
                <li>• Ph.D. in Music — focused on Shahiri compositions and folk traditions</li>
              </ul>
            </div>

            {/* Professional */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-orange-300 font-bold text-lg mb-3">Professional Contributions</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Honorary Tabla Artist & Shahiri Professor at Shivaji University (2003–2010)</li>
                <li>• Member, Lokakala Academic Committee at Shivaji University</li>
                <li>• Head of Music Department, Tara Rani Vidyapeeth, Kolhapur</li>
              </ul>
            </div>

            {/* Awards */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-orange-300 font-bold text-lg mb-3">Awards & Honours</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-white text-xs"
                  >
                    <span className="text-orange-300 mt-0.5">🏆</span>
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}