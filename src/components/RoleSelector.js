import React from 'react';

const RoleSelector = ({ onSelectRole }) => {
  const roles = ['Admin', 'Healthcare Provider', 'Patient'];

  return (
    <div className="role-selector">
      <h2>Select Your Role</h2>
      {roles.map((role) => (
        <button
          key={role}
          className="role-button"
          onClick={() => onSelectRole(role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;
