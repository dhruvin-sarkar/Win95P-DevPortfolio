import React, { useState, useRef, useEffect } from 'react';

const AddressBar = ({ currentUrl, onNavigate, isLoading }) => {
  const [inputValue, setInputValue] = useState(currentUrl);
  const inputRef = useRef(null);

  // Sync input value when currentUrl changes from navigation
  useEffect(() => {
    setInputValue(currentUrl);
  }, [currentUrl]);

  // Handle input change - CRITICAL: Must allow typing
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Enter key press to navigate
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNavigate();
    }
  };

  // Handle navigation button click
  const handleNavigate = () => {
    if (inputValue.trim()) {
      onNavigate(inputValue.trim());
    }
  };

  // Handle input focus
  const handleFocus = () => {
    inputRef.current?.select(); // Select all text on focus
  };

  return (
    <div className="ie-address-bar">
      <span className="ie-address-label">Address</span>
      
      <div className="ie-address-input-container">
        <input
          ref={inputRef}
          type="text"
          className="ie-address-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder="Enter URL here..."
          disabled={isLoading}
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      <button 
        className="ie-go-button"
        onClick={handleNavigate}
        disabled={isLoading || !inputValue.trim()}
      >
        Go
      </button>

      {isLoading && <div className="ie-loading-indicator">⏳</div>}
    </div>
  );
};

export default AddressBar;
