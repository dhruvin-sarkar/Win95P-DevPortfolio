import { useContext, useState } from 'react';
import UseContext from '../Context';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import { useSounds } from '../hooks/useSounds';
import '../css/VSCode.css';
import '../css/ResumeFolder.css'; 
import vscIcon from '../assets/vscode.png';
import { 
    VscFiles, VscSearch, VscSourceControl, VscExtensions, VscSettingsGear, VscAccount,
    VscChevronRight, VscChevronDown, VscFileCode, VscJson, VscMarkdown, VscFolder, VscFolderOpened
} from "react-icons/vsc";
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt } from "react-icons/fa";

// --- Constants & Data ---

const FILE_TREE = [
    { name: '.github', type: 'folder', children: [
        { name: 'workflows', type: 'folder', children: [
            { name: 'deploy.yml', type: 'file' }
        ]}
    ]},
    { name: '.vscode', type: 'folder', children: [
        { name: 'settings.json', type: 'file' }
    ]},
    { name: 'public', type: 'folder', children: [
        { name: 'favicon.ico', type: 'file' },
        { name: 'manifest.json', type: 'file' }
    ]},
    { name: 'src', type: 'folder', children: [
        { name: 'assets', type: 'folder', children: [
            { name: 'vscode.png', type: 'file' },
            { name: 'win95.png', type: 'file' }
        ]},
        { name: 'components', type: 'folder', children: [
            { name: 'function', type: 'folder', children: [
                { name: 'AppFunctions.js', type: 'file' },
                { name: 'Footer.jsx', type: 'file' }
            ]},
            { name: 'App.jsx', type: 'file' },
            { name: 'Desktop.jsx', type: 'file' },
            { name: 'MineSweeper.jsx', type: 'file' },
            { name: 'Settings.jsx', type: 'file' },
            { name: 'Tile.jsx', type: 'file' },
            { name: 'VSCode.jsx', type: 'file' }
        ]},
        { name: 'css', type: 'folder', children: [
            { name: 'VSCode.css', type: 'file' },
            { name: 'App.css', type: 'file' }
        ]},
        { name: 'Context.js', type: 'file' },
        { name: 'index.css', type: 'file' },
        { name: 'main.jsx', type: 'file' }
    ]},
    { name: 'package.json', type: 'file' },
    { name: 'README.md', type: 'file' },
    { name: 'vite.config.js', type: 'file' }
];

const FILE_CODE = {
    'App.jsx': `import React, { useState, useEffect, useRef } from 'react';
import Desktop from './components/Desktop';
import TaskBar from './components/TaskBar';
import { UseContext } from './Context';
import './App.css';

const App = () => {
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  
  useEffect(() => {
    // Initialize the desktop experience
    console.log("Windows 95 Portfolio Initializing...");
  }, []);

  const handleOpenWindow = (app) => {
    if (windows.find(w => w.name === app.name)) {
        setActiveWindow(app.name);
        return;
    }
    setWindows([...windows, app]);
    setActiveWindow(app.name);
  };

  return (
    <UseContext.Provider value={{ windows, activeWindow, handleOpenWindow }}>
      <div className="win95-container">
        <Desktop />
        <TaskBar />
      </div>
    </UseContext.Provider>
  );
};

export default App;`,
    'VSCode.jsx': `import React, { useState } from 'react';
import './VSCode.css';

const VSCode = () => {
    const [activeFile, setActiveFile] = useState('App.jsx');
    
    return (
        <div className="vscode-container">
            <div className="sidebar">
                {/* Explorer Tree */}
            </div>
            <div className="editor">
                {/* Syntax Highlighting */}
            </div>
        </div>
    );
};

export default VSCode;`,
    'package.json': `{
  "name": "win95-dev-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-draggable": "^4.4.5",
    "framer-motion": "^10.12.16"
  }
}`,
    'README.md': `# Windows 95 Developer Portfolio

A retro-themed portfolio website mimicking the classic Windows 95 desktop experience.

## Features
- Functional Window Management
- Custom App Integrations
- Retro UI Components
- Interactive Tile Menu

Developed by Dhruvin Sarkar.`
};

