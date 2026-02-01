import React, { useState, useEffect, useRef, useContext } from 'react';
import Draggable from 'react-draggable';
import UseContext from '../Context';
import '../css/Terminal.css';
import { useSounds } from '../hooks/useSounds';
import terminalIcon from '../assets/run.png'; // Reusing run icon or we can add a specifically different one if available

// Mock File System
const fileSystem = {
    'C:': {
        type: 'dir',
        children: {
            'Users': {
                type: 'dir',
                children: {
                    'Dhruvin': {
                        type: 'dir',
                        children: {
                            'Projects': {
                                type: 'dir',
                                children: {
                                    'portfolio.txt': { type: 'file', content: 'This amazing Windows 95 portfolio! Built with React.' },
                                    'ai-agent.txt': { type: 'file', content: 'An advanced AI agent project.' },
                                    'readme.txt': { type: 'file', content: 'Check out my GitHub for more details: github.com/dhruvin-sarkar' }
                                }
                            },
                            'bio.txt': { type: 'file', content: 'Dhruvin Sarkar\nFull Stack Developer | AI Enthusiast\nLoves: React, Node.js, and Retro UIs.' },
                            'skills.txt': { type: 'file', content: '- JavaScript/TypeScript\n- React, Vue.js\n- Node.js, Python\n- C++\n- System Design' },
                            'contact.txt': { type: 'file', content: 'Email: dhruvinsarkar@outlook.com\nLinkedIn: linkedin.com/in/dhruvin-sarkar' }
                        }
                    }
                }
            },
            'Windows': {
                type: 'dir',
                children: {
                  'System32': {
                    type: 'dir',
                    children: {}
                  }
                }
            }
        }
    }
};

