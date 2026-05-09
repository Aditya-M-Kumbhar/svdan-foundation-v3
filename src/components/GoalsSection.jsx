import goalsImg from '../assets/our_goals.png'

const goals = [
  {
    title: 'Healthcare Support',
    description:
      'Providing medical assistance and healthcare awareness to underprivileged communities across rural Maharashtra.',
    color: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Education',
    description:
      'Guiding and assisting needy and talented students by providing essential resources and mentorship.',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: 'Cultural Preservation',
    description:
      "Preserving Maharashtra's rich folk art traditions and promoting Shahiri culture across India.",
    color: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    title: 'Community Development',
    description:
      'Building stronger communities through social welfare initiatives, cleanliness drives, and heritage conservation.',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Women Empowerment',
    description:
      'Empowering women through awareness sessions on rights, education, health, and financial independence.',
    color: 'bg-pink-50 border-pink-200',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Heritage Conservation',
    description:
      'Working with government departments and experts to restore and conserve historical forts and cultural sites.',
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
]

export default function GoalsSection() {
  return (
    <section id="goals" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
            What We Stand For
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Our <span className="text-orange-500">Goals</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="w-full mb-12 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={goalsImg}
            alt="Our Goals"
            className="w-full h-64 sm:h-80 object-contain bg-orange-50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className={`${goal.color} border rounded-2xl p-6 hover:shadow-md transition-shadow duration-300`}
            >
              <div className={`${goal.iconBg} ${goal.iconColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                {goal.icon}
              </div>
              <h3 className="text-gray-800 font-bold text-lg mb-2">
                {goal.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {goal.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
