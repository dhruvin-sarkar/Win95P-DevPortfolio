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

// Import utilities
import { browserHistory } from './utils/browserHistory';
import { bookmarks } from './utils/bookmarks';
import { validateUrl } from './utils/urlValidator';

function InternetExplorer() {
  const iframeRef = useRef(null);
  
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
    position: { x: 100, y: 100 },
    size: { width: 800, height: 600 },
    isMaximized: false,
    isMinimized: false,
    zIndex: 1
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
  const [history, setHistory] = useState({ items: [], currentIndex: -1 });
  const [favorites, setFavorites] = useState({ items: [], folders: [] });

  function handleDragStop(event, data) {
    const positionX = data.x 
    const positionY = data.y
    setIEExpand(prev => ({
      ...prev,
      x: positionX,
      y: positionY
    }))
  }

  // Navigation functions
  const navigate = (url) => {
    const validUrl = validateUrl(url);
    
    // Update history
    const newHistory = [...history.items.slice(0, history.currentIndex + 1), validUrl];
    setHistory({ items: newHistory, currentIndex: newHistory.length - 1 });
    
    // Update browser state
    setBrowserState(prev => ({ 
      ...prev, 
      currentUrl: validUrl, 
      isLoading: true,
      canGoBack: newHistory.length > 1,
      canGoForward: false
    }));
    
    // Load URL in iframe
    if (iframeRef.current) {
      iframeRef.current.src = validUrl;
    }
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
        canGoForward: newIndex < history.items.length - 1
      }));
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
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
        canGoBack: newIndex > 0,
        canGoForward: newIndex < history.items.length - 1
      }));
      if (iframeRef.current) {
        iframeRef.current.src = url;
      }
    }
  };

  const refresh = () => {
    if (iframeRef.current) {
      setBrowserState(prev => ({ ...prev, isLoading: true }));
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const stopLoading = () => {
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
    }
    setBrowserState(prev => ({ ...prev, isLoading: false }));
  };

  const goHome = () => {
    navigate('about:blank');
  };

  // Window management functions
  const handleMinimize = () => {
    setIEExpand(prev => ({...prev, hide: true, focusItem: false}))
    StyleHide('IE')
  };

  const handleMaximize = () => {
    setIEExpand(prev => ({...prev, expand: !prev.expand}))
  };

  const handleClose = () => {
    deleteTap('IE')
  };

  // Page load handlers
  const handlePageLoad = () => {
    setBrowserState(prev => ({ ...prev, isLoading: false, loadProgress: 100 }));
    setTimeout(() => {
      setBrowserState(prev => ({ ...prev, loadProgress: 0 }));
    }, 1000);
  };

  const handlePageError = () => {
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

  if (!IEExpand.show) return null;

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.ie-title-bar'}
        grid={[1, 1]}
        scale={1}
        disabled={IEExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 20 : 100,
          y: window.innerWidth <= 500 ? 40 : 100,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('IE')}
      >
        <div
          className='ie-window'
          onClick={(e) => {
            e.stopPropagation();
            handleSetFocusItemTrue('IE');
          }}
          style={ IEExpand.expand ? inlineStyleExpand('IE') : inlineStyle('IE')}
        >
          {/* Title Bar */}
          <div className="ie-title-bar" style={{ background: IEExpand.focusItem ? themeDragBar : '#757579' }}>
            <div className="ie-title-content">
              <img src={imageMapping('Internet Explorer')} alt="IE" className="ie-title-icon" />
              <span className="ie-title-text">{browserState.title}</span>
            </div>
            <div className="ie-title-buttons">
              <button 
                className="ie-title-button" 
                onClick={!isTouchDevice ? handleMinimize : undefined}
                onTouchEnd={handleMinimize}
                title="Minimize"
              >
                <span>_</span>
              </button>
              <button 
                className="ie-title-button" 
                onClick={!isTouchDevice ? handleMaximize : undefined}
                onTouchEnd={handleMaximize}
                title={IEExpand.expand ? "Restore" : "Maximize"}
              >
                <span>{IEExpand.expand ? "❐" : "□"}</span>
              </button>
              <button 
                className="ie-title-button ie-close-button" 
                onClick={!isTouchDevice ? handleClose : undefined}
                onTouchEnd={handleClose}
                title="Close"
              >
                <span>×</span>
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
              <BrowserFrame 
                ref={iframeRef}
                src={browserState.currentUrl}
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
    </>
  )
}

export default InternetExplorer
