import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import bioPC from '../assets/pfp.jpg'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import linux from '../assets/Tux linux.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [linuxTap, setLinuxTap] = useState(false)
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
    <div className="technology-content">
      <div className="tech_section">
        <h3 className="tech_header">Web & Frontend</h3>
        <p className="tech_prose">I gravitate toward tools that let me design, iterate, and ship experiences that feel good to use. On the web, I enjoy crafting responsive, interactive interfaces using React, Vue, Angular, and modern CSS, with Tailwind CSS helping me move fast without sacrificing polish. I care deeply about spacing, motion, responsiveness, and consistency — not just how something looks, but how it behaves across devices and interactions.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
          <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js" />
          <img src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
          <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
          <img src="https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white" alt="CSS" />
          <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
          <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
          <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer" />
          <img src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white" alt="Canva" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Backend & Databases</h3>
        <p className="tech_prose">When building websites and applications, I naturally lean frontend-first, but I&apos;m comfortable working full-stack when the product demands it. I use Node.js with Express, NestJS, and Next.js to build scalable backends and performant web apps, pairing them with databases like MongoDB, PostgreSQL, and MySQL depending on the problem. I don&apos;t just wire things together — I like understanding the tradeoffs between tools, architectures, and data models so I can choose what actually fits the project.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
          <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
          <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
          <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
          <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
          <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
          <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
          <img src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
          <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
          <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Game Development</h3>
        <p className="tech_prose">Game development is where my technical curiosity and creative side collide. I enjoy building both 2D and 3D experiences, working with Unity, Unreal Engine, and Godot, and using Blender for asset creation and iteration. What excites me most about games is the combination of systems, mechanics, visuals, and player experience — every small technical decision directly affects how something feels to play.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white" alt="Unity" />
          <img src="https://img.shields.io/badge/Unreal_Engine-313131?style=for-the-badge&logo=unreal-engine&logoColor=white" alt="Unreal Engine" />
          <img src="https://img.shields.io/badge/GODOT-%23FFFFFF.svg?style=for-the-badge&logo=godot-engine" alt="Godot" />
          <img src="https://img.shields.io/badge/Blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white" alt="Blender" />
          <img src="https://img.shields.io/badge/Roblox-%230a0b0b.svg?style=for-the-badge&logo=Roblox&logoColor=white" alt="Roblox" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Hardware & Electronics</h3>
        <p className="tech_prose">I also spend time working closer to the hardware, experimenting with Arduino and Raspberry Pi to understand how software interacts with the physical world. That hands-on experience helps ground my thinking and improves how I design systems at higher levels.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white" alt="Arduino" />
          <img src="https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white" alt="Raspberry Pi" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Tools & DevOps</h3>
        <p className="tech_prose">Across all of this, I rely heavily on Git, GitHub, Docker, Linux environments, and Firebase to keep my workflow clean, reproducible, and scalable. I&apos;m comfortable moving between Windows and multiple Linux distributions, and I treat tooling as part of the craft, not an afterthought.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
          <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
          <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
          <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
        </div>
      </div>

      <div className="tech_section">
        <h3 className="tech_header">Languages</h3>
        <p className="tech_prose">As for languages, I enjoy working most with JavaScript, TypeScript, C and C++, C#, and game-oriented languages like GDScript — tools that give me direct control over behavior, performance, and interaction. I use Python when it&apos;s the right tool, especially for scripting or backend tasks, but it&apos;s not where my passion lies. I prefer languages and ecosystems that let me build visually rich, interactive systems and iterate quickly on ideas.</p>
        <div className="tech_badges">
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
          <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
          <img src="https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white" alt="C" />
          <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" />
          <img src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white" alt="C#" />
          <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />
          <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
          <img src="https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin" />
          <img src="https://img.shields.io/badge/dart-%230175C2.svg?style=for-the-badge&logo=dart&logoColor=white" alt="Dart" />
          <img src="https://img.shields.io/badge/GDScript-%2374267B.svg?style=for-the-badge&logo=godotengine&logoColor=white" alt="GDScript" />
        </div>
      </div>
    </div>
  );

  const linuxText = (
    <div className="technology-content">
      <div className="tech_section">
        <h3 className="tech_header">Linux, Ricing, and Living Inside My OS</h3>
        <p className="tech_prose">My relationship with Linux started early — earlier than most people even realize what an operating system is. In the 4th grade, my school issued us dedicated PCs that came preinstalled with Ubuntu, and that was my first real exposure to Linux. At the time, I didn&apos;t fully understand what made it different, but I lived with it for almost a year, learning its quirks and limitations simply by using it every day. Eventually, curiosity got the better of me, and I installed Fedora, diving headfirst into customization — which, unsurprisingly, got me into trouble at school.</p>
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
        <h3 className="tech_header">The Headspace</h3>
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
          <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions" />
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
