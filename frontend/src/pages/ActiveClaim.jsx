import { useState, useEffect } from 'react'
import ClaimStatus from '../components/ClaimStatus'
import Navbar from '../components/Navbar'

export default function ActiveClaim({ onNavigate }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 48, seconds: 32 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 }
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 }
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 }
        clearInterval(timer)
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  return (
    <div className="min-h-screen bg-navy px-5 pb-20">
      {/* Red alert header */}
      <div className="bg-red-900/20 border-b border-red-500/20 px-5 py-3 -mx-5 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <div className="font-display text-base font-bold text-red-300">Claim Triggered</div>
            <div className="text-xs text-gray-400">Heavy Rain · Tambaram · 6:07 PM</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Payout amount */}
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 border border-blue-500/30 rounded-2xl p-5 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Payout Amount</div>
          <div className="font-display text-6xl font-bold text-white">₹720</div>
          <div className="mt-3 inline-flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-semibold px-4 py-2 rounded-full">
            ✓ UPI by 8:00 PM
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-white/05 border border-white/08 rounded-2xl p-4 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Estimated Payout In</div>
          <div className="font-display text-4xl font-bold text-accent-2">
            {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </div>
        </div>

        {/* Claim progress */}
        <ClaimStatus status="verified" />

        {/* Timeline */}
        <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Timeline</div>
          {[
            ['🌧️ Rain detected (35mm/hr)', '6:07 PM', true],
            ['📋 Claim auto-initiated', '6:09 PM', true],
            ['✅ Fraud check passed', '6:11 PM', true],
            ['💸 UPI payout processing...', '—', false],
          ].map(([label, time, done]) => (
            <div key={label} className="flex justify-between text-sm py-2 border-b border-white/05 last:border-0">
              <span className={done ? 'text-gray-300' : 'text-gray-500'}>{label}</span>
              <span className="text-gray-500 text-xs">{time}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-white/05 border border-white/10 text-accent-2 font-semibold py-4 rounded-xl">
          View Claim Details
        </button>
      </div>

      <Navbar active="claims" onNavigate={onNavigate} />
    </div>
  )
}