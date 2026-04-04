import { useState } from 'react'
import { calculatePremium, getZoneRisk, getMaxPayout } from '../utils/premiumCalculator'

// ── Icons ──
const ShieldIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
)
const CheckIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
)
const ArrowLeftIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
)
const ArrowRightIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)
const BrainIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5.5 5.5 0 005 7.5c0 .88.2 1.73.6 2.5H5a4 4 0 00-.83 7.92A6.5 6.5 0 0012 22a6.5 6.5 0 007.83-4.08A4 4 0 0019 10h-.6c.4-.77.6-1.62.6-2.5A5.5 5.5 0 0014.5 2 5.5 5.5 0 0012 3.17 5.5 5.5 0 009.5 2z"/><path d="M12 2v20"/></svg>
)

// Platform configs
const platforms = [
  { name: 'Zomato', color: '#E23744', emoji: '🍕' },
  { name: 'Swiggy', color: '#FC8019', emoji: '🛵' },
  { name: 'Zepto', color: '#7B61FF', emoji: '⚡' },
  { name: 'Blinkit', color: '#F5C518', emoji: '📦' },
  { name: 'Amazon', color: '#FF9900', emoji: '🚚' },
]

const cities = ['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad']

const zones = {
  'Mumbai': ['Andheri West', 'Bandra', 'Dadar', 'Borivali', 'Kurla', 'Thane'],
  'Delhi NCR': ['Dwarka', 'Rohini', 'Noida Sec 18', 'Gurgaon', 'Laxmi Nagar'],
  'Bangalore': ['Koramangala', 'HSR Layout', 'Whitefield', 'Indiranagar', 'Jayanagar'],
  'Hyderabad': ['Madhapur', 'Gachibowli', 'Secunderabad', 'Ameerpet', 'Kukatpally'],
  'Chennai': ['Tambaram', 'T. Nagar', 'Adyar', 'Velachery', 'Anna Nagar', 'Chromepet', 'Porur', 'OMR'],
  'Pune': ['Kothrud', 'Hinjewadi', 'Viman Nagar', 'Hadapsar', 'Shivajinagar'],
  'Kolkata': ['Salt Lake', 'Park Street', 'Howrah', 'New Town', 'Dum Dum'],
  'Ahmedabad': ['Navrangpura', 'SG Highway', 'Maninagar', 'Satellite', 'Bopal'],
}

