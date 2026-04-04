# 🛡️ StreetGuard — AI-Powered Parametric Income Insurance for Gig Workers

> *"I don't need much. I just need to know that when it rains, my family still eats that night."*
> — Murugan, Swiggy Delivery Partner, Tambaram, Chennai

**StreetGuard** is a weekly parametric income insurance platform for gig delivery workers in India. When a verified disruption — heavy rain, extreme heat, a bandh, platform downtime — hits a worker's zone, StreetGuard detects it automatically, initiates a claim without the worker doing anything, and sends money to their UPI within 2 hours.

No forms. No agents. No waiting.

---


## 🎯 The Problem

India has over **15 million platform-based gig delivery workers**. They are among the most economically vulnerable working people in the country — yet they are completely excluded from every formal protection system that exists.

When disruptions hit — and in Chennai alone, **7 out of 12 months carry medium to high disruption risk** — delivery workers simply stop earning. Not because they choose to. Because they cannot ride in 35mm/hr rainfall. Because restaurants shut during a bandh. Because their platform goes down. Because the heat index hits 48°C and no one is ordering food.

**The average Chennai delivery worker loses ₹6,000–₹9,000 per year to disruption-related income loss.**

The protection gap exists because:

- **Traditional insurance won't touch them** — no salary slip, no fixed employer, no verifiable income history
- **Microfinance doesn't help** — covers capital needs, not income loss
- **Banks won't lend** — no collateral, no credit score, no proof of income
- **Platforms don't compensate** — workers are classified as "partners", not employees
- **Government schemes don't reach them** — most are unaware, unregistered, or ineligible

This isn't a niche problem. It is a systemic failure affecting millions of people who keep Indian cities fed, and it is entirely solvable with the right technology.

---

## 👤 Meet Murugan — Our Persona

**Murugan, 26 — Swiggy Delivery Partner, Tambaram, Chennai**

Murugan has been delivering for Swiggy for two years. He works 6 days a week, roughly 10 hours a day, covering the Tambaram and Chromepet zones of Chennai. He owns an Activa, rents a room with a friend, and sends ₹2,000 home to his family in Villupuram every month.

On a good week, he earns ₹4,500. On a week with three disruption days — which happens regularly during Chennai's monsoon season — he earns ₹2,950. That's a ₹1,550 loss in seven days, with no warning and no way to recover it.

**A week in Murugan's life during October 2024:**

| Day | Earnings | Reason |
|-----|----------|--------|
| Monday | ₹680 | Normal day |
| Tuesday | ₹320 | Heavy rain — couldn't ride for 4 hours |
| Wednesday | ₹610 | Normal day |
| Thursday | ₹410 | Heatwave — orders dropped sharply |
| Friday | ₹740 | Normal day |
| Saturday | ₹190 | Bandh — almost no orders all day |
| **Total** | **₹2,950** | **Expected: ₹4,500 — Loss: ₹1,550** |

**Why nothing currently helps Murugan:**
- No salary slip → can't apply for a loan
- No employer → not eligible for ESI or group insurance
- Platform "partner" status → no compensation for lost work days
- No credit score → banks won't lend without collateral
- Informal income → most insurance products require documented income proof

**What Murugan needs isn't charity. He needs a system that works as fast as the rain.**

---

## 💡 Our Solution

StreetGuard is built around one core insight: **the disruptions that cost Murugan money are measurable, verifiable, and predictable.** If we can measure them objectively, we can automate the entire insurance process around them.

That's parametric insurance.

Instead of asking Murugan to prove he lost income, StreetGuard monitors his zone in real time. When rainfall in Tambaram crosses 20mm/hr, we don't need him to call anyone. We already know he couldn't work. The payout triggers automatically.

**StreetGuard in one sentence:** A ₹84/week subscription that pays Murugan automatically when the weather or city makes it impossible for him to earn.

**What we cover:** Platform income loss due to external, verifiable disruptions.
**What we don't cover:** Health, accidents, vehicle damage, or personal emergencies.
**Who it's for:** Food delivery workers on Swiggy, Zomato, Zepto, Blinkit, and Amazon across major Indian cities — Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and Ahmedabad. Murugan (Swiggy, Tambaram, Chennai) is our primary persona and the example used throughout this document, but the platform is built to serve workers across all supported cities and platforms.

---

## ⚡ How It Works

