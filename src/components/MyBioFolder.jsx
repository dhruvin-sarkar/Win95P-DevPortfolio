import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import bioPC from '../assets/pfp.jpg'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import linux from '../assets/Tux linux.png'
import job from '../assets/job.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [linuxTap, setLinuxTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)
  const [employmentTap, setEmploymentTap] = useState(false)

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
    <div className="technology-content">
      <div className="tech_section">
        <h3 className="tech_header">Languages</h3>
        <p className="tech_prose">I gravitate toward languages that give me direct control over behavior and performance. C and C++ are my foundation - they taught me how systems work at the lowest levels and instilled in me a respect for memory management and optimization. JavaScript and TypeScript are where I spend most of my time now, building interactive web experiences with the type safety and tooling that modern development demands. I appreciate CSS for its ability to bring designs to life, and I turn to Bash when I need to automate or script system-level tasks. Lua, Dart, and Kotlin each serve specific purposes in my toolkit - Lua for game scripting, Dart for Flutter development, and Kotlin when I'm working in the Android ecosystem.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white" alt="C" />
          <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" />
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
          <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
          <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
          <img src="https://img.shields.io/badge/Lua-2C2D72?style=for-the-badge&logo=lua&logoColor=white" alt="Lua" />
          <img src="https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white" alt="Bash" />
          <img src="https://img.shields.io/badge/Dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white" alt="Dart" />
          <img src="https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Operating Systems</h3>
        <p className="tech_prose">My relationship with operating systems is defined by a balance between necessity and preference. Windows 11 remains my daily driver by necessity - it's where gaming, certain development tools, and compatibility requirements keep me anchored. But my heart belongs to Linux. I've spent countless hours distro-hopping through Pop!_OS, Linux Mint, Kali, Fedora, and ultimately settling on Arch Linux. Each distribution taught me something different about system architecture, package management, and the philosophy of open source. Arch Linux, in particular, gave me complete control over my environment and forced me to understand every component of my system from the ground up.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Windows_11-0078D4?style=for-the-badge&logo=windows-11&logoColor=white" alt="Windows 11" />
          <img src="https://img.shields.io/badge/Pop!_OS-48B9C7?style=for-the-badge&logo=pop!_os&logoColor=white" alt="Pop!_OS" />
          <img src="https://img.shields.io/badge/Linux_Mint-87CF3E?style=for-the-badge&logo=linux-mint&logoColor=white" alt="Linux Mint" />
          <img src="https://img.shields.io/badge/Kali_Linux-268BEE?style=for-the-badge&logo=kali-linux&logoColor=white" alt="Kali Linux" />
          <img src="https://img.shields.io/badge/Fedora-294172?style=for-the-badge&logo=fedora&logoColor=white" alt="Fedora" />
          <img src="https://img.shields.io/badge/Arch_Linux-1793D1?style=for-the-badge&logo=arch-linux&logoColor=white" alt="Arch Linux" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Frontend & Design</h3>
        <p className="tech_prose">Frontend development is where my technical skills and creative instincts converge. I love crafting interfaces that feel intuitive and responsive, using React as my primary framework for building complex interactive experiences. HTML5 and CSS3 form the foundation, but Tailwind CSS has become my go-to for rapid prototyping without sacrificing design consistency. I'm equally comfortable working in design tools - Figma for planning and prototyping, Framer for adding sophisticated animations, and Canva for quick visual assets. What drives me here is the immediate feedback loop - I can see and interact with what I'm building in real-time, which makes the development process incredibly engaging and iterative.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
          <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
          <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
          <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
          <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
          <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer" />
          <img src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white" alt="Canva" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Frameworks</h3>
        <p className="tech_prose">Frameworks are the scaffolding that lets me build bigger ideas faster. Flutter has become my framework of choice for cross-platform mobile development - I love how it lets me create beautiful, performant apps from a single codebase. On the web, I work fluidly between Angular and Vue.js depending on the project needs, and Electron.js when I need to break out of the browser. For backend work, Django provides the structure and security I need for robust applications, while Express.js and Next.js give me the flexibility to build everything from APIs to full-stack applications. Node.js ties it all together as my runtime environment of choice for JavaScript-based development.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter" />
          <img src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
          <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js" />
          <img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=white" alt="Electron.js" />
          <img src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
          <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
          <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
          <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Backend & Databases</h3>
        <p className="tech_prose">While I naturally lean frontend-first, I'm comfortable building complete full-stack applications when the project demands it. Python has become my go-to for backend scripting and data processing, though I'm equally proficient with Java and C# for enterprise-level applications. PHP still has its place in my toolkit for certain web applications. When it comes to data persistence, I choose based on the use case - MongoDB for flexible document storage, MySQL for traditional relational needs, and PostgreSQL when I need advanced features and robustness. I don't just connect these technologies; I think deeply about data architecture, scalability, and the trade-offs between different approaches.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />
          <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
          <img src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white" alt="C#" />
          <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
          <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
          <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
          <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Game Development</h3>
        <p className="tech_prose">Game development is where my technical curiosity and creative passion collide. I spend countless hours in Unity and Unreal Engine, building both 2D and 3D experiences that challenge my understanding of performance, physics, and player psychology. Blender has become an essential part of my workflow for creating and iterating on assets. Godot Engine, with its GDScript, offers a refreshing alternative when I need something more lightweight. I even dabble in Roblox development - it's surprisingly sophisticated and teaches valuable lessons about multiplayer architecture and user-generated content. What I love most about game dev is how every technical decision directly impacts the player experience.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white" alt="Unity" />
          <img src="https://img.shields.io/badge/Unreal_Engine-313131?style=for-the-badge&logo=unreal-engine&logoColor=white" alt="Unreal Engine" />
          <img src="https://img.shields.io/badge/Blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white" alt="Blender" />
          <img src="https://img.shields.io/badge/GDScript-%2374267B.svg?style=for-the-badge&logo=godotengine&logoColor=white" alt="GDScript" />
          <img src="https://img.shields.io/badge/GODOT-%23FFFFFF.svg?style=for-the-badge&logo=godot-engine" alt="Godot Engine" />
          <img src="https://img.shields.io/badge/Roblox-%230a0b0b.svg?style=for-the-badge&logo=Roblox&logoColor=white" alt="Roblox" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Hardware & Electronics</h3>
        <p className="tech_prose">I love working closer to the metal, where software meets the physical world. Arduino projects taught me the fundamentals of embedded systems and how code can directly control physical components. Raspberry Pi became my playground for more complex projects, from home automation to network services. This hands-on experience with hardware has fundamentally changed how I think about software - it makes me more conscious of resource constraints, power consumption, and the real-world impact of my code. There's something deeply satisfying about writing code that makes an LED blink or a motor turn, and that satisfaction keeps me coming back to hardware projects.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white" alt="Arduino" />
          <img src="https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white" alt="Raspberry Pi" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Tools & DevOps</h3>
        <p className="tech_prose">My development workflow is built around a core set of tools that keep me productive and organized. Git and GitHub are non-negotiable - version control isn't just a safety net, it's how I think about code evolution and collaboration. Docker has revolutionized how I approach development environments, ensuring consistency across different machines and deployment targets. Firebase handles my backend-as-a-service needs when I need to move quickly without managing infrastructure. These tools aren't just utilities; they're extensions of my development philosophy - automated, reproducible, and scalable. I'm constantly refining my workflow to eliminate friction and focus on what matters: building great software.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
          <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
          <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
        </div>
      </div>
    </div>
  );

  const linuxText = (
    <div className="technology-content">
      <div className="tech_section">
        <h3 className="tech_header">Linux, Ricing, and Living Inside My OS</h3>
        <p className="tech_prose">My relationship with Linux started early. In the 4th grade, my school issued us dedicated PCs that came preinstalled with Ubuntu, and that was my first real exposure to Linux. At the time, I didn&apos;t fully understand what made it different, but I lived with it for almost a year, learning its quirks and limitations simply by using it every day. Eventually, curiosity got the better of me, and I installed Fedora, diving headfirst into customization — which, unsurprisingly, got me into trouble at school.</p>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Distro-Hopping</h3>
        <p className="tech_prose">That experience kicked off a long period of distro-hopping. Over the years, I&apos;ve used and extensively customized Pop!_OS, Linux Mint, Fedora, Kali, and several others. Each distribution taught me something different — from stability and workflow to security, package management, and system structure. But more importantly, they all introduced me to ricing.</p>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Ricing</h3>
        <p className="tech_prose">Ricing quickly became one of my favorite hobbies. To me, ricing isn&apos;t just about aesthetics — it&apos;s about control. It&apos;s the process of shaping an operating system into something that feels personally engineered. Through ricing, I learned bash scripting, configuration management, window managers, keybinding systems, and Linux internals purely out of necessity. Every rice meant hours of tweaking icons, bars, sounds, animations, interactions, keybinds, and workflows. By the time a setup was &quot;done,&quot; it looked and felt like a completely different operating system.</p>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Arch Linux</h3>
        <p className="tech_prose">Eventually, I found my way to Arch Linux — the OS that has stuck with me for the past two years. I&apos;m fully aware of the memes surrounding Arch, and honestly, they&apos;re not wrong. Installing and maintaining Arch was, by far, the most painful yet rewarding experience I&apos;ve had with an operating system. Display issues, graphics drivers, audio problems, keyboard layouts, Bluetooth failures — I&apos;ve fought all of them. I&apos;ve spent countless hours every day buried in the Arch Wiki and documentation, troubleshooting, breaking my system, fixing it, and breaking it again.</p>
        <p className="tech_prose">Even now, with the Arch install script making setup significantly easier, I still believe the real Arch experience comes from understanding why everything works the way it does. That&apos;s what I loved most: the freedom. Absolute control over my system — nothing installed unless I wanted it, nothing running unless I allowed it. Every part of the OS felt intentional because I built it that way.</p>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Windows vs Linux</h3>
        <p className="tech_prose">Windows has always been my main OS by necessity, not by choice. From Windows 95 to Windows 10 and 11, it&apos;s been unavoidable due to software support, drivers, and gaming. But over time, my frustration with Windows grew — limited customization, bloated systems, poor file search, forced ads, locked-down features, and heavy reliance on third-party tools just to achieve basic control. Features being locked behind Pro versions, aggressive telemetry, and invasive additions like Recall and Copilot only pushed me further away.</p>
        <p className="tech_prose">Linux, in contrast, gives me freedom. If something bothers me, I can remove it. If something feels slow, I can reconfigure it. If I want my system to behave or look differently, I can change it — completely. That level of ownership fundamentally changed how I think about software. It made me value transparency, configurability, and user agency, and it directly influences how I design and build my own projects.</p>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">The</h3>
        <p className="tech_prose">Today, I maintain multiple iterations of my dotfiles, each representing a different aesthetic, workflow, and mindset — all version-controlled and documented on my GitHub. Every setup is a distinct experience, shaped by experimentation, iteration, and obsession with detail. Ricing taught me patience, problem-solving, and an appreciation for systems at every level.</p>
        <p className="tech_prose">Linux isn&apos;t just an operating system to me — it&apos;s a sandbox, a learning tool, and a creative medium. It&apos;s where my love for documentation, systems thinking, and customization truly came together, and it remains one of the strongest influences on how I approach technology as a whole.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Arch_Linux-1793D1?style=for-the-badge&logo=arch-linux&logoColor=white" alt="Arch Linux" />
          <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white" alt="Ubuntu" />
          <img src="https://img.shields.io/badge/Fedora-294172?style=for-the-badge&logo=fedora&logoColor=white" alt="Fedora" />
          <img src="https://img.shields.io/badge/Pop!_OS-48B9C7?style=for-the-badge&logo=pop!_os&logoColor=white" alt="Pop!_OS" />
          <img src="https://img.shields.io/badge/Linux_Mint-87CF3E?style=for-the-badge&logo=linux-mint&logoColor=white" alt="Linux Mint" />
          <img src="https://img.shields.io/badge/Kali_Linux-268BEE?style=for-the-badge&logo=kali-linux&logoColor=white" alt="Kali Linux" />
          <img src="https://img.shields.io/badge/GNOME-424242?style=for-the-badge&logo=gnome&logoColor=white" alt="GNOME" />
          <img src="https://img.shields.io/badge/KDE-1D99F3?style=for-the-badge&logo=kde&logoColor=white" alt="KDE" />
          <img src="https://img.shields.io/badge/i3wm-223344?style=for-the-badge&logo=i3wm&logoColor=white" alt="i3wm" />
          <img src="https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white" alt="Bash" />
        </div>
      </div>
    </div>
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
    <div className="hobby-content">
      <div className="hobby_section">
        <h3 className="hobby_header hobby_header_intro">Hobbies — A Lifetime of Obsession, Curiosity, and Overcommitment</h3>
        <p className="hobby_prose">I&apos;ve never been someone who dabbles. When something captures my interest, it doesn&apos;t stay a hobby for long — it becomes something I fully immerse myself in. Over time, this has led me into an unusually wide range of interests. To some, it might look like I&apos;m spread too thin. To me, it&apos;s simply how I experience the world: through deep curiosity, obsession, and a constant desire to understand how things work at every level.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">Competitive FPS — Precision, Discipline, and Mastery</h3>
        <p className="hobby_prose">First-person shooters were one of my earliest and most formative influences. I grew up playing Counter-Strike with my dad — starting from CS 1.6 and Source, long before ranked ladders and esports were mainstream. Those early sessions weren&apos;t just about playing a game; they taught me fundamentals like precision, patience, spatial awareness, and mechanical discipline.</p>
        <p className="hobby_prose">As I grew older, that interest turned into long-term commitment. I spent thousands of hours mastering games that reward consistency and punishment equally. Reaching Global Elite in CS:GO and Champion in Rainbow Six Siege wasn&apos;t the result of natural talent — it came from relentless practice, reviewing mistakes, refining micro-decisions, and chasing marginal gains. I&apos;m drawn to mechanically demanding games even when I&apos;m bad at them — Valorant included — because I value the ceiling more than immediate success. I enjoy knowing that there&apos;s always more to learn.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">Roguelikes — Systems Thinking and Controlled Chaos</h3>
        <p className="hobby_prose">Where FPS games sharpen reflexes, roguelikes and roguelites sharpen my thinking. I&apos;m obsessed with systems — how individual mechanics interact, compound, and occasionally break. I love the process of building the &quot;perfect&quot; run: optimizing builds, micromanaging resources, adapting to randomness, and making the most out of imperfect conditions.</p>
        <p className="hobby_prose">This fascination spans genres — from traditional roguelikes and deck-builders to platformers like Hollow Knight, Celeste, and Dead Cells, and even chaotic, gambling-heavy roguelites where risk management becomes part of the strategy. The constant loop of experimentation, failure, and refinement feels incredibly natural to me — it&apos;s the same mindset I bring into coding, design, and problem-solving.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">Modding & Tinkering — Curiosity Without Boundaries</h3>
        <p className="hobby_prose">I&apos;ve always enjoyed modding, even if I haven&apos;t had the time to fully dive into it yet. Whether it&apos;s Roblox scripting, Minecraft modding, or tweaking systems to behave differently than intended, I&apos;m fascinated by how games and platforms expose their internals — and how far those boundaries can be pushed.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">PC Hardware — Engineering Appreciation at Its Purest</h3>
        <p className="hobby_prose">PC modding and hardware curiosity were etched into my life early on. My dad built PCs regularly, and I grew up watching components come together into functioning systems. That exposure turned into genuine fascination. I don&apos;t just like hardware — I like understanding it.</p>
        <p className="hobby_prose">I enjoy learning about GPU architectures, CPU designs, thermals, power delivery, and performance tradeoffs. I&apos;ll gladly sit through long-form breakdowns explaining why one component is marginally better than another, just to grasp the engineering decisions behind it. That appreciation for human ingenuity — how we design complex systems under constraints — heavily influences how I approach software as well.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">Cars — Expression Through Engineering</h3>
        <p className="hobby_prose">Car modding scratches the same itch as PC hardware, but with more emotion attached. I love both performance tuning and aesthetics — from engine mods to full-on ricing. Old JDM cars especially capture my imagination. My ideal combination would be the exterior of a 1996 Acura NSX-T paired with the interior of a 300ZX Turbo.</p>
        <p className="hobby_prose">Cars represent the intersection of engineering, design, and personal identity — the same intersection I&apos;m constantly drawn to in technology.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">Archery — Focus, Control, and Precision</h3>
        <p className="hobby_prose">Archery is one of the few physical activities I&apos;ve truly stuck with. It doesn&apos;t rely on endurance or speed — things I don&apos;t naturally excel at — but instead demands control, awareness, and precision. Breathing, posture, grip, and muscle tension all matter. It&apos;s quiet, meditative, and intensely technical in its own way.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">Music — The Constant Companion</h3>
        <p className="hobby_prose">Music is omnipresent in my life. I listen to it everywhere — in class (sometimes in secret), at home, while coding, studying, eating, and even sleeping. I gravitate toward pop, hip-hop, and rap, and music heavily influences my pacing, focus, and creative energy. It shapes the rhythm of how I work.</p>
      </div>

      <div className="hobby_section hobby_section_accented">
        <h3 className="hobby_header">Anime, Manga & Manhwa — Endless Worlds</h3>
        <p className="hobby_prose">Anime is easily one of my deepest rabbit holes. I&apos;ve been watching since I was nine and have consumed hundreds of series, ranging from rom-coms to shounen to seinen. Manga and manhwa came later, but just as intensely — I&apos;ve read close to a thousand titles across every imaginable subgenre.</p>
        <p className="hobby_prose">I&apos;m fully aware that I enjoy predictable tropes, regression stories, and generic slop — and I don&apos;t see that as a flaw. There&apos;s comfort in familiarity, joy in execution, and inspiration even in repetition. These stories fuel my imagination, visual taste, and narrative instincts.</p>
      </div>

      <div className="hobby_section">
        <h3 className="hobby_header hobby_header_outro">Why So Many Things?</h3>
        <p className="hobby_prose">I don&apos;t have a clean answer for why I&apos;m into so many things or why I immerse myself so deeply in each one. I spread myself thin, chase too many niches, and refuse to let go — but at this point, they&apos;re etched into my personality. Every interest feeds another. Every obsession sharpens a different part of how I think.</p>
        <p className="hobby_prose">What looks like distraction from the outside is, for me, creative density — a constant cross-pollination of ideas that shapes how I design, build, and solve problems.</p>
      </div>
    </div>
  );

  const employmentText = (
    <div className="employment-content">
      <div className="employment_section">
        <h3 className="employment_header">Professional Journey</h3>
        <p className="employment_prose">As an 11th grade AI and Design Thinking student, I'm at the exciting intersection of academic learning and professional exploration. While I haven't entered the traditional workforce yet, I approach every project and learning opportunity with the mindset of a professional - treating deadlines seriously, communicating clearly, and delivering quality work that exceeds expectations. My extensive technical background and diverse skill set position me uniquely for future opportunities in software development, game design, and emerging technologies.</p>
      </div>

      <div className="employment_section">
        <h3 className="employment_header">Skills for the Future</h3>
        <p className="employment_prose">The technology landscape I've immersed myself in - from full-stack development to game engines, from hardware tinkering to DevOps practices - has prepared me for the multifaceted challenges of modern tech careers. I understand that being employable isn't just about knowing technologies; it's about understanding how they fit together, how to solve real problems, and how to work effectively with others. My competitive programming background has taught me discipline and algorithmic thinking, while my design sensibilities ensure I build products that people actually want to use.</p>
      </div>

      <div className="employment_section">
        <h3 className="employment_header">Looking Ahead</h3>
        <p className="employment_prose">I'm actively seeking opportunities to apply my skills in meaningful ways - whether through internships, freelance projects, or collaborative open-source contributions. I'm particularly drawn to roles that combine technical challenges with creative problem-solving, where I can continue learning while making tangible contributions. My goal isn't just to find a job, but to find environments where my curiosity, technical depth, and design thinking can create real value.</p>
      </div>
    </div>
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
    setLinuxTap(name === 'linux');
    setHobbTap(name === 'hobby');
    setEmploymentTap(name === 'employment');
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
          <p onClick={() => handleBiotap('linux')}
              style={linuxTap ? activeBtnStyle : {}}
          >Linux
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Hobby
          </p>
          <p onClick={() => handleBiotap('employment')}
                  style={employmentTap ? activeBtnStyle : {}}
          >Being Employed
          </p>
          </div>
          <div className="folder_content">
            {/* Who I Am Tab */}
            <div className={`folder_content-bio who-i-am-tab ${generalTap ? 'active' : ''}`}
              style={{ display: generalTap ? 'flex' : 'none' }}
            >
              <img
                alt="bioPC"
                className="bio_img"
                src={bioPC}
              />
              <div className="bio_text_1 bio-scroll-container">
                {bioText}
              </div>   
            </div>

            {/* Technology Tab */}
            <div className={`folder_content-bio technology-tab ${technologyTap ? 'active' : ''}`}
              style={{ display: technologyTap ? 'flex' : 'none' }}
            >
              <img
                alt="tech"
                className="tech_img"
                src={tech}
              />
              <div className="tech_text_container bio-scroll-container">
                {technologyText}
              </div>   
            </div>

            {/* Linux Tab */}
            <div className={`folder_content-bio linux-tab ${linuxTap ? 'active' : ''}`}
              style={{ display: linuxTap ? 'flex' : 'none' }}
            >
              <img
                alt="linux"
                className="tech_img"
                src={linux}
              />
              <div className="tech_text_container bio-scroll-container">
                {linuxText}
              </div>   
            </div>

            {/* Hobby Tab */}
            <div className={`folder_content-bio hobby-tab ${hobbTap ? 'active' : ''}`}
              style={{ display: hobbTap ? 'flex' : 'none' }}
            >
              <img
                alt="hobby"
                className="hobby_img"
                src={hobby}
              />
              <div className="hobby_text_container bio-scroll-container">
                {hobbyText}
              </div>   
            </div>

            {/* Employment Tab */}
            <div className={`folder_content-bio MyBioFolderEmploymentTap ${employmentTap ? 'active' : ''}`}
              style={{ display: employmentTap ? 'flex' : 'none' }}
            >
              <img
                alt="job"
                className="hobby_img"
                src={job}
              />
              <div className="hobby_text_container bio-scroll-container">
                {employmentText}
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
