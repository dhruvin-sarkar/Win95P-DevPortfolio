/**
 * Validate if string is a valid URL
 */
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Check if string looks like a domain
 */
export const isDomain = (string) => {
  const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return domainPattern.test(string);
};

/**
 * Format user input into a proper URL
 */
export const formatUrl = (input) => {
  const trimmed = input.trim();
  
  // Already has protocol
  if (trimmed.match(/^https?:\/\//i)) {
    return trimmed;
  }
  
  // Looks like a domain
  if (isDomain(trimmed)) {
    return `https://${trimmed}`;
  }
  
  // Looks like a path (starts with /)
  if (trimmed.startsWith('/')) {
    return `https://${trimmed.slice(1)}`;
  }
  
  // Otherwise, treat as search query
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
};

/**
 * Extract domain from URL
 */
export const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (_) {
    return null;
  }
};

/**
 * Check if URL is a special page
 */
export const isSpecialPage = (url) => {
  return url.startsWith('about:');
};

/**
 * Validate and format URL
 */
export const validateUrl = (input) => {
  if (!input || !input.trim()) {
    return { valid: false, error: 'Please enter a URL' };
  }
  
  if (isSpecialPage(input)) {
    return { valid: true, url: input };
  }
  
  const formatted = formatUrl(input);
  
  return { valid: true, url: formatted };
};
