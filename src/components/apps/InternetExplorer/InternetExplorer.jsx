import UseContext from '../../../Context'
import { useContext, useEffect, useRef, useState } from "react";
import Draggable from 'react-draggable'
import { imageMapping } from '../../function/AppFunctions';
import '../InternetExplorer/InternetExplorer.css'

// Import components
import AddressBar from './components/AddressBar';
import NavigationButtons from './components/NavigationButtons';
import MenuBar from './components/MenuBar';
import Toolbar from './components/Toolbar';
import StatusBar from './components/StatusBar';
import BrowserFrame from './components/BrowserFrame';
import FavoritesPanel from './components/FavoritesPanel';
import HistoryPanel from './components/HistoryPanel';
import QuickLinks from './components/QuickLinks';

// Import utilities
import { browserHistory } from './utils/browserHistory';
import { bookmarks } from './utils/bookmarks';
import { validateUrl } from './utils/urlValidator';
import { handleSpecialUrls, isKnownToBlock } from './utils/urlHandler';

function InternetExplorer({ 
  windowId, 
  initialZIndex = 1000,
  onClose, 
  onMinimize,
  onFocus 
}) {
  const nodeRef = useRef(null);
  
  const { 
    setRightClickDefault,
    themeDragBar,
    IEExpand, setIEExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
  } = useContext(UseContext);

  // Window state
  const [windowState, setWindowState] = useState({
    position: { x: 100, y: 50 },
    size: { width: 900, height: 600 },
    isMaximized: false,
    zIndex: initialZIndex,
    previousState: null
  });

  // Browser state
  const [browserState, setBrowserState] = useState({
    currentUrl: 'about:blank',
    title: 'Internet Explorer',
    canGoBack: false,
    canGoForward: false,
    isLoading: false,
    loadProgress: 0,
    favicon: null,
    secureConnection: false
  });

  // UI state
  const [uiState, setUiState] = useState({
    showToolbar: true,
    showStatusBar: true,
    showFavoritesPanel: false,
    showHistoryPanel: false,
    activeMenu: null,
    fullScreen: false
  });

  // History and favorites
  const [history, setHistory] = useState({ items: ['about:blank'], currentIndex: 0 });
  const [favorites, setFavorites] = useState({ items: [], folders: [] });

  // ============ WINDOW CONTROL HANDLERS ============
  const handleMinimize = () => {
    console.log('Minimize clicked');
    if (onMinimize) {
      onMinimize(windowId);
    } else {
      // Fallback to existing behavior
      setIEExpand(prev => ({...prev, hide: true, focusItem: false}))
      StyleHide('IE')
    }
  };

  const handleMaximize = () => {
    console.log('Maximize clicked');
    setWindowState(prev => {
      if (prev.isMaximized) {
        // Restore to previous size and position
        return {
          ...prev,
          isMaximized: false,
          position: prev.previousState?.position || { x: 100, y: 50 },
          size: prev.previousState?.size || { width: 900, height: 600 },
          previousState: null
        };
      } else {
        // Maximize to full screen - respect taskbar (40px)
        return {
          ...prev,
          isMaximized: true,
          previousState: {
            position: prev.position,
            size: prev.size
          },
          position: { x: 0, y: 0 },
          size: { 
            width: window.innerWidth, 
            height: window.innerHeight - 40 // Account for taskbar
          }
        };
      }
    });
  };

  const handleClose = () => {
    console.log('Close clicked');
    // Save history and favorites to localStorage before closing
    localStorage.setItem('ie_history', JSON.stringify(history));
    
    if (onClose) {
      onClose(windowId);
    } else {
      // Fallback to existing behavior
      deleteTap('IE')
    }
  };

  const handleWindowClick = () => {
    if (onFocus) {
      onFocus(windowId);
    } else {
      // Fallback to existing behavior
      handleSetFocusItemTrue('IE');
    }
  };

  // ============ NAVIGATION HANDLERS ============
  const validateAndFormatUrl = (url) => {
    url = url.trim();
    
    // If it's already a valid URL, return it
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('about:')) {
      return url;
    }
    
    // If it looks like a domain, add https://
    if (url.includes('.') && !url.includes(' ')) {
      return 'https://' + url;
    }
    
    // Otherwise, treat it as a search query
    return 'https://www.google.com/search?q=' + encodeURIComponent(url);
  };

  const navigate = (url) => {
    console.log('Navigating to:', url);
    const formattedUrl = validateAndFormatUrl(url);
    
    // Check if site is known to block iframes
    if (isKnownToBlock(formattedUrl)) {
      console.log(`⚠️ ${url} is known to block iframe embedding. The site may not display correctly.`);
    }
    
    // Try to use special URL handling for better compatibility
    const finalUrl = handleSpecialUrls(formattedUrl);
    
    // Add to history
    const newHistory = {
      items: [...history.items.slice(0, history.currentIndex + 1), finalUrl],
      currentIndex: history.currentIndex + 1
    };
    setHistory(newHistory);
    
    // Update browser state
    setBrowserState(prev => ({
      ...prev, 
      currentUrl: finalUrl, 
      isLoading: true,
      canGoBack: newHistory.currentIndex > 0,
      canGoForward: false
    }));
  };

  const goBack = () => {
    if (history.currentIndex > 0) {
      const newIndex = history.currentIndex - 1;
      const url = history.items[newIndex];
      setHistory(prev => ({ ...prev, currentIndex: newIndex }));
      setBrowserState(prev => ({ 
        ...prev, 
        currentUrl: url,
        canGoBack: newIndex > 0,
        canGoForward: true
      }));
    }
  };

  const goForward = () => {
    if (history.currentIndex < history.items.length - 1) {
      const newIndex = history.currentIndex + 1;
      const url = history.items[newIndex];
      setHistory(prev => ({ ...prev, currentIndex: newIndex }));
      setBrowserState(prev => ({ 
        ...prev, 
        currentUrl: url,
        canGoBack: true,
        canGoForward: newIndex < history.items.length - 1
      }));
    }
  };

  const refresh = () => {
    console.log('Refresh clicked');
    setBrowserState(prev => ({ ...prev, isLoading: true }));
    const iframe = nodeRef.current?.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const stopLoading = () => {
    console.log('Stop clicked');
    setBrowserState(prev => ({ ...prev, isLoading: false }));
  };

  const goHome = () => {
    navigate('about:blank');
  };

  // Page load handlers
  const handlePageLoad = () => {
    console.log('Page loaded:', browserState.currentUrl);
    setBrowserState(prev => ({ ...prev, isLoading: false, loadProgress: 100 }));
    
    // Try to get page title from iframe
    try {
      const iframe = nodeRef.current?.querySelector('iframe');
      if (iframe && iframe.contentDocument) {
        const pageTitle = iframe.contentDocument.title;
        if (pageTitle) {
          setBrowserState(prev => ({ ...prev, title: pageTitle }));
        }
      }
    } catch (e) {
      // Cross-origin restriction, can't access iframe content
      console.log('Cannot access iframe content (CORS)');
    }
    
    setTimeout(() => {
      setBrowserState(prev => ({ ...prev, loadProgress: 0 }));
    }, 1000);
  };

  const handlePageError = () => {
    console.error('Page load error:', browserState.currentUrl);
    setBrowserState(prev => ({ ...prev, isLoading: false }));
  };

  // Favorites management
  const addToFavorites = () => {
    const newFavorite = {
      id: Date.now().toString(),
      title: browserState.title || browserState.currentUrl,
      url: browserState.currentUrl,
      dateAdded: Date.now()
    };
    
    setFavorites(prev => ({
      ...prev,
      items: [...prev.items, newFavorite]
    }));
    
    // Save to localStorage
    localStorage.setItem('win95_ie_favorites', JSON.stringify(favorites));
  };

  // Menu handlers
  const toggleToolbar = () => {
    setUiState(prev => ({ ...prev, showToolbar: !prev.showToolbar }));
  };

  const toggleStatusBar = () => {
    setUiState(prev => ({ ...prev, showStatusBar: !prev.showStatusBar }));
  };

  const toggleFavoritesPanel = () => {
    setUiState(prev => ({ ...prev, showFavoritesPanel: !prev.showFavoritesPanel, showHistoryPanel: false }));
  };

  const toggleHistoryPanel = () => {
    setUiState(prev => ({ ...prev, showHistoryPanel: !prev.showHistoryPanel, showFavoritesPanel: false }));
  };

  // Update z-index when initialZIndex changes (when window is brought to front)
  useEffect(() => {
    setWindowState(prev => ({ ...prev, zIndex: initialZIndex }));
  }, [initialZIndex]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('win95_ie_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
  }, []);

  // CRITICAL: Proper window style
  const getWindowStyle = () => {
    if (windowState.isMaximized) {
      return {
        position: 'fixed', // Use fixed when maximized
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)', // Account for taskbar
        zIndex: windowState.zIndex,
        margin: 0
      };
    }
    
    return {
      position: 'absolute', // Use absolute for normal windows
      left: windowState.position.x,
      top: windowState.position.y,
      width: windowState.size.width,
      height: windowState.size.height,
      zIndex: windowState.zIndex
    };
  };

  // Handle drag stop
  const handleDragStop = (event, data) => {
    if (!windowState.isMaximized) {
      setWindowState(prev => ({
        ...prev,
        position: { x: data.x, y: data.y }
      }));
    }
  };

  // Don't render if using new window management system
  if (onClose && !IEExpand.show) {
    return null;
  }

  // Don't render if using old system and hidden
  if (!onClose && !IEExpand.show) {
    return null;
  }

  return (
    <Draggable
      handle=".ie-title-bar"
      disabled={windowState.isMaximized}
      nodeRef={nodeRef}
      position={windowState.isMaximized ? { x: 0, y: 0 } : windowState.position}
      onStart={handleWindowClick}
      onStop={handleDragStop}
      bounds="parent" // CRITICAL: Keep window within desktop bounds
    >
      <div
        ref={nodeRef}
        className={`ie-window ${windowState.isMaximized ? 'maximized' : ''}`}
        style={onClose ? getWindowStyle() : (IEExpand.expand ? inlineStyleExpand('IE') : inlineStyle('IE'))}
        onClick={handleWindowClick}
      >
        {/* Title Bar */}
        <div className="ie-title-bar" style={{ background: (onClose ? windowState.zIndex === initialZIndex : IEExpand.focusItem) ? themeDragBar : '#757579' }}>
          <div className="ie-title-content">
            <img src={imageMapping('Internet Explorer')} alt="IE" className="ie-title-icon" />
            <span className="ie-title-text">{browserState.title}</span>
          </div>
          <div className="ie-window-controls">
            <button 
              className="ie-control-button" 
              onClick={!isTouchDevice ? handleMinimize : undefined}
              onTouchEnd={handleMinimize}
              title="Minimize"
            >
              <span className="ie-minimize-icon">_</span>
            </button>
            <button 
              className="ie-control-button" 
              onClick={!isTouchDevice ? handleMaximize : undefined}
              onTouchEnd={handleMaximize}
              title={windowState.isMaximized ? "Restore" : "Maximize"}
            >
              <span className="ie-maximize-icon">{windowState.isMaximized ? "❐" : "□"}</span>
            </button>
            <button 
              className="ie-control-button ie-close-button" 
              onClick={!isTouchDevice ? handleClose : undefined}
              onTouchEnd={handleClose}
              title="Close"
            >
              <span className="ie-close-icon">×</span>
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <MenuBar 
          onToggleToolbar={toggleToolbar}
          onToggleStatusBar={toggleStatusBar}
          onAddToFavorites={addToFavorites}
          onShowHistory={toggleHistoryPanel}
          onShowFavorites={toggleFavoritesPanel}
        />

        {/* Toolbar */}
        {uiState.showToolbar && (
          <Toolbar 
            onBack={goBack}
            onForward={goForward}
            onStop={stopLoading}
            onRefresh={refresh}
            onHome={goHome}
            onShowFavorites={toggleFavoritesPanel}
            onShowHistory={toggleHistoryPanel}
            canGoBack={browserState.canGoBack}
            canGoForward={browserState.canGoForward}
            isLoading={browserState.isLoading}
          />
        )}

        {/* Address Bar */}
        <AddressBar 
          currentUrl={browserState.currentUrl}
          onNavigate={navigate}
          isLoading={browserState.isLoading}
        />

        {/* Main Content Area */}
        <div className="ie-content-area">
          {/* Favorites Panel */}
          {uiState.showFavoritesPanel && (
            <FavoritesPanel 
              favorites={favorites}
              onNavigate={navigate}
              onClose={() => setUiState(prev => ({ ...prev, showFavoritesPanel: false }))}
            />
          )}

          {/* History Panel */}
          {uiState.showHistoryPanel && (
            <HistoryPanel 
              history={history}
              onNavigate={navigate}
              onClose={() => setUiState(prev => ({ ...prev, showHistoryPanel: false }))}
            />
          )}

          {/* Browser Frame */}
          <div className="ie-browser-container">
            {/* Quick Links - only show on about:blank */}
            {browserState.currentUrl === 'about:blank' && (
              <QuickLinks onNavigate={navigate} />
            )}
            
            <BrowserFrame 
              url={browserState.currentUrl}
              onLoad={handlePageLoad}
              onError={handlePageError}
            />
          </div>
        </div>

        {/* Status Bar */}
        {uiState.showStatusBar && (
          <StatusBar 
            status={browserState.isLoading ? "Loading..." : "Done"}
            url={browserState.currentUrl}
            secureConnection={browserState.secureConnection}
          />
        )}
      </div>
    </Draggable>
  )
}

export default InternetExplorer
