import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import donationQR from '../assets/form/donationpayment.png'
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase/config'

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const DONATION_SHEETS_URL = import.meta.env.VITE_DONATION_SHEETS_URL

const presetAmounts = [50, 100, 200, 500, 1000]

const usageInfo = [
  {
    title: 'Healthcare Support',
    description: 'Your donation helps provide free medical assistance and healthcare awareness to underprivileged communities across rural Maharashtra.',
  },
  {
    title: 'Education',
    description: 'We use donations to distribute school kits, notebooks, and stationery to children in need, ensuring every child has basic learning resources.',
  },
  {
    title: 'Women Empowerment',
    description: 'Funds support awareness sessions on women rights, health, and financial independence across villages in Maharashtra.',
  },
  {
    title: 'Heritage Conservation',
    description: 'Your contribution helps restore and conserve historical forts and cultural sites that define our rich heritage.',
  },
  {
    title: 'Community Development',
    description: 'Donations power cleanliness drives, social internships, and community welfare programs that strengthen society.',
  },
]

async function uploadToCloudinary(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )
  const data = await response.json()
  return data.secure_url
}

async function generateReceiptNumber() {
  try {
    const q = query(collection(db, 'donations'), orderBy('createdAt', 'desc'), limit(1))
    const snapshot = await getDocs(q)
    const year = new Date().getFullYear()
    if (snapshot.empty) {
      return `SVDNF-${year}-001`
    }
    const last = snapshot.docs[0].data()
    const lastNum = last.receiptNumber ? parseInt(last.receiptNumber.split('-')[2]) : 0
    const nextNum = String(lastNum + 1).padStart(3, '0')
    return `SVDNF-${year}-${nextNum}`
  } catch {
    const timestamp = Date.now().toString().slice(-4)
    return `SVDNF-${new Date().getFullYear()}-${timestamp}`
  }
}

export default function DonationForm() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [volunteerName, setVolunteerName] = useState('')
  const [donorName, setDonorName] = useState('')
  const [contact, setContact] = useState('')
  const [specialNote, setSpecialNote] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [screenshotPreview, setScreenshotPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [wantReceipt, setWantReceipt] = useState(false)

  const finalAmount = customAmount || amount

  const handlePage1Next = () => {
    if (!finalAmount || isNaN(finalAmount) || Number(finalAmount) <= 0) {
      setError('Please select or enter a valid donation amount!')
      return
    }
    setError('')
    setPage(2)
  }

  const handleSubmit = async () => {
    if (!contact) {
      setError('Please enter your phone number or email!')
      return
    }
    if (!transactionId) {
      setError('Please enter the transaction ID!')
      return
    }
    if (!screenshot) {
      setError('Please upload the payment screenshot!')
      return
    }
    setError('')
    setLoading(true)

    try {
      const paymentScreenshotUrl = await uploadToCloudinary(screenshot)
      const receiptNumber = await generateReceiptNumber()
      const createdAt = new Date().toISOString()

      const formData = {
        timestamp: createdAt,
        createdAt,
        amount: Number(finalAmount),
        volunteerName: volunteerName || 'Direct Donation',
        donorName: donorName || 'Anonymous',
        contact,
        specialNote: specialNote || '',
        paymentScreenshotUrl,
        transactionId,
        receiptNumber,
        receiptRequested: wantReceipt,
      }

      await fetch(DONATION_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData),
      })

      await addDoc(collection(db, 'donations'), formData)

      navigate('/donation-success', {
        state: {
          receiptRequested: wantReceipt,
          receiptData: {
            receiptNumber,
            donorName: donorName || 'Anonymous',
            amount: Number(finalAmount),
            transactionId,
            volunteerName: volunteerName || 'Direct Donation',
            contact,
            createdAt,
          },
        },
      })
    } catch (err) {
      setError('Something went wrong! Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Make a <span className="text-green-600">Donation</span>
        </h1>
        <p className="text-gray-500 text-sm">Your contribution changes lives</p>
        <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-3" />
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${page === 1 ? 'bg-green-500 text-white' : 'bg-green-200 text-green-700'}`}>
            1
          </div>
          <div className="w-16 h-1 bg-green-200 rounded-full" />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${page === 2 ? 'bg-green-500 text-white' : 'bg-green-200 text-green-700'}`}>
            2
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10">

        {page === 1 && (
          <div className="space-y-8">

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">How Your Donation Helps</h3>
              <div className="space-y-3">
                {usageInfo.map((item, index) => (
                  <div key={index} className="flex gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Select Donation Amount</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => { setAmount(String(preset)); setCustomAmount('') }}
                    className={`py-3 rounded-xl font-bold text-sm border-2 transition-all duration-200 ${
                      amount === String(preset) && !customAmount
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-green-400'
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount('') }}
                placeholder="Enter custom amount (₹)"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {finalAmount && (
                <p className="text-green-600 font-bold text-center mt-3 text-lg">
                  Donating: ₹{finalAmount}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              onClick={handlePage1Next}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-full text-lg transition-colors duration-200 shadow-lg"
            >
              Next — Donor Details
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full border-2 border-green-500 text-green-500 hover:bg-green-50 font-bold py-3 rounded-full text-sm transition-colors duration-200"
            >
              Back to Home
            </button>

          </div>
        )}

        {page === 2 && (
          <div className="space-y-6">

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-gray-600 text-sm">Donation Amount</p>
              <p className="text-green-600 font-bold text-2xl">₹{finalAmount}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Volunteer Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
                placeholder="Enter volunteer name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Donor Name <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Enter donor name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number or Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter phone number or email"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Special Note <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="Any message or dedication..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <h3 className="text-gray-800 font-bold text-base mb-1">Pay via GPay / UPI</h3>
              <p className="text-green-600 font-bold text-2xl mb-3">₹{finalAmount}</p>
              <img
                src={donationQR}
                alt="Donation Payment QR"
                className="w-48 h-48 object-contain mx-auto rounded-xl border border-green-200"
              />
              <p className="text-gray-500 text-xs mt-3">
                Scan QR code and pay. Then upload screenshot below.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID after payment"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Payment Screenshot <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setScreenshot(file)
                    setScreenshotPreview(URL.createObjectURL(file))
                  }
                }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {screenshotPreview && (
                <img
                  src={screenshotPreview}
                  alt="Payment Preview"
                  className="mt-3 w-full max-h-48 object-contain rounded-xl border border-gray-200"
                />
              )}
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantReceipt}
                  onChange={(e) => setWantReceipt(e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  I want a donation receipt (PDF)
                </span>
              </label>
              <p className="text-gray-400 text-xs mt-2 ml-7">
                An official receipt will be available for download after submission
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-4 rounded-full text-lg transition-colors duration-200 shadow-lg"
            >
              {loading ? 'Submitting...' : 'Submit Donation'}
            </button>

            <button
              onClick={() => { setPage(1); setError('') }}
              className="w-full border-2 border-green-500 text-green-500 hover:bg-green-50 font-bold py-3 rounded-full text-sm transition-colors duration-200"
            >
              Back
            </button>

          </div>
        )}

      </div>
    </div>
  )
}
