import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css'; // Import the CSS file

function AdminPanel() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-panel">
      <h1 className="panel-title">Admin Panel</h1>
      <div className="panel-content">
        <div className="panel-option">
          <h2>View Reports</h2>
          <p>Access and review detailed reports.</p>
          <button className="panel-button" onClick={() => handleNavigate('/admin-reports')}>Go to Reports</button>
        </div>
        <div className="panel-option">
          <h2>Upload Documents</h2>
          <p>Upload and manage important documents.</p>
          <button className="panel-button" onClick={() => handleNavigate('/file-upload')}>Upload Documents</button>
        </div>
        <div className="panel-option">
          <h2>Manage Users</h2>
          <p>View and manage user accounts.</p>
          <button className="panel-button" onClick={() => handleNavigate('/manage-users')}>Manage Users</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
