import background from '../assets/receipt/receipt-background.png'

function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  if (num === 0) return 'Zero Rupees Only'

  function convert(n) {
    if (n < 20) return ones[n]
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '')
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convert(n % 100) : '')
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '')
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '')
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '')
  }

  return convert(num) + ' Rupees Only'
}

const W = 1123
const H = 794

const POS = {
  // The blank for Receipt No is on the same row as the banner but LEFT side
  // In the PDF it renders at ~55% height = ~436px on 794 canvas
  receiptNo:        { top: 354, left: 225  },

  // Date blank is RIGHT side of same row — use left instead of right for precision
  // "Date / दिनांक :" label ends around left:960, blank starts ~left:1020
  date:             { top: 358, left: 1000 },

  donorNameMarathi: { top: 438, left: 408  },  // ✅ perfect
  amountWords:      { top: 478, left: 362  },  // ✅ perfect
  amountFigures:    { top: 532, left: 415  },  // ✅ perfect
}

export default function ReceiptTemplate({ receiptData }) {
  const { receiptNumber, donorName, amount, createdAt } = receiptData

  const formattedDate = new Date(createdAt).toLocaleDateString('en-IN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })

  const amountInWords = numberToWords(Number(amount))
  const displayName = donorName && donorName !== 'Anonymous' ? donorName : ''

  return (
    <div style={{
      width: `${W}px`,
      height: `${H}px`,
      position: 'relative',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
    }}>

      <img
        src={background}
        alt="Receipt Background"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>

        {/* Receipt Number */}
        <div style={{
          position: 'absolute',
          top: POS.receiptNo.top,
          left: POS.receiptNo.left,
          fontSize: '14px', fontWeight: '700', color: '#111827', lineHeight: 1,
        }}>
          {receiptNumber}
        </div>

        {/* Date — using left: instead of right: for more predictable placement */}
        <div style={{
          position: 'absolute',
          top: POS.date.top,
          left: POS.date.left,
          fontSize: '14px', fontWeight: '700', color: '#111827', lineHeight: 1,
        }}>
          {formattedDate}
        </div>

        {/* Donor Name — Marathi श्री./श्रीमती./कु. line */}
        <div style={{
          position: 'absolute',
          top: POS.donorNameMarathi.top,
          left: POS.donorNameMarathi.left,
          width: '650px',
          fontSize: '15px', fontWeight: '700', color: '#111827', lineHeight: 1,
          whiteSpace: 'nowrap', overflow: 'visible',
        }}>
          {displayName}
        </div>

        {/* Amount in Words */}
        <div style={{
          position: 'absolute',
          top: POS.amountWords.top,
          left: POS.amountWords.left,
          width: '530px',
          fontSize: '14px', fontWeight: '700', color: '#111827', lineHeight: 1,
        }}>
          {amountInWords}
        </div>

        {/* Amount in Figures — ₹ already on background */}
        <div style={{
          position: 'absolute',
          top: POS.amountFigures.top,
          left: POS.amountFigures.left,
          fontSize: '15px', fontWeight: '700', color: '#111827', lineHeight: 1,
        }}>
          {amount}/-
        </div>

      </div>
    </div>
  )
}
