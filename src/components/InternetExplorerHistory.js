// Browser History Utility Functions
const MAX_HISTORY_SIZE = 50;

export const createHistory = () => {
  return {
    items: [],
    currentIndex: -1
  };
};

export const addToHistory = (history, url) => {
  // Don't add if it's the same as the current URL
  if (history.currentIndex >= 0 && history.items[history.currentIndex] === url) {
    return history;
  }

  // Remove forward history if we're not at the end
  const newItems = [...history.items.slice(0, history.currentIndex + 1), url];

  // Limit history size
  if (newItems.length > MAX_HISTORY_SIZE) {
    newItems.shift();
  }

  return {
    items: newItems,
    currentIndex: newItems.length - 1
  };
};

export const goBackInHistory = (history) => {
  if (history.currentIndex <= 0) {
    return history;
  }

  return {
    ...history,
    currentIndex: history.currentIndex - 1
  };
};

export const goForwardInHistory = (history) => {
  if (history.currentIndex >= history.items.length - 1) {
    return history;
  }

  return {
    ...history,
    currentIndex: history.currentIndex + 1
  };
};

export const canGoBack = (history) => {
  return history.currentIndex > 0;
};

export const canGoForward = (history) => {
  return history.currentIndex < history.items.length - 1;
};

export const getCurrentUrl = (history) => {
  if (history.currentIndex >= 0 && history.currentIndex < history.items.length) {
    return history.items[history.currentIndex];
  }
  return null;
};

export const saveHistoryToStorage = (history) => {
  try {
    localStorage.setItem('win95_ie_history', JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history to localStorage:', e);
  }
};

export const loadHistoryFromStorage = () => {
  try {
    const saved = localStorage.getItem('win95_ie_history');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load history from localStorage:', e);
  }
  return createHistory();
};
