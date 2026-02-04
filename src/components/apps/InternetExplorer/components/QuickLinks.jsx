import React from 'react';
import { getDemoSites } from '../utils/urlHandler';

const QuickLinks = ({ onNavigate }) => {
  const demoSites = getDemoSites();

  return (
    <div className="ie-quick-links">
      <div className="ie-quick-links-header">Quick Access (These Sites Work!):</div>
      <div className="ie-quick-links-grid">
        {demoSites.map((site, index) => (
          <button
            key={index}
            className="ie-quick-link"
            onClick={() => onNavigate(site.url)}
            title={site.url}
          >
            {site.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