export default function Onboarding({ onNavigate }) {
  const [step, setStep] = useState(1)
  const [platform, setPlatform] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [zone, setZone] = useState('')
  const [hours, setHours] = useState(8)
  const [weeklyEarnings, setWeeklyEarnings] = useState(4500)
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [analysisSteps, setAnalysisSteps] = useState([])
  const [analysisDone, setAnalysisDone] = useState(false)
  const [riskScore, setRiskScore] = useState(0)

  const stepLabels = ['PLATFORM', 'LOCATION', 'AI ANALYSIS', 'CONFIRMATION']

  const analysisMessages = [
    '● Fetching hyper-local weather history...',
    '● Analyzing zone flood/waterlogging data...',
    '● Processing 847 delivery disruption records...',
    '● Calculating seasonal risk factors...',
    '● Running ML premium model...',
    '● Generating personalized premium...',
  ]

  const runAnalysis = () => {
    setAnalysisRunning(true)
    setAnalysisSteps([])
    setAnalysisDone(false)
    analysisMessages.forEach((s, i) => {
      setTimeout(() => {
        setAnalysisSteps(prev => [...prev, s])
        if (i === analysisMessages.length - 1) {
          setTimeout(() => {
            const risk = getZoneRisk(zone)
            setRiskScore(risk.score + Math.floor(Math.random() * 10) - 5)
            setAnalysisDone(true)
            setAnalysisRunning(false)
          }, 800)
        }
      }, (i + 1) * 600)
    })
  }

  const premium = calculatePremium(zone)
  const maxPayout = getMaxPayout(weeklyEarnings)
  const riskLabel = riskScore < 40 ? 'Low' : riskScore < 70 ? 'Medium' : 'High'
  const riskColor = riskScore < 40 ? '#00FF88' : riskScore < 70 ? '#FFB800' : '#FF4757'

  const activate = () => {
    const workerData = {
      name: name || 'Rider',
      phone: phone || '+91 98765 43210',
      platform,
      city,
      zone,
      daily_hours: hours,
      weekly_earnings: weeklyEarnings,
      risk_score: riskScore,
      premium: premium.total,
      maxPayout,
      policyId: `GS-${Date.now()}`,
      activatedAt: new Date().toISOString(),
    }
    localStorage.setItem('worker_data', JSON.stringify(workerData))
    localStorage.setItem('worker_id', `W-${Date.now()}`)
    onNavigate('dashboard')
  }

  const canProceed = () => {
    if (step === 1) return platform && name
    if (step === 2) return city && zone
    if (step === 3) return analysisDone
    return true
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      {/* Top bar */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center gap-3">
        <ShieldIcon size={24} color="#00D4AA" />
        <span className="font-display font-bold text-lg text-white">StreetGuard</span>
        <span className="text-white/30 text-sm ml-2">Registration</span>
      </div>

      {/* Progress */}
      <div className="px-6 pt-6 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step > s ? 'bg-primary text-navy' : step === s ? 'bg-primary text-navy' : 'glass-card text-white/40'
              }`}>
                {step > s ? <CheckIcon size={14} color="#0A0F1E" /> : s}
              </div>
              {s < 4 && <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s ? 'bg-primary' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
        <p className="text-primary text-xs tracking-widest font-semibold mb-2">
          STEP {String(step).padStart(2, '0')} — {stepLabels[step - 1]}
        </p>
      </div>

      <div className="flex-1 px-6 pb-6 max-w-2xl mx-auto w-full">

        {/* ── Step 1: Platform & Identity ── */}
        {step === 1 && (
          <div className="animate-in">
            <h2 className="font-display font-bold text-2xl mb-2 text-white">Which platform do you deliver for?</h2>
            <p className="text-white/50 text-sm mb-8">Select your primary delivery platform</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {platforms.map(({ name: pName, color, emoji }) => (
                <button key={pName} onClick={() => setPlatform(pName)}
                  className={`glass-card p-5 rounded-2xl text-center transition relative hover:border-white/20 ${
                    platform === pName ? 'border-primary' : ''
                  }`}
                  style={platform === pName ? { borderColor: '#00D4AA' } : {}}>
                  {platform === pName && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <CheckIcon size={12} color="#0A0F1E" />
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                    style={{ backgroundColor: color + '20' }}>
                    {emoji}
                  </div>
                  <span className="text-sm font-medium text-white">{pName}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-xs tracking-wider font-semibold block mb-2">YOUR NAME</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Murugan R"
                  className="w-full glass-card bg-transparent px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-primary transition"
                  style={name ? { borderColor: '#00D4AA' } : {}} />
              </div>
              <div>
                <label className="text-white/60 text-xs tracking-wider font-semibold block mb-2">MOBILE NUMBER</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 93XXX XXXXX"
                  className="w-full glass-card bg-transparent px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-primary transition"
                  style={phone ? { borderColor: '#00D4AA' } : {}} />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Location ── */}
        {step === 2 && (
          <div className="animate-in">
            <h2 className="font-display font-bold text-2xl mb-2 text-white">Where do you operate?</h2>
            <p className="text-white/50 text-sm mb-8">Your premium is calculated based on hyper-local risk data</p>

            <label className="text-white/60 text-xs tracking-wider font-semibold block mb-3">CITY</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {cities.map(c => (
                <button key={c} onClick={() => { setCity(c); setZone('') }}
                  className={`glass-card px-4 py-3 rounded-xl text-sm transition hover:border-white/20 ${
                    city === c ? 'border-primary text-primary' : 'text-white/70'
                  }`}
                  style={city === c ? { borderColor: '#00D4AA' } : {}}>
                  {c}
                </button>
              ))}
            </div>

            {city && (
              <>
                <label className="text-white/60 text-xs tracking-wider font-semibold block mb-3">ZONE / AREA</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {(zones[city] || []).map(z => {
                    const risk = getZoneRisk(z)
                    return (
                      <button key={z} onClick={() => setZone(z)}
                        className={`glass-card px-4 py-3 rounded-xl text-sm transition hover:border-white/20 ${
                          zone === z ? 'border-primary text-primary' : 'text-white/70'
                        }`}
                        style={zone === z ? { borderColor: '#00D4AA' } : {}}>
                        {z}
                        {zone === z && (
                          <span className={`block text-xs mt-1 ${
                            risk.level === 'High' ? 'text-red-400' : risk.level === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                          }`}>{risk.level} Risk</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {zone && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/60 text-xs tracking-wider font-semibold block mb-2">DAILY HOURS</label>
                    <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))}
                      className="w-full glass-card bg-transparent px-4 py-3 rounded-xl text-sm text-white outline-none focus:border-primary transition"
                      style={{ borderColor: '#00D4AA' }} />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs tracking-wider font-semibold block mb-2">WEEKLY EARNINGS (₹)</label>
                    <input type="number" value={weeklyEarnings} onChange={e => setWeeklyEarnings(Number(e.target.value))}
                      className="w-full glass-card bg-transparent px-4 py-3 rounded-xl text-sm text-white outline-none focus:border-primary transition"
                      style={{ borderColor: '#00D4AA' }} />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Step 3: AI Analysis ── */}
        {step === 3 && (
          <div className="animate-in">
            <h2 className="font-display font-bold text-2xl mb-2 text-white">AI Risk Profile</h2>
            <p className="text-white/50 text-sm mb-8">
              AI analyzes 12+ risk parameters for {city || 'your city'} to calculate your personalized premium
            </p>

            {!analysisDone ? (
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
                  <BrainIcon size={28} color="#00D4AA" />
                </div>
                {analysisSteps.length === 0 && (
                  <p className="text-white/50 text-sm mb-6">Click "Run Analysis" to generate your risk profile</p>
                )}
                {analysisSteps.map((s, i) => (
                  <p key={i} className="text-sm text-white/70 text-left mb-2 animate-in" style={{ animationDelay: `${i * 100}ms` }}>{s}</p>
                ))}
                {!analysisRunning && analysisSteps.length === 0 && (
                  <button onClick={runAnalysis}
                    className="bg-primary text-navy font-bold px-8 py-3 rounded-full hover:brightness-110 transition">
                    Run Analysis
                  </button>
                )}
                {analysisRunning && (
                  <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(analysisSteps.length / analysisMessages.length) * 100}%` }} />
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card p-8 rounded-2xl animate-in">
                <div className="text-center mb-6">
                  <div className="font-display font-extrabold text-6xl mb-2" style={{ color: riskColor }}>{riskScore}</div>
                  <div className="text-sm font-semibold" style={{ color: riskColor }}>{riskLabel} Risk</div>
                </div>
                <div className="glass-card p-4 rounded-xl mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/50">Recommended Premium</span>
                    <span className="text-primary font-bold">₹{premium.total}/week</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Max Weekly Payout</span>
                    <span className="text-green-400 font-bold">₹{maxPayout.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-white/40 tracking-wider font-semibold">PREMIUM BREAKDOWN</p>
                  {[
                    [`Base rate`, `₹${premium.base}`],
                    [`Zone risk (${zone})`, `+₹${premium.zoneAdjustment}`],
                    [`Seasonal (${premium.season})`, `+₹${premium.seasonalAdjustment}`],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between text-sm text-white/60">
                      <span>{label}</span>
                      <span className="text-white font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: Confirmation ── */}
        {step === 4 && (
          <div className="animate-in">
            <h2 className="font-display font-bold text-2xl mb-2 text-white">Policy Summary</h2>
            <p className="text-white/50 text-sm mb-8">Review your coverage details before activating</p>
            <div className="glass-card p-6 rounded-2xl mb-6 space-y-4">
              {[
                ['Name', name || 'Rider'],
                ['Platform', platform || '—'],
                ['City', city || '—'],
                ['Zone', zone || '—'],
                ['Working Hours', `${hours} hrs/day`],
                ['Risk Score', `${riskScore} (${riskLabel})`],
                ['Weekly Premium', `₹${premium.total}`],
                ['Max Weekly Payout', `₹${maxPayout.toLocaleString()}`],
                ['Coverage', 'Rain, Heat, AQI, Floods, Bandh'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-white/50">{k}</span>
                  <span className="text-white font-medium">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={activate}
              className="w-full bg-primary text-navy font-bold py-3 rounded-full hover:brightness-110 transition text-base">
              Activate Coverage →
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="border-t border-white/10 px-6 py-4 flex justify-between max-w-2xl mx-auto w-full">
        <button onClick={() => step === 1 ? onNavigate('landing') : setStep(step - 1)}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition">
          <ArrowLeftIcon size={16} /> {step === 1 ? 'Home' : 'Back'}
        </button>
        {step < 4 && (
          <button onClick={() => { if (canProceed()) setStep(step + 1) }}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-primary text-navy font-semibold px-6 py-2 rounded-full text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition">
            Continue <ArrowRightIcon size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
