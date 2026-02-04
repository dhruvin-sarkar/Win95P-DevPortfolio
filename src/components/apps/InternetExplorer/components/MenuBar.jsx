import React from 'react';

const MenuBar = () => {
  const menuItems = ['File', 'Edit', 'View', 'Favorites', 'Help'];
  
  return (
    <div className="ie-menubar">
      {menuItems.map((item) => (
        <div key={item} className="ie-menu-item">
          <span className="ie-menu-text">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
