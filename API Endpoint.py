from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the trained model
try:
    model = joblib.load("predictive_model.pkl")  # Ensure this path is correct
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict_health_risk():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    # Get input data from the request
    try:
        input_data = request.json['data']
        prediction = model.predict([input_data])
        return jsonify({"risk": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
