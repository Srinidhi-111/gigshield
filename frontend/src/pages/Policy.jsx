import PremiumDisplay from '../components/PremiumDisplay'
import Navbar from '../components/Navbar'

export default function Policy({ onNavigate }) {
  const workerData = JSON.parse(localStorage.getItem('worker_data') || '{}')

  return (
    <div className="min-h-screen bg-navy px-5 py-6 pb-24">
      <h1 className="font-display text-2xl font-bold text-white mb-2">My Policy</h1>
      <p className="text-xs text-gray-400 mb-6">
        Active · Week of Mar 17 – Mar 23
      </p>

      {/* Policy card */}
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950 border border-blue-500/30 rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="font-display text-base font-bold text-white">GigShield Policy</span>
          <span className="bg-green-900/30 text-green-400 border border-green-500/30 text-xs font-semibold px-3 py-1 rounded-full">Active</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ['Policy ID', 'GS-2024-8841'],
            ['Zone', workerData.zone || 'Tambaram'],
            ['Platform', workerData.platform || 'Swiggy'],
            ['Renewal', 'Mar 24 · ₹84'],
          ].map(([label, val]) => (
            <div key={label}>
              <div className="text-xs text-gray-400 mb-1">{label}</div>
              <div className="text-sm font-semibold text-white">{val}</div>
            </div>
          ))}
        </div>
      </div>

      <PremiumDisplay
        zone={workerData.zone || 'Tambaram'}
        weeklyEarnings={Number(workerData.weekly_earnings) || 4500}
      />

      <button className="w-full mt-4 bg-white/05 border border-white/10 text-gray-400 font-semibold py-4 rounded-xl">
        Pause Policy
      </button>

      <Navbar active="policy" onNavigate={onNavigate} />
    </div>
  )
}