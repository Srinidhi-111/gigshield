import { useState } from 'react'

export default function AdminDashboard() {
  const [triggerFired, setTriggerFired] = useState(false)

  const stats = [
    { label: 'Workers', value: '247' },
    { label: 'Claims Today', value: '12' },
    { label: 'Paid Out', value: '₹8.6k' },
  ]

  const claims = [
    { worker: 'Murugan R', trigger: 'Heavy Rain', status: 'paid' },
    { worker: 'Ravi K', trigger: 'Heavy Rain', status: 'processing' },
    { worker: 'Selvam P', trigger: 'Heavy Rain', status: 'flagged' },
  ]

  const statusStyle = {
    paid: 'bg-green-900/20 text-green-400 border-green-500/30',
    processing: 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30',
    flagged: 'bg-red-900/20 text-red-400 border-red-500/30',
  }

  return (
    <div className="min-h-screen bg-navy px-5 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display text-xl font-bold text-white">🛡️ GigShield Admin</h1>
          <p className="text-xs text-gray-400">Chennai — Live Dashboard</p>
        </div>
        <span className="bg-red-900/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full">● 1 Active</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white/05 border border-white/08 rounded-xl p-3 text-center">
            <div className="font-display text-2xl font-bold text-accent-2">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Active trigger */}
      <div className="bg-yellow-900/10 border border-yellow-500/25 rounded-2xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs text-gray-400 uppercase tracking-widest">Active Trigger</div>
          <span className="bg-red-900/30 text-red-400 border border-red-500/30 text-xs font-bold px-2 py-0.5 rounded-full">LIVE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌧️</span>
          <div>
            <div className="font-semibold text-yellow-300">Heavy Rain — Tambaram</div>
            <div className="text-xs text-gray-400">35mm/hr · 47 workers affected</div>
          </div>
        </div>
      </div>

      {/* Manual trigger */}
      <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-4 flex justify-between items-center mb-4">
        <div>
          <div className="text-sm font-semibold text-white">Manual Trigger</div>
          <div className="text-xs text-gray-400">Bandh / Curfew override</div>
        </div>
        <button
          onClick={() => setTriggerFired(!triggerFired)}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            triggerFired ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {triggerFired ? '✓ Fired' : '🚩 Fire'}
        </button>
      </div>

      {/* Claims table */}
      <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Recent Claims</div>
        <div className="space-y-2">
          {claims.map(({ worker, trigger, status }) => (
            <div key={worker} className="flex items-center justify-between py-2 border-b border-white/05 last:border-0">
              <div>
                <div className="text-sm font-semibold text-white">{worker}</div>
                <div className="text-xs text-gray-400">{trigger}</div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyle[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full mt-4 bg-accent text-white font-semibold py-4 rounded-xl">
        Manage Triggers
      </button>
    </div>
  )
}