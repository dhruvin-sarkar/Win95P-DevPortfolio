export const WORKING_SITES = [
  {
    name: 'Example Domain',
    url: 'https://example.com',
    description: 'Classic example site - always works',
    category: 'demo'
  },
  {
    name: 'Wikipedia',
    url: 'https://wikipedia.org',
    description: 'Free online encyclopedia',
    category: 'reference'
  },
  {
    name: 'CodePen',
    url: 'https://codepen.io',
    description: 'Social development environment',
    category: 'dev'
  },
  {
    name: 'JSFiddle',
    url: 'https://jsfiddle.net',
    description: 'Online code playground',
    category: 'dev'
  },
  {
    name: 'Mozilla Developer Network',
    url: 'https://developer.mozilla.org',
    description: 'Web development documentation',
    category: 'reference'
  },
  {
    name: 'NASA',
    url: 'https://nasa.gov',
    description: 'Space exploration and science',
    category: 'info'
  },
  {
    name: 'Weather.gov',
    url: 'https://weather.gov',
    description: 'National Weather Service',
    category: 'info'
  },
  {
    name: 'Internet Archive',
    url: 'https://archive.org',
    description: 'Digital library of websites and media',
    category: 'reference'
  },
];

// Sites known to block iframes
export const BLOCKED_SITES = [
  'google.com',
  'facebook.com',
  'twitter.com',
  'instagram.com',
  'github.com',
  'youtube.com',
  'linkedin.com',
  'reddit.com',
  'tiktok.com',
  'netflix.com',
  'amazon.com',
];

export const isKnownBlockedSite = (url) => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase().replace('www.', '');
    return BLOCKED_SITES.some(blocked => 
      hostname === blocked || hostname.endsWith('.' + blocked)
    );
  } catch (_) {
    return false;
  }
};
