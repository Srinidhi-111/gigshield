import { useState } from 'react'
import { db, auth } from '../services/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

export default function Onboarding({ onNavigate }) {
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [otpSent, setOtpSent] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', platform: '',
    city: 'Chennai', zone: '', weekly_earnings: '', daily_hours: ''
  })

  const platforms = ['Swiggy', 'Zomato', 'Zepto', 'Blinkit', 'Amazon']
  const zones = ['Tambaram', 'T. Nagar', 'Adyar', 'Velachery', 'Anna Nagar', 'Chromepet', 'Porur', 'OMR']

  const getRiskLevel = (zone) => {
    const high = ['Tambaram', 'Chromepet', 'Adyar']
    const medium = ['Velachery', 'T. Nagar', 'OMR']
    if (high.includes(zone)) return { level: 'High', color: 'red', adjustment: 25 }
    if (medium.includes(zone)) return { level: 'Medium', color: 'yellow', adjustment: 15 }
    return { level: 'Low', color: 'green', adjustment: 0 }
  }

  const getPremium = () => {
    const base = 49
    const risk = getRiskLevel(form.zone)
    const seasonal = 10
    return base + risk.adjustment + seasonal
  }

  const handleSendOTP = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      })
      const result = await signInWithPhoneNumber(
        auth,
        form.phone.startsWith('+') ? form.phone : `+91${form.phone}`,
        window.recaptchaVerifier
      )
      setConfirmationResult(result)
      setOtpSent(true)
      setStep(2)
    } catch (e) {
      console.error(e)
      setStep(2)
    }
  }

  const handleSubmit = async () => {
    try {
      const risk = getRiskLevel(form.zone)
      const premium = getPremium()
      const docRef = await addDoc(collection(db, 'workers'), {
        name: form.name,
        phone: form.phone,
        platform: form.platform,
        city: form.city,
        zone: form.zone,
        daily_hours: Number(form.daily_hours),
        weekly_earnings: Number(form.weekly_earnings),
        risk_score: risk.level === 'High' ? 75 : risk.level === 'Medium' ? 50 : 25,
        weekly_premium: premium,
        created_at: serverTimestamp()
      })
      localStorage.setItem('worker_id', docRef.id)
      localStorage.setItem('worker_data', JSON.stringify({ ...form, premium }))
      onNavigate('dashboard')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-navy px-6 py-8">
      <div id="recaptcha-container"></div>

      <div className="max-w-sm mx-auto mb-8">
        <div className="text-xs text-gray-400 mb-2">Step {step} of 3</div>
        <div className="h-1.5 bg-white/10 rounded-full">
          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        <h1 className="font-display text-2xl font-bold text-white mt-4">
          {step === 1 ? 'Select your platform' : step === 2 ? 'Your delivery zone' : 'Almost done!'}
        </h1>
      </div>

      <div className="max-w-sm mx-auto">

        {step === 1 && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {platforms.map(p => (
                <button key={p}
                  onClick={() => setForm({ ...form, platform: p })}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all ${
                    form.platform === p
                      ? 'bg-accent/20 border-accent text-accent-2'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >{p}</button>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-1 block">Your Name</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent"
                placeholder="e.g. Murugan R"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-400 mb-1 block">Mobile Number</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <button
              onClick={handleSendOTP}
              className="w-full bg-accent text-white font-semibold py-4 rounded-xl"
            >Send OTP →</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {zones.map(z => (
                <button key={z}
                  onClick={() => setForm({ ...form, zone: z })}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    form.zone === z
                      ? 'bg-accent/20 border-accent text-accent-2'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  {z}
                  {form.zone === z && (
                    <span className={`block text-xs mt-1 ${
                      getRiskLevel(z).color === 'red' ? 'text-red-400' :
                      getRiskLevel(z).color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
                    }`}>{getRiskLevel(z).level} Risk</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => form.zone && setStep(3)}
              className="w-full bg-accent text-white font-semibold py-4 rounded-xl"
            >Next →</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-1 block">Average Weekly Earnings (₹)</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent"
                placeholder="e.g. 4500"
                value={form.weekly_earnings}
                onChange={e => setForm({ ...form, weekly_earnings: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-400 mb-1 block">Daily Working Hours</label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-accent"
                placeholder="e.g. 10"
                value={form.daily_hours}
                onChange={e => setForm({ ...form, daily_hours: e.target.value })}
              />
            </div>
            {form.weekly_earnings && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mb-6">
                <div className="text-xs text-gray-400 mb-2">YOUR WEEKLY PREMIUM</div>
                <div className="font-display text-4xl font-bold text-white">₹{getPremium()}</div>
                <div className="text-xs text-accent-2 mt-1">Max payout: ₹{Math.round(Number(form.weekly_earnings) * 0.7)}</div>
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-accent text-white font-semibold py-4 rounded-xl"
            >Activate Coverage →</button>
          </div>
        )}

      </div>
    </div>
  )
}
