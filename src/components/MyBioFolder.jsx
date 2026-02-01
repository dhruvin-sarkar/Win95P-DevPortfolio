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
        <span>PostgreSQL</span> for data management, and I&apos;m passionate about creating seamless 
        user experiences through thoughtful UI/UX design.
    </>
  );

  const bioText = (
    <div className="who-i-am-content">
      <div className="bio_section">
        <h3 className="bio_section_header">Who I Am</h3>
        <p>I&apos;m an AI and Design Thinking student in 11th grade, driven by a deep curiosity for how ideas become real, usable digital experiences. Technology has been part of my life for as long as I can remember — with both my father and grandfather working in tech, I grew up surrounded by computers, PCBs, and experiments instead of toys. My journey into programming started early. At just 8 years old, my dad introduced me to C and C++, and that moment sparked a long-term obsession with understanding how systems work from the ground up. Since then, I&apos;ve explored everything from low-level programming to modern full-stack development, always aiming to build things that are both technically sound and thoughtfully designed. I care deeply about UI/UX. For me, good software isn&apos;t just functional — it&apos;s intuitive, expressive, and memorable. Alongside building projects, I actively sharpen my problem-solving and algorithmic thinking through competitive programming and LeetCode, treating consistency and growth as non-negotiables. Outside of coding, I&apos;m a passionate gamer — from FPS titles to roguelikes and simulators — and I experiment with game development, PCB work, PC modding, and hardware tinkering. Beyond tech, I enjoy car modding, archery, music, and diving into anime, manhwa, and manga. All of these interests feed into how I think and create, helping me approach problems with fresh perspectives and unconventional ideas.</p>
      </div>

      <div className="bio_section">
        <h3 className="bio_section_header">What Drives Me</h3>
        <p>I&apos;m driven by a balance of building products, solving complex problems, and designing meaningful experiences. I don&apos;t see these as separate paths — to me, they&apos;re deeply interconnected. Building is how ideas become real, problem-solving is how systems become robust, and design is what makes everything human. I enjoy moving fluidly between all three, letting each inform the other.</p>
      </div>

      <div className="bio_section">
        <h3 className="bio_section_header">Why I Build</h3>
        <p>What really fuels me is the process of exploration. I love pushing limits — learning new technologies, experimenting with different approaches, and stretching boundaries just to see how far something can go. A big part of this is proving things to myself: that I can adapt, that I can learn fast, and that I can create things that are genuinely useful, thoughtful, and cool. Building isn&apos;t just output for me — it&apos;s validation, growth, and self-expression rolled into one.</p>
      </div>

      <div className="bio_section">
        <h3 className="bio_section_header">How I Learn</h3>
        <p>I&apos;m unapologetically docs-first. Documentation is where I feel most at home — I like understanding tools from their foundations rather than just copying patterns. I read docs deeply, cross-reference, experiment, break things, and rebuild them. Alongside that, I rely heavily on trial and error, because nothing teaches faster than seeing what fails and why. For me, learning sticks best when it&apos;s tied directly to something I&apos;m building.</p>
      </div>

      <div className="bio_section">
        <h3 className="bio_section_header">My Approach to Work</h3>
        <p>I&apos;m a perfectionist, but in a constructive way. I care deeply about polish, clarity, and correctness — especially when it comes to UI/UX and system behavior. I don&apos;t like &quot;good enough&quot; if I know it can be better. That said, I balance this with iteration: I refine continuously rather than waiting for perfection to magically appear.</p>
      </div>

      <div className="bio_section">
        <h3 className="bio_section_header">How I Think</h3>
        <p>I&apos;m naturally curious. If something works, I want to know why. If something breaks, I want to know how. That curiosity often pulls me deeper into systems than expected, but it&apos;s also how I uncover better solutions and cleaner designs.</p>
      </div>

      <div className="bio_section">
        <h3 className="bio_section_header">My Mindset</h3>
        <p>I&apos;m relentless when it comes to growth. Once I commit to learning something or solving a problem, I don&apos;t let go easily. I enjoy the grind — especially the quiet, focused kind where progress compounds over time. This persistence shows up in my coding practice, my projects, and my constant push to get better than I was yesterday.</p>
      </div>
    </div>
  );

  const hobbyText = (
    <>
        <strong>Beyond the Screen:</strong>
        <br />
        <span>When I&apos;m not coding, I channel my creativity into game development, hardware projects, car modifications, and archery. I&apos;m an avid gamer who enjoys everything from FPS games to roguelikes and simulators. These diverse interests keep me inspired and bring fresh perspectives to my technical work.</span>
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
          >Who I Am
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
            <div className={`folder_content-bio ${generalTap ? 'who-i-am-tab' : ''}`}
              style={{ display: generalTap ? 'block' : 'block' }}
            >
              <img
                alt="bioPC"
                className={generalTap ? 'bio_img' : 'bio_img_other'}
                src={generalTap? bioPC : (technologyTap ? tech : hobby)}
              />
              <div className="biotext_container">
                <div className={generalTap? 'bio_text_1' : 'bio_text_1_other'}>
                  {generalTap? bioText : technologyTap? technologyText : hobbyText}
                </div>   
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
