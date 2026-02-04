import React, { useState } from 'react';

const MenuBar = ({ 
  onToggleToolbar, 
  onToggleStatusBar, 
  onAddToFavorites, 
  onShowHistory, 
  onShowFavorites 
}) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    {
      label: 'File',
      items: [
        { label: 'New', shortcut: 'Ctrl+N', action: () => console.log('New window') },
        { label: 'Open...', shortcut: 'Ctrl+O', action: () => console.log('Open') },
        { label: 'Save As...', shortcut: 'Ctrl+S', action: () => console.log('Save') },
        { label: 'Print...', shortcut: 'Ctrl+P', action: () => console.log('Print') },
        { separator: true },
        { label: 'Close', shortcut: 'Alt+F4', action: () => console.log('Close') }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Cut', shortcut: 'Ctrl+X', action: () => console.log('Cut') },
        { label: 'Copy', shortcut: 'Ctrl+C', action: () => console.log('Copy') },
        { label: 'Paste', shortcut: 'Ctrl+V', action: () => console.log('Paste') },
        { label: 'Select All', shortcut: 'Ctrl+A', action: () => console.log('Select All') },
        { separator: true },
        { label: 'Find (on this page)...', shortcut: 'Ctrl+F', action: () => console.log('Find') }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Toolbars', action: () => console.log('Toolbars submenu') },
        { label: 'Status Bar', action: onToggleStatusBar },
        { separator: true },
        { label: 'Explorer Bar', action: () => console.log('Explorer Bar submenu') },
        { label: 'Go To', action: () => console.log('Go To submenu') },
        { separator: true },
        { label: 'Text Size', action: () => console.log('Text Size submenu') },
        { label: 'Encoding', action: () => console.log('Encoding submenu') },
        { label: 'Source', shortcut: 'Ctrl+U', action: () => console.log('View Source') },
        { separator: true },
        { label: 'Full Screen', shortcut: 'F11', action: () => console.log('Full Screen') }
      ]
    },
    {
      label: 'Favorites',
      items: [
        { label: 'Add to Favorites...', shortcut: 'Ctrl+D', action: onAddToFavorites },
        { label: 'Organize Favorites...', action: () => console.log('Organize Favorites') },
        { separator: true },
        { label: 'Links', action: () => console.log('Links folder') }
      ]
    },
    {
      label: 'Tools',
      items: [
        { label: 'Mail and News', action: () => console.log('Mail and News') },
        { label: 'Synchronize...', action: () => console.log('Synchronize') },
        { separator: true },
        { label: 'Windows Update', action: () => console.log('Windows Update') },
        { separator: true },
        { label: 'Internet Options...', action: () => console.log('Internet Options') }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Contents and Index', shortcut: 'F1', action: () => console.log('Help') },
        { label: 'Tip of the Day', action: () => console.log('Tip of the Day') },
        { label: 'For Netscape Users', action: () => console.log('For Netscape Users') },
        { separator: true },
        { label: 'About Internet Explorer', action: () => console.log('About') }
      ]
    }
  ];

  const handleMenuClick = (menuLabel) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const handleMenuItemClick = (action) => {
    if (action) action();
    setActiveMenu(null);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    if (activeMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeMenu]);

  return (
    <div className="ie-menu-bar">
      {menuItems.map((menu) => (
        <div key={menu.label} className="ie-menu-container">
          <div
            className="ie-menu-item"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuClick(menu.label);
            }}
          >
            {menu.label}
          </div>
          
          {activeMenu === menu.label && (
            <div className="ie-menu-dropdown">
              {menu.items.map((item, index) => (
                item.separator ? (
                  <div key={index} className="ie-menu-separator" />
                ) : (
                  <div
                    key={index}
                    className="ie-menu-item-dropdown"
                    onClick={() => handleMenuItemClick(item.action)}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#666' }}>
                        {item.shortcut}
                      </span>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
