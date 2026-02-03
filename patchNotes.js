const patchNotes = [
  {
    head: "**DOOM Game Integration**",
    date: "Latest",
    notes: [
      "Fully playable DOOM game with js-dos emulator integration",
      "Fullscreen mode with proper 4:3 aspect ratio maintenance",
      "Enhanced maximize button functionality for true fullscreen experience",
      "Automatic letterboxing with black bars for authentic retro display",
      "Improved canvas scaling and display optimization",
      "Removed redundant fullscreen button for cleaner interface"
    ]
  },
  {
    head: "**Enhanced Bio Folder**",
    date: "Latest",
    notes: [
      "Updated technology stack with categorized sections for better organization",
      "Improved tab formatting with consistent CSS classes across all sections",
      "Added new 'Being Employed' section with professional experience content",
      "Enhanced visual consistency and readability throughout bio sections"
    ]
  },
  {
    head: "**Footer**",
        notes: [
      "Now icon will be added and delete dynamically, and width will be adjusted automatically",
      "New icon will be able to be added on the footer bottom right corner"
    ]
  },
  {
    head: "**Store**",
        notes: [
      "All apps are now able to install and uninstall in the store",
    ]
  },
  {
    head: "**Tile**",
        notes: [
      "All the apps that being installed or uninstalled are now being add or remove on Tile as well",
    ]
  },
  {
    head: "**Store**",
        notes: [
      "All the apps in Store are now free to install",
      "Animation will be added when installing apps from Store",
    ]
  },
  {
    head: "**Bin**",
        notes: [
      "Added confirmation before permanently delete file",
    ]
  },
  {
    head: "**Store**",
        notes: [
      "Added Store icon",
    ]
  },
  {
    head: "**Google Toggable Search Bar**",
        notes: [
      "Added togglable Google Search bar ",
    ]
  },
  {
    head: "**Right click pannel**",
        notes: [
      "Added sorting icon right click",
      "Each folder's icons can be sorted by name",
    ]
  },
  {
    head: "**MSN APP**",
    
    notes: [
      "Add MSN nudge sound effect",
      "Send nudge to server and broadcast to all clients",
      "Nudge shakes the chat window",
    ]
  },
  {
    head: "**BTC Widget**",
    
    notes: [
      "Add bitcoin chart",
      "Re-design BTC widget",
    ]
  },
  {
    head: "**Recycle Bin**",
    
    notes: [
      "User now can now permanently delete files on recycle bin",
    ]
  },
  {
    head: "**System**",
    
    notes: [
      "User now can create Folders",
      "Folders and items can be dropped into created folders"
    ]
  },
  {
    head: "**Added Task Manager**",
    
    notes: [
      "Added Task Manager app.",
      "Can view and manage running programs.",
    ]
  },
  {
    head: "**MSN App**",
    
    notes: [
      "Added Reconnect to chat"
    ]
  },
  {
    head: "**Tile grid App**",
    
    notes: [
      "Added Icons"
    ]
  },
  {
    head: "**Tile grid App**",
    
    notes: [
      "Added fetching background from tile screen mode with toggle on/off"
    ]
  },
  {
    head: "**Added Tile grid App**",
    
    notes: [
      "Added Tile grid App",
      "More feature will be added later..",
      "Inspred by Windows 10 and Windows phone",
    ]
  },
  {
    head: "**NEW FORTUNE APP**",
    
    notes: [
      "Added Fortune Teller app.",
      "Can predict your weekly fortune",
    ]
  },
  {
    head: "**MSN APP**",
    
    notes: [
      "Added AI Chat Bot to MSN app.",
      "Chat Bot is able to be switched on/off.",
      "Auto activate Chat Bot when no other users are online.",
    ]
  },
  {
    head: "**New Project**",
    
    notes: [
      "Added 3D Object in Project folder.",
    ]
  },
  {
    head: "**Clippy**",
    
    notes: [
      "Added Clippy's new speech.",
    ]
  },
  {
    head: "**Setting Background**",
    
    notes: [
      "Added color picker to Settings for background customization.",
    ]
  },
  {
    head: "**Weather App**",
    
    notes: [
      "Now weather prediction can track user's local time.",
      "Added Weather 🌙 sticker when its night time."
    ]
  },
  {
    head: "**Patch App**",
    
    notes: [
      "Patch App officially added to system."
    ]
  },
  {
    head: "**News & Weather**",
    
    notes: [
      "Added toggle between Celsius and Fahrenheit."
    ]
  },
  {
    head: "**News & Weather**",
    
    notes: [
      "Temperature detection now uses user's location.",
      "Integrated into News app."
    ]
  },
  {
    head: "**News & Weather**",
    
    notes: [
      "Added News icon to taskbar.",
      "Displays latest news articles fetched from backend."
    ]
  },
  {
    head: "**Apps**",
    
    notes: [
      "Started AiAgent project."
    ]
  },
  {
    head: "**Apps**",
    
    notes: [
      "Added Paint app using [jspaint](https://github.com/1j01/jspaint) library."
    ]
  },
  {
    head: "**System Functionality Updates**",
    
    notes: [
      "Right-click enabled on icons in Recycle Bin.",
      "Restore deleted icons to original position."
    ]
  },
  {
    head: "**System Functionality Updates**",
    
    notes: [
      "Right-click added to desktop icons.",
      "Mobile long-press support added for context menu."
    ]
  },
  {
    head: "**System Functionality Updates**",
    
    notes: [
      "Added 'My Computer' icon.",
      "Started work on file system architecture."
    ]
  },
  {
    head: "**Settings**",
    
    notes: [
      "Added effect pattern options to Settings."
    ]
  },
  {
    head: "**MSN Chat App**",
    
    notes: [
      "MSN chat now uses WebSocket for faster communication.",
      "Reconnects automatically after navigation or reload."
    ]
  },
  {
    head: "**Footer & Clock**",
    
    notes: [
      "Icon size is now adjustable via clock footer button."
    ]
  },
  {
    head: "**Bitcoin Tracker**",
    
    notes: [
      "Added BTC real-time tracker via Coinbase WebSocket.",
      "Icon celebrates $100K milestone and is toggleable on tab bar."
    ]
  },
  {
    head: "**Notifications**",
    
    notes: [
      "Added launch-time system notification and animation.",
      "Pop-up message now appears when new MSN message arrives (even when closed)."
    ]
  },
  {
    head: "**MSN Chat App**",
    
    notes: [
      "Live MSN chat app built with Node, Express, MongoDB.",
      "Session expiration key added to block spam.",
      "Server-side filter and auto-deletion of spam enabled."
    ]
  },
  {
    head: "**Drag-and-Drop Feature**",
    
    notes: [
      "Icons can be dragged into folders.",
      "Bug fixed where dragging out of folder caused layout bugs using key-based container re-mount.",
      "Icon state now saved to localStorage."
    ]
  },
  {
    head: "**Settings**",
    
    notes: [
      "Wallpaper selection now available in Settings.",
      "Theme updates automatically with wallpaper."
    ]
  },
  {
    head: "**System Functionality Updates**",
    
    notes: [
      "Start menu now supports subfolders (Windows 95 style)."
    ]
  },
  {
    head: "**Mini-Games**",
    
    notes: [
      "Minesweeper game added.",
      "Flags can be placed directly on desktop tiles."
    ]
  },
  {
    head: "**Interactive Components**",
    
    notes: [
      "Login page added with Mario animation.",
      "Clicking '?' increases Mario’s size."
    ]
  },
  {
    head: "**Interactive Components**",
    
    notes: [
      "Added shutdown button with options: Shutdown, Restart, Log Out.",
      "Shutdown animation integrated."
    ]
  },
  {
    head: "**Footer & Clock**",
    
    notes: [
      "Clicking on clock opens calendar widget."
    ]
  },
  {
    head: "**Run Command**",
    
    notes: [
      "Run command window added.",
      "Fully functional with error handling for incorrect file names."
    ]
  },
  {
    head: "**Clippy Assistant**",
    
    notes: [
      "Clippy assistant introduced with motivational speeches.",
      "Clippy now gives context-aware advice when interacting with components."
    ]
  },
  {
    head: "**UI Framework**",
    
    notes: [
      "Drag and Drop window support added.",
      "Start Menu UI created.",
      "Windows now resizable and support shrink/expand.",
      "Icons support single-click highlight and double-click open.",
      "Double-click also works on mobile using useState time-check logic."
    ]
  }
];


export default patchNotes;
