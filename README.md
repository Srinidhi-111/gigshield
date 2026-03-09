## 🛡️ GigShield — AI-Powered Parametric Income Insurance for Gig Workers

## 👤 Meet Murugan — Our Persona

Murugan is 26, lives in Tambaram, Chennai, and has been delivering for Swiggy for the past 2 years. He works 6 days a week, around 10 hours a day, and on a good week takes home about ₹4,500. On a bad week — heavy rain, a surprise bandh, a heatwave — that drops to ₹1,200. Sometimes less.

He doesn't have a salary slip. No employer. No insurance. Just his Activa, his phone, and whatever the weather decides to do that day.

Last monsoon season alone, he lost close to ₹7,000 across multiple disruption days. That's money he didn't earn, couldn't recover, and had no protection against.

That's who we're building GigShield for.

---

## 🎯 The Problem

India has over 15 million platform-based gig delivery workers. When extreme weather, sudden curfews, or environmental disruptions hit, they lose 20–30% of their monthly income with absolutely no protection.

They're not employees, so there's no ESI or PF. They're not business owners, so there's no business insurance. They're just people on bikes, completely exposed to events they can't control.

The worst part? It's predictable. Every monsoon season, every heatwave, every bandh — the loss happens. And every single time, they bear it alone.

---

## 💡 Our Solution

GigShield is a weekly parametric income insurance platform built specifically for food delivery partners like Murugan.

When a covered disruption is detected in his zone — heavy rain, extreme heat, a curfew — GigShield automatically initiates a claim and sends money to his UPI. No forms. No calls. No waiting.

He pays ₹84 a week. We cover up to 70% of his declared weekly income when disruptions hit.

**What we cover:** Loss of income only — when external disruptions prevent him from working.
**What we don't cover:** Health, life, accidents, or vehicle repairs.

---

## ⚡ How It Works

**Step 1 — Getting Murugan on board (takes about 2 minutes)**
He enters his name, phone, city, delivery zone, platform, and average weekly earnings. GigShield generates a personalized risk profile and weekly premium instantly. No paperwork, no agent visit.

**Step 2 — Policy Activation**
He pays the weekly premium via UPI. Policy is active for 7 days and auto-renews each week. If he doesn't want to renew, he just doesn't pay — no strings attached.

**Step 3 — Disruption Monitoring (this is the part we're most excited about)**
Our system checks weather and disruption APIs every 30 minutes. When a trigger threshold is crossed in his zone, an alert fires automatically. Murugan doesn't have to do anything.

**Step 4 — Automatic Claim**
Claim is created instantly. He gets a notification: "Heavy rain detected in your zone. Claim initiated. ₹720 will reach your UPI by 8 PM." That's it.

**Step 5 — Instant Payout**
Approved claims are paid to his UPI within 2 hours. An AI fraud check runs in the background before payment is released — more on that below.

---

## 🚨 Parametric Triggers

These are the 5 automated events that trigger a claim for a Chennai food delivery worker:

| Trigger | Data Source | Threshold | Payout |
|---------|-------------|-----------|--------|
| Heavy Rainfall | OpenWeatherMap API | Rain > 20mm/hr in worker's zone | 50% of daily declared income |
| Extreme Heat | OpenWeatherMap API | Temperature > 43°C for 3+ hours | 30% of daily declared income |
| Severe Air Pollution | WAQI API (free) | AQI > 300 in worker's city zone | 40% of daily declared income |
| Curfew / Bandh | Admin trigger (manual) | Zone lockdown flag activated | 100% of daily declared income |
| Platform Downtime | Simulated API monitor | Platform mock API error for 2+ hrs | 60% of daily declared income |

We chose these 5 specifically for Chennai food delivery workers because they represent the most frequent and impactful disruptions based on our research. The thresholds are based on IMD guidelines and publicly available disruption data for Chennai.

---

## 💰 Weekly Premium Model

Gig workers earn weekly and spend weekly. A yearly premium of ₹5,000 upfront is impossible for someone like Murugan. So GigShield works the same way he does — week to week.

**Premium Formula:**

```
Weekly Premium = Base Rate + Zone Risk + Seasonal Adjustment

Base Rate: ₹49
Zone Risk: Low risk zone +₹0 | Medium +₹15 | High (flood prone) +₹25
Seasonal: Normal months +₹0 | Monsoon (Jun–Nov) +₹10 | Summer (Apr–May) +₹5
```

**Example — Murugan in October:**
₹49 (base) + ₹25 (Tambaram flood zone) + ₹10 (monsoon season) = **₹84/week**
Coverage: 70% of declared weekly income → up to ₹3,150/week protected

We're still refining the exact multipliers as we gather more zone-level data, but the core logic is solid and we're confident in the approach.

---

## 🤖 AI/ML Integration Plan

**Premium Calculation Engine**

- Inputs: worker zone, declared income, platform, city, month/season, historical disruption data
- Phase 1: Rule-based scoring model (what we've designed above)
- Phase 2: Upgrade to ML regression model trained on historical Chennai weather and disruption data
- Output: Personalized weekly premium in ₹

**Fraud Detection System**

This is important because parametric insurance is vulnerable to false claims. Our approach:

- Location validation: Worker's GPS must match their registered delivery zone
- Activity cross-check: Verify worker was active on platform before disruption hit
- Anomaly detection: Flag claims that don't match actual weather data for that zone and time
- Duplicate prevention: One claim per disruption event per worker

**Predictive Risk Modelling**

- Uses historical weather data for worker's pincode
- Identifies high-risk weeks in advance
- Proactively notifies workers before monsoon season to ensure they're covered

---

## 🛠️ Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | HTML + CSS + JavaScript | Team's existing skill set |
| Backend | Python + Flask | Lightweight, team knows Python |
| Database | Firebase Firestore | No setup complexity, free tier |
| Weather API | OpenWeatherMap | Simple, well documented, free tier |
| AQI API | WAQI API | Free, reliable air quality data |
| Payment Mock | Razorpay Test Mode | Indian payment gateway, free sandbox |
| Hosting | Vercel (frontend) + Render (backend) | Both free tiers available |
| ML Model | Python scikit-learn | Lightweight, fits our stack |

We picked this stack because it plays to our strengths as a team. We're not trying to over-engineer this — we want something we can actually build well in 6 weeks.

---

## 📱 Platform Choice — Web Application

We chose a web platform over a mobile app for a few reasons:

- Workers can access it from any phone browser without installing anything
- Easier to demo during judge evaluations
- More practical within our 6-week timeline
- Honestly, none of us have built a production mobile app before — web was the smarter choice given our skills
- Can always be converted to a PWA (Progressive Web App) for offline use later

---

## 🗓️ Development Plan

| Phase | Timeline | What We Build |
|-------|----------|--------------|
| Phase 1 — Seed | March 4–20 | Research, persona, planning, README, wireframes |
| Phase 2 — Scale | March 21–April 4 | Registration, policy management, premium calculator, claims, basic fraud detection |
| Phase 3 — Soar | April 5–17 | Advanced fraud detection, instant payouts, analytics dashboard, final polish |

---

## 👥 Team — Code4ce

| Name | Role |
|------|------|
| Srinidhi R | Team Lead & Research |
| Panbarasi S | Frontend Development |
| Aakas D R | Backend & AI/ML |
| Dharshini S S | Content & Integration |

---

*Built for Guidewire DEVTrails 2026 | Seed → Scale → Soar*