### Step 1 — Onboarding (2 minutes, no documents)

Murugan opens StreetGuard on his phone browser. He goes through a 4-step onboarding wizard:

**Step 1 — Platform Selection:** He selects his primary delivery platform from a card grid — Zomato, Swiggy, Zepto, Blinkit, or Amazon. Each card shows the platform's icon for quick, visual selection.

**Step 2 — Location:** He selects his city from 8 supported cities (Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad), enters his zone/area (e.g. Tambaram), and inputs his average daily working hours. The platform immediately shows a zone risk badge (Low / Medium / High) based on hyper-local historical disruption data.

**Step 3 — AI Risk Profiling:** StreetGuard runs an automated analysis across 12+ risk parameters for his city and zone — flood history, monsoon exposure, seasonal AQI, historical disruption frequency. A personalized risk score (0–100) is generated along with a recommended weekly premium.

**Step 4 — Plan Confirmation:** A full policy summary is shown — coverage amount, weekly premium, renewal date, and active triggers. He confirms and activates coverage.

No documents. No agent visit. No waiting for approval.

### Step 2 — Policy Activation

He pays ₹84 via UPI. His policy activates immediately and runs for 7 days. It auto-renews each week. If he doesn't want to continue, he simply doesn't pay — no cancellation process, no fees.

### Step 3 — Live Zone Monitoring

Our backend polls the OpenWeatherMap API and WAQI API every 30 minutes for every active worker's registered zone. It checks rainfall intensity, temperature, and AQI against our trigger thresholds. The admin panel handles manual triggers for bandh/curfew events.

Murugan's dashboard shows him live zone status — green (safe), amber (watch), red (trigger active).

### Step 4 — Automatic Claim Initiation

When a threshold is crossed:
1. FastAPI backend detects the trigger event
2. All active policies in the affected zone are identified
3. Claims are created automatically in Firestore
4. Push notification sent to each affected worker: *"Heavy rain in your zone. Claim initiated. ₹720 will reach your UPI by 8 PM."*
5. Fraud detection layer runs in the background

Murugan does nothing. He just receives the notification.

### Step 5 — Fraud Check and Payout

Our AI fraud detection model validates the claim against location data, platform activity, and weather records. Clean claims are approved and sent to Razorpay for UPI disbursement. The full cycle — trigger detection to UPI credit — completes within 2 hours.

---

## 🚨 Parametric Triggers

| Trigger | Data Source | Threshold | Payout | Rationale |
|---------|-------------|-----------|--------|-----------|
| Heavy Rainfall | OpenWeatherMap API | >20mm/hr in worker's pincode | 50% of daily income | IMD defines heavy rain at 15.6mm/hr; 20mm is the threshold where delivery becomes unsafe |
| Extreme Heat | OpenWeatherMap API | >43°C for 3+ consecutive hours | 30% of daily income | At 43°C+ order volumes drop sharply and health risk makes riding unsafe |
| Severe Air Pollution | WAQI API | AQI >300 | 40% of daily income | AQI >300 is classified "Hazardous" — outdoor work carries serious health risk |
| Curfew / Bandh | Admin manual trigger | Zone lockdown flag activated | 100% of daily income | Complete work stoppage — full income replacement |
| Platform Downtime | Mock API monitor | 2+ hours of platform unavailability | 60% of daily income | Extended outage eliminates all earning possibility |

**Threshold rationale:** All thresholds are set conservatively to reflect conditions where income loss is near-certain, not just inconvenient. This protects both the worker and the platform's financial sustainability.

---

## 💰 Weekly Premium Model

Gig workers live week to week. A yearly or monthly premium model doesn't fit their cash flow reality. StreetGuard charges weekly — the same rhythm Murugan earns in.

**Premium Formula:**

```
Weekly Premium = Base Rate + Zone Risk Adjustment + Seasonal Adjustment

Base Rate         : ₹49 (covers standard risk profile)
Zone Risk         : Low zone +₹0 | Medium zone +₹15 | High zone (flood-prone) +₹25
Seasonal          : Off-season +₹0 | Summer (Apr–May) +₹5 | Monsoon (Jun–Nov) +₹10
```

**Zone classification** is based on municipal flood zone data and historical disruption frequency per zone, calibrated per city. Currently supported across 8 cities: Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and Ahmedabad.

**Seasonal adjustment** is based on IMD historical rainfall and temperature data by city and month.

**Example — Murugan, Tambaram, October:**

| Component | Amount |
|-----------|--------|
| Base rate | ₹49 |
| Zone risk (Tambaram — High) | +₹25 |
| Seasonal (Monsoon) | +₹10 |
| **Weekly Premium** | **₹84** |
| **Max weekly payout** | **₹3,150** (70% of ₹4,500) |
| **Premium-to-coverage ratio** | **1 : 37.5** |

**Phase 2 upgrade:** The rule-based formula will be upgraded to a scikit-learn regression model trained on historical disruption frequency, zone-level weather data, and platform order volume patterns. This will allow dynamic, worker-specific pricing that reflects actual risk more precisely.

---

## 📊 Loss Simulation Dashboard

One of StreetGuard's most distinctive features — and the strongest argument for signing up.

When a worker first opens StreetGuard, before they register, they can enter their zone and weekly earnings and see:

> *"In the last 6 months, there were 14 heavy-rain disruption days in Tambaram. If you had been covered with StreetGuard, you would have received ₹6,720 in payouts. Your total premium cost would have been ₹1,848. Net benefit: ₹4,872."*

This is built on **historical OpenWeatherMap data** for each pincode, cross-referenced against our trigger thresholds. The numbers are real. The loss is real.

For workers already registered, the dashboard shows:
- Total disruption days this month in their zone
- Claims triggered and amounts paid out
- Cumulative savings since they joined StreetGuard
- Upcoming high-risk days based on 7-day weather forecast

This feature turns StreetGuard from an insurance product into a financial planning tool for gig workers.

---

## 🤖 AI/ML Integration

### 1. Premium Calculation Engine

**Phase 1 (Rule-based):** Formula above — deterministic, transparent, explainable.

**Phase 2 (ML-based):** scikit-learn Linear Regression model.
- **Training data:** Historical Chennai weather records (IMD), disruption event logs, zone-level order volume patterns
- **Features:** Zone risk score, month, platform, declared income, historical claim rate for zone
- **Output:** Personalized weekly premium — recalculated each renewal based on updated forecast data
- **Validation:** Cross-validated against known disruption weeks to measure pricing accuracy

### 2. Fraud Detection System

Parametric insurance is theoretically vulnerable to identity fraud and false registrations. Our multi-layer fraud detection addresses this:

| Check | Method | When It Runs |
|-------|--------|-------------|
| Location validation | Worker GPS at claim time vs registered zone | Every claim |
| Activity cross-check | Platform activity timestamp before disruption | Every claim |
| Anomaly detection | scikit-learn Isolation Forest — flags statistical outliers | Every claim |
| Duplicate prevention | One claim per trigger event per worker per day | Database-level constraint |
| Velocity check | Flags register-and-claim within unusual time window | Registration + claim |
| Weather correlation | Claim data cross-checked against actual API readings for that zone and time | Batch validation |

**Isolation Forest** was chosen for anomaly detection because it works well on small, unlabelled datasets — appropriate for our early-stage claim volume.

### 3. Predictive Risk Alerts

- Polls OpenWeatherMap 7-day forecast API daily for each active worker's pincode
- If forecast shows high-risk conditions in the next 48 hours, sends a push notification to uninsured workers in that zone: *"Heavy rain forecast for Tambaram this Thursday. Get covered today for ₹84."*
- For insured workers: *"High risk week ahead — your policy is active. You're covered."*
- This drives both conversions and retention, while genuinely helping workers plan their week

---

## 🛠️ Tech Stack

We chose this stack based on what is right for the problem — not just what we already knew. Every technology choice reflects a deliberate decision about performance, scalability, and fit for a real production insurance platform.

**Phase 1 Prototype**

The Phase 1 interactive prototype is built as a single self-contained HTML file to enable rapid demonstration and evaluation without any setup or server requirements. It runs offline by simply opening the file in any browser on any device.

| Layer | Technology | Why |
|-------|-----------|-----|
| UI Framework | **React 18 (CDN)** | Component architecture for real-time dashboard updates; loaded via unpkg CDN — no build step needed |
| Styling | **Tailwind CSS (CDN)** | Utility-first, mobile-first, production-grade UI without custom CSS overhead |
| Animations | **Framer Motion (CDN)** | Smooth transitions and micro-interactions throughout the onboarding and dashboard flows |
| Charts | **Recharts (CDN)** | Weekly earnings vs protected income area chart on the dashboard |
| Icons | **Lucide React (CDN)** | Consistent icon set across all UI components |
| JSX compilation | **Babel Standalone (CDN)** | Compiles JSX in-browser — enables React without a build tool |
| State persistence | **localStorage** | Worker profile and policy state persists across page refreshes |
| Data | **Simulated / hardcoded** | All weather, claims, and API data is mocked in-browser for demo purposes |

