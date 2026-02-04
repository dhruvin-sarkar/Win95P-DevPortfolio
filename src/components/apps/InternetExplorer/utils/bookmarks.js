// Bookmarks/Favorites management utility
export const bookmarks = {
  // Initialize bookmarks from localStorage
  init: () => {
    const saved = localStorage.getItem('win95_ie_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
    return { items: [], folders: [] };
  },

  // Add favorite
  add: (favorites, title, url) => {
    const newFavorite = {
      id: Date.now().toString(),
      title: title || url,
      url: url,
      dateAdded: Date.now()
    };

    const newFavorites = {
      ...favorites,
      items: [...favorites.items, newFavorite]
    };

    // Save to localStorage
    localStorage.setItem('win95_ie_favorites', JSON.stringify(newFavorites));
    
    return newFavorites;
  },

  // Remove favorite
  remove: (favorites, id) => {
    const newFavorites = {
      ...favorites,
      items: favorites.items.filter(item => item.id !== id)
    };

    // Save to localStorage
    localStorage.setItem('win95_ie_favorites', JSON.stringify(newFavorites));
    
    return newFavorites;
  },

  // Update favorite
  update: (favorites, id, updates) => {
    const newFavorites = {
      ...favorites,
      items: favorites.items.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    };

    // Save to localStorage
    localStorage.setItem('win95_ie_favorites', JSON.stringify(newFavorites));
    
    return newFavorites;
  },

  // Create folder
  createFolder: (favorites, name) => {
    const newFolder = {
      id: Date.now().toString(),
      name: name,
      dateCreated: Date.now(),
      items: []
    };

    const newFavorites = {
      ...favorites,
      folders: [...favorites.folders, newFolder]
    };

    // Save to localStorage
    localStorage.setItem('win95_ie_favorites', JSON.stringify(newFavorites));
    
    return newFavorites;
  },

  // Add to folder
  addToFolder: (favorites, folderId, favorite) => {
    const newFavorites = {
      ...favorites,
      folders: favorites.folders.map(folder => 
        folder.id === folderId 
          ? { ...folder, items: [...folder.items, favorite] }
          : folder
      )
    };

    // Save to localStorage
    localStorage.setItem('win95_ie_favorites', JSON.stringify(newFavorites));
    
    return newFavorites;
  },

  // Search favorites
  search: (favorites, query) => {
    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search in items
    favorites.items.forEach(item => {
      if (item.title.toLowerCase().includes(lowerQuery) || 
          item.url.toLowerCase().includes(lowerQuery)) {
        results.push(item);
      }
    });

    // Search in folders
    favorites.folders.forEach(folder => {
      folder.items.forEach(item => {
        if (item.title.toLowerCase().includes(lowerQuery) || 
            item.url.toLowerCase().includes(lowerQuery)) {
          results.push({ ...item, folder: folder.name });
        }
      });
    });

    return results;
  },

  // Get favorites by date range
  getByDateRange: (favorites, startDate, endDate) => {
    return favorites.items.filter(item => 
      item.dateAdded >= startDate && item.dateAdded <= endDate
    );
  },

  // Export favorites
  export: (favorites) => {
    return JSON.stringify(favorites, null, 2);
  },

  // Import favorites
  import: (favoritesData) => {
    try {
      const imported = JSON.parse(favoritesData);
      localStorage.setItem('win95_ie_favorites', JSON.stringify(imported));
      return imported;
    } catch (e) {
      console.error('Failed to import favorites:', e);
      return favorites;
    }
  }
};
