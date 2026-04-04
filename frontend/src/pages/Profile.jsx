import Navbar from '../components/Navbar'

export default function Profile({ onNavigate }) {
  const workerData = JSON.parse(localStorage.getItem('worker_data') || '{}')

  const handleLogout = () => {
    localStorage.clear()
    onNavigate('landing')
  }

  return (
    <div className="min-h-screen bg-navy px-5 py-6 pb-24">
      <h1 className="font-display text-2xl font-bold text-white mb-6">My Profile</h1>

      {/* Avatar card */}
      <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-5">
        <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center text-2xl border border-primary/30">
          👤
        </div>
        <div>
          <div className="font-display text-lg font-bold text-white">{workerData.name || 'Murugan R'}</div>
          <div className="text-xs text-gray-400">{workerData.phone || '+91 98765 43210'}</div>
          <div className="text-xs text-primary mt-0.5">{workerData.zone || 'Tambaram'} · {workerData.platform || 'Swiggy'}</div>
        </div>
      </div>

      {/* Account details */}
      <div className="glass-card p-5 mb-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Account Details</div>
        {[
          ['📍 Delivery Zone', workerData.zone || 'Tambaram'],
          ['🏍️ Platform', workerData.platform || 'Swiggy'],
          ['🏙️ City', workerData.city || 'Chennai'],
          ['💰 Weekly Income', `₹${workerData.weekly_earnings || '4,500'}`],
          ['⏰ Daily Hours', `${workerData.daily_hours || 8} hrs`],
          ['📱 UPI ID', 'Linked ✓'],
          ['🛡️ Risk Score', `${workerData.risk_score || 67}`],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-sm py-2.5 border-b border-white/5 last:border-0">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-medium">{val}</span>
          </div>
        ))}
      </div>

      {/* Policy stats */}
      <div className="glass-card p-5 mb-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Policy Stats</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ['₹3,400', 'Total\nProtected', 'text-green-400'],
            ['4', 'Claims\nFiled', 'text-primary'],
            ['₹2,016', 'Premiums\nPaid', 'text-amber'],
          ].map(([val, label, color]) => (
            <div key={label} className="text-center">
              <div className={`font-display text-xl font-bold ${color}`}>{val}</div>
              <div className="text-xs text-gray-400 mt-1 whitespace-pre-line">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="glass-card p-5 mb-5">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Preferences</div>
        <div className="flex justify-between text-sm py-2.5 border-b border-white/5">
          <span className="text-gray-400">🌐 Language</span>
          <div className="flex gap-2">
            <span className="bg-primary text-navy text-xs font-bold px-2.5 py-0.5 rounded">EN</span>
            <span className="bg-white/10 text-gray-400 text-xs px-2.5 py-0.5 rounded cursor-pointer hover:bg-white/20 transition">தமிழ்</span>
          </div>
        </div>
        <div className="flex justify-between text-sm py-2.5">
          <span className="text-gray-400">🔔 Notifications</span>
          <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 transition-all"></div>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full border border-red-500/30 text-red-400 font-semibold py-4 rounded-xl hover:bg-red-500/10 transition"
      >
        Log Out
      </button>

      <Navbar active="profile" onNavigate={onNavigate} />
    </div>
  )
}