import { useState } from 'react'

export default function LossSimulator() {
  const [zone, setZone] = useState('Tambaram')
  const [earnings, setEarnings] = useState('')
  const [showResult, setShowResult] = useState(false)

  const zones = ['Tambaram', 'T. Nagar', 'Adyar', 'Velachery', 'Anna Nagar', 'Chromepet']

  const disruptionData = {
    'Tambaram': { days: 14, months: ['Oct','Nov','Dec','Jan','Feb','Mar'], bars: [80,40,95,60,30,70] },
    'T. Nagar': { days: 10, months: ['Oct','Nov','Dec','Jan','Feb','Mar'], bars: [60,30,80,50,20,55] },
    'Adyar': { days: 12, months: ['Oct','Nov','Dec','Jan','Feb','Mar'], bars: [70,35,88,55,25,65] },
    'Velachery': { days: 11, months: ['Oct','Nov','Dec','Jan','Feb','Mar'], bars: [65,32,82,52,22,60] },
    'Anna Nagar': { days: 8, months: ['Oct','Nov','Dec','Jan','Feb','Mar'], bars: [50,25,70,40,15,45] },
    'Chromepet': { days: 13, months: ['Oct','Nov','Dec','Jan','Feb','Mar'], bars: [75,38,90,58,28,68] },
  }

  const data = disruptionData[zone]
  const weeklyEarnings = Number(earnings) || 4500
  const dailyEarning = weeklyEarnings / 6
  const totalLost = Math.round(dailyEarning * data.days)
  const wouldPay = Math.round(totalLost * 0.72)
  const totalPremium = 84 * 24 // 6 months
  const netBenefit = wouldPay - totalPremium

  return (
    <div className="space-y-4">
      {/* Inputs */}
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Your Delivery Zone</label>
        <select
          className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none"
          value={zone}
          onChange={e => { setZone(e.target.value); setShowResult(false) }}
        >
          {zones.map(z => <option key={z} value={z} className="bg-navy">{z}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1 block">Average Weekly Earnings (₹)</label>
        <input
          type="number"
          className="w-full bg-white/05 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent"
          placeholder="e.g. 4500"
          value={earnings}
          onChange={e => { setEarnings(e.target.value); setShowResult(false) }}
        />
      </div>

      <button
        onClick={() => setShowResult(true)}
        className="w-full bg-accent text-white font-semibold py-4 rounded-xl"
      >Show My Loss →</button>

      {showResult && (
        <div className="space-y-3 animate-pulse-once">
          {/* Big loss number */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-5 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Estimated Income Lost</div>
            <div className="font-display text-5xl font-bold text-red-400">₹{totalLost.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-2">across {data.days} disruption days</div>
          </div>

          {/* 3 stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              ['Disruption Days', data.days, 'text-white'],
              ['Would Pay', `₹${wouldPay.toLocaleString()}`, 'text-green-400'],
              ['Your Premium', `₹${totalPremium.toLocaleString()}`, 'text-orange-400'],
            ].map(([label, val, color]) => (
              <div key={label} className="bg-white/05 border border-white/08 rounded-xl p-3 text-center">
                <div className={`font-display text-lg font-bold ${color}`}>{val}</div>
                <div className="text-xs text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Disruption Days by Month</div>
            <div className="flex items-end gap-1 h-16">
              {data.bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-red-500/50 rounded-t" style={{ height: `${h}%` }}></div>
                  <span className="text-xs text-gray-500">{data.months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Net benefit */}
          <div className="bg-green-900/10 border border-green-500/20 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-white">Net benefit if covered</div>
              <div className="text-xs text-gray-400">₹{wouldPay.toLocaleString()} paid − ₹{totalPremium.toLocaleString()} premium</div>
            </div>
            <div className="font-display text-2xl font-bold text-green-400">+₹{netBenefit.toLocaleString()}</div>
          </div>

          <button
            onClick={() => {}}
            className="w-full bg-accent text-white font-semibold py-4 rounded-xl"
          >Get Covered for ₹84/week →</button>
        </div>
      )}
    </div>
  )
}