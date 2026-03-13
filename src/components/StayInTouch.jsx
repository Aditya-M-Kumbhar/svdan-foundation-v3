export default function StayInTouch() {
  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-2">
            We'd Love To Hear From You
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Stay In <span className="text-orange-500">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">

          <a
            href="mailto:svdanfoundation@gmail.com"
            className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
              📧
            </div>
            <h3 className="text-gray-800 font-bold text-base">Email Us</h3>
            <p className="text-orange-500 text-sm text-center break-all">
              svdanfoundation@gmail.com
            </p>
          </a>

          <a
            href="tel:+918010388950"
            className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
              📞
            </div>
            <h3 className="text-gray-800 font-bold text-base">Call Us</h3>
            <p className="text-orange-500 text-sm text-center">
              +91 8010388950
            </p>
          </a>

          <a
            href="https://www.instagram.com/dr.azad_nayakawadi_foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100"
          >
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-2xl">
              📸
            </div>
            <h3 className="text-gray-800 font-bold text-base">Instagram</h3>
            <p className="text-pink-500 text-sm text-center">
              @dr.azad_nayakawadi_foundation
            </p>
          </a>

        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md border border-orange-100">
            <span className="text-xl">📍</span>
            <p className="text-gray-600 text-sm font-medium">
              Kolhapur, Maharashtra, India
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
