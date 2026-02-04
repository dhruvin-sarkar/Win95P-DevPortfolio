import React, { forwardRef } from 'react';

const BrowserFrame = forwardRef(({ src, onLoad, onError }, ref) => {
  return (
    <div className="ie-browser-frame">
      <iframe
        ref={ref}
        src={src}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        title="Internet Explorer Browser Frame"
        onLoad={onLoad}
        onError={onError}
        frameBorder="0"
      />
    </div>
  );
});

BrowserFrame.displayName = 'BrowserFrame';

export default BrowserFrame;
