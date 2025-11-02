import React from 'react';

const Header = ({ onViewChange, currentView }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>ChatBI</h1>
          <span>Business Intelligence Dashboard</span>
        </div>

        <nav className="nav">
          <button
            className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onViewChange('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`nav-button ${currentView === 'chat' ? 'active' : ''}`}
            onClick={() => onViewChange('chat')}
          >
            Chat
          </button>
        </nav>

        <div className="user-actions">
          <button className="btn btn-secondary">Settings</button>
          <button className="btn btn-secondary">Profile</button>
        </div>
      </div>
    </header>
  );
};

export default Header;