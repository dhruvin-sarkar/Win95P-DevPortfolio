import React, { useState, useRef, useEffect } from 'react';

const AddressBar = ({ currentUrl, onNavigate, isLoading }) => {
  const [url, setUrl] = useState(currentUrl);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setUrl(currentUrl);
  }, [currentUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onNavigate(url.trim());
      setShowSuggestions(false);
    }
  };

  const handleChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    // Generate suggestions (simplified - in real app would use history/favorites)
    if (newUrl.length > 2) {
      const mockSuggestions = [
        'https://google.com',
        'https://github.com',
        'https://stackoverflow.com',
        'https://youtube.com'
      ].filter(s => s.includes(newUrl.toLowerCase()));
      setSuggestions(mockSuggestions);
      setShowSuggestions(mockSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUrl(suggestion);
    onNavigate(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="ie-address-bar">
      <span className="ie-address-label">Address</span>
      <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
        <input
          ref={inputRef}
          type="text"
          className="ie-address-input"
          value={url}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          placeholder="Enter a web address or search term"
        />
        {isLoading && <div className="ie-loading" />}
        {showSuggestions && (
          <div className="ie-address-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="ie-address-suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="ie-go-button" onClick={handleSubmit}>
        Go
      </button>
    </div>
  );
};

export default AddressBar;
