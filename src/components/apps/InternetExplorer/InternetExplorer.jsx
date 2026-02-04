import React, { useState, useRef, useEffect } from 'react';
import TitleBar from './components/TitleBar';
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
  // Navigation state
  const [url, setUrl] = useState('about:start');
  const [inputUrl, setInputUrl] = useState('about:start');
  const [history, setHistory] = useState(['about:start']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

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

  return (
    <div className="ie-window">
      <TitleBar />
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
  );
};

export default InternetExplorer;
