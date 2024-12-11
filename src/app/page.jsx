"use client";
import React, {useState} from "react";

function MainComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New health report available", read: false },
    { id: 2, message: "Upcoming appointment tomorrow", read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientData, setPatientData] = useState({
    age: "",
    gender: "",
    bloodPressure: "",
    cholesterol: "",
    bloodSugar: "",
    bmi: "",
    smokingHistory: "",
    alcoholConsumption: "",
    physicalActivity: "",
  });
  const [iotData, setIotData] = useState({
    glucometer: null,
    bloodPressure: null,
    heartRate: null,
    temperature: null,
    oxygenLevel: null,
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const mockUsers = {
    "admin@phas.com": {
      password: "admin123",
      role: "admin",
      name: "Admin User",
    },
    "doctor@phas.com": {
      password: "doctor123",
      role: "healthcare",
      name: "Dr. Smith",
    },
    "patient@phas.com": {
      password: "patient123",
      role: "patient",
      name: "John Doe",
    },
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const user = mockUsers[email];
    if (user && user.password === password && user.role === role) {
      setIsLoggedIn(true);
      setUserData(user);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };
  const updateHealthStatus = (status) => {
    if (userData && userData.role === "patient") {
      setUserData((prev) => ({ ...prev, healthStatus: status }));
      mockUsers[email] = { ...mockUsers[email], healthStatus: status };
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (mockUsers[email]) {
      setError("Email already exists");
      return;
    }
    mockUsers[email] = {
      password,
      role: "patient",
      name,
      healthStatus: "Low",
    };
    setIsLoggedIn(true);
    setUserData(mockUsers[email]);
    setError("");
  };
  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handlePrediction = () => {
    const riskFactors = {
      age: parseInt(patientData.age),
      bloodPressure: parseInt(patientData.bloodPressure),
      cholesterol: parseInt(patientData.cholesterol),
      bmi: parseFloat(patientData.bmi),
    };
    let riskScore = 0;
    if (riskFactors.age > 50) riskScore += 2;
    if (riskFactors.bloodPressure > 140) riskScore += 3;
    if (riskFactors.cholesterol > 200) riskScore += 2;
    if (riskFactors.bmi > 30) riskScore += 2;
    if (patientData.smokingHistory === "yes") riskScore += 3;
    if (patientData.alcoholConsumption === "high") riskScore += 2;
    if (patientData.physicalActivity === "low") riskScore += 2;

    let risk = "Low";
    if (riskScore > 8) risk = "High";
    else if (riskScore > 5) risk = "Moderate";

    setPredictionResult({
      risk,
      score: riskScore,
      details: `Based on the provided information, the patient has a ${risk.toLowerCase()} risk of developing chronic diseases.`,
    });
    updateHealthStatus(risk);
  };

  const handleIoTDataInput = (device, value) => {
    setIotData((prev) => ({
      ...prev,
      [device]: value,
    }));

    if (device === "glucometer" && value > 200) {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: "High blood sugar detected! Consider taking insulin.",
          read: false,
        },
      ]);
    }

    if (device === "bloodPressure" && value.systolic > 140) {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: "High blood pressure detected! Take prescribed medication.",
          read: false,
        },
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const AdminDashboard = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 font-roboto text-[#333]">
        Admin Dashboard
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">User Management</h3>
          <div className="mt-2">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span>Total Users: 156</span>
              <span className="text-green-500">↑12% this month</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
              <div className="bg-blue-50 p-2 rounded">Patients: 120</div>
              <div className="bg-green-50 p-2 rounded">Doctors: 30</div>
              <div className="bg-purple-50 p-2 rounded">Admins: 6</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">System Performance</h3>
          <div className="mt-2">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span>Server Uptime: 99.9%</span>
              <span className="text-green-500">Normal</span>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>45%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>62%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Compliance Reports</h3>
          <div className="mt-2">
            <div className="space-y-2">
              <div className="bg-white p-2 rounded flex justify-between items-center">
                <span>HIPAA Compliance</span>
                <span className="text-green-500">Passed</span>
              </div>
              <div className="bg-white p-2 rounded flex justify-between items-center">
                <span>Data Security Audit</span>
                <span className="text-yellow-500">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HealthcareDashboard = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 font-roboto text-[#333]">
        Healthcare Provider Dashboard
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Patient Records</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between">
                <span>John Smith</span>
                <span className="text-red-500">High Risk</span>
              </div>
              <div className="text-sm text-gray-500">
                Last Check: 2 hours ago
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between">
                <span>Mary Johnson</span>
                <span className="text-green-500">Stable</span>
              </div>
              <div className="text-sm text-gray-500">
                Last Check: 5 hours ago
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Alert Settings</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-2 rounded flex justify-between items-center">
              <span>Heart Rate {">"} 120 bpm</span>
              <span className="text-red-500">Critical</span>
            </div>
            <div className="bg-white p-2 rounded flex justify-between items-center">
              <span>Blood Pressure {">"} 140/90</span>
              <span className="text-yellow-500">Warning</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Patient Communication</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-2 rounded">
              <div className="flex justify-between">
                <span>Upcoming Appointments</span>
                <span className="text-blue-500">3 Today</span>
              </div>
            </div>
            <div className="bg-white p-2 rounded">
              <div className="flex justify-between">
                <span>Unread Messages</span>
                <span className="text-blue-500">5 New</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Disease Risk Prediction</h3>
          <div className="mt-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Patient
              </label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Choose a patient</option>
                <option value="john">John Smith</option>
                <option value="mary">Mary Johnson</option>
              </select>
            </div>
            {selectedPatient && (
              <button
                onClick={() => setShowPredictionForm(!showPredictionForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {showPredictionForm ? "Hide Form" : "Predict Disease Risk"}
              </button>
            )}
            {showPredictionForm && selectedPatient && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={patientData.age}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <select
                    name="gender"
                    value={patientData.gender}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <input
                    type="number"
                    name="bloodPressure"
                    placeholder="Blood Pressure (systolic)"
                    value={patientData.bloodPressure}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="cholesterol"
                    placeholder="Cholesterol (mg/dL)"
                    value={patientData.cholesterol}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="bloodSugar"
                    placeholder="Blood Sugar (mg/dL)"
                    value={patientData.bloodSugar}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="bmi"
                    placeholder="BMI"
                    value={patientData.bmi}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <select
                    name="smokingHistory"
                    value={patientData.smokingHistory}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Smoking History</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <select
                    name="alcoholConsumption"
                    value={patientData.alcoholConsumption}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Alcohol Consumption</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                  <select
                    name="physicalActivity"
                    value={patientData.physicalActivity}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  >
                    <option value="">Physical Activity Level</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button
                  onClick={handlePrediction}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Calculate Risk
                </button>
                {predictionResult && (
                  <div
                    className={`p-4 rounded ${
                      predictionResult.risk === "High"
                        ? "bg-red-100"
                        : predictionResult.risk === "Moderate"
                        ? "bg-yellow-100"
                        : "bg-green-100"
                    }`}
                  >
                    <h4 className="font-bold mb-2">Risk Assessment Result</h4>
                    <p>{predictionResult.details}</p>
                    <p className="mt-2">
                      Risk Score: {predictionResult.score}/16
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const PatientDashboard = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 font-roboto text-[#333]">
        Patient Dashboard
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Health Status</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <span>Current Health Risk Level</span>
                <span
                  className={`${
                    userData.healthStatus === "High"
                      ? "text-red-500"
                      : userData.healthStatus === "Moderate"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {userData.healthStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">IoT Device Data Input</h3>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Glucometer (mg/dL)
                </label>
                <input
                  type="number"
                  value={iotData.glucometer || ""}
                  onChange={(e) =>
                    handleIoTDataInput("glucometer", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter blood sugar level"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure (systolic)
                </label>
                <input
                  type="number"
                  value={iotData.bloodPressure || ""}
                  onChange={(e) =>
                    handleIoTDataInput("bloodPressure", {
                      systolic: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter systolic pressure"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heart Rate (bpm)
                </label>
                <input
                  type="number"
                  value={iotData.heartRate || ""}
                  onChange={(e) =>
                    handleIoTDataInput("heartRate", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter heart rate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature (°F)
                </label>
                <input
                  type="number"
                  value={iotData.temperature || ""}
                  onChange={(e) =>
                    handleIoTDataInput("temperature", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter body temperature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oxygen Level (%)
                </label>
                <input
                  type="number"
                  value={iotData.oxygenLevel || ""}
                  onChange={(e) =>
                    handleIoTDataInput("oxygenLevel", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Enter oxygen saturation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Input Health Data</h3>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={patientData.age}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <select
                name="gender"
                value={patientData.gender}
                onChange={handleInputChange}
                className="p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="number"
                name="bloodPressure"
                placeholder="Blood Pressure (systolic)"
                value={patientData.bloodPressure}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="cholesterol"
                placeholder="Cholesterol (mg/dL)"
                value={patientData.cholesterol}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="bloodSugar"
                placeholder="Blood Sugar (mg/dL)"
                value={patientData.bloodSugar}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="bmi"
                placeholder="BMI"
                value={patientData.bmi}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <select
                name="smokingHistory"
                value={patientData.smokingHistory}
                onChange={handleInputChange}
                className="p-2 border rounded"
              >
                <option value="">Smoking History</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <select
                name="alcoholConsumption"
                value={patientData.alcoholConsumption}
                onChange={handleInputChange}
                className="p-2 border rounded"
              >
                <option value="">Alcohol Consumption</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
              <select
                name="physicalActivity"
                value={patientData.physicalActivity}
                onChange={handleInputChange}
                className="p-2 border rounded"
              
              >
                <option value="">Physical Activity Level</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              onClick={handlePrediction}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Submit Health Data
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Real-Time Health Monitoring</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <span>Blood Glucose</span>
                <span
                  className={`${
                    iotData.glucometer > 200
                      ? "text-red-500"
                      : iotData.glucometer > 140
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {iotData.glucometer || "--"} mg/dL
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-2">
                <div
                  className={`h-full rounded ${
                    iotData.glucometer > 200
                      ? "bg-red-500"
                      : iotData.glucometer > 140
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (iotData.glucometer / 300) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {iotData.glucometer > 200
                  ? "High - Consider insulin"
                  : iotData.glucometer > 140
                  ? "Elevated"
                  : "Normal range"}
              </p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <span>Blood Pressure</span>
                <span
                  className={`${
                    iotData.bloodPressure?.systolic > 140
                      ? "text-red-500"
                      : iotData.bloodPressure?.systolic > 120
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {iotData.bloodPressure?.systolic || "--"} mmHg
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-2">
                <div
                  className={`h-full rounded ${
                    iotData.bloodPressure?.systolic > 140
                      ? "bg-red-500"
                      : iotData.bloodPressure?.systolic > 120
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (iotData.bloodPressure?.systolic / 180) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {iotData.bloodPressure?.systolic > 140
                  ? "High - Contact doctor"
                  : iotData.bloodPressure?.systolic > 120
                  ? "Pre-hypertensive"
                  : "Normal range"}
              </p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <span>Heart Rate</span>
                <span
                  className={`${
                    iotData.heartRate > 100
                      ? "text-red-500"
                      : iotData.heartRate < 60
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {iotData.heartRate || "--"} bpm
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded mt-2">
                <div
                  className={`h-full rounded ${
                    iotData.heartRate > 100
                      ? "bg-red-500"
                      : iotData.heartRate < 60
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min((iotData.heartRate / 120) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {iotData.heartRate > 100
                  ? "Elevated"
                  : iotData.heartRate < 60
                  ? "Low"
                  : "Normal range"}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Predictive Analysis</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">Risk Assessment</span>
                <span className="text-yellow-500">Moderate Risk</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Based on recent blood pressure trends
              </p>
              <div className="mt-2 text-sm">
                <div className="flex items-center text-yellow-500">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  <span>70% chance of hypertensive episode in next 24h</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium">Recommendations</span>
                <i className="fas fa-pills text-blue-500"></i>
              </div>
              <ul className="mt-2 text-sm space-y-1">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Take blood pressure medication</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>Reduce sodium intake</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>30 minutes of light exercise</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Medication Reminders</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-2 rounded flex justify-between items-center">
              <div>
                <span className="font-medium">Metformin</span>
                <p className="text-sm text-gray-500">500mg - With meals</p>
              </div>
              <span className="text-blue-500">8:00 AM</span>
            </div>
            <div className="bg-white p-2 rounded flex justify-between items-center">
              <div>
                <span className="font-medium">Lisinopril</span>
                <p className="text-sm text-gray-500">10mg - Once daily</p>
              </div>
              <span className="text-blue-500">9:00 PM</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold">Health Reports</h3>
          <div className="mt-2 space-y-2">
            <div className="bg-white p-2 rounded">
              <div className="flex justify-between items-center">
                <span>Weekly Progress</span>
                <span className="text-green-500">↑8%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Blood sugar levels improving
              </p>
            </div>
            <div className="bg-white p-2 rounded">
              <div className="flex justify-between items-center">
                <span>Monthly Summary</span>
                <span className="text-blue-500">View Report</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Exercise goals met: 15/20 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold font-roboto text-blue-600">
                PHAS System
              </h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <i className="fas fa-bell text-gray-600"></i>
                    {notifications.some((n) => !n.read) && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-10">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                            notification.read ? "opacity-50" : ""
                          }`}
                          onClick={() =>
                            markNotificationAsRead(notification.id)
                          }
                        >
                          {notification.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{userData.name}</span>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-6 bg-white rounded-lg shadow-sm">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-6 py-3 ${
                  activeTab === "dashboard"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-3 ${
                  activeTab === "profile"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-6 py-3 ${
                  activeTab === "settings"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Settings
              </button>
            </div>
          </div>

          {activeTab === "dashboard" && (
            <>
              {userData.role === "admin" && <AdminDashboard />}
              {userData.role === "healthcare" && <HealthcareDashboard />}
              {userData.role === "patient" && <PatientDashboard />}
            </>
          )}

          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">{userData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">{email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <p className="mt-1 p-2 bg-gray-50 rounded capitalize">
                    {userData.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive email updates about your account
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Configure
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h3 className="font-medium">Privacy Settings</h3>
                    <p className="text-sm text-gray-500">
                      Manage your privacy preferences
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center font-roboto">
            {isRegistering ? "Register Patient Account" : "Login"}
          </h1>
          {isRegistering ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Register
              </button>
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-500 hover:underline"
                >
                  Login here
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border rounded"
                  name="role"
                >
                  <option value="healthcare">Healthcare Provider</option>
                  <option value="admin">Admin</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
              <p className="text-center text-gray-600 mt-4">
                Need a patient account?{" "}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;