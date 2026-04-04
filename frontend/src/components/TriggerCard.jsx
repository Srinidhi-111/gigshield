export default function TriggerCard({ trigger }) {
  const badgeStyles = {
    safe: 'bg-green-900/20 text-green-400 border-green-500/30',
    watch: 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30',
    triggered: 'bg-red-900/20 text-red-400 border-red-500/30',
  }

  const borderStyles = {
    safe: 'border-white/08',
    watch: 'border-yellow-500/30',
    triggered: 'border-red-500/40',
  }

  return (
    <div className={`flex items-center justify-between p-3 bg-white/04 rounded-xl border ${borderStyles[trigger.status]} mb-2`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{trigger.icon}</span>
        <div>
          <div className="text-sm font-semibold text-white">{trigger.name}</div>
          <div className="text-xs text-gray-400">{trigger.value} · limit {trigger.limit}</div>
        </div>
      </div>
      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeStyles[trigger.status]}`}>
        {trigger.status === 'safe' ? 'Safe' : trigger.status === 'watch' ? 'Watch' : 'TRIGGERED'}
      </span>
    </div>
  )
}