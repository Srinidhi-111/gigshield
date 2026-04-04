const BACKEND_URL = 'http://localhost:8000'

export async function getWeather(city = 'Chennai') {
  try {
    const res = await fetch(`${BACKEND_URL}/weather/${city}`)
    return await res.json()
  } catch {
    return { temp: 38, rainfall: 12, description: 'moderate rain', city }
  }
}

export async function getAQI(city = 'Chennai') {
  try {
    const res = await fetch(`${BACKEND_URL}/aqi/${city}`)
    return await res.json()
  } catch {
    return { aqi: 150, status: 'moderate' }
  }
}

export async function checkTriggers(zone = 'Tambaram') {
  try {
    const res = await fetch(`${BACKEND_URL}/triggers/check/${zone}`)
    return await res.json()
  } catch {
    return { triggers: [], triggered: false }
  }
}

export async function calculatePremium(zone, season = 'monsoon', weeklyEarnings = 4500) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/premium/calculate?zone=${zone}&season=${season}&weekly_earnings=${weeklyEarnings}`
    )
    return await res.json()
  } catch {
    return { weekly_premium: 84, max_weekly_payout: 3150 }
  }
}

export async function getSimulationData(zone, weeklyEarnings = 4500) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/simulation/${zone}?weekly_earnings=${weeklyEarnings}`
    )
    return await res.json()
  } catch {
    return null
  }
}

export async function initiatePayout(workerId, amount) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/payout/initiate?worker_id=${workerId}&amount=${amount}`,
      { method: 'POST' }
    )
    return await res.json()
  } catch {
    return { status: 'processing', reference_id: 'GS-PAY-DEMO' }
  }
}