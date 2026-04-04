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
      <div className="flex items-center gap-4 bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-4">
        <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-2xl">👤</div>
        <div>
          <div className="font-display text-lg font-bold text-white">{workerData.name || 'Murugan R'}</div>
          <div className="text-xs text-gray-400">{workerData.phone || '+91 98765 43210'}</div>
          <div className="text-xs text-gray-400">{workerData.zone || 'Tambaram'} · {workerData.platform || 'Swiggy'}</div>
        </div>
      </div>

      {/* Account details */}
      <div className="bg-white/05 border border-white/08 rounded-2xl p-4 mb-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Account</div>
        {[
          ['📍 Delivery Zone', workerData.zone || 'Tambaram'],
          ['🏍️ Platform', workerData.platform || 'Swiggy'],
          ['💰 Weekly Income', `₹${workerData.weekly_earnings || '4,500'}`],
          ['📱 UPI ID', 'Linked ✓'],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-sm py-2 border-b border-white/05 last:border-0">
            <span className="text-gray-400">{label}</span>
            <span className="text-accent-2">{val}</span>
          </div>
        ))}
      </div>

      {/* Preferences */}
      <div className="bg-white/05 border border-white/08 rounded-2xl p-4 mb-4">
        <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Preferences</div>
        <div className="flex justify-between text-sm py-2 border-b border-white/05">
          <span className="text-gray-400">🌐 Language</span>
          <div className="flex gap-2">
            <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded">EN</span>
            <span className="bg-white/10 text-gray-400 text-xs px-2 py-0.5 rounded">தமிழ்</span>
          </div>
        </div>
        <div className="flex justify-between text-sm py-2">
          <span className="text-gray-400">🔔 Notifications</span>
          <div className="w-10 h-5 bg-accent rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5"></div>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full border border-red-500/30 text-red-400 font-semibold py-4 rounded-xl"
      >
        Log Out
      </button>

      <Navbar active="profile" onNavigate={onNavigate} />
    </div>
  )
}