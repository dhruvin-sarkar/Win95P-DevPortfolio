import React, { useContext } from 'react';
import UseContext from '../../Context';
import '../../css/Desktop.css';

function Desktop() {
  const { 
    handleSetFocusItemTrue,
    iconFocusIcon,
    DesktopRef,
  } = useContext(UseContext);


  return (
    <div 
      className="desktop"
      ref={DesktopRef}
      onClick={() => {
        handleSetFocusItemTrue('');
        iconFocusIcon('');
      }}
    >
      {/* Icons are now rendered by the Dragdrop component to prevent duplication */}
    </div>
  );
}

export default Desktop;