**Phase 2 Production Build**

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | **React.js 18** | Component architecture handles real-time dashboard updates cleanly; industry standard for dynamic web apps |
| Styling | **Tailwind CSS** | Utility-first, mobile-first, fast to build production-grade UI without custom CSS overhead |
| Backend | **Python + FastAPI** | Async-first, high performance, auto-generates Swagger API docs, production-ready Python framework |
| Database | **Firebase Firestore** | Real-time listeners for live trigger updates, flexible schema for variable worker profiles, generous free tier |
| Authentication | **Firebase Auth** | Phone number OTP login — no password needed, accessible for all literacy levels |
| Weather Data | **OpenWeatherMap API** | Real-time and historical weather by pincode, well-documented, free tier supports our build volume |
| AQI Data | **WAQI API** | City-zone air quality index, free, reliable |
| Payments | **Razorpay Test Mode** | Indian payment gateway, UPI support, clean sandbox environment for demo |
| ML | **Python scikit-learn** | Linear Regression (premium), Isolation Forest (fraud detection), lightweight, fits FastAPI backend |
| Hosting | **Vercel** (frontend) + **Railway** (backend) | Production-grade free tiers, GitHub-connected CI/CD, auto-deploy on push |
| Version Control | **GitHub** | Public repo, clean branch structure, transparent development history |

**Why React (both prototype and production):**
StreetGuard's dashboard requires real-time state updates — live trigger status changes, claim progress tracking, live zone monitoring. React's component state model and re-rendering handles this natively. In the prototype, React runs via CDN with Babel Standalone for in-browser JSX compilation, making the file fully portable. In production, it will be bundled with a standard build pipeline (Vite/CRA).

**Why FastAPI over Flask (production):**
FastAPI is async by default, meaning our 30-minute trigger polling loop, API calls to OpenWeatherMap, and claim processing pipeline can all run concurrently without blocking. It also auto-generates interactive Swagger documentation, making our API transparent, testable, and judge-readable. Flask is synchronous by default and would require additional libraries to achieve the same.

**Why Firebase Firestore (production):**
Our trigger monitoring system needs to push real-time updates to worker dashboards the moment a claim is initiated. Firestore's real-time listeners make this possible without polling from the frontend. A traditional SQL database would require a separate WebSocket layer to achieve the same.

---

## 🏗️ System Architecture

The frontend is a React app hosted on Vercel. It communicates with our FastAPI backend on Railway through REST APIs. The backend is where all the real work happens — trigger monitoring, claim processing, fraud detection, and payment disbursement. Firebase Firestore stores all worker profiles, policies, and claim records and pushes real-time updates to the frontend the moment a claim is triggered. Firebase Auth handles phone number OTP login so workers don't need a password. Our ML models run as Python modules inside the backend. All external API calls — OpenWeatherMap, WAQI, and Razorpay — go through the backend only, never directly from the frontend.

**How a claim works end to end:**

The backend polls OpenWeatherMap every 30 minutes for every active worker's pincode. The moment a threshold is crossed — say rainfall exceeds 20mm/hr in Tambaram — the trigger monitor identifies all active policies in that zone, creates claim records in Firestore, and runs them through the fraud detection model. Clean claims go straight to Razorpay for UPI disbursement. Flagged claims go to the admin review queue. The worker gets a push notification either way. The whole process from trigger detection to payout initiation takes under 5 minutes.

---

## 📱 Platform Choice

| Consideration | Our Decision | Reasoning |
|--------------|-------------|-----------|
| Accessibility | Web (browser-based) | No installation needed — works on any Android phone |
| Performance | React PWA-ready | Can be converted to PWA in Phase 3 for offline access and home screen install |
| Device compatibility | Mobile-first responsive | Tailwind ensures clean UI on all screen sizes |
| Demo-ability | Web | Easier to demo to judges without device dependencies |
| Build timeline | Web | Faster iteration cycle vs native mobile in a 6-week sprint |