// --- Sub-Components ---

const FileIcon = ({ name, type, expanded }) => {
    if (type === 'folder') {
        return expanded ? <VscFolderOpened style={{ color: '#dcb67a' }} /> : <VscFolder style={{ color: '#dcb67a' }} />;
    }
    const ext = name.split('.').pop();
    switch (ext) {
        case 'jsx': return <FaReact style={{ color: '#61dafb' }} />;
        case 'js': return <FaJsSquare style={{ color: '#f7df1e' }} />;
        case 'css': return <FaCss3Alt style={{ color: '#264de4' }} />;
        case 'html': return <FaHtml5 style={{ color: '#e34c26' }} />;
        case 'json': return <VscJson style={{ color: '#cbcb41' }} />;
        case 'md': return <VscMarkdown style={{ color: '#519aba' }} />;
        default: return <VscFileCode style={{ color: '#cccccc' }} />;
    }
};

const SyntaxHighlightedCode = ({ file, code }) => {
    if (!code) return <div style={{ color: '#858585', fontStyle: 'italic' }}>// Select a file to view its content</div>;

    const lines = code.split('\n');
    
    // Simple regex-based highlighter for this simulation
    const highlight = (line) => {
        // Comments
        if (line.trim().startsWith('//')) {
            return <span className="syntax-comment">{line}</span>;
        }
        
        // This is a more granular tokenization for simulation
        const tokens = line.split(/(\s+|[,;(){}[\]]|\b)/);
        
        return tokens.map((token, i) => {
            if (/^(import|export|default|const|let|var|function|return|if|else|switch|case|break|from)$/.test(token)) {
                return <span key={i} className="syntax-keyword">{token}</span>;
            } else if (/^['"].*['"]$/.test(token)) {
                return <span key={i} className="syntax-string">{token}</span>;
            } else if (/^[A-Z][a-zA-Z0-9]*$/.test(token)) {
                // Component or Class
                return <span key={i} className="syntax-class">{token}</span>;
            } else if (/^[a-z][a-zA-Z0-9]*$/.test(token) && tokens[i+1] === '(') {
                // Function call
                return <span key={i} className="syntax-function">{token}</span>;
            } else if (/^[0-9]+$/.test(token)) {
                return <span key={i} className="syntax-number">{token}</span>;
            } else if (/^[a-zA-Z0-9]+$/.test(token) && (tokens[i-1] === ' ' || tokens[i-1] === '<')) {
                // Likely a prop or tag name
                if (tokens[i-1] === '<' || tokens[i-2] === '<') return <span key={i} className="syntax-tag">{token}</span>;
                return <span key={i} className="syntax-attr">{token}</span>;
            } else if (token === '<' || token === '>' || token === '/' && (tokens[i-1] === '<' || tokens[i+1] === '>')) {
                return <span key={i} className="syntax-tag">{token}</span>;
            }
            return token;
        });
    };

    return (
        <>
            {lines.map((line, idx) => (
                <div key={idx} className="vscode_line">
                    <span className="vscode_code">{highlight(line)}</span>
                </div>
            ))}
        </>
    );
};

// --- Main Component ---

export default function VSCode() {
    const {
        VSCodeExpand, setVSCodeExpand,
        VSCodeRef,
        themeDragBar,
        deleteTap,
        inlineStyleExpand,
        inlineStyle,
        handleSetFocusItemTrue,
        lastTapTime, setLastTapTime,
        StyleHide,
    } = useContext(UseContext);

    const { playWindowMaximize: playMax, playWindowMinimize: playMin } = useSounds();

    // Editor State
    const [openFiles, setOpenFiles] = useState(['App.jsx', 'README.md']);
    const [activeFile, setActiveFile] = useState('App.jsx');
    const [expandedFolders, setExpandedFolders] = useState(new Set(['src', 'src/components']));

    const toggleFolder = (path) => {
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(path)) next.delete(path);
            else next.add(path);
            return next;
        });
    };

    const openFile = (name) => {
        if (!openFiles.includes(name)) {
            setOpenFiles([...openFiles, name]);
        }
        setActiveFile(name);
    };

    const closeFile = (e, name) => {
        e.stopPropagation();
        const nextOpen = openFiles.filter(f => f !== name);
        setOpenFiles(nextOpen);
        if (activeFile === name && nextOpen.length > 0) {
            setActiveFile(nextOpen[nextOpen.length - 1]);
        } else if (nextOpen.length === 0) {
            setActiveFile(null);
        }
    };

    function handleExpandStateToggle() {
        setVSCodeExpand(prevState => {
            const willExpand = !prevState.expand;
            if (willExpand) playMax(); else playMin();
            return { ...prevState, expand: willExpand };
        });
    }

    function handleExpandStateToggleMobile() {
        const now = Date.now();
        if (now - lastTapTime < 300) handleExpandStateToggle();
        setLastTapTime(now);
    }

    console.log('VSCode component rendered. show:', VSCodeExpand.show);

    if (!VSCodeExpand.show) {
        console.log('VSCode component returning null (show is false)');
        return null;
    }

    // Recursive File Tree Component
    const RenderTree = ({ items, path = '' }) => {
        return (
            <div className="vscode_file_tree">
                {items.map(item => {
                    const itemPath = path ? `${path}/${item.name}` : item.name;
                    const isFolder = item.type === 'folder';
                    const isExpanded = expandedFolders.has(itemPath);

                    return (
                        <div key={itemPath}>
                            <div 
                                className={`vscode_tree_item ${activeFile === item.name ? 'active' : ''}`}
                                style={{ paddingLeft: `${(path.split('/').length) * 12}px` }}
                                onClick={() => isFolder ? toggleFolder(itemPath) : openFile(item.name)}
                            >
                                <span className="vscode_tree_icon">
                                    {isFolder ? (isExpanded ? <VscChevronDown /> : <VscChevronRight />) : null}
                                    <FileIcon name={item.name} type={item.type} expanded={isExpanded} />
                                </span>
                                {item.name}
                            </div>
                            {isFolder && isExpanded && <RenderTree items={item.children} path={itemPath} />}
                        </div>
                    );
                })}
            </div>
        );
    };

    const currentCode = activeFile ? (FILE_CODE[activeFile] || `// Content for ${activeFile}`) : '';
    const lineCount = currentCode.split('\n').length;

    return (
        <Draggable
            nodeRef={VSCodeRef}
            axis="both"
            handle=".vscode_drag_bar"
            grid={[1, 1]}
            scale={1}
            disabled={VSCodeExpand.expand}
            bounds={{ top: 0 }}
            defaultPosition={{ 
                x: window.innerWidth <= 500 ? 10 : 100,
                y: window.innerWidth <= 500 ? 40 : 100,
            }}
            onStart={() => handleSetFocusItemTrue('VS Code')}
            onStop={(e, data) => {
                setVSCodeExpand(prev => ({ ...prev, x: data.x, y: data.y }));
            }}
        >
            <motion.div
                ref={VSCodeRef}
                className="vscode_window"
                style={{
                    ...(VSCodeExpand.expand ? inlineStyleExpand('VS Code') : inlineStyle('VS Code')),
                    zIndex: VSCodeExpand.hide ? '-1' : (VSCodeExpand.focusItem ? '999' : VSCodeExpand.zIndex),
                    display: VSCodeExpand.hide ? 'none' : 'flex',
                    flexDirection: 'column'
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleSetFocusItemTrue('VS Code');
                }}
            >
                <div className="vscode_drag_bar"
                    onDoubleClick={handleExpandStateToggle}
                    onTouchStart={handleExpandStateToggleMobile}
                    style={{ background: VSCodeExpand.focusItem ? themeDragBar : '#757579' }}
                >
                    <div className="folder_barname">
                        <img src={vscIcon} alt="VS Code" style={{ width: '16px', height: '16px' }} />
                        <span>Visual Studio Code</span>
                    </div>
                    <div className="folder_barbtn">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            playMin();
                            setVSCodeExpand(prev => ({ ...prev, hide: true, focusItem: false }));
                            StyleHide('VS Code');
                        }}>
                            <p className='dash'></p>
                        </div>
                        <div onClick={handleExpandStateToggle}>
                            <motion.div className={`expand ${VSCodeExpand.expand ? 'full' : ''}`} />
                            {VSCodeExpand.expand ? <div className="expand_2"></div> : null}
                        </div>
                        <div onClick={() => deleteTap('VS Code')}>
                            <p className='x'>×</p>
                        </div>
                    </div>
                </div>

                <div className="vscode_main_content">
                    <div className="vscode_content_container">
                        <div className="vscode_activity_bar">
                            <VscFiles className="vscode_activity_icon active" />
                            <VscSearch className="vscode_activity_icon" />
                            <VscSourceControl className="vscode_activity_icon" />
                            <VscExtensions className="vscode_activity_icon" />
                            <div style={{ flex: 1 }} />
                            <VscAccount className="vscode_activity_icon" />
                            <VscSettingsGear className="vscode_activity_icon" />
                        </div>

                        <div className="vscode_sidebar">
                            <div className="vscode_sidebar_header">EXPLORER</div>
                            <div className="vscode_sidebar_content">
                                <div className="vscode_section">
                                    <div className="vscode_section_header">
                                        <VscChevronDown /> WIN95-PORTFOLIO
                                    </div>
                                    <RenderTree items={FILE_TREE} />
                                </div>
                            </div>
                        </div>

                        <div className="vscode_editor_container">
                            <div className="vscode_tabs_container">
                                {openFiles.map(file => (
                                    <div 
                                        key={file} 
                                        className={`vscode_tab ${activeFile === file ? 'active' : ''}`}
                                        onClick={() => setActiveFile(file)}
                                    >
                                        <FileIcon name={file} type="file" />
                                        {file}
                                        <span className="vscode_tab_close" onClick={(e) => closeFile(e, file)}>×</span>
                                    </div>
                                ))}
                            </div>

                            <div className="vscode_editor">
                                <div className="vscode_gutter">
                                    {Array.from({ length: lineCount }).map((_, i) => (
                                        <div key={i}>{i + 1}</div>
                                    ))}
                                </div>
                                <div className="vscode_code_area">
                                    <SyntaxHighlightedCode file={activeFile || ''} code={currentCode} />
                                </div>
                                <div className="vscode_minimap">
                                    <div className="vscode_minimap_slider" />
                                    <pre>{currentCode}</pre>
                                </div>
                            </div>

                            <div className="vscode_terminal_panel">
                                <div className="vscode_terminal_tabs">
                                    <span className="active">TERMINAL</span>
                                    <span>OUTPUT</span>
                                    <span>DEBUG CONSOLE</span>
                                    <span>PROBLEMS</span>
                                </div>
                                <div className="vscode_terminal_content">
                                    <div className="vscode_terminal_line">
                                        <span className="vscode_prompt">C:\Users\DS\Portfolio\win95&gt;</span>
                                        <span className="vscode_typed">npm run dev</span>
                                    </div>
                                    <div className="vscode_terminal_line success">
                                        &gt; win95-portfolio@1.0.0 dev
                                    </div>
                                    <div className="vscode_terminal_line success">
                                        &gt; vite
                                    </div>
                                    <div className="vscode_terminal_line">
                                        VITE v5.0.0  ready in 128 ms
                                    </div>
                                    <div className="vscode_terminal_line">
                                        ➜  Local:   http://localhost:5173/
                                    </div>
                                    <div className="vscode_terminal_gemini">
                                        <span className="vscode_gemini_sparkle">✧</span>
                                        <input type="text" placeholder="Ask Gemini to help with your code..." readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vscode_status_bar">
                        <div className="vscode_status_left">
                            <span>main*</span>
                            <span>0 ⚠ 0</span>
                        </div>
                        <div className="vscode_status_right">
                            <span>Spaces: 4</span>
                            <span>UTF-8</span>
                            <span>{activeFile?.endsWith('.jsx') ? 'JavaScript React' : 'Markdown'}</span>
                            <span>Ln 1, Col 1</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Draggable>
    );
}
