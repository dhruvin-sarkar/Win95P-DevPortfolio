import React, { useContext } from 'react';
import UseContext from '../../Context';
import '../../css/Desktop.css';

function Desktop() {
  const { 
    desktopIcon,
    setDesktopIcon,
    handleSetFocusItemTrue,
    iconFocusIcon,
    deleteTap,
    handleDoubleClickEnterLink,
    handleDoubleTapEnterMobile,
    handleShowInfolderMobile,
    handleMobileLongPress,
    setRightClickIcon,
    setIconBeingRightClicked,
    setRightClickDefault,
    timerRef,
    undo,
    setUndo,
    iconContainerSize,
    iconImgSize,
    iconTextSize,
    imageMapping,
    handleOnDrag,
    DesktopRef,
    ProjectFolderRef,
    ResumeFolderRef,
    BinRef,
    DiskRef,
    PictureRef,
    UtilityRef,
    dragging,
    setDragging,
    tap,
    setTap,
    isTouchDevice,
  } = useContext(UseContext);

  const handleIconClick = (icon) => {
    if (isTouchDevice) {
      // For touch devices, use the mobile handler
      handleDoubleClickEnterLink(icon.name, icon.type, icon.folderId);
    } else {
      // For desktop, use the regular handler
      handleDoubleClickEnterLink(icon.name, icon.type, icon.folderId);
    }
  };

  const handleIconRightClick = (e, icon) => {
    e.preventDefault();
    e.stopPropagation();
    setRightClickIcon(true);
    setIconBeingRightClicked(icon);
    setRightClickDefault(false);
  };

  const handleIconDoubleClick = (icon) => {
    if (!isTouchDevice) {
      handleDoubleClickEnterLink(icon.name, icon.type, icon.folderId);
    }
  };

  const handleIconDragStart = (e, icon) => {
    if (!isTouchDevice) {
      // Create a ref for the icon element
      const iconRef = { current: e.target.closest('.icon-container') };
      handleOnDrag(icon.name, iconRef, icon.type)();
    }
  };

  return (
    <div 
      className="desktop"
      ref={DesktopRef}
      onClick={() => {
        handleSetFocusItemTrue('');
        iconFocusIcon('');
      }}
    >
      {desktopIcon.map((icon) => (
        <div
          key={icon.name}
          className="icon-container"
          style={{
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            ...iconContainerSize(icon.size)
          }}
          onContextMenu={(e) => handleIconRightClick(e, icon)}
          onDoubleClick={() => handleIconDoubleClick(icon)}
          onMouseDown={(e) => handleIconDragStart(e, icon)}
          onTouchStart={(e) => {
            if (isTouchDevice) {
              handleMobileLongPress(e, icon);
            }
          }}
        >
          <img
            src={imageMapping(icon.name, icon.type)}
            alt={icon.name}
            style={iconImgSize(icon.size)}
            draggable={false}
          />
          <span style={iconTextSize(icon.size)}>
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Desktop;
