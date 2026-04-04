import numpy as np
from sklearn.linear_model import LinearRegression

# Training data — zone risk score, month risk, platform risk → premium
X_train = np.array([
    [75, 10, 1],   # High risk zone, monsoon, Swiggy
    [75, 10, 2],   # High risk zone, monsoon, Zomato
    [50, 5, 1],    # Medium risk zone, summer
    [50, 0, 1],    # Medium risk zone, normal
    [25, 10, 1],   # Low risk zone, monsoon
    [25, 0, 1],    # Low risk zone, normal
    [75, 5, 2],    # High risk zone, summer
    [50, 10, 2],   # Medium risk zone, monsoon
])

y_train = np.array([84, 84, 69, 64, 59, 49, 79, 74])

model = LinearRegression()
model.fit(X_train, y_train)

def predict_premium(zone_risk_score: int, month: int, platform_code: int = 1) -> int:
    """
    zone_risk_score: 0-100 (25=low, 50=medium, 75=high)
    month: 1-12
    platform_code: 1=Swiggy, 2=Zomato, 3=others
    """
    # Convert month to risk level
    monsoon_months = [6, 7, 8, 9, 10, 11]
    summer_months = [4, 5]
    month_risk = 10 if month in monsoon_months else 5 if month in summer_months else 0

    X = np.array([[zone_risk_score, month_risk, platform_code]])
    predicted = model.predict(X)[0]
    return max(49, round(predicted))  # minimum ₹49