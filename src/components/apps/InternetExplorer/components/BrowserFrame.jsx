import React, { useRef, useEffect } from 'react';

const BrowserFrame = React.forwardRef(({ src, onLoad, onError }, ref) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Update iframe src when URL changes
    if (iframeRef.current && src) {
      iframeRef.current.src = src;
    }
  }, [src]);

  const handleLoad = () => {
    console.log('Page loaded:', src);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    console.error('Page load error:', src);
    if (onError) {
      onError();
    }
  };

  return (
    <div className="ie-browser-frame">
      {src === 'about:blank' ? (
        <div className="ie-blank-page">
          <h1>Internet Explorer</h1>
          <p>Enter a URL in the address bar to start browsing.</p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
            Examples: google.com, github.com, example.com
          </p>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={src}
          title="Internet Explorer Browser"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
    </div>
  );
});

BrowserFrame.displayName = 'BrowserFrame';

export default BrowserFrame;
