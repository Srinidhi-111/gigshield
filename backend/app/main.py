from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import os
import requests
from dotenv import load_dotenv
from app.ml.premium_model import predict_premium
from app.ml.fraud_detection import detect_fraud

load_dotenv()

app = FastAPI(title="GigShield API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://srinidhi-111.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENWEATHER_KEY = os.getenv("OPENWEATHER_KEY", "demo")
WAQI_KEY = os.getenv("WAQI_KEY", "demo")

# ── MODELS ──────────────────────────────────────────────
class WorkerCreate(BaseModel):
    name: str
    phone: str
    platform: str
    city: str
    zone: str
    daily_hours: float
    weekly_earnings: float

class ClaimCreate(BaseModel):
    worker_id: str
    policy_id: str
    trigger_type: str
    trigger_value: float
    zone: str

# ── ROUTES ──────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "GigShield API is running", "version": "2.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Weather
@app.get("/weather/{city}")
def get_weather(city: str = "Chennai"):
    try:
        r = requests.get(
            f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_KEY}&units=metric",
            timeout=5
        )
        data = r.json()
        rainfall = data.get("rain", {}).get("1h", 0)
        temp = data["main"]["temp"]
        return {
            "city": city,
            "temp": round(temp, 1),
            "rainfall": round(rainfall, 2),
            "humidity": data["main"]["humidity"],
            "description": data["weather"][0]["description"],
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        # Return mock data if API fails
        return {
            "city": city,
            "temp": 38.0,
            "rainfall": 12.0,
            "humidity": 80,
            "description": "moderate rain",
            "timestamp": datetime.now().isoformat(),
            "mock": True
        }
    
@app.get("/premium/ml-calculate")
def ml_calculate_premium(
    zone: str = "Tambaram",
    month: int = 10,
    platform: str = "Swiggy",
    weekly_earnings: float = 4500
):
    zone_scores = {
        "tambaram": 75, "chromepet": 75, "adyar": 75,
        "velachery": 50, "t. nagar": 50, "omr": 50,
        "anna nagar": 25, "porur": 25
    }
    platform_codes = {"swiggy": 1, "zomato": 2, "zepto": 3, "blinkit": 3, "amazon": 3}

    zone_score = zone_scores.get(zone.lower(), 25)
    platform_code = platform_codes.get(platform.lower(), 1)

    premium = predict_premium(zone_score, month, platform_code)
    max_payout = round(weekly_earnings * 0.7)

    return {
        "zone": zone,
        "month": month,
        "platform": platform,
        "ml_premium": premium,
        "max_payout": max_payout,
        "model": "LinearRegression"
    }

@app.get("/fraud/ml-check")
def ml_fraud_check(
    hour_of_day: int = 14,
    days_since_registration: int = 30,
    claims_this_month: int = 1,
    trigger_value: float = 25.0
):
    result = detect_fraud(hour_of_day, days_since_registration, claims_this_month, trigger_value)
    return result

# AQI
@app.get("/aqi/{city}")
def get_aqi(city: str = "Chennai"):
    try:
        r = requests.get(
            f"https://api.waqi.info/feed/{city}/?token={WAQI_KEY}",
            timeout=5
        )
        data = r.json()
        aqi = data["data"]["aqi"]
        return {
            "city": city,
            "aqi": aqi,
            "status": "hazardous" if aqi > 300 else "very_unhealthy" if aqi > 200 else "unhealthy" if aqi > 150 else "moderate" if aqi > 100 else "good",
            "timestamp": datetime.now().isoformat()
        }
    except:
        return {"city": city, "aqi": 150, "status": "moderate", "mock": True}

# Trigger check
@app.get("/triggers/check/{zone}")
def check_triggers(zone: str):
    weather = get_weather("Chennai")
    aqi_data = get_aqi("Chennai")

    triggers = []

    if weather["rainfall"] > 20:
        triggers.append({
            "type": "heavy_rain",
            "value": weather["rainfall"],
            "threshold": 20,
            "payout_percent": 50,
            "description": f"Rainfall {weather['rainfall']}mm/hr exceeds 20mm/hr threshold"
        })

    if weather["temp"] > 43:
        triggers.append({
            "type": "extreme_heat",
            "value": weather["temp"],
            "threshold": 43,
            "payout_percent": 30,
            "description": f"Temperature {weather['temp']}°C exceeds 43°C threshold"
        })

    if aqi_data["aqi"] > 300:
        triggers.append({
            "type": "severe_aqi",
            "value": aqi_data["aqi"],
            "threshold": 300,
            "payout_percent": 40,
            "description": f"AQI {aqi_data['aqi']} exceeds 300 threshold"
        })

    return {
        "zone": zone,
        "triggers": triggers,
        "triggered": len(triggers) > 0,
        "weather": weather,
        "aqi": aqi_data,
        "timestamp": datetime.now().isoformat()
    }

# Premium calculator
@app.get("/premium/calculate")
def calculate_premium(
    zone: str = "Tambaram",
    season: str = "monsoon",
    weekly_earnings: float = 4500
):
    base = 49

    zone_adjustments = {
        "tambaram": 25, "chromepet": 25, "adyar": 25,
        "velachery": 15, "t. nagar": 15, "omr": 15,
        "anna nagar": 0, "porur": 0
    }

    season_adjustments = {
        "monsoon": 10, "summer": 5, "normal": 0
    }

    zone_adj = zone_adjustments.get(zone.lower(), 0)
    season_adj = season_adjustments.get(season.lower(), 0)
    total = base + zone_adj + season_adj
    max_payout = round(weekly_earnings * 0.7)

    return {
        "zone": zone,
        "season": season,
        "base": base,
        "zone_adjustment": zone_adj,
        "seasonal_adjustment": season_adj,
        "weekly_premium": total,
        "max_weekly_payout": max_payout,
        "coverage_rate": 0.7,
        "ratio": round(max_payout / total, 1)
    }

# Fraud detection
@app.post("/fraud/check")
def check_fraud(claim: ClaimCreate):
    fraud_score = 0
    flags = []

    # Check 1: Very high payout claim
    if claim.trigger_value > 50:
        fraud_score += 10
        flags.append("Unusually high trigger value")

    # Check 2: Mock location check
    if claim.zone.lower() not in ["tambaram", "adyar", "velachery", "t. nagar", "chromepet", "anna nagar", "omr", "porur"]:
        fraud_score += 30
        flags.append("Zone not in supported list")

    is_fraudulent = fraud_score >= 30

    return {
        "worker_id": claim.worker_id,
        "fraud_score": fraud_score,
        "is_fraudulent": is_fraudulent,
        "flags": flags,
        "decision": "reject" if is_fraudulent else "approve",
        "timestamp": datetime.now().isoformat()
    }

# Payout simulation (Razorpay test mode)
@app.post("/payout/initiate")
def initiate_payout(worker_id: str, amount: float, upi_id: str = "test@upi"):
    # In test mode - simulates payout
    return {
        "worker_id": worker_id,
        "amount": amount,
        "upi_id": upi_id,
        "status": "processing",
        "reference_id": f"GS-PAY-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "estimated_time": "2 hours",
        "timestamp": datetime.now().isoformat()
    }

# Loss simulation data
@app.get("/simulation/{zone}")
def get_simulation_data(zone: str, weekly_earnings: float = 4500):
    disruption_data = {
        "tambaram": {"days": 14, "months": [8, 4, 10, 6, 3, 7]},
        "adyar": {"days": 12, "months": [7, 4, 9, 6, 3, 6]},
        "velachery": {"days": 11, "months": [6, 3, 8, 5, 2, 6]},
        "t. nagar": {"days": 10, "months": [6, 3, 8, 5, 2, 5]},
        "chromepet": {"days": 13, "months": [7, 4, 9, 6, 3, 7]},
        "anna nagar": {"days": 8, "months": [5, 2, 7, 4, 2, 4]},
    }

    data = disruption_data.get(zone.lower(), disruption_data["tambaram"])
    daily_earning = weekly_earnings / 6
    total_lost = round(daily_earning * data["days"])
    would_pay = round(total_lost * 0.72)
    total_premium = 84 * 24
    net_benefit = would_pay - total_premium

    return {
        "zone": zone,
        "disruption_days": data["days"],
        "monthly_data": data["months"],
        "estimated_loss": total_lost,
        "gigshield_payout": would_pay,
        "total_premium_6months": total_premium,
        "net_benefit": net_benefit,
        "months": ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    }