import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Sample data (Replace this with your actual dataset)
data = {
    'age': [25, 30, 35, 40, 45],
    'bmi': [22.5, 25.5, 28.0, 30.2, 33.5],
    'bloodPressure': [120, 130, 135, 140, 145],
    'cholesterol': [200, 210, 215, 220, 230],
    'bloodSugar': [90, 95, 100, 105, 110],
    'physicalActivity': [1, 1, 0, 0, 1],  # 1 = Active, 0 = Inactive
    'target': [0, 1, 1, 0, 1]  # For example, health risk factor
}

# Create DataFrame
df = pd.DataFrame(data)

# Feature columns and target variable
X = df.drop(columns=['target'])  # Features
y = df['target']  # Target variable

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train a RandomForest model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse}")

# Save the model
joblib.dump(model, "predictive_model.pkl")
print("Model saved successfully.")
