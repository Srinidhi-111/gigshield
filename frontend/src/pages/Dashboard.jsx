import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Navbar from '../components/Navbar'

// ── Icons ──
const ShieldIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)
const SunIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
)
const CloudLightningIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 16.9A5 5 0 0018 7h-1.26a8 8 0 10-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>
)
const ArrowLeftIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
)
const BellIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
)
const CloudRainIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25"/><path d="M8 16v2M8 20v1M12 18v2M12 22v1M16 16v2M16 20v1"/></svg>
)
const WalletIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 000 4h4v-4z"/></svg>
)
const WindIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7A2.5 2.5 0 0119 12H2M9.6 4.6A2 2 0 0111 8H2M12.6 19.4A2 2 0 0014 16H2"/></svg>
)

export default function Dashboard({ onNavigate }) {
  const [stormActive, setStormActive] = useState(false)
  const [banners, setBanners] = useState([])
  const [claimsFiled, setClaimsFiled] = useState(0)
  const [stormTriggering, setStormTriggering] = useState(false)
  const profile = JSON.parse(localStorage.getItem('worker_data') || '{}')

  const triggerStorm = () => {
    if (stormTriggering) return
    setStormTriggering(true)
    setStormActive(true)
    setBanners([])
    setTimeout(() => {
      setBanners(p => [...p, { type: 'red', text: '🚨 SEVERE WEATHER ALERT — Heavy rainfall detected: 78mm — Parametric trigger activated' }])
    }, 1000)
    setTimeout(() => {
      setBanners(p => [...p, { type: 'teal', text: '📋 AUTO-CLAIM FILED — Claim #GS-2026-0847 filed automatically — AI verified' }])
    }, 2000)
    setTimeout(() => {
      setBanners(p => [...p, { type: 'amber', text: '💸 PAYOUT PROCESSED — ₹850 credited to your UPI wallet in 14 minutes', amount: '₹850' }])
      setClaimsFiled(1)
      setStormTriggering(false)
    }, 3500)
  }

  const resetStorm = () => {
    setStormActive(false)
    setBanners([])
    setClaimsFiled(0)
    setStormTriggering(false)
  }

  const chartData = [
    { day: 'Mon', earned: 780, protected: 0 },
    { day: 'Tue', earned: 920, protected: 200 },
    { day: 'Wed', earned: 1100, protected: 180 },
    { day: 'Thu', earned: 600, protected: 450 },
    { day: 'Fri', earned: 950, protected: 200 },
    { day: 'Sat', earned: 1200, protected: 150 },
    { day: 'Sun', earned: 810, protected: 220 },
  ]

  const bannerColors = { red: 'border-coral bg-coral/10', teal: 'border-primary bg-primary/10', amber: 'border-amber bg-amber/10' }
  const bannerTextColors = { red: 'text-coral', teal: 'text-primary', amber: 'text-amber' }

  return (
    <div className="min-h-screen bg-navy pb-20">
      {/* Top bar */}
      <div className="border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('landing')} className="text-white/50 hover:text-white transition">
            <ArrowLeftIcon size={20} />
          </button>
          <ShieldIcon size={22} color="#00D4AA" />
          <span className="font-display font-bold text-white">StreetGuard</span>
          <span className="glass-card px-2 py-0.5 rounded text-[10px] text-primary tracking-wider font-semibold">DASHBOARD</span>
        </div>
        <div className="flex items-center gap-3">
          {stormActive && (
            <button className="flex items-center gap-1.5 bg-coral/20 text-coral px-3 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>Storm Alert
            </button>
          )}
          <div className="relative cursor-pointer">
            <BellIcon size={20} color="rgba(255,255,255,0.5)" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-coral rounded-full border-2 border-navy"></span>
          </div>
        </div>
      </div>

      {/* Banners */}
      {banners.map((b, i) => (
        <div key={i} className={`slide-down border-l-4 ${bannerColors[b.type]} px-6 py-3 flex items-center justify-between`}>
          <span className={`text-sm font-medium ${bannerTextColors[b.type]}`}>{b.text}</span>
          {b.amount && <span className="text-amber font-display font-bold text-lg">{b.amount}</span>}
        </div>
      ))}

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl mb-1 text-white">
              Good Morning, {profile.name || 'Rider'}
            </h1>
            <p className="text-white/50 text-sm">
              {profile.city || 'Chennai'}, {profile.zone || 'Tambaram'} — <span className="text-success">Policy Active</span>
            </p>
          </div>
          {!stormActive ? (
            <button onClick={triggerStorm}
              className="bg-primary text-navy font-semibold px-5 py-2 rounded-full text-sm hover:brightness-110 transition mt-2 sm:mt-0">
              ⚡ Simulate Storm Trigger
            </button>
          ) : (
            <button onClick={resetStorm}
              className="glass-card text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-white/10 transition mt-2 sm:mt-0">
              Reset Demo
            </button>
          )}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weather Orb */}
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${stormActive ? 'orb-storm' : 'orb-normal'}`}
              style={{ background: stormActive
                ? 'radial-gradient(circle, rgba(255,71,87,0.2) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)'
              }}>
              {stormActive
                ? <CloudLightningIcon size={48} color="#FF4757" />
                : <SunIcon size={48} color="#00FF88" />}
            </div>
            <div className={`text-lg font-display font-bold mb-3 ${stormActive ? 'text-coral' : 'text-success'}`}>
              {stormActive ? 'Storm Alert' : 'Clear'}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center w-full">
              {[
                [stormActive ? '26°' : '34°', 'Temp'],
                [stormActive ? '78mm' : '2mm', 'Rain'],
                [stormActive ? '145' : '62', 'AQI'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-white font-semibold text-sm">{v}</div>
                  <div className="text-white/40 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Policy */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs tracking-wider text-white/50 font-semibold">ACTIVE POLICY</span>
              <span className="w-2 h-2 rounded-full bg-success"></span>
            </div>
            <h3 className="font-display font-bold text-lg mb-4 text-white">StreetGuard Weekly</h3>
            <div className="space-y-3 mb-4">
              {[
                ['Premium', `₹${profile.premium || 84}/wk`, 'text-primary'],
                ['Max Payout', `₹${(profile.maxPayout || 3150).toLocaleString()}/wk`, 'text-white'],
                ['Triggers', '5 active', 'text-white'],
                ['Renewal', 'Apr 11, 2026', 'text-white'],
              ].map(([k, v, c]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/40">{k}</span>
                  <span className={`font-medium ${c}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['Rain', 'Heat', 'AQI', 'Floods', 'Bandh'].map(t => (
                <span key={t} className="glass-card px-3 py-1 rounded-full text-xs text-white/60">{t}</span>
              ))}
            </div>
          </div>

          {/* Stats 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {[
              ['₹5,580', 'Earnings This Week', '+12%', 'text-success'],
              [claimsFiled.toString(), 'Claims Filed', 'Auto', 'text-primary'],
              ['₹3,400', 'Total Protected', 'Lifetime', 'text-primary'],
              [String(profile.risk_score || 67), 'Risk Score', riskLabel(profile.risk_score), 'text-amber'],
            ].map(([val, label, badge, color]) => (
              <div key={label} className="glass-card p-4 rounded-2xl">
                <div className={`font-display font-bold text-xl ${color}`}>{val}</div>
                <div className="text-white/40 text-xs mt-1">{label}</div>
                <div className="text-white/30 text-[10px] mt-1">{badge}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
            <h3 className="font-display font-semibold text-sm mb-4 text-white/70">WEEKLY EARNINGS</h3>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="earnedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="protectedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFB800" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#FFB800" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: '#1a1f36', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 12 }}
                    itemStyle={{ color: '#fff' }} />
                  <Area type="monotone" dataKey="earned" stroke="#00D4AA" fill="url(#earnedGrad)" strokeWidth={2} name="Earned" />
                  <Area type="monotone" dataKey="protected" stroke="#FFB800" fill="url(#protectedGrad)" strokeWidth={2} name="Protected" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm text-white/70">RECENT ACTIVITY</h3>
              <span className="glass-card px-2 py-0.5 rounded-full text-[10px] text-white/40">3 events</span>
            </div>
            <div className="space-y-4 mb-6">
              {[
                [CloudRainIcon, '#00D4AA', 'Heavy rain forecast for tomorrow — coverage active', '2h ago'],
                [WalletIcon, '#FFB800', `Weekly premium ₹${profile.premium || 84} auto-debited`, '1d ago'],
                [WindIcon, '#FF4757', 'AQI rising in your zone — monitoring', '3d ago'],
              ].map(([Icon, color, text, time], i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: color + '15' }}>
                    <Icon size={14} color={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 leading-relaxed">{text}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/40 tracking-wider font-semibold mb-3">ACTIVE TRIGGERS</p>
            <div className="flex flex-wrap gap-2">
              {[
                ['Rain >60mm', stormActive ? 'bg-coral/20 text-coral' : 'glass-card text-white/60'],
                ['Temp >45°C', 'glass-card text-white/60'],
                ['AQI >300', 'glass-card text-white/60'],
                ['Flood Alert', 'glass-card text-white/60'],
                ['Bandh/Curfew', 'glass-card text-white/60'],
              ].map(([t, cls]) => (
                <span key={t} className={`${cls} px-2.5 py-1 rounded-full text-[10px] font-medium`}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Navbar active="dashboard" onNavigate={onNavigate} />
    </div>
  )
}

function riskLabel(score) {
  if (!score || score < 40) return 'Low'
  if (score < 70) return 'Medium'
  return 'High'
}