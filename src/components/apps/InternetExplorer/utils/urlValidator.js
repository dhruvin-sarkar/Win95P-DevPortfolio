// URL validation and normalization utility
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return 'about:blank';
  }

  const trimmedUrl = url.trim();

  // Handle special URLs
  if (trimmedUrl === 'about:blank' || trimmedUrl === 'about:home') {
    return trimmedUrl;
  }

  // Check if already a valid URL
  if (isValidUrl(trimmedUrl)) {
    return ensureHttps(trimmedUrl);
  }

  // Try to make it a valid URL
  const normalizedUrl = normalizeUrl(trimmedUrl);
  
  if (isValidUrl(normalizedUrl)) {
    return ensureHttps(normalizedUrl);
  }

  // If still not valid, treat as search query
  return createSearchUrl(trimmedUrl);
};

// Check if string is a valid URL
const isValidUrl = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// Ensure HTTPS protocol
const ensureHttps = (url) => {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

// Normalize partial URLs
const normalizeUrl = (url) => {
  // Remove spaces and special characters
  let normalized = url.replace(/\s+/g, '');

  // If it looks like a domain, add protocol
  if (isDomainLike(normalized)) {
    return `https://${normalized}`;
  }

  return normalized;
};

// Check if string looks like a domain
const isDomainLike = (string) => {
  // Basic domain pattern
  const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z]{2,})+$/;
  
  // Check for common TLDs
  const commonTlds = ['.com', '.org', '.net', '.edu', '.gov', '.mil', '.io', '.co', '.ai', '.dev'];
  
  if (domainPattern.test(string)) {
    return true;
  }

  // Check if it contains common TLD
  return commonTlds.some(tld => string.includes(tld));
};

// Create search URL
const createSearchUrl = (query) => {
  const encodedQuery = encodeURIComponent(query);
  return `https://www.google.com/search?q=${encodedQuery}`;
};

// Extract domain from URL
export const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (_) {
    return url;
  }
};

// Check if URL is secure (HTTPS)
export const isSecureUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// Get favicon URL for a domain
export const getFaviconUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
  } catch (_) {
    return '';
  }
};

// Sanitize URL for display
export const sanitizeUrlForDisplay = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname;
  } catch (_) {
    return url;
  }
};

// Check if URL is internal/about page
export const isInternalUrl = (url) => {
  return url.startsWith('about:') || url.startsWith('chrome://') || url.startsWith('edge://');
};
