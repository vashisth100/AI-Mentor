import './Dashboard.css';

function Dashboard({ onLogout }) {

  const token = localStorage.getItem('token');

  const payload = JSON.parse(atob(token.split('.')[1]));

  return (
    <div className="dashboard-card">

      <div className="dashboard-header">
        <h2>🎉 You're logged in!</h2>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-body">
        <p className="welcome">Welcome back!</p>
        <div className="info-box">
          <p><span>User ID:</span> {payload.id}</p>
          <p><span>Token expires:</span> {new Date(payload.exp * 1000).toLocaleTimeString()}</p>
        </div>
        <p className="protected-note">
          🔒 This page is protected — only visible with a valid token.
        </p>
      </div>

    </div>
  );
}

export default Dashboard;