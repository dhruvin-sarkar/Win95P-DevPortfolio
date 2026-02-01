import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import bioPC from '../assets/bio_pc.png'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

   const technologyText = (
    <>
        As a full-stack developer, I specialize in <span>JavaScript/TypeScript</span> and <span>Python</span>, 
        crafting responsive interfaces with <span>React</span> and <span>Vue.js</span> while building robust backends 
        with <span>Node.js</span> and <span>Django</span>. My toolkit includes <span>MongoDB</span> and 
        <span>PostgreSQL</span> for data management, and I'm passionate about creating seamless 
        user experiences through thoughtful UI/UX design.
    </>
  );

  const bioText = (
    <>
        <strong>Objective:</strong>
        <br />
        <span>AI and Design Thinking student crafting digital experiences that blend functionality with creativity</span>
        <br />
        <br />
        <strong>My Journey:</strong>
        <br />
        <span>Growing up surrounded by technology, with both my father and grandfather working in the field, I developed an early fascination with computers. By age 8, I was already learning C/C++ from my dad, and that spark has grown into a full-fledged passion for development and design.</span>
        <br />
        <br />
        <strong>What Drives Me:</strong>
        <br />
        <span>• Creating intuitive interfaces that make technology accessible</span>
        <br />
        <span>• Solving complex problems through clean, efficient code</span>
        <br />
        <span>• Continuous learning and skill development</span>
        <br />
        <span>• Building projects that make a real impact</span>
        <br />
        <br />
        <strong>Technical Arsenal:</strong>
        <br />
        <span>• Frontend: React, Vue.js, Angular, TypeScript, Tailwind CSS</span>
        <br />
        <span>• Backend: Node.js, Express, Django, FastAPI, .NET</span>
        <br />
        <span>• Databases: MongoDB, MySQL, PostgreSQL, Firebase</span>
        <br />
        <span>• Game Dev: Unity, Unreal Engine, Godot, Blender</span>
    </>
  );

  const hobbyText = (
    <>
        <strong>Beyond the Screen:</strong>
        <br />
        <span>When I'm not coding, I channel my creativity into game development, hardware projects, car modifications, and archery. I'm an avid gamer who enjoys everything from FPS games to roguelikes and simulators. These diverse interests keep me inspired and bring fresh perspectives to my technical work.</span>
        <br />
        <br />
        <strong>Contact:</strong>
        <br />
        <span>Email: dhruvinsarkar@outlook.com</span>
        <br />
        <span>GitHub: dhruvin-sarkar</span>
        <br />
        <span>LinkedIn: linkedin.com/in/dhruvin-sarkar/</span>
    </>
  );

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }


  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('About')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('About');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('About') : inlineStyle('About')}>
          <div className="folder_dragbar"
             style={{ background: MybioExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="bio_barname">
              <img src={About} alt="About" />
              <span>About</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              }}
              onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('About')
                    handleBiotap('general')
                  }: undefined}
                  onTouchEnd={() => {
                    deleteTap('About')
                    handleBiotap('general')
                  }}
                >×
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p  onClick={() => handleBiotap('general')}
              style={generalTap ? activeBtnStyle : {}}
          >General
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? activeBtnStyle : {}}
          >Technology
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Hobby
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio"
              style={{ display: generalTap ? 'grid' : 'block' }}
            >
            <img
              alt="bioPC"
              className={generalTap ? 'bio_img' : 'bio_img_other'}
              src={generalTap? bioPC : (technologyTap ? tech : hobby)}
            />
            <div
              className="biotext_container">

              <p className={generalTap? 'bio_text_1' : 'bio_text_1_other'}>
                {generalTap? bioText : technologyTap? technologyText : hobbyText}
              </p>   
            </div>
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              >
                <span>
                  OK
                </span>
              </div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
