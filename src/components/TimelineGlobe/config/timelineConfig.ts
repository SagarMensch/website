export type TimelineMode = 'segment' | 'framer';

// Change this to 'segment' or 'framer' to switch between the two overall styles
const mode: TimelineMode = 'framer';

const segmentPreset = {
  globe: {
    radius: 2, // Size of the globe
    color: '#00081a', // Base color of the solid sphere
    gridColor: '#0055ff', // Color of the wireframe grid
    gridOpacity: 0.15, // How visible the grid is
    gridLines: { lat: 12, long: 24 }, // Number of latitude and longitude lines
    tilt: { x: 0.0, y: 0.0, z: 0.0 }, // Rotation of the globe
    rotates: true, // Whether the globe constantly spins
  },
  path: {
    radiusOffset: 0.05, // How far the line floats above the globe surface
    turns: 1.8, // How many times the line spirals around the globe
    verticalSpread: 0.8, // How much of the globe's height the spiral covers (0.0 to 1.0)
    totalPoints: 400, // Resolution of the line (higher = smoother curves)
    coreLine: { color: '#ffffff', thickness: 1, opacity: 0.9 }, // The inner bright line
    glowLine: { color: '#0077ff', thickness: 3, opacity: 0.4 } // The outer blurred glow
  },
  nodes: {
    activeSize: 0.08, // Size of the crystal when reached
    inactiveSize: 0.04, // Size of the crystal when in the future
    activeColor: '#aaddff', // Color of the crystal when reached
    inactiveColor: '#112244', // Color of the crystal in the future
    emissiveColor: '#0066ff', // The glow color of the active crystal
    pulseSpeed: 4, // How fast the active crystal pulses in size
    pulseRingSize: 0.15, // Base size of the expanding pulse field
    labelFontSize: '12px', // Size of the '01', '02' numbers
    labelPadding: '2px 8px', // Padding inside the number pill
    labelBg: '#1c1c1c', // Background color of the number pill
    labelActiveColor: '#aaddff', // Text color of active number
    labelInactiveColor: '#dddddd', // Text color of inactive number
  },
  cards: {
    style: 'glass', // 'glass' adds background blur, 'solid' is opaque
    scale: 1, // Change this single variable (e.g., 0.8 or 1.2) to scale the entire card
    width: '280px', // The physical width of the HTML card
    padding: '20px', // Inner spacing of the card
    background: 'rgba(10, 15, 30, 0.6)', // Card background color
    border: 'rgba(100, 150, 255, 0.15)', // Card border color
    titleSize: '18px', // Font size for the title
    descriptionSize: '14px', // Font size for the description
    gap: '16px', // Gap between text and image
    tagBg: '#0033cc', // Background of the small category pill
    tagColor: '#aaddff', // Text color of the small category pill
  },
};

const framerPreset = {
  globe: {
    radius: 1.5,
    color: '#08080a',
    gridColor: '#ffffff',
    gridOpacity: 0.15,
    gridLines: { lat: 10, long: 20 }, // Less lines for cleaner look
    tilt: { x: 0.4, y: 0.1, z: -0.3}, // Static tilt for Framer mode
    rotates: false,
  },
  path: {
    radiusOffset: 0.05, 
    turns: 3, // Lower turns means a flatter line
    verticalSpread: 0.8, // Reduced to 0.4 to make the line flatter/closer to equator, reducing the steep angle
    totalPoints: 400,
    coreLine: { color: '#ffb3c1', thickness: 1.5, opacity: 0.9 },
    glowLine: { color: '#e83a59', thickness: 4, opacity: 0.5 }
  },
  nodes: {
    activeSize: 0.08,
    inactiveSize: 0.05,
    activeColor: '#ffffff',
    inactiveColor: '#ffb3c1',
    emissiveColor: '#e83a59',
    pulseSpeed: 1, // Slowed down pulse significantly
    pulseRingSize: 0.12, 
    
    // ==========================================
    // ⬇️ CHANGE THE NUMBERING SIZE HERE ⬇️
    // ==========================================
    labelFontSize: '4px', // <--- Change this to make the '01', '02' numbers bigger or smaller
    labelPadding: '1.5px 3.5px', // <--- Change this to make the black pill around the number bigger or smaller
    
    labelBg: '#161616', 
    labelActiveColor: '#ff4d6d', 
    labelInactiveColor: '#ffffff', 
  },
  cards: {
    style: 'solid',
    scale: 0.375, // Single variable to easily scale the solid cards
    width: '300px',
    padding: '16px',
    background: '#131315',
    border: '#262626',
    titleSize: '16px',
    descriptionSize: '13px',
    gap: '12px',
    tagBg: '#3d1620', // Brighter red so the background is clearly visible
    tagColor: '#ff4d6d',
  },
};

export const timelineConfig = {
  mode,
  ...(mode === 'segment' ? segmentPreset : framerPreset),
  milestones: [
    { 
      title: "SequelString was established", 
      date: "March 2018", 
      description: "Mr. Ravish started SequelString with a vision in his mind.", 
      category: "Begining",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.1, // Exact percentage along the line (0.0 to 1.0)
    },
    { 
      title: "First 50 clients serverd", 
      date: "August 2019", 
      description: "Automated 50 business workflows ", 
      category: "Growth",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.2, 
    },
    { 
      title: "Launched One TIcket", 
      date: "June 2023", 
      description: "Created a centralised platform for railway in mumbai", 
      category: "Product",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.3, 
    },
    { 
      title: "Inaugurated Mumbai Branch", 
      date: "January 2025", 
      description: "Changed our approach incorporating AI and delievering agent rich products", 
      category: "Milestone",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.4, 
    },
    { 
      title: "Reached XYZ Valuation", 
      date: "January 2025", 
      description: "Changed our approach incorporating AI and delievering agent rich products", 
      category: "Milestone",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.5, 
    },

    { 
      title: "Changed direction towards OCR", 
      date: "January 2025", 
      description: "Changed our approach incorporating AI and delievering agent rich products", 
      category: "Milestone",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.6, 
    },
    { 
      title: "Reached 100 Employees", 
      date: "January 2025", 
      description: "Changed our approach incorporating AI and delievering agent rich products", 
      category: "Milestone",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.7, 
    },
    { 
      title: "AI adoption", 
      date: "January 2025", 
      description: "Changed our approach incorporating AI and delievering agent rich products", 
      category: "Milestone",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.8, 
    },
    { 
      title: "ABC certification", 
      date: "January 2025", 
      description: "Changed our approach incorporating AI and delievering agent rich products", 
      category: "Milestone",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 0.9, 
    },
    
    { 
      title: "Document as an infrastructure", 
      date: "January 2025", 
      description: "Changed our approach incorporating AI and delievering agent rich products", 
      category: "Milestone",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400&h=200",
      progressOffset: 1, 
    },
  ]
};
