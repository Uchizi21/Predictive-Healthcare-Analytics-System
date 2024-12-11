import React from 'react';
import IoTData from './IoTData';
import PredictiveAnalytics from './PredictiveAnalytics';

const Dashboard = ({ role }) => {
  return (
    <div className="dashboard">
      <h1>Welcome, {role}</h1>
      {role === 'Admin' && <p>Manage user accounts and system performance.</p>}
      {role === 'Healthcare Provider' && (
        <>
          <IoTData />
          <PredictiveAnalytics />
        </>
      )}
      {role === 'Patient' && (
        <p>View your health data, medication alerts, and reports here.</p>
      )}
    </div>
  );
};

export default Dashboard;
