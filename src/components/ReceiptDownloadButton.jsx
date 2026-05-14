import { useRef, useState } from 'react'
import ReceiptTemplate from './ReceiptTemplate'

// Must match W × H in ReceiptTemplate.jsx exactly
const RECEIPT_W_PX = 1123
const RECEIPT_H_PX = 794

export default function ReceiptDownloadButton({ receiptData }) {
  const receiptRef = useRef()
  const [generating, setGenerating] = useState(false)

  const handleDownload = async () => {
    setGenerating(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      // Render the hidden div at 2× for crispness, then scale back to 1×
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: RECEIPT_W_PX,
        height: RECEIPT_H_PX,
      })

      const imgData = canvas.toDataURL('image/png')

      // ── Key fix ──────────────────────────────────────────────────────────
      // Use 'px' as the unit so we can specify the page size in the SAME
      // pixels as the template.  No mm ↔ px conversion = no scaling drift.
      // ─────────────────────────────────────────────────────────────────────
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [RECEIPT_W_PX, RECEIPT_H_PX],
        hotfixes: ['px_scaling'],   // jsPDF ≥ 2.x: keeps px 1 : 1
      })

      // addImage dimensions match the page exactly → no stretch, no squash
      pdf.addImage(imgData, 'PNG', 0, 0, RECEIPT_W_PX, RECEIPT_H_PX)
      pdf.save(`Donation-Receipt-${receiptData.receiptNumber}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert('Failed to generate receipt. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={generating}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200 shadow-md mb-6"
      >
        {generating ? 'Generating PDF...' : 'Download Donation Receipt'}
      </button>

      {/*
        Hidden render area — must be the EXACT template size.
        Positioned way off-screen so it never flashes to the user.
        Do NOT use display:none or visibility:hidden — html2canvas needs
        the element to be painted.
      */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          width: `${RECEIPT_W_PX}px`,
          height: `${RECEIPT_H_PX}px`,
          overflow: 'hidden',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <div ref={receiptRef} style={{ width: `${RECEIPT_W_PX}px`, height: `${RECEIPT_H_PX}px` }}>
          <ReceiptTemplate receiptData={receiptData} />
        </div>
      </div>
    </div>
  )
}
