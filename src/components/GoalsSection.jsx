import goalsImg from '../assets/our_goals.png'

const goals = [
  {
    icon: '🏥',
    title: 'Healthcare Support',
    description:
      'Providing medical assistance and healthcare awareness to underprivileged communities across rural Maharashtra.',
    color: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-100',
  },
  {
    icon: '📚',
    title: 'Education',
    description:
      'Guiding and assisting needy and talented students by providing essential resources and mentorship.',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '🎭',
    title: 'Cultural Preservation',
    description:
      'Preserving Maharashtra\'s rich folk art traditions and promoting Shahiri culture across India.',
    color: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-orange-100',
  },
  {
    icon: '🤝',
    title: 'Community Development',
    description:
      'Building stronger communities through social welfare initiatives, cleanliness drives, and heritage conservation.',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    icon: '👩',
    title: 'Women Empowerment',
    description:
      'Empowering women through awareness sessions on rights, education, health, and financial independence.',
    color: 'bg-pink-50 border-pink-200',
    iconBg: 'bg-pink-100',
  },
  {
    icon: '🏰',
    title: 'Heritage Conservation',
    description:
      'Working with government departments and experts to restore and conserve historical forts and cultural sites.',
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
  },
]

export default function GoalsSection() {
  return (
    <section id="goals" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
            What We Stand For
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Our <span className="text-orange-500">Goals</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Goals Image */}
        <div className="w-full mb-12 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={goalsImg}
            alt="Our Goals"
            className="w-full h-64 sm:h-80 object-contain bg-orange-50"
          />
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className={`${goal.color} border rounded-2xl p-6 hover:shadow-md transition-shadow duration-300`}
            >
              <div className={`${goal.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4`}>
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