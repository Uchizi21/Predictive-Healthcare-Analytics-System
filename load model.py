import joblib

# Load model
model = joblib.load("predictive_model.pkl")

def predict(data):
    prediction = model.predict([data])
    return prediction
