export default function ClaimStatus({ status = 'processing' }) {
  const steps = [
    { label: 'Detected', key: 'detected' },
    { label: 'Initiated', key: 'initiated' },
    { label: 'Verified', key: 'verified' },
    { label: 'Paying', key: 'paying' },
    { label: 'Paid', key: 'paid' },
  ]

  const stepIndex = {
    detected: 0,
    initiated: 1,
    verified: 2,
    paying: 3,
    paid: 4,
  }

  const current = stepIndex[status] ?? 2

  return (
    <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
      <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Claim Progress</div>
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            {/* Dot */}
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < current ? 'bg-green-500 text-white' :
                i === current ? 'bg-accent text-white' :
                'bg-white/10 text-gray-500 border border-white/10'
              }`}>
                {i < current ? '✓' : i + 1}
              </div>
              <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">{step.label}</span>
            </div>
            {/* Line */}
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${
                i < current ? 'bg-green-500' : 'bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}