import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddressBar = ({ url, onUrlChange, onNavigate, isLoading }) => {
  const [inputValue, setInputValue] = useState(url);
  const inputRef = useRef(null);
  
  useEffect(() => {
    setInputValue(url);
  }, [url]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue.trim());
    }
  };
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onUrlChange(e.target.value);
  };
  
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };
  
  return (
    <div className="ie-addressbar">
      <label className="ie-addressbar-label">Address:</label>
      <form onSubmit={handleSubmit} className="ie-addressbar-form">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          className="ie-addressbar-input"
          placeholder="Type a web address"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="ie-addressbar-go"
          disabled={isLoading}
        >
          Go
        </button>
      </form>
    </div>
  );
};

AddressBar.propTypes = {
  url: PropTypes.string.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default AddressBar;
