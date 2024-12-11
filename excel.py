import pandas as pd
import random

# Generate mock data
data = {
    "Age": [random.randint(18, 80) for _ in range(100)],
    "Gender": [random.choice(["Male", "Female"]) for _ in range(100)],
    "BloodPressure": [random.randint(90, 160) for _ in range(100)],  # Systolic values
    "Cholesterol": [random.randint(150, 300) for _ in range(100)],
    "BloodSugar": [random.choice([70, 100, 140, 180]) for _ in range(100)],  # Fasting levels
    "BMI": [round(random.uniform(18.5, 35.0), 1) for _ in range(100)],
    "SmokingHistory": [random.choice(["Never", "Former", "Current"]) for _ in range(100)],
    "AlcoholConsumption": [random.choice(["None", "Moderate", "Excessive"]) for _ in range(100)],
    "PhysicalActivity": [random.choice(["Low", "Moderate", "High"]) for _ in range(100)],
}

# Create a DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("health_data.csv", index=False)

print("health_data.csv created successfully!")
