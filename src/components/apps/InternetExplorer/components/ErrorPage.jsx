import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({ error, onNavigate, onOpenNewTab }) => {
  return (
    <div className="ie-errorpage">
      <div className="ie-error-icon">⚠️</div>
      
      <h2 className="ie-error-title">{error.message}</h2>
      
      <p className="ie-error-reason">{error.reason}</p>
      
      <div className="ie-error-details">
        <p><strong>URL:</strong> <code>{error.url}</code></p>
        <p><strong>Technical Details:</strong></p>
        <div className="ie-error-technical">
          This site sent a <code>X-Frame-Options: DENY</code> or{' '}
          <code>Content-Security-Policy: frame-ancestors 'none'</code> header, 
          which instructs browsers not to display the content in an iframe.
          This is a security feature to prevent clickjacking attacks.
        </div>
      </div>

      <div className="ie-error-actions">
        <button 
          onClick={onOpenNewTab} 
          className="ie-error-button-primary"
        >
          🔗 Open in New Tab
        </button>
        <button 
          onClick={() => onNavigate('about:start')} 
          className="ie-error-button"
        >
          🏠 Back to Start Page
        </button>
      </div>

      <div className="ie-error-suggestions">
        <h3>Sites That Will Work:</h3>
        <ul>
          <li>Example.com</li>
          <li>Wikipedia.org</li>
          <li>CodePen.io</li>
          <li>JSFiddle.net</li>
          <li>Mozilla.org</li>
          <li>Most personal blogs and static sites</li>
        </ul>
      </div>
      
      <div className="ie-error-footer">
        <p>
          💡 <strong>Tip:</strong> This limitation affects all browser-in-browser 
          implementations, not just this one. It's a fundamental web security feature.
        </p>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.shape({
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
  onOpenNewTab: PropTypes.func.isRequired,
};

export default ErrorPage;
