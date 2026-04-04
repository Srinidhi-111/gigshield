import { useState, useEffect } from 'react'
import TriggerCard from '../components/TriggerCard'

export default function Dashboard({ onNavigate }) {
  const [worker, setWorker] = useState(null)
  const [weather, setWeather] = useState('clear')
  const [triggers, setTriggers] = useState([
    { icon: '🌧️', name: 'Rainfall', value: '12mm/hr', limit: '20mm/hr', status: 'safe' },
    { icon: '🌡️', name: 'Temperature', value: '38°C', limit: '43°C', status: 'safe' },
    { icon: '💨', name: 'Air Quality', value: 'AQI 180', limit: 'AQI 300', status: 'watch' },
  ])

  const bgColors = {
    clear: 'from-emerald-950 to-navy',
    rain: 'from-blue-950 to-navy',
    heat: 'from-orange-950 to-navy',
    aqi: 'from-purple-950 to-navy',
  }

  useEffect(() => {
    const data = localStorage.getItem('worker_data')
    if (data) setWorker(JSON.parse(data))
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgColors[weather]} px-5 pb-20`}>
      {/* Header */}
      <div className="pt-4 pb-4 border-b border-white/07">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-display text-xl font-bold text-white">
              Hi {worker?.name || 'Murugan'} 👋
            </h1>
            <p className="text-xs text-gray-400 mt-1">📍 {worker?.zone || 'Tambaram'} · 🌧️ Rain Day</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-green-900/30 text-green-400 border border-green-500/30 text-xs font-semibold px-3 py-1 rounded-full">● Active</span>
            <span className="text-lg">🔔</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {/* Today snapshot */}
        <div className="bg-white/05 border border-white/08 rounded-2xl p-4">
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">Today's Snapshot</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-green-400">₹620</div>
              <div className="text-xs text-gray-400 mt-1">Earned so far</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-accent-2">₹750</div>
              <div className="text-xs text-gray-400 mt-1">Expected today</div>
            </div>
          </div>
        </div>

        {/* Savings */}
        <div className="bg-green-900/10 border border-green-500/20 rounded-2xl p-4 flex justify-between items-center">
          <span className="text-sm text-gray-300">💰 GigShield saved you this month</span>
          <span className="font-display text-xl font-bold text-green-400">₹1,440</span>
        </div>

        {/* Alert */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 text-sm text-accent-2">
          ⚡ Rain expected in 2hrs — you are covered
        </div>

        {/* Live monitoring */}
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Live Zone Monitoring</div>
          {triggers.map(t => (
            <TriggerCard key={t.name} trigger={t} />
          ))}
        </div>

        {/* Weather toggle - for demo */}
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Weather Mode (Demo)</div>
          <div className="flex gap-2 flex-wrap">
            {['clear','rain','heat','aqi'].map(w => (
              <button key={w}
                onClick={() => setWeather(w)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  weather === w ? 'bg-accent border-accent text-white' : 'bg-white/05 border-white/10 text-gray-400'
                }`}
              >{w === 'clear' ? '☀️' : w === 'rain' ? '🌧️' : w === 'heat' ? '🌡️' : '💨'} {w}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy border-t border-white/06 flex justify-around py-3">
        {[['🏠','Home',true],['📋','Claims',false],['💳','Policy',false],['👤','Profile',false]].map(([icon,label,active]) => (
          <div key={label} className={`flex flex-col items-center gap-1 text-xs ${active ? 'text-accent-2' : 'text-gray-500'}`}>
            <span className="text-lg">{icon}</span>{label}
          </div>
        ))}
      </div>
    </div>
  )
}