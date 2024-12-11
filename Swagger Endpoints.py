from flask import Flask, jsonify
from flask_swagger import swagger

# Initialize the Flask app
app = Flask(__name__)

# Example route
@app.route('/health_data', methods=['GET'])
def get_health_data():
    # Replace with actual logic
    data = {"message": "Health data fetched successfully"}
    return jsonify(data)

# Swagger route
@app.route('/spec', methods=['GET'])
def spec():
    return jsonify(swagger(app))

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000, debug=True)
