import React, { useState } from 'react';
import RoleSelector from '../components/RoleSelector';
import Dashboard from '../components/Dashboard';

const App = () => {
  const [role, setRole] = useState(null);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="app-container">
      {!role ? (
        <RoleSelector onSelectRole={handleRoleSelect} />
      ) : (
        <Dashboard role={role} />
      )}
    </div>
  );
};

export default App;
