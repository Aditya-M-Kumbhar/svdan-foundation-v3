import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import qrImage from '../assets/form/payment.png'
import sizeChart from '../assets/form/size_chart.png'

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL
const REGISTRATION_OPEN = false

const branches = [
  'Computer Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Electronics & Telecommunication',
  'Information Technology',
  'Chemical Engineering',
  'Production Engineering',
  'Other',
]

const tshirtSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL']

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

export default function RegisterForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [paymentPreview, setPaymentPreview] = useState(null)
  const [agreed, setAgreed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

    if (!REGISTRATION_OPEN) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🙏</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Registrations Closed!
          </h2>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            We are grateful for such an incredible response from all of you!
            The registration form is currently closed.
            We will be opening it again very soon — see you soon! 😊
          </p>
          <p className="text-gray-500 text-sm mb-6">
            For queries, contact us at:
          </p>
          <a
            href="tel:+918010388950"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-colors duration-200 shadow-md"
          >
            📞 +91 8010388950
          </a>
        </div>
      </div>
    )
  }


  const onSubmit = async (data) => {
    if (!agreed) {
      setError('Please agree to the terms and conditions!')
      return
    }
    setLoading(true)
    setError('')

    try {
      // Upload payment screenshot to Cloudinary
      let paymentScreenshotUrl = ''
      if (data.paymentScreenshot[0]) {
        paymentScreenshotUrl = await uploadToCloudinary(data.paymentScreenshot[0])
      }

      const formData = {
        fullName: data.fullName,
        branch: data.branch,
        mis: data.mis,
        hostelOrLocal: data.hostelOrLocal,
        address: data.address,
        tshirtSize: data.tshirtSize,
        whyJoin: data.whyJoin,
        skills: data.skills,
        transactionId: data.transactionId,
        paymentScreenshotUrl,
        phone: data.phone,
        timestamp: new Date().toISOString(),
      }

      // Save to Firestore
      await addDoc(collection(db, 'registrations'), formData)

      // Save to Google Sheets
      await fetch(SHEETS_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      setSuccess(true)
      reset()
      setPaymentPreview(null)
      setAgreed(false)
    } catch (err) {
      setError('Something went wrong! Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Registration Successful!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for registering with Shahir Visharad Dr. Azad Nayakawadi Foundation!
          </p>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Join Our WhatsApp Group</h3>
            <p className="text-gray-500 text-sm mb-4">
              Join our WhatsApp group for further updates and announcements!
            </p>
            <a
              href="https://chat.whatsapp.com/GB3fgyZnbtq87WSCcmYMIQ?mode=hq2tswa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-200 shadow-md"
            >
              Join WhatsApp Group
            </a>
          </div>

          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Join <span className="text-orange-500">Our Foundation</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Registration Fee: <span className="font-bold text-orange-500">₹449</span>
        </p>
        <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mt-3" />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Terms and Conditions */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              I confirm that I have read and accept all the terms and conditions
              mentioned in the brochure.
            </p>
            <label className="flex items-center gap-3 mt-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                I Agree to the Terms and Conditions
              </span>
            </label>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              {...register('fullName', { required: 'Full name is required' })}
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Branch *
            </label>
            <select
              {...register('branch', { required: 'Branch is required' })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Select your branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            {errors.branch && (
              <p className="text-red-500 text-xs mt-1">{errors.branch.message}</p>
            )}
          </div>

          {/* MIS */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              MIS Number *
            </label>
            <input
              {...register('mis', { required: 'MIS number is required' })}
              type="text"
              placeholder="Enter your MIS number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.mis && (
              <p className="text-red-500 text-xs mt-1">{errors.mis.message}</p>
            )}
          </div>

          {/* Hostelite or Localite */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Are you Hostelite or Localite? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('hostelOrLocal', { required: 'Please select one' })}
                  type="radio"
                  value="Hostelite"
                  className="accent-orange-500"
                />
                <span className="text-sm text-gray-700">Hostelite</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('hostelOrLocal', { required: 'Please select one' })}
                  type="radio"
                  value="Localite"
                  className="accent-orange-500"
                />
                <span className="text-sm text-gray-700">Localite</span>
              </label>
            </div>
            {errors.hostelOrLocal && (
              <p className="text-red-500 text-xs mt-1">{errors.hostelOrLocal.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Address *
            </label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              placeholder="Enter your full address"
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* T-Shirt Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              T-Shirt Size *
            </label>
            <img
              src={sizeChart}
              alt="Size Chart"
              className="w-full rounded-xl mb-3 border border-gray-100"
            />
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {tshirtSizes.map((size) => (
                <label key={size} className="cursor-pointer">
                  <input
                    {...register('tshirtSize', { required: 'Please select a size' })}
                    type="radio"
                    value={size}
                    className="hidden peer"
                  />
                  <div className="border-2 border-gray-200 peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-checked:text-white rounded-lg py-2 text-center text-sm font-semibold text-gray-600 transition-all duration-200">
                    {size}
                  </div>
                </label>
              ))}
            </div>
            {errors.tshirtSize && (
              <p className="text-red-500 text-xs mt-1">{errors.tshirtSize.message}</p>
            )}
          </div>

          {/* Why Join */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Why do you want to join this foundation? *
            </label>
            <textarea
              {...register('whyJoin', { required: 'This field is required' })}
              placeholder="Tell us your motivation..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
            {errors.whyJoin && (
              <p className="text-red-500 text-xs mt-1">{errors.whyJoin.message}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              What skills do you have? *
            </label>
            <textarea
              {...register('skills', { required: 'Please mention your skills' })}
              placeholder="e.g. Photography, Video Editing, Public Speaking..."
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
            {errors.skills && (
              <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
            </label>
          <input
          type="tel"
          {...register('phone', { required: 'Phone number is required' })}
          placeholder="Enter your 10-digit phone number"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

          {/* QR Code */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
            <h3 className="text-gray-800 font-bold text-base mb-1">
              Pay Registration Fee
            </h3>
            <p className="text-orange-500 font-bold text-2xl mb-3">₹449</p>
            <img
              src={qrImage}
              alt="Payment QR Code"
              className="w-48 h-48 object-contain mx-auto rounded-xl border border-orange-200"
            />
            <p className="text-gray-500 text-xs mt-3">
              Scan the QR code and pay ₹449. Then enter the transaction ID below.
            </p>
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Transaction ID *
            </label>
            <input
              {...register('transactionId', { required: 'Transaction ID is required' })}
              type="text"
              placeholder="Enter your transaction ID after payment"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.transactionId && (
              <p className="text-red-500 text-xs mt-1">{errors.transactionId.message}</p>
            )}
          </div>

          {/* Payment Screenshot */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Payment Screenshot *
            </label>
            <input
              {...register('paymentScreenshot', { required: 'Please upload payment screenshot' })}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) setPaymentPreview(URL.createObjectURL(file))
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {paymentPreview && (
              <img
                src={paymentPreview}
                alt="Payment Preview"
                className="mt-3 w-full max-h-48 object-contain rounded-xl border border-gray-200"
              />
            )}
            {errors.paymentScreenshot && (
              <p className="text-red-500 text-xs mt-1">{errors.paymentScreenshot.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-full text-lg transition-colors duration-200 shadow-lg"
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 rounded-full text-sm transition-colors duration-200"
          >
            Back to Home
          </button>

        </form>
      </div>
    </div>
  )
}