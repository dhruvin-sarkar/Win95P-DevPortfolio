import React, { useRef, useEffect, useState } from 'react';

const BrowserFrame = ({ url, onLoad, onError }) => {
  const iframeRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempted, setLoadAttempted] = useState(false);

  // List of websites known to work in iframes
  const WORKING_SITES = [
    'example.com',
    'mozilla.org',
    'wikipedia.org',
    'w3.org',
    'bing.com',
    'duckduckgo.com',
    'archive.org',
    'weather.gov',
    'nasa.gov'
  ];

  // Check if URL is likely to work in iframe
  const isLikelyToWork = (url) => {
    if (!url || url === 'about:blank') return true;
    return WORKING_SITES.some(site => url.includes(site));
  };

  // CORS proxy options
  const getCorsProxyUrl = (targetUrl) => {
    // Option 1: AllOrigins (free, no setup)
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
  };

  useEffect(() => {
    setLoadError(false);
    setLoadAttempted(false);

    if (!url || url === 'about:blank') {
      return;
    }

    setLoadAttempted(true);

    // Try loading directly first
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }

    // Set timeout to detect if loading fails
    const timeout = setTimeout(() => {
      // If iframe hasn't loaded after 5 seconds, assume it's blocked
      if (!iframeRef.current?.contentDocument) {
        setLoadError(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [url]);

  const handleLoad = () => {
    console.log('Page loaded successfully:', url);
    setLoadError(false);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    console.error('Page load error:', url);
    setLoadError(true);
    if (onError) {
      onError();
    }
  };

  const handleIframeError = () => {
    setLoadError(true);
  };

  // Try loading with CORS proxy
  const tryWithProxy = () => {
    if (iframeRef.current && url && url !== 'about:blank') {
      const proxyUrl = getCorsProxyUrl(url);
      iframeRef.current.src = proxyUrl;
      setLoadError(false);
    }
  };

  // Open in new tab as fallback
  const openInNewTab = () => {
    window.open(url, '_blank');
  };

  // Render different states
  if (url === 'about:blank') {
    return (
      <div className="ie-browser-frame">
        <div className="ie-blank-page">
          <h1>Internet Explorer</h1>
          <p>Enter a URL in the address bar to start browsing.</p>
          <div className="examples">
            Examples: example.com, wikipedia.org, mozilla.org
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="ie-browser-frame">
        <div className="ie-error-page">
          <div className="ie-error-icon">⚠️</div>
          <h2>Cannot Display Page</h2>
          <p className="ie-error-message">
            This website cannot be displayed in Internet Explorer due to security restrictions.
          </p>
          <div className="ie-error-details">
            <p><strong>URL:</strong> {url}</p>
            <p>Many modern websites prevent embedding in other pages for security reasons.</p>
          </div>
          <div className="ie-error-actions">
            <button className="ie-error-button" onClick={tryWithProxy}>
              Try with Proxy
            </button>
            <button className="ie-error-button" onClick={openInNewTab}>
              Open in New Tab
            </button>
            <button className="ie-error-button" onClick={() => window.location.reload()}>
              Reload IE
            </button>
          </div>
          <div className="ie-working-sites">
            <p><strong>Try these sites that work:</strong></p>
            <p>example.com, wikipedia.org, mozilla.org, nasa.gov</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ie-browser-frame">
      <iframe
        ref={iframeRef}
        title="Internet Explorer Browser"
        onLoad={handleLoad}
        onError={handleIframeError}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-downloads"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {loadAttempted && !loadError && (
        <div className="ie-loading-overlay">
          <div className="ie-loading-spinner">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default BrowserFrame;
