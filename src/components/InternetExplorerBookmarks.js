// Bookmarks/Favorites Utility Functions

export const createBookmarks = () => {
  return {
    items: [],
    folders: []
  };
};

export const addBookmark = (bookmarks, title, url) => {
  const newBookmark = {
    id: Date.now() + Math.random(), // Simple unique ID
    title: title || url,
    url: url,
    dateAdded: new Date().toISOString()
  };

  return {
    ...bookmarks,
    items: [...bookmarks.items, newBookmark]
  };
};

export const removeBookmark = (bookmarks, id) => {
  return {
    ...bookmarks,
    items: bookmarks.items.filter(item => item.id !== id)
  };
};

export const updateBookmark = (bookmarks, id, updatedFields) => {
  return {
    ...bookmarks,
    items: bookmarks.items.map(item =>
      item.id === id ? { ...item, ...updatedFields } : item
    )
  };
};

export const createFolder = (bookmarks, name) => {
  const newFolder = {
    id: Date.now() + Math.random(), // Simple unique ID
    name: name,
    items: []
  };

  return {
    ...bookmarks,
    folders: [...bookmarks.folders, newFolder]
  };
};

export const addBookmarkToFolder = (bookmarks, folderId, title, url) => {
  const newBookmark = {
    id: Date.now() + Math.random(), // Simple unique ID
    title: title || url,
    url: url,
    dateAdded: new Date().toISOString()
  };

  return {
    ...bookmarks,
    folders: bookmarks.folders.map(folder =>
      folder.id === folderId
        ? { ...folder, items: [...folder.items, newBookmark] }
        : folder
    )
  };
};

export const saveBookmarksToStorage = (bookmarks) => {
  try {
    localStorage.setItem('win95_ie_favorites', JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Failed to save bookmarks to localStorage:', e);
  }
};

export const loadBookmarksFromStorage = () => {
  try {
    const saved = localStorage.getItem('win95_ie_favorites');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load bookmarks from localStorage:', e);
  }
  return createBookmarks();
};
