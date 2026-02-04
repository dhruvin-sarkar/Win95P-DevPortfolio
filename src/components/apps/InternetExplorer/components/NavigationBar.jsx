import React from 'react';
import PropTypes from 'prop-types';

const NavigationBar = ({ 
  onBack, 
  onForward, 
  onRefresh, 
  onHome,
  canGoBack,
  canGoForward 
}) => {
  return (
    <div className="ie-navbar">
      <button 
        className="ie-nav-button"
        onClick={onBack}
        disabled={!canGoBack}
        title="Back"
      >
        ◀
      </button>
      <button 
        className="ie-nav-button"
        onClick={onForward}
        disabled={!canGoForward}
        title="Forward"
      >
        ▶
      </button>
      <div className="ie-nav-separator" />
      <button 
        className="ie-nav-button"
        onClick={onRefresh}
        title="Refresh"
      >
        ⟳
      </button>
      <button 
        className="ie-nav-button"
        onClick={onHome}
        title="Home"
      >
        🏠
      </button>
    </div>
  );
};

NavigationBar.propTypes = {
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onHome: PropTypes.func.isRequired,
  canGoBack: PropTypes.bool,
  canGoForward: PropTypes.bool,
};

export default NavigationBar;
