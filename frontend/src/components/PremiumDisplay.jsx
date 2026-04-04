export default function PremiumDisplay({ zone = 'Tambaram', season = 'Monsoon', weeklyEarnings = 4500 }) {
  const base = 49

  const zoneRisk = {
    'Tambaram': 25, 'Chromepet': 25, 'Adyar': 25,
    'Velachery': 15, 'T. Nagar': 15, 'OMR': 15,
    'Anna Nagar': 0, 'Porur': 0,
  }

  const seasonAdj = {
    'Monsoon': 10, 'Summer': 5, 'Normal': 0
  }

  const zoneAdj = zoneRisk[zone] ?? 0
  const seasAdj = seasonAdj[season] ?? 0
  const total = base + zoneAdj + seasAdj
  const maxPayout = Math.round(weeklyEarnings * 0.7)

  return (
    <div className="space-y-3">
      {/* Big premium card */}
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 border border-blue-500/30 rounded-2xl p-5 text-center">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Your Weekly Premium</div>
        <div className="font-display text-5xl font-bold text-white">₹{total}</div>
        <div className="text-xs text-accent-2 mt-2">per week · auto-renewed every Monday</div>
      </div>

      {/* Breakdown */}
      <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Premium Breakdown</div>
        {[
          ['Base premium', `₹${base}`],
          [`Zone risk (${zone})`, `+₹${zoneAdj}`],
          [`Seasonal (${season})`, `+₹${seasAdj}`],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-sm py-2 border-b border-white/05 last:border-0">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-semibold">{val}</span>
          </div>
        ))}
        <div className="flex justify-between pt-2 mt-1">
          <span className="text-white font-bold">Total</span>
          <span className="text-accent-2 font-bold text-lg">₹{total}</span>
        </div>
      </div>

      {/* Coverage */}
      <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">What You're Covered For</div>
        {[
          ['Max weekly payout', `₹${maxPayout}`, 'text-green-400'],
          ['Coverage rate', '70% of income', 'text-white'],
          ['Payout time', 'Within 2 hours', 'text-white'],
        ].map(([label, val, color]) => (
          <div key={label} className="flex justify-between text-sm py-2 border-b border-white/05 last:border-0">
            <span className="text-gray-400">{label}</span>
            <span className={`font-semibold ${color}`}>{val}</span>
          </div>
        ))}
      </div>

      {/* Triggers covered */}
      <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Triggers Covered</div>
        <div className="flex flex-wrap gap-2">
          {['🌧️ Heavy Rain', '🌡️ Extreme Heat', '💨 Poor AQI', '🚫 Bandh', '📱 Downtime'].map(t => (
            <span key={t} className="bg-accent/10 border border-accent/20 text-accent-2 text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}