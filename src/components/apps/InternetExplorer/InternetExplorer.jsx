import React, { useState, useRef, useEffect, useContext } from 'react';
import Draggable from 'react-draggable';
import UseContext from '../../../Context';
import MenuBar from './components/MenuBar';
import NavigationBar from './components/NavigationBar';
import AddressBar from './components/AddressBar';
import BrowserFrame from './components/BrowserFrame';
import StatusBar from './components/StatusBar';
import StartPage from './components/StartPage';
import ErrorPage from './components/ErrorPage';
import { validateUrl, formatUrl } from './utils/urlHelpers';
import { WORKING_SITES } from './utils/siteDatabase';
import './InternetExplorer.css';

const InternetExplorer = () => {
  const { 
    setRightClickDefault,
    themeDragBar,
    IEExpand, setIEExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
  } = useContext(UseContext);

  // Navigation state
  const [url, setUrl] = useState('about:start');
  const [inputUrl, setInputUrl] = useState('about:start');
  const [history, setHistory] = useState(['about:start']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Window control handlers
  const handleClose = () => {
    deleteTap('InternetExplorer');
  };

  const handleMinimize = () => {
    setIEExpand(prev => ({...prev, hide: true, focusItem: false}));
    StyleHide('InternetExplorer');
  };

  const handleMaximize = () => {
    setIEExpand(prev => ({...prev, expand: !prev.expand}));
  };

  const handleDragStop = (e, data) => {
    setIEExpand(prev => ({
      ...prev,
      x: data.x,
      y: data.y
    }));
  };

  // Navigation handlers
  const handleNavigate = (targetUrl) => {
    if (!targetUrl || !targetUrl.trim()) return;
    
    const validation = validateUrl(targetUrl);
    if (!validation.valid) {
      setLoadError({
        type: 'INVALID_URL',
        url: targetUrl,
        message: validation.error,
        reason: 'Please enter a valid web address.',
      });
      return;
    }

    const formattedUrl = validation.url;
    setInputUrl(formattedUrl);
    setLoadError(null);
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(formattedUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    setUrl(formattedUrl);
  };
  
  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setLoadError(null);
    }
  };
  
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setLoadError(null);
    }
  };
  
  const handleRefresh = () => {
    setLoadError(null);
    // Force reload by changing the URL
    const currentUrl = url;
    setUrl('');
    setTimeout(() => setUrl(currentUrl), 10);
  };
  
  const handleHome = () => {
    handleNavigate('about:start');
  };

  // Handle URL input change
  const handleUrlChange = (newUrl) => {
    setInputUrl(newUrl);
  };

  // Handle iframe load start
  const handleLoadStart = () => {
    setIsLoading(true);
  };

  // Handle iframe load end
  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  // Handle iframe load error
  const handleLoadError = (error) => {
    setLoadError(error);
    setIsLoading(false);
  };

  // Handle open in new tab
  const handleOpenNewTab = () => {
    if (loadError && loadError.url) {
      window.open(loadError.url, '_blank');
    }
  };

  // Render content based on current state
  const renderContent = () => {
    if (url === 'about:start') {
      return <StartPage onNavigate={handleNavigate} sites={WORKING_SITES} />;
    }
    
    if (loadError) {
      return (
        <ErrorPage 
          error={loadError} 
          onNavigate={handleNavigate}
          onOpenNewTab={handleOpenNewTab}
        />
      );
    }
    
    return (
      <BrowserFrame
        url={url}
        isLoading={isLoading}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onLoadError={handleLoadError}
      />
    );
  };

  if (!IEExpand.show) return null;

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-InternetExplorer'}
        grid={[1, 1]}
        scale={1}
        disabled={IEExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 20 : 100,
          y: window.innerWidth <= 500 ? 40 : 100,
        }}
        position={{ 
          x: IEExpand.x || (window.innerWidth <= 500 ? 20 : 100),
          y: IEExpand.y || (window.innerWidth <= 500 ? 40 : 100)
        }}
        onStop={handleDragStop}
        onStart={() => handleSetFocusItemTrue('InternetExplorer')}
      >
        <div className='folder_folder-InternetExplorer' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('InternetExplorer');
            }}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setRightClickDefault(false)}}
            style={ IEExpand.expand ? inlineStyleExpand('InternetExplorer') : inlineStyle('InternetExplorer')}>
          <div className="folder_dragbar-InternetExplorer"
              style={{ background: IEExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-InternetExplorer">
              <img src="/assets/ie.png" alt="Internet Explorer" />
              <span>Internet Explorer</span>
            </div>
            <div className="folder_barbtn-InternetExplorer">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                handleMinimize()
              } : undefined
            }
                onTouchEnd={(e) => {
                e.stopPropagation()
                handleMinimize()
              }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-InternetExplorer'></p>
              </div>
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                handleMaximize()
              } : undefined
            }
                onTouchEnd={(e) => {
                e.stopPropagation()
                handleMaximize()
              }}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <div className={`expand-InternetExplorer ${IEExpand.expand ? 'full' : ''}`}>
                </div>
                {IEExpand.expand ? 
                (
                <div className="expand_2-InternetExplorer"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x-InternetExplorer'
                 onClick={!isTouchDevice ? () => {
                  handleClose()
                }
                  : undefined
                }
                onTouchEnd={() => {
                  handleClose()
                }}
              >×</p></div>
            </div>
          </div>

          <div className="ie-content-wrapper">
            <MenuBar />
            <NavigationBar
              onBack={handleBack}
              onForward={handleForward}
              onRefresh={handleRefresh}
              onHome={handleHome}
              canGoBack={historyIndex > 0}
              canGoForward={historyIndex < history.length - 1}
            />
            <AddressBar
              url={inputUrl}
              onUrlChange={handleUrlChange}
              onNavigate={handleNavigate}
              isLoading={isLoading}
            />
            <div className="ie-content">
              {renderContent()}
            </div>
            <StatusBar 
              status={isLoading ? 'Loading...' : 'Done'}
              url={url}
            />
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default InternetExplorer;
