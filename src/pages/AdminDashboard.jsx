import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

const ADMIN_PASSWORD = 'swarajazadnaikwadi@8950'

export default function AdminDashboard() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password!')
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchDonations()
    }
  }, [authenticated])

  const fetchDonations = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(collection(db, 'donations'))
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setDonations(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getVolunteerGroups = () => {
    const groups = {}
    donations.forEach((d) => {
      const key = d.volunteerName || 'Direct Donation'
      if (!groups[key]) groups[key] = []
      groups[key].push(d)
    })
    return groups
  }

  const getTotalAmount = (list) => {
    return list.reduce((sum, d) => sum + Number(d.amount || 0), 0)
  }

  const grandTotal = getTotalAmount(donations)
  const volunteerGroups = getVolunteerGroups()

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading donations...</p>
      </div>
    )
  }

  if (selectedVolunteer) {
    const list = volunteerGroups[selectedVolunteer] || []
    const total = getTotalAmount(list)
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="bg-white border border-gray-200 text-gray-600 font-semibold px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedVolunteer}</h1>
              <p className="text-gray-500 text-sm">{list.length} donations — Total: ₹{total}</p>
            </div>
          </div>

          <div className="space-y-4">
            {list.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">₹{d.amount}</p>
                    <p className="text-gray-500 text-sm">{d.donorName || 'Anonymous'}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    Received
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs">Contact</p>
                    <p className="text-gray-700">{d.contact || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Transaction ID</p>
                    <p className="text-gray-700">{d.transactionId || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Date</p>
                    <p className="text-gray-700">{d.timestamp ? new Date(d.timestamp).toLocaleDateString() : '-'}</p>
                  </div>
                  {d.specialNote && (
                    <div>
                      <p className="text-gray-400 text-xs">Note</p>
                      <p className="text-gray-700">{d.specialNote}</p>
                    </div>
                  )}
                </div>
                {d.paymentScreenshotUrl && (
                  <a
                    href={d.paymentScreenshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs text-blue-500 underline"
                  >
                    View Screenshot
                  </a>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">SVDAN Foundation — Donation Overview</p>
          </div>
          <button
            onClick={fetchDonations}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full text-sm transition-colors"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            <p className="text-gray-400 text-sm mb-1">Total Donations</p>
            <p className="text-3xl font-bold text-green-600">₹{grandTotal}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            <p className="text-gray-400 text-sm mb-1">Total Donors</p>
            <p className="text-3xl font-bold text-blue-600">{donations.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            <p className="text-gray-400 text-sm mb-1">Active Volunteers</p>
            <p className="text-3xl font-bold text-orange-500">
              {Object.keys(volunteerGroups).filter(k => k !== 'Direct Donation').length}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Volunteer Wise Donations</h2>
        <div className="space-y-3">
          {Object.entries(volunteerGroups).map(([volunteer, list]) => (
            <button
              key={volunteer}
              onClick={() => setSelectedVolunteer(volunteer)}
              className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex justify-between items-center hover:shadow-md transition-shadow duration-200 text-left"
            >
              <div>
                <p className="font-bold text-gray-800">{volunteer}</p>
                <p className="text-gray-500 text-sm">{list.length} donation{list.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold text-lg">₹{getTotalAmount(list)}</p>
                <p className="text-gray-400 text-xs">Total collected</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
