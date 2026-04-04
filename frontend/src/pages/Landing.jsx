import { useState, useEffect } from 'react'

// ── Inline SVG Icons ──
const ShieldIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const CloudRainIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25"/><path d="M8 16v2M8 20v1M12 18v2M12 22v1M16 16v2M16 20v1"/>
  </svg>
)
const ZapIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const FileTextIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const WalletIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 000 4h4v-4z"/>
  </svg>
)
const BrainIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A5.5 5.5 0 005 7.5c0 .88.2 1.73.6 2.5H5a4 4 0 00-.83 7.92A6.5 6.5 0 0012 22a6.5 6.5 0 007.83-4.08A4 4 0 0019 10h-.6c.4-.77.6-1.62.6-2.5A5.5 5.5 0 0014.5 2 5.5 5.5 0 0012 3.17 5.5 5.5 0 009.5 2z"/><path d="M12 2v20"/>
  </svg>
)
const MapPinIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const CheckIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function Landing({ onNavigate }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setVisible(true) }, [])

  return (
    <div className="min-h-screen bg-navy">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <ShieldIcon size={28} color="#00D4AA" />
            <span className="font-display font-bold text-xl text-white">StreetGuard</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition">How It Works</a>
            <a href="#tech" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
          </div>
          <button onClick={() => onNavigate('onboard')}
            className="bg-primary text-navy font-semibold text-sm px-5 py-2 rounded-full hover:brightness-110 transition">
            Get Protected →
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="grid-bg relative py-24 md:py-32 text-center px-6">
        <div className={`max-w-3xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm text-white/80 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
            AI-Powered Parametric Insurance
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight mb-6 text-white">
            Don't Let The <span className="text-primary">Rain</span> Steal Your Earnings
          </h1>
          <p className="text-white/60 text-lg mb-4">When weather strikes, StreetGuard pays. Automatically.</p>
          <p className="text-white/40 text-sm mb-10">Built for India's 7.7 million delivery partners.</p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[['₹49', 'Per Week'], ['15 min', 'Claim Payout'], ['Zero', 'Paperwork']].map(([v, l]) => (
              <div key={l} className="glass-card px-6 py-3 rounded-xl text-center hover:border-primary/30 transition">
                <div className="font-display font-bold text-xl text-primary">{v}</div>
                <div className="text-white/50 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('onboard')}
              className="bg-primary text-navy font-bold px-8 py-3 rounded-full hover:brightness-110 transition text-base">
              Get Protected Now →
            </button>
            <button onClick={() => onNavigate('dashboard')}
              className="glass-card text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition text-base">
              View Demo Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ── Zero-Touch Claims ── */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <p className="text-primary text-sm font-semibold tracking-widest mb-3 text-center">PROCESS</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-3 text-white">Zero-Touch Claims</h2>
        <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">From disruption to payout in 15 minutes. No forms. No calls. No waiting.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ['01', 'Weather Monitored', 'Real-time API feeds track rain, heat, AQI across your zone', CloudRainIcon],
            ['02', 'Trigger Detected', 'Parametric thresholds automatically identify disruptions', ZapIcon],
            ['03', 'Claim Auto-Filed', 'AI validates the event — no forms, no calls, no waiting', FileTextIcon],
            ['04', 'Instant Payout', 'Compensation hits your wallet within 15 minutes', WalletIcon],
          ].map(([num, title, desc, Icon]) => (
            <div key={num} className="glass-card p-6 rounded-2xl hover:border-primary/30 transition group">
              <div className="text-primary/40 font-display font-bold text-sm mb-4">{num}</div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                <Icon size={22} color="#00D4AA" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-white">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Built Different ── */}
      <section id="tech" className="py-20 px-6 max-w-6xl mx-auto">
        <p className="text-primary text-sm font-semibold tracking-widest mb-3 text-center">TECHNOLOGY</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12 text-white">Built Different</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            ['AI Risk Engine', 'ML-powered dynamic premium pricing based on your city, zone & season', BrainIcon],
            ['Hyper-Local Triggers', 'Zone-level weather monitoring — not city-wide averages', MapPinIcon],
            ['Smart Fraud Guard', 'GPS validation, anomaly detection & duplicate claim prevention', ShieldIcon],
            ['Weekly Pricing', 'Aligned with gig payout cycles — cancel anytime, no lock-in', WalletIcon],
          ].map(([title, desc, Icon]) => (
            <div key={title} className="glass-card p-6 rounded-2xl hover:border-primary/30 transition group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                <Icon size={22} color="#00D4AA" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-white">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <p className="text-primary text-sm font-semibold tracking-widest mb-3 text-center">SIMPLE PRICING</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-3 text-white">One Plan. Weekly.</h2>
        <p className="text-white/50 text-center mb-12 max-w-xl mx-auto">No confusing tiers. Pay weekly, cancel anytime. Your premium adjusts automatically based on your zone's risk profile.</p>
        <div className="max-w-md mx-auto glass-card p-8 rounded-2xl" style={{ borderColor: 'rgba(0,212,170,0.3)', boxShadow: '0 0 60px rgba(0,212,170,0.1)' }}>
          <p className="text-white/50 text-xs tracking-widest mb-2">STARTING AT</p>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-display font-extrabold text-4xl text-primary">₹49</span>
            <span className="text-white/50 text-sm">per week</span>
          </div>
          <p className="text-white/40 text-xs mb-6">· dynamic AI pricing</p>
          <ul className="space-y-3 mb-8">
            {[
              'Coverage for rain, heat, AQI, floods & storms',
              'Automatic claim filing — zero paperwork',
              '15-minute payout to your UPI/wallet',
              'AI-adjusted premium based on your zone',
              'Cancel anytime — no lock-in period'
            ].map(t => (
              <li key={t} className="flex items-start gap-3 text-sm text-white/70">
                <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>{t}
              </li>
            ))}
          </ul>
          <button onClick={() => onNavigate('onboard')}
            className="w-full bg-primary text-navy font-bold py-3 rounded-full hover:brightness-110 transition">
            Start Protection →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8 text-center text-white/30 text-sm">
        StreetGuard · Guidewire DEVTrails 2026 · AI-Powered Parametric Insurance for India's Gig Economy
      </footer>
    </div>
  )
}
