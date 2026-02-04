import React from 'react';

const HistoryPanel = ({ history, onNavigate, onClose }) => {
  const formatHistoryDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleHistoryClick = (url) => {
    onNavigate(url);
  };

  // Group history by date
  const groupedHistory = {};
  history.items.forEach((item, index) => {
    const dateGroup = formatHistoryDate(Date.now() - (history.items.length - index) * 86400000);
    if (!groupedHistory[dateGroup]) {
      groupedHistory[dateGroup] = [];
    }
    groupedHistory[dateGroup].push({ ...item, index });
  });

  return (
    <div className="ie-side-panel">
      <div className="ie-side-panel-header">
        <span>History</span>
        <button className="ie-side-panel-close" onClick={onClose}>
          ×
        </button>
      </div>
      
      <div className="ie-side-panel-content">
        {history.items && history.items.length > 0 ? (
          Object.entries(groupedHistory).map(([dateGroup, items]) => (
            <div key={dateGroup}>
              <div style={{ 
                padding: '4px 8px', 
                fontWeight: 'bold', 
                fontSize: '11px',
                backgroundColor: '#e0e0e0',
                borderBottom: '1px solid #808080'
              }}>
                {dateGroup}
              </div>
              {items.map((item) => (
                <div
                  key={item.index}
                  className="ie-history-item"
                  onClick={() => handleHistoryClick(item)}
                  title={item}
                >
                  <span className="ie-history-icon">🌐</span>
                  <span className="ie-history-title">{item}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div style={{ padding: '8px', fontSize: '11px', color: '#666' }}>
            No history yet. Browse websites to see your history here.
          </div>
        )}
        
        <div style={{ marginTop: '16px', padding: '8px' }}>
          <button 
            style={{ 
              fontSize: '11px', 
              padding: '4px 8px',
              border: '1px solid',
              borderColor: '#ffffff #000000 #000000 #ffffff',
              background: '#c0c0c0',
              cursor: 'pointer'
            }}
            onClick={() => console.log('Clear history')}
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