const Terminal = () => {
    const { 
        TerminalExpand, setTerminalExpand, 
        handleSetFocusItemTrue, 
        themeDragBar, 
        deleteTap,
        isTouchDevice,
        inlineStyle, inlineStyleExpand
    } = useContext(UseContext);

    const { playWindowMaximize, playWindowMinimize } = useSounds();

    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { output: 'Microsoft(R) Windows 95' },
        { output: '   (C)Copyright Microsoft Corp 1981-1996.' },
        { output: '' }
    ]);
    const [cwd, setCwd] = useState(['C:', 'Users', 'Dhruvin']); // Current Working Directory path array
    const [matrixMode, setMatrixMode] = useState(false);
    
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input when clicking anywhere in terminal
    const handleTerminalClick = () => {
        if (!isTouchDevice) {
             inputRef.current?.focus();
        }
    };

    const getPrompt = () => {
        // Construct path string, e.g., C:\Users\Dhruvin>
        return `${cwd.join('\\')}>`;
    };

    const getCurrentDir = () => {
        let current = fileSystem;
        for (const part of cwd) {
            if (current[part] && current[part].children) {
                current = current[part].children;
            } else if (current.children && current.children[part]) { // Handle navigating down
                 current = current.children[part].children;
            } else {
                 return null; // Error
            }
        }
        return current;
    };
    
    // Helper to traverse to a specific path array from root
    const getDirFromPath = (pathArray) => {
        let current = fileSystem;
        // The first element of cwd is 'C:', which is at the root of fileSystem['C:']? 
        // Wait, fileSystem structure is { 'C:': ... }. 
        // So cwd=['C:'] means we are inside fileSystem['C:'].children? 
        // Let's adjust logic.
        
        // Actually, let's say root is the object containing 'C:'.
        // cwd=['C:'] -> fileSystem['C:'].children
        
        // Let's rewrite traversal:
        let node = fileSystem;
        for (const part of pathArray) {
             if (node[part]) {
                 node = node[part].children;
             } else {
                 return null;
             }
        }
        return node;
    };


    const handleCommand = (cmd) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();
        const param = args[1];

        const newHistory = [...history, { command: getPrompt(), input: cmd }];

        switch (command) {
            case 'help':
                newHistory.push({ output: 'Supported commands:\n  DIR    List files in current directory.\n  CD     Change directory.\n  CLS    Clear screen.\n  TYPE   View file content.\n  WHOAMI Display user info.\n  EXIT   Close terminal.\n  HELP   Show this list.' });
                break;
            case 'cls':
            case 'clear':
                setHistory([]);
                setInput('');
                return; // Return early so we don't append to cleared history
            case 'whoami':
                newHistory.push({ output: 'Dhruvin Sarkar\nFull Stack Developer & AI Enthusiast' });
                break;
            case 'exit':
                setTerminalExpand(prev => ({ ...prev, hide: true, show: false }));
                deleteTap('Terminal');
                return;
            case 'dir':
            case 'ls':
                const dir = getDirFromPath(cwd);
                if (dir) {
                    const lines = Object.keys(dir).map(name => {
                        const isDir = dir[name].type === 'dir';
                        const size = isDir ? '<DIR>' : Math.floor(Math.random() * 10000);
                        // Formatting like DOS: DATE TIME <DIR> NAME
                        return `${isDir ? '       ' : '       '} ${isDir ? '<DIR>    ' : '         '} ${name}`;
                    });
                    newHistory.push({ output: lines.join('\n') });
                    newHistory.push({ output: `       ${Object.keys(dir).length} file(s)` });
                } else {
                   newHistory.push({ output: 'Error reading directory.' }); 
                }
                break;
            case 'cd':
                if (!param) {
                    newHistory.push({ output: getPrompt() }); // Just print pwd
                } else if (param === '..') {
                    if (cwd.length > 1) {
                         setCwd(prev => prev.slice(0, -1));
                    }
                } else {
                    const currentDir = getDirFromPath(cwd);
                    if (currentDir && currentDir[param] && currentDir[param].type === 'dir') {
                        setCwd(prev => [...prev, param]);
                    } else {
                        newHistory.push({ output: 'The system cannot find the path specified.' });
                    }
                }
                break;
            case 'type':
            case 'cat':
                 if (!param) {
                    newHistory.push({ output: 'The syntax of the command is incorrect.' });
                 } else {
                    const currentDir = getDirFromPath(cwd);
                    if (currentDir && currentDir[param] && currentDir[param].type === 'file') {
                        newHistory.push({ output: currentDir[param].content });
                    } else {
                        newHistory.push({ output: 'File not found.' });
                    }
                 }
                 break;
            case 'matrix':
                setMatrixMode(prev => !prev);
                newHistory.push({ output: matrixMode ? 'Matrix mode deactivated.' : 'Wake up, Neo...' });
                break;
            case '':
                break;
            default:
                newHistory.push({ output: `'${command}' is not recognized as an internal or external command, operable program or batch file.` });
        }

        setHistory(newHistory);
        setInput('');
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        }
    };
    
    function handleExpandStateToggle() {
        setTerminalExpand(prevState => {
          const willExpand = !prevState.expand;
          if (willExpand) {
            playWindowMaximize();
          } else {
            playWindowMinimize();
          }
          return {
            ...prevState,
            expand: willExpand,
          };
        });
      }

    return (
        <Draggable
            handle=".folder_dragbar_terminal"
            bounds={{ top: 0 }}
             defaultPosition={{ 
                x: window.innerWidth <= 500 ? 5 : 150,
                y: window.innerWidth <= 500 ? 50 : 150,
            }}
            disabled={TerminalExpand.expand}
            onStart={() => handleSetFocusItemTrue('Terminal')}
        >
            <div 
                className={`folder_folder_terminal ${matrixMode ? 'matrix-mode' : ''}`}
                style={{
                  ...(TerminalExpand.expand ? inlineStyleExpand('Terminal') : inlineStyle('Terminal')),
                  color: matrixMode ? '#00ff00' : '#c0c0c0'
                }}
                onClick={() => {
                   handleSetFocusItemTrue('Terminal');
                   handleTerminalClick();
                }}
            >
                <div 
                    className="folder_dragbar_terminal" 
                    style={{ background: TerminalExpand.focusItem ? themeDragBar : '#757579' }}
                    onDoubleClick={handleExpandStateToggle}
                >
                    <div className="folder_barname_terminal">
                        <img src={terminalIcon} alt="cmd" style={{ width: '16px', height: '16px' }}/>
                        <span>MS-DOS Prompt</span>
                    </div>
                    <div className="folder_barbtn_terminal">
                        <div 
                            className='x' 
                             style={{ color: 'black', background: '#c0c0c0', width: '16px', height: '14px', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', border:'1px solid white', boxShadow:'1px 1px 0px black'}}
                            onClick={(e) => {
                                e.stopPropagation();
                                setTerminalExpand(prev => ({ ...prev, hide: true, show: false }));
                                deleteTap('Terminal');
                            }}
                        >
                            x
                        </div>
                    </div>
                </div>

                <div className="terminal_content" style={{ color: matrixMode ? '#00ff00' : '#c0c0c0' }}>
                    {history.map((line, i) => (
                        <div key={i} className="terminal_line">
                            {line.command && <span className="terminal_prompt">{line.command}</span>}
                            {line.input && <span className="terminal_input_text">{line.input}</span>}
                            {line.output && <div style={{ whiteSpace: 'pre-wrap', width: '100%' }}>{line.output}</div>}
                        </div>
                    ))}
                    <div className="terminal_input_line">
                        <span className="terminal_prompt">{getPrompt()}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            className="terminal_input"
                            style={{ color: matrixMode ? '#00ff00' : '#c0c0c0' }}
                            autoFocus={!isTouchDevice}
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                    <div ref={bottomRef} />
                </div>
            </div>
        </Draggable>
    );
};

export default Terminal;