---

## 📁 Repository Structure

The repo is split into four main folders. The `frontend` folder is our React + Tailwind project — components, pages, services, and utilities all have their own subfolders so the codebase stays clean as we build. The `backend` folder is our FastAPI app, organised into routers (API endpoints), services (business logic like trigger monitoring and claim processing), ml (our scikit-learn models), and models (Pydantic data schemas). The `ml` folder holds our Jupyter notebooks for training the premium calculation and fraud detection models separately from the backend code. The `docs` folder contains our persona document, wireframes, and architecture notes.

We set this structure up in Phase 1 deliberately — so that when Phase 2 build starts, every team member knows exactly where their work lives and there's no confusion about where files go.
---

## 🗓️ Development Plan

### Phase 1 — Seed (March 4–20) ✅ Completed
Research, persona development, system design, tech stack finalization, README, wireframes, 2-minute demo video.

**Deliverables:** README.md in GitHub repo + 2-minute video

### Phase 2 — Scale (March 21–April 4) ✅ Completed

**Deliverables:** Working MVP + 2-minute demo video

**What we built:**
- React 18 + Tailwind CSS frontend — all screens fully functional
- FastAPI backend with OpenWeatherMap + WAQI API integration
- 30-minute trigger monitoring loop
- Automatic claim initiation on threshold crossing
- Razorpay test mode UPI payout flow
- scikit-learn ML premium calculation model
- Isolation Forest fraud detection model
- Firebase Firestore — workers, policies, claims collections
- Firebase Auth — phone number OTP login
- Weather-adaptive dashboard — background shifts with live conditions
- Loss simulation dashboard — personalised to worker zone and earnings
- Admin dashboard with manual trigger and live claim management
- Frontend deployed to Vercel
- Backend deployed to Railway

**Week 1 (March 21–27):**
- React project scaffold + Tailwind setup
- Firebase Firestore schema design
- FastAPI project setup + base routes
- Worker registration and onboarding flow
- Premium calculator (rule-based)

**Week 2 (March 28–April 4):**
- OpenWeatherMap API integration
- 30-minute trigger monitoring loop
- Automatic claim initiation logic
- Razorpay test mode UPI payout flow
- Loss simulation dashboard
- Basic fraud detection layer
- Worker dashboard with live zone monitoring

**Deliverables:** Working MVP + 2-minute demo video

### Phase 3 — Soar (April 5–17)
- scikit-learn ML model for premium calculation
- Isolation Forest fraud detection upgrade
- Predictive risk alert system
- PWA conversion for offline access
- Full end-to-end demo with real payout simulation
- Admin dashboard with live claim management
- Final polish + DemoJam pitch deck

**Deliverables:** Final product + pitch presentation

---

## 👥 Team — Code4ce

Team Code4ce operates as a full-stack collaborative unit. All four members contribute across research, development, testing, and content throughout every phase. The table below reflects each member's primary focus area — not exclusive ownership.

| Name | Primary Focus |
|------|--------------|
| **Srinidhi R** | Product strategy, persona research & documentation |
| **Panbarasi S** | Frontend & UI development |
| **Aakas D R** | Backend, Firebase & AI/ML |
| **Dharshini S S** | API integration, testing & content |

---

## 📚 References

1. [Zomato vs Swiggy Delivery Partner Earnings — CollegeSearch India](https://www.collegesearch.in/articles/zomato-delivery-boy-salary-vs-swiggy-delivery-boy-salary-inhand-earnings-per-month)
2. [Gig Work and Climate Risk — Mongabay India](https://india.mongabay.com/2025/08/gig-work-heats-up-disaster-body-steps-in-with-advisory/)
3. [Fairwork India Report 2024 — Platform Worker Conditions](https://fair.work/wp-content/uploads/sites/17/2024/10/Fairwork_India_Report_2024.pdf)
4. [India's Booming Gig and Platform Economy — NITI Aayog](https://www.niti.gov.in/sites/default/files/2023-06/Policy_Brief_India's_Booming_Gig_and_Platform_Economy_27062022.pdf)
5. [Gig Worker Income and Disruption Patterns — JETIR](https://www.jetir.org/papers/JETIR2404421.pdf)

---

*Built with purpose by Team Code4ce for Guidewire DEVTrails 2026*
*Seed → Scale → Soar*
