import React from 'react';

const Toolbar = ({ 
  onBack, 
  onForward, 
  onStop, 
  onRefresh, 
  onHome, 
  onShowFavorites, 
  onShowHistory,
  canGoBack,
  canGoForward,
  isLoading 
}) => {
  return (
    <div className="ie-toolbar">
      <button
        className="ie-toolbar-button"
        onClick={onBack}
        disabled={!canGoBack}
        title="Back"
      >
        ◀
      </button>
      
      <button
        className="ie-toolbar-button"
        onClick={onForward}
        disabled={!canGoForward}
        title="Forward"
      >
        ▶
      </button>
      
      <button
        className="ie-toolbar-button"
        onClick={onStop}
        disabled={!isLoading}
        title="Stop"
      >
        ■
      </button>
      
      <button
        className="ie-toolbar-button"
        onClick={onRefresh}
        title="Refresh"
      >
        ↻
      </button>
      
      <button
        className="ie-toolbar-button"
        onClick={onHome}
        title="Home"
      >
        🏠
      </button>
      
      <div className="ie-toolbar-separator"></div>
      
      <button
        className="ie-toolbar-button"
        onClick={onShowFavorites}
        title="Favorites"
      >
        ★
      </button>
      
      <button
        className="ie-toolbar-button"
        onClick={onShowHistory}
        title="History"
      >
        🕐
      </button>
      
      <div className="ie-toolbar-separator"></div>
      
      <button
        className="ie-toolbar-button"
        title="Mail"
      >
        ✉
      </button>
      
      <button
        className="ie-toolbar-button"
        title="Print"
      >
        🖨
      </button>
      
      <div className="ie-toolbar-separator"></div>
      
      <button
        className="ie-toolbar-button"
        title="Edit"
      >
        ✏
      </button>
    </div>
  );
};

export default Toolbar;
