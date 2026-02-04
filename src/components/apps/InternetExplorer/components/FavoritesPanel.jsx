import React from 'react';

const FavoritesPanel = ({ favorites, onNavigate, onClose }) => {
  const handleFavoriteClick = (url) => {
    onNavigate(url);
  };

  return (
    <div className="ie-side-panel">
      <div className="ie-side-panel-header">
        <span>Favorites</span>
        <button className="ie-side-panel-close" onClick={onClose}>
          ×
        </button>
      </div>
      
      <div className="ie-side-panel-content">
        {favorites.items && favorites.items.length > 0 ? (
          favorites.items.map((favorite) => (
            <div
              key={favorite.id}
              className="ie-favorites-item"
              onClick={() => handleFavoriteClick(favorite.url)}
              title={favorite.url}
            >
              <span className="ie-favorites-icon">★</span>
              <span className="ie-favorites-title">{favorite.title}</span>
            </div>
          ))
        ) : (
          <div style={{ padding: '8px', fontSize: '11px', color: '#666' }}>
            No favorites yet. Add pages to favorites to see them here.
          </div>
        )}
        
        {/* Default folders */}
        <div style={{ marginTop: '8px' }}>
          <div className="ie-favorites-item" style={{ fontWeight: 'bold' }}>
            <span className="ie-favorites-icon">📁</span>
            Links
          </div>
          <div className="ie-favorites-item" style={{ fontWeight: 'bold' }}>
            <span className="ie-favorites-icon">📁</span>
            Custom
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPanel;
