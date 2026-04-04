import numpy as np
from sklearn.ensemble import IsolationForest

# Normal claim patterns for training
# Features: [hour_of_day, days_since_registration, claims_this_month, trigger_value]
X_normal = np.array([
    [14, 30, 1, 25],   # afternoon, registered 30 days ago, 1 claim, 25mm rain
    [16, 45, 2, 30],
    [11, 60, 1, 22],
    [15, 90, 3, 28],
    [13, 120, 2, 35],
    [17, 200, 4, 21],
    [10, 180, 1, 24],
    [14, 365, 5, 32],
    [15, 400, 2, 27],
    [12, 250, 3, 29],
])

model = IsolationForest(contamination=0.1, random_state=42)
model.fit(X_normal)

def detect_fraud(
    hour_of_day: int,
    days_since_registration: int,
    claims_this_month: int,
    trigger_value: float
) -> dict:
    X = np.array([[hour_of_day, days_since_registration, claims_this_month, trigger_value]])
    prediction = model.predict(X)[0]
    score = model.score_samples(X)[0]

    is_anomaly = prediction == -1

    flags = []
    if days_since_registration < 3:
        flags.append("Account registered very recently")
    if claims_this_month > 8:
        flags.append("Unusually high claim frequency")
    if hour_of_day < 6 or hour_of_day > 22:
        flags.append("Claim at unusual hour")

    return {
        "is_anomaly": is_anomaly,
        "anomaly_score": round(float(score), 3),
        "flags": flags,
        "recommendation": "manual_review" if is_anomaly else "auto_approve"
    }