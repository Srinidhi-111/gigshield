import PremiumDisplay from '../components/PremiumDisplay'
import Navbar from '../components/Navbar'

export default function Policy({ onNavigate }) {
  const workerData = JSON.parse(localStorage.getItem('worker_data') || '{}')

  const policyId = workerData.policyId || 'GS-2026-0847'
  const renewalDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
  })()

  return (
    <div className="min-h-screen bg-navy px-5 py-6 pb-24">
      <h1 className="font-display text-2xl font-bold text-white mb-2">My Policy</h1>
      <p className="text-xs text-gray-400 mb-6">
        <span className="text-success">● Active</span> · Week of {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} – {renewalDate}
      </p>

      {/* Policy card */}
      <div className="bg-gradient-to-br from-primary/10 to-navy-card border border-primary/20 rounded-2xl p-5 mb-5"
        style={{ boxShadow: '0 0 40px rgba(0,212,170,0.08)' }}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <span className="font-display text-base font-bold text-white">StreetGuard Policy</span>
          </div>
          <span className="bg-green-900/30 text-green-400 border border-green-500/30 text-xs font-semibold px-3 py-1 rounded-full">Active</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['Policy ID', policyId.slice(0, 14)],
            ['Zone', workerData.zone || 'Tambaram'],
            ['Platform', workerData.platform || 'Swiggy'],
            ['Renewal', `${renewalDate} · ₹${workerData.premium || 84}`],
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

      <div className="mt-5 space-y-3">
        <button className="w-full glass-card text-white/60 font-semibold py-4 rounded-xl hover:bg-white/5 transition">
          Pause Policy
        </button>
        <button onClick={() => onNavigate('admin')}
          className="w-full glass-card text-primary/60 font-semibold py-4 rounded-xl hover:bg-white/5 transition text-sm">
          🔧 Admin Dashboard
        </button>
      </div>

      <Navbar active="policy" onNavigate={onNavigate} />
    </div>
  )
}