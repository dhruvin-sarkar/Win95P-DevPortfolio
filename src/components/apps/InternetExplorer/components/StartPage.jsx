import React from 'react';
import PropTypes from 'prop-types';

const StartPage = ({ onNavigate, sites }) => {
  return (
    <div className="ie-startpage">
      <div className="ie-startpage-header">
        <img 
          src="/assets/ie.png" 
          alt="IE" 
          className="ie-startpage-icon"
        />
        <h1>Welcome to Internet Explorer</h1>
        <p className="ie-startpage-subtitle">
          A nostalgic browser experience for the modern web
        </p>
      </div>

      <div className="ie-startpage-section">
        <h2>🌐 Sites You Can Visit</h2>
        <p>These sites allow iframe embedding and will work perfectly:</p>
        <div className="ie-sitelist">
          {sites.map((site) => (
            <button
              key={site.url}
              onClick={() => onNavigate(site.url)}
              className="ie-site-button"
            >
              <div className="ie-site-name">{site.name}</div>
              <div className="ie-site-url">{site.url}</div>
              {site.description && (
                <div className="ie-site-description">{site.description}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="ie-startpage-section">
        <h2>ℹ️ About This Browser</h2>
        <p>
          This is a recreation of Windows 95 Internet Explorer. Due to modern 
          web security (X-Frame-Options, CSP headers), many sites cannot be 
          embedded in iframes. Sites like Google, Facebook, and Twitter will 
          show an error - this is intentional security designed to prevent 
          clickjacking attacks.
        </p>
      </div>

      <div className="ie-startpage-section">
        <h2>🔒 Why Some Sites Don't Work</h2>
        <ul className="ie-info-list">
          <li>
            <strong>Security Headers:</strong> Sites send <code>X-Frame-Options: DENY</code> to prevent embedding
          </li>
          <li>
            <strong>Clickjacking Protection:</strong> Prevents malicious sites from hiding your content
          </li>
          <li>
            <strong>Same-Origin Policy:</strong> Browser security prevents cross-origin access
          </li>
        </ul>
        <p>
          When you encounter a blocked site, you can always open it in a new tab!
        </p>
      </div>
    </div>
  );
};

StartPage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  sites: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
};

export default StartPage;
