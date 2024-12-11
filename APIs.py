from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory storage for patient data (use a database in production)
patient_data = {}

# Route to submit patient data (e.g., from a patient form)
@app.route('/submit_health_data', methods=['POST'])
def submit_health_data():
    data = request.json
    patient_name = data.get('name')
    health_data = data.get('health_data')
    
    if not patient_name or not health_data:
        return jsonify({"error": "Invalid input, name and health data are required"}), 400

    # Store data (replace this with database logic)
    patient_data[patient_name] = health_data
    return jsonify({"message": f"Health data for {patient_name} saved successfully"}), 201

# Route for healthcare provider to fetch patient data by name
@app.route('/get_health_data/<string:patient_name>', methods=['GET'])
def get_health_data(patient_name):
    # Fetch data (replace with database query in production)
    health_data = patient_data.get(patient_name)
    if not health_data:
        return jsonify({"error": f"No health data found for {patient_name}"}), 404

    return jsonify({"patient_name": patient_name, "health_data": health_data}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
