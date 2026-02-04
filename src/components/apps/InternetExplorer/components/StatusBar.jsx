import React from 'react';

const StatusBar = ({ status, url, secureConnection, loadProgress = 0 }) => {
  return (
    <div className="ie-status-bar">
      <div className="ie-status-text">
        {status}
        {loadProgress > 0 && loadProgress < 100 && (
          <div className="ie-status-progress">
            <div 
              className="ie-status-progress-bar" 
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="ie-status-zone">
        {secureConnection ? '🔒' : '🌐'} Internet
      </div>
      
      <div className="ie-status-zone">
        {secureConnection ? 'Secure' : 'Restricted'}
      </div>
    </div>
  );
};

export default StatusBar;
