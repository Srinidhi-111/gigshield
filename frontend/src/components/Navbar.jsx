export default function Navbar({ active = 'home', onNavigate }) {
  const items = [
    { icon: '🏠', label: 'Home', key: 'dashboard' },
    { icon: '📋', label: 'Claims', key: 'claims' },
    { icon: '💳', label: 'Policy', key: 'policy' },
    { icon: '👤', label: 'Profile', key: 'profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy border-t border-white/06 flex justify-around py-3 z-50">
      {items.map(({ icon, label, key }) => (
        <button
          key={key}
          onClick={() => onNavigate && onNavigate(key)}
          className={`flex flex-col items-center gap-1 text-xs transition-colors ${
            active === key ? 'text-accent-2' : 'text-gray-500'
          }`}
        >
          <span className="text-lg">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}