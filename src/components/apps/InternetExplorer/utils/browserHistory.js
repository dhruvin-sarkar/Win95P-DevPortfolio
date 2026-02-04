// Browser history management utility
export const browserHistory = {
  // Initialize history from localStorage
  init: () => {
    const saved = localStorage.getItem('win95_ie_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
    return { items: [], currentIndex: -1 };
  },

  // Add URL to history
  add: (history, url) => {
    const newHistory = {
      items: [...history.items.slice(0, history.currentIndex + 1), url],
      currentIndex: history.currentIndex + 1
    };
    
    // Limit history size
    if (newHistory.items.length > 50) {
      newHistory.items = newHistory.items.slice(-50);
      newHistory.currentIndex = newHistory.items.length - 1;
    }
    
    // Save to localStorage
    localStorage.setItem('win95_ie_history', JSON.stringify(newHistory));
    
    return newHistory;
  },

  // Navigate back in history
  back: (history) => {
    if (history.currentIndex > 0) {
      return {
        ...history,
        currentIndex: history.currentIndex - 1
      };
    }
    return history;
  },

  // Navigate forward in history
  forward: (history) => {
    if (history.currentIndex < history.items.length - 1) {
      return {
        ...history,
        currentIndex: history.currentIndex + 1
      };
    }
    return history;
  },

  // Get current URL
  getCurrent: (history) => {
    if (history.currentIndex >= 0 && history.currentIndex < history.items.length) {
      return history.items[history.currentIndex];
    }
    return 'about:blank';
  },

  // Check if can go back
  canGoBack: (history) => {
    return history.currentIndex > 0;
  },

  // Check if can go forward
  canGoForward: (history) => {
    return history.currentIndex < history.items.length - 1;
  },

  // Clear history
  clear: () => {
    const emptyHistory = { items: [], currentIndex: -1 };
    localStorage.setItem('win95_ie_history', JSON.stringify(emptyHistory));
    return emptyHistory;
  }
};
