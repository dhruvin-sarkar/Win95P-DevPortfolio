import React, { useState, useEffect, useRef, useContext } from "react";
import Draggable from "react-draggable";
import UseContext from "../Context";
import "../css/InternetExplorer.css";
import internetExplorerIcon from "../assets/Internet-Explorer.png";
import { formatUrl, isSecureConnection } from "./InternetExplorerUrlValidator";
import {
  addToHistory,
  goBackInHistory,
  goForwardInHistory,
  canGoBack,
  canGoForward,
  loadHistoryFromStorage,
} from "./InternetExplorerHistory";
import {
  addBookmark,
  loadBookmarksFromStorage,
} from "./InternetExplorerBookmarks";

function InternetExplorer() {
  const {
    themeDragBar,
    InternetExplorerExpand,
    setInternetExplorerExpand,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
  } = useContext(UseContext);

  const iframeRef = useRef(null);
  const addressInputRef = useRef(null);

  // Window state
  const [windowState, setWindowState] = useState({
    position: { x: 100, y: 100 },
    size: { width: 800, height: 600 },
    isMaximized: false,
    isMinimized: false,
    zIndex: 1,
    previousState: null,
  });

  // Browser state
  const [browserState, setBrowserState] = useState({
    currentUrl: "about:blank",
    title: "Internet Explorer",
    canGoBack: false,
    canGoForward: false,
    isLoading: false,
    loadProgress: 0,
    favicon: null,
    secureConnection: false,
  });

  // History state
  const [history, setHistory] = useState({
    items: ["about:blank"],
    currentIndex: 0,
  });

  // Favorites state
  const [favorites, setFavorites] = useState({
    items: [],
    folders: [],
  });

  // UI state
  const [uiState, setUiState] = useState({
    showToolbar: true,
    showStatusBar: true,
    showFavoritesPanel: false,
    showHistoryPanel: false,
    activeMenu: null,
    fullScreen: false,
  });

  // Initialize from localStorage
  useEffect(() => {
    setFavorites(loadBookmarksFromStorage());
    setHistory(loadHistoryFromStorage());
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("win95_ie_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save to localStorage when history changes
  useEffect(() => {
    localStorage.setItem("win95_ie_history", JSON.stringify(history));
  }, [history]);

  // Handle drag stop
  function handleDragStop(event, data) {
    const positionX = data.x;
    const positionY = data.y;
    setWindowState((prev) => ({
      ...prev,
      position: { x: positionX, y: positionY },
    }));
  }

  // Navigation functions
  const navigate = (url) => {
    const formattedUrl = formatUrl(url);

    // Update browser state
    setBrowserState((prev) => ({
      ...prev,
      currentUrl: formattedUrl,
      isLoading: true,
      title: "Loading...",
      secureConnection: isSecureConnection(formattedUrl),
    }));

    // Update history
    const newHistory = addToHistory(history, formattedUrl);
    setHistory(newHistory);

    // Update navigation buttons state
    setBrowserState((prev) => ({
      ...prev,
      canGoBack: canGoBack(newHistory),
      canGoForward: canGoForward(newHistory),
    }));
  };

  const goBack = () => {
    if (canGoBack(history)) {
      const newHistory = goBackInHistory(history);
      const newUrl = newHistory.items[newHistory.currentIndex];

      setHistory(newHistory);
      setBrowserState((prev) => ({
        ...prev,
        currentUrl: newUrl,
        canGoBack: canGoBack(newHistory),
        canGoForward: canGoForward(newHistory),
      }));
    }
  };

  const goForward = () => {
    if (canGoForward(history)) {
      const newHistory = goForwardInHistory(history);
      const newUrl = newHistory.items[newHistory.currentIndex];

      setHistory(newHistory);
      setBrowserState((prev) => ({
        ...prev,
        currentUrl: newUrl,
        canGoBack: canGoBack(newHistory),
        canGoForward: canGoForward(newHistory),
      }));
    }
  };

  const refresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
      setBrowserState((prev) => ({ ...prev, isLoading: true }));
    }
  };

  const stopLoading = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "about:blank";
    }
    setBrowserState((prev) => ({ ...prev, isLoading: false }));
  };

  const goHome = () => {
    navigate("about:blank");
  };

  // Window management functions
  const handleMinimize = () => {
    setWindowState((prev) => ({ ...prev, isMinimized: true }));
    setInternetExplorerExpand((prev) => ({
      ...prev,
      hide: true,
      focusItem: false,
    }));
  };

  const handleMaximize = () => {
    if (windowState.isMaximized) {
      // Restore to previous state
      setWindowState((prev) => ({
        ...prev,
        isMaximized: false,
        position: prev.previousState.position,
        size: prev.previousState.size,
      }));
    } else {
      // Maximize - save current state first
      setWindowState((prev) => ({
        ...prev,
        isMaximized: true,
        previousState: {
          position: prev.position,
          size: prev.size,
        },
      }));
    }
  };

  const handleClose = () => {
    deleteTap("InternetExplorer");
  };

  const handleFocus = () => {
    handleSetFocusItemTrue("InternetExplorer");
  };

  // Handle iframe load events
  const handlePageLoad = () => {
    setBrowserState((prev) => ({ ...prev, isLoading: false }));

    // Try to get the page title
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const title =
          iframeRef.current.contentDocument.title || browserState.currentUrl;
        setBrowserState((prev) => ({ ...prev, title }));
      }
    } catch (e) {
      // Cross-origin restriction, use URL as title
      setBrowserState((prev) => ({ ...prev, title: browserState.currentUrl }));
    }
  };

  const handlePageError = () => {
    setBrowserState((prev) => ({
      ...prev,
      isLoading: false,
      title: "Error loading page",
    }));
  };

  // Address bar handler
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (addressInputRef.current) {
      navigate(addressInputRef.current.value);
    }
  };

  // Menu handlers
  const handleFileNew = () => {
    // In a real implementation, this would open a new window
    alert("New window functionality would be implemented here");
  };

  const handleAddToFavorites = () => {
    const newFavorites = addBookmark(
      favorites,
      browserState.title || browserState.currentUrl,
      browserState.currentUrl,
    );
    setFavorites(newFavorites);
  };

  // Toolbar button states
  const backDisabled = history.currentIndex <= 0;
  const forwardDisabled = history.currentIndex >= history.items.length - 1;

  return (
    <>
      <Draggable
        axis="both"
        handle={".folder_dragbar-InternetExplorer"}
        grid={[1, 1]}
        scale={1}
        disabled={windowState.isMaximized}
        bounds={{ top: 0 }}
        position={
          windowState.isMaximized ? { x: 0, y: 0 } : windowState.position
        }
        onStop={handleDragStop}
        onStart={() => handleSetFocusItemTrue("InternetExplorer")}
      >
        <div
          className="folder_folder-InternetExplorer"
          onClick={(e) => {
            e.stopPropagation();
            handleSetFocusItemTrue("InternetExplorer");
          }}
          style={
            windowState.isMaximized
              ? inlineStyleExpand("InternetExplorer")
              : inlineStyle("InternetExplorer")
          }
        >
          {/* Title Bar */}
          <div
            className="folder_dragbar-InternetExplorer"
            style={{
              background: InternetExplorerExpand.focusItem
                ? themeDragBar
                : "#757579",
            }}
          >
            <div className="folder_barname-InternetExplorer">
              <img src={internetExplorerIcon} alt="Internet Explorer" />
              <span>{browserState.title}</span>
            </div>
            <div className="folder_barbtn-InternetExplorer">
              <div
                onClick={
                  !isTouchDevice
                    ? (e) => {
                        e.stopPropagation();
                        handleMinimize();
                      }
                    : undefined
                }
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  handleMinimize();
                }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <p className="dash-InternetExplorer"></p>
              </div>
              <div onClick={handleMaximize}>
                <div
                  className={`expand-InternetExplorer ${windowState.isMaximized ? "full" : ""}`}
                ></div>
                {windowState.isMaximized ? (
                  <div className="expand_2-InternetExplorer"></div>
                ) : null}
              </div>
              <div>
                <p
                  className="x-InternetExplorer"
                  onClick={!isTouchDevice ? handleClose : undefined}
                  onTouchEnd={handleClose}
                >
                  ×
                </p>
              </div>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="file_edit_container-InternetExplorer">
            <p
              onMouseEnter={() =>
                setUiState((prev) => ({ ...prev, activeMenu: "file" }))
              }
              onMouseLeave={() =>
                setUiState((prev) => ({ ...prev, activeMenu: null }))
              }
            >
              File<span style={{ left: "-37px" }}>_</span>
              {uiState.activeMenu === "file" && (
                <div className="dropdown-menu">
                  <div onClick={handleFileNew}>New Window</div>
                  <div>Open...</div>
                  <div>Save As...</div>
                  <div className="menu-separator"></div>
                  <div>Print</div>
                  <div className="menu-separator"></div>
                  <div onClick={handleClose}>Close</div>
                </div>
              )}
            </p>
            <p
              onMouseEnter={() =>
                setUiState((prev) => ({ ...prev, activeMenu: "edit" }))
              }
              onMouseLeave={() =>
                setUiState((prev) => ({ ...prev, activeMenu: null }))
              }
            >
              Edit<span style={{ left: "-28px" }}>_</span>
              {uiState.activeMenu === "edit" && (
                <div className="dropdown-menu">
                  <div>Cut</div>
                  <div>Copy</div>
                  <div>Paste</div>
                  <div className="menu-separator"></div>
                  <div>Select All</div>
                  <div>Find...</div>
                </div>
              )}
            </p>
            <p
              onMouseEnter={() =>
                setUiState((prev) => ({ ...prev, activeMenu: "view" }))
              }
              onMouseLeave={() =>
                setUiState((prev) => ({ ...prev, activeMenu: null }))
              }
            >
              View<span style={{ left: "-28px" }}>_</span>
              {uiState.activeMenu === "view" && (
                <div className="dropdown-menu">
                  <div>Toolbar</div>
                  <div>Status Bar</div>
                  <div className="menu-separator"></div>
                  <div>Full Screen</div>
                  <div className="menu-separator"></div>
                  <div>Text Size</div>
                  <div>Refresh</div>
                </div>
              )}
            </p>
            <p
              onMouseEnter={() =>
                setUiState((prev) => ({ ...prev, activeMenu: "favorites" }))
              }
              onMouseLeave={() =>
                setUiState((prev) => ({ ...prev, activeMenu: null }))
              }
            >
              Favorites<span style={{ left: "-28px" }}>_</span>
              {uiState.activeMenu === "favorites" && (
                <div className="dropdown-menu">
                  <div onClick={handleAddToFavorites}>Add to Favorites...</div>
                  <div>Organize Favorites...</div>
                  <div className="menu-separator"></div>
                  {favorites.items.slice(0, 10).map((fav) => (
                    <div key={fav.id} onClick={() => navigate(fav.url)}>
                      {fav.title}
                    </div>
                  ))}
                </div>
              )}
            </p>
            <p
              onMouseEnter={() =>
                setUiState((prev) => ({ ...prev, activeMenu: "tools" }))
              }
              onMouseLeave={() =>
                setUiState((prev) => ({ ...prev, activeMenu: null }))
              }
            >
              Tools<span style={{ left: "-28px" }}>_</span>
              {uiState.activeMenu === "tools" && (
                <div className="dropdown-menu">
                  <div>Internet Options...</div>
                  <div className="menu-separator"></div>
                  <div>Clear History</div>
                  <div>Clear Cookies</div>
                </div>
              )}
            </p>
            <p
              onMouseEnter={() =>
                setUiState((prev) => ({ ...prev, activeMenu: "help" }))
              }
              onMouseLeave={() =>
                setUiState((prev) => ({ ...prev, activeMenu: null }))
              }
            >
              Help<span style={{ left: "-28px" }}>_</span>
              {uiState.activeMenu === "help" && (
                <div className="dropdown-menu">
                  <div>Help Topics</div>
                  <div className="menu-separator"></div>
                  <div>About Internet Explorer...</div>
                </div>
              )}
            </p>
          </div>

          {/* Toolbar */}
          {uiState.showToolbar && (
            <div className="ie-toolbar">
              <button
                className="ie-toolbar-button"
                onClick={goBack}
                disabled={backDisabled}
                title="Back"
              >
                ←
              </button>
              <button
                className="ie-toolbar-button"
                onClick={goForward}
                disabled={forwardDisabled}
                title="Forward"
              >
                →
              </button>
              <button
                className="ie-toolbar-button"
                onClick={stopLoading}
                disabled={!browserState.isLoading}
                title="Stop"
              >
                ■
              </button>
              <button
                className="ie-toolbar-button"
                onClick={refresh}
                title="Refresh"
              >
                ↻
              </button>
              <button
                className="ie-toolbar-button"
                onClick={goHome}
                title="Home"
              >
                ☖
              </button>
              <div className="ie-address-container">
                <form
                  onSubmit={handleAddressSubmit}
                  className="ie-address-form"
                >
                  <label htmlFor="address-bar" className="ie-address-label">
                    Address:
                  </label>
                  <input
                    ref={addressInputRef}
                    id="address-bar"
                    type="text"
                    className="ie-address-input"
                    defaultValue={browserState.currentUrl}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddressSubmit(e);
                      }
                    }}
                  />
                  <button type="submit" className="ie-go-button">
                    Go
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Browser Content */}
          <div
            className="folder_content-InternetExplorer"
            onClick={() => iconFocusIcon("")}
            style={
              windowState.isMaximized ? { height: "calc(100svh - 100px)" } : {}
            }
          >
            {browserState.isLoading && (
              <div className="loading-indicator">Loading...</div>
            )}
            <iframe
              ref={iframeRef}
              src={browserState.currentUrl}
              title="Internet Explorer Browser Frame"
              onLoad={handlePageLoad}
              onError={handlePageError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              className="ie-browser-frame"
            />
          </div>

          {/* Status Bar */}
          {uiState.showStatusBar && (
            <div className="ie-status-bar">
              <div className="ie-status-text">
                {browserState.isLoading ? "Loading..." : "Done"}
              </div>
              <div className="ie-status-zone">
                {browserState.secureConnection ? "Secure" : "Internet"}
              </div>
            </div>
          )}
        </div>
      </Draggable>
    </>
  );
}

export default InternetExplorer;
