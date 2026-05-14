import { useLocation, useNavigate } from 'react-router-dom'
import ReceiptDownloadButton from '../components/ReceiptDownloadButton'

export default function DonationSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { receiptData, receiptRequested } = location.state || {}

  if (!receiptData) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🙏</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Thank You for Your Donation!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your generous contribution will make a real difference.
            The SVDAN Foundation is grateful for your support!
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-md mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Donation Successful!</h2>
          <p className="text-gray-500 text-sm mb-4">
            Thank you for your generous contribution to SVDAN Foundation!
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Amount</span>
              <span className="font-bold text-green-600 text-lg">₹{receiptData.amount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 text-sm">Transaction ID</span>
              <span className="font-bold text-gray-800 text-sm">{receiptData.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Receipt No.</span>
              <span className="font-bold text-gray-800 text-sm">{receiptData.receiptNumber}</span>
            </div>
          </div>
        </div>

        {receiptRequested && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 relative">
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Your Donation Receipt</h3>
            <p className="text-gray-500 text-sm text-center mb-4">
              Download your official receipt for tax and record purposes
            </p>
            <ReceiptDownloadButton receiptData={receiptData} />
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  )
}
