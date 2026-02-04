// Smart URL handler that redirects certain sites to mobile/embed versions
export const handleSpecialUrls = (url) => {
  const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
  const hostname = urlObj.hostname.toLowerCase();

  // YouTube - use embed player
  if (hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (hostname.includes('youtu.be')) {
    const videoId = urlObj.pathname.slice(1);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Twitter - use Twitter embed
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
    // Most Twitter content won't embed, redirect to nitter (open source frontend)
    return url.replace('twitter.com', 'nitter.net').replace('x.com', 'nitter.net');
  }

  // Reddit - use old.reddit.com which is more embed-friendly
  if (hostname.includes('reddit.com')) {
    return url.replace('www.reddit.com', 'old.reddit.com');
  }

  // Instagram - usually blocks embedding
  if (hostname.includes('instagram.com')) {
    return url + 'embed';
  }

  // Wikipedia - already works fine
  if (hostname.includes('wikipedia.org')) {
    return url;
  }

  // For other sites, return as-is
  return url;
};

// Check if a site is known to block iframes
export const isKnownToBlock = (url) => {
  const blockedDomains = [
    'google.com',
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'x.com',
    'linkedin.com',
    'netflix.com',
    'amazon.com',
    'paypal.com',
    'bank',
    'chase.com',
    'wellsfargo.com'
  ];

  return blockedDomains.some(domain => url.toLowerCase().includes(domain));
};

// Get list of working demo sites
export const getDemoSites = () => {
  return [
    { name: 'Example Site', url: 'https://example.com' },
    { name: 'Mozilla', url: 'https://mozilla.org' },
    { name: 'Wikipedia', url: 'https://wikipedia.org' },
    { name: 'W3C', url: 'https://w3.org' },
    { name: 'Archive.org', url: 'https://archive.org' },
    { name: 'NASA', url: 'https://nasa.gov' },
    { name: 'Weather.gov', url: 'https://weather.gov' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com' }
  ];
};
