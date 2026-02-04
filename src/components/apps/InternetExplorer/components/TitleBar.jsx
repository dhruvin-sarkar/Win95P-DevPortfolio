import React from 'react';

const TitleBar = () => {
  return (
    <div className="ie-titlebar">
      <div className="ie-titlebar-text">
        <img 
          src="/assets/ie.png" 
          alt="IE" 
          className="ie-titlebar-icon" 
        />
        <span>Internet Explorer</span>
      </div>
      <div className="ie-titlebar-controls">
        <button 
          className="ie-titlebar-button"
          title="Minimize"
        >
          _
        </button>
        <button 
          className="ie-titlebar-button"
          title="Maximize"
        >
          □
        </button>
        <button 
          className="ie-titlebar-button ie-close-button"
          title="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
