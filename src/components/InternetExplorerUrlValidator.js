// URL Validation Utility Functions

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const formatUrl = (url) => {
  let formattedUrl = url.trim();

  if (formattedUrl === '') return 'about:blank';

  // Check if it's already a valid URL
  if (isValidUrl(formattedUrl)) {
    return formattedUrl;
  }

  // Add protocol if missing
  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    if (formattedUrl.includes('.') && !formattedUrl.includes(' ')) {
      formattedUrl = 'https://' + formattedUrl;
      // Check if this creates a valid URL
      if (isValidUrl(formattedUrl)) {
        return formattedUrl;
      }
    } else {
      // Treat as search query
      return 'https://www.google.com/search?q=' + encodeURIComponent(formattedUrl);
    }
  }

  return formattedUrl;
};

export const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (_) {
    return url;
  }
};

export const isSecureConnection = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch (_) {
    return false;
  }
};
