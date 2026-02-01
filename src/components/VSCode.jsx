import { useContext } from 'react';
import UseContext from '../Context';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
import { useSounds } from '../hooks/useSounds';
import '../css/VSCode.css';
import '../css/ResumeFolder.css'; // Reuse some Win95 window styles
import vscIcon from '../assets/vscode.png';
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscSettingsGear, VscAccount } from "react-icons/vsc";

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

    const promptText = `Generate a React component that expands on this simple Greeting component. Create a variation called 'AdvancedGreeting' that accepts 'name', 'title', and 'avatarUrl'. Style it using professional CSS-in-JS or inline styles to look like a premium social media profile card.`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(promptText);
        alert('Prompt copied to clipboard!');
    };

    function handleExpandStateToggle() {
        setVSCodeExpand(prevState => {
            const willExpand = !prevState.expand;
            if (willExpand) {
                playMax();
            } else {
                playMin();
            }
            return {
                ...prevState,
                expand: willExpand,
            };
        });
    }

    function handleExpandStateToggleMobile() {
        const now = Date.now();
        if (now - lastTapTime < 300) {
            handleExpandStateToggle();
        }
        setLastTapTime(now);
    }

    if (!VSCodeExpand.show) return null;

    return (
        <Draggable
            axis="both"
            handle=".folder_dragbar"
            grid={[1, 1]}
            scale={1}
            disabled={VSCodeExpand.expand}
            bounds={{ top: 0 }}
            defaultPosition={{ x: 100, y: 50 }}
            onStart={() => handleSetFocusItemTrue('VS Code')}
        >
            <motion.div
                ref={VSCodeRef}
                className="folder_folder"
                onClick={(e) => {
                    e.stopPropagation();
                    handleSetFocusItemTrue('VS Code');
                }}
                style={{
                    ...(VSCodeExpand.expand
                        ? inlineStyleExpand('VS Code')
                        : inlineStyle('VS Code')),
                    zIndex: VSCodeExpand.zIndex,
                    display: VSCodeExpand.hide ? 'none' : 'flex',
                    flexDirection: 'column'
                }}
            >
                <div className="folder_dragbar"
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

                <div className="vscode_window">
                    <div className="vscode_editor_container">
                        <div className="vscode_sidebar">
                            <VscFiles className="vscode_sidebar_icon active" title="Explorer" />
                            <VscSearch className="vscode_sidebar_icon" title="Search" />
                            <VscSourceControl className="vscode_sidebar_icon" title="Source Control" />
                            <VscExtensions className="vscode_sidebar_icon" title="Extensions" />
                            <div style={{ flex: 1 }}></div>
                            <VscAccount className="vscode_sidebar_icon" title="Accounts" />
                            <VscSettingsGear className="vscode_sidebar_icon" title="Settings" />
                        </div>
                        <div className="vscode_main_area">
                            <div className="vscode_tabs">
                                <div className="vscode_tab active">
                                    <span>Greeting.jsx</span>
                                    <span className="vscode_tab_close">×</span>
                                </div>
                                <div className="vscode_tab">
                                    <span>styles.css</span>
                                    <span className="vscode_tab_close">×</span>
                                </div>
                            </div>
                            <div className="vscode_editor">
                                <div className="vscode_line">
                                    <span className="vscode_line_number">1</span>
                                    <span className="vscode_code"><span className="vscode_keyword">import</span> React <span className="vscode_keyword">from</span> <span className="vscode_string">&apos;react&apos;</span>;</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">2</span>
                                    <span className="vscode_code"></span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">3</span>
                                    <span className="vscode_code"><span className="vscode_comment">{"// A simple component to show in the editor"}</span></span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">4</span>
                                    <span className="vscode_code"><span className="vscode_keyword">const</span> <span className="vscode_function">Greeting</span> = ({"{"} name {"}"}) =&gt; {"{"}</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">5</span>
                                    <span className="vscode_code">  <span className="vscode_keyword">return</span> (</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">6</span>
                                    <span className="vscode_code">    &lt;<span className="vscode_tag">div</span> <span className="vscode_attr">className</span>=<span className="vscode_string">&quot;greeting&quot;</span>&gt;</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">7</span>
                                    <span className="vscode_code">      &lt;<span className="vscode_tag">h1</span>&gt;Hello, {"{"}name{"}"}!&lt;/<span className="vscode_tag">h1</span>&gt;</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">8</span>
                                    <span className="vscode_code">      &lt;<span className="vscode_tag">p</span>&gt;Welcome to my portfolio.&lt;/<span className="vscode_tag">p</span>&gt;</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">9</span>
                                    <span className="vscode_code">    &lt;/<span className="vscode_tag">div</span>&gt;</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">10</span>
                                    <span className="vscode_code">  );</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">11</span>
                                    <span className="vscode_code">{"}"};</span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">12</span>
                                    <span className="vscode_code"></span>
                                </div>
                                <div className="vscode_line">
                                    <span className="vscode_line_number">13</span>
                                    <span className="vscode_code"><span className="vscode_keyword">export default</span> Greeting;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vscode_terminal_panel">
                        <div className="vscode_panel_header">
                            <span className="vscode_panel_item">Problems</span>
                            <span className="vscode_panel_item">Output</span>
                            <span className="vscode_panel_item">Debug Console</span>
                            <span className="vscode_panel_item active">Terminal</span>
                        </div>
                        <div className="vscode_terminal_content">
                            <div className="vscode_prompt_text">
                                <span style={{ color: '#6a9955' }}>{"// Ask Gemini to improve this component:"}</span>
                                <br />
                                {promptText}
                            </div>
                            <button className="vscode_copy_btn" onClick={copyToClipboard}>
                                Copy Prompt
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Draggable>
    );
}
