# 🏔️ Avalanche Escape Game

A thrilling browser-based avalanche escape game where you play as a skier dodging falling snow, ice, rocks, and boulders while racing down a mountain!

## 🎮 How to Play

### Objective
Survive as long as possible by dodging falling objects while skiing down the mountain. Each object you successfully avoid increases your score!

### Controls
- **Desktop:**
  - Arrow Keys or WASD to move your skier
  - SPACE to pause/unpause the game
  - R to restart the game

- **Mobile:**
  - Touch the directional buttons on screen to move
  - Use the game menu buttons for pause/restart

### Game Elements

#### Falling Objects
- **Snow** ❄️ - Small, slow-moving (10 points to dodge)
- **Ice** 🧊 - Medium-sized, faster (20 points to dodge)  
- **Rock** 🪨 - Large, medium speed (30 points to dodge)
- **Boulder** 🗿 - Largest, slower but dangerous (50 points to dodge)

#### Scoring System
- **Dodging objects:** Earn points based on object type
- **Survival bonus:** +5 points for each object that falls off screen
- **Level progression:** Every 500 points increases the level

#### Lives & Progression
- Start with 3 lives ❤️
- Lose a life when hit by any falling object
- Game over when all lives are lost
- Speed and spawn rate increase with each level

## 🚀 Getting Started

### Quick Start
1. Download or clone this repository
2. Open `game/index.html` in your web browser
3. Click "Start Game" and begin playing!

### File Structure
```
game/
├── index.html      # Main game page
├── styles.css      # Game styling and responsive design
├── game.js         # Complete game logic and mechanics
└── README.md       # This file
```

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Game Features

### Core Gameplay
- ✅ Smooth player movement with keyboard/touch controls
- ✅ Multiple falling object types with different behaviors
- ✅ Realistic physics with rotation and varying speeds
- ✅ Collision detection and lives system
- ✅ Progressive difficulty scaling

### Visual Effects
- ✅ Beautiful mountain landscape background
- ✅ Particle effects for collisions and level-ups
- ✅ Screen shake on impact
- ✅ Smooth animations and transitions
- ✅ Speed lines for motion effects

### User Interface
- ✅ Clean, modern design with mountain theme
- ✅ Real-time score, level, and lives display
- ✅ Responsive design for desktop and mobile
- ✅ Intuitive menu system with pause/restart options
- ✅ Mobile-friendly touch controls

### Game States
- ✅ Start menu with instructions
- ✅ Pause functionality
- ✅ Game over screen with final statistics
- ✅ Restart capability

## 🎨 Customization

### Difficulty Tuning
You can modify these values in `game.js` to adjust difficulty:

```javascript
// Initial spawn rate (higher = more objects)
this.objectSpawnRate = 0.02;

// Player speed
this.player.speed = 5;

// Level progression (points needed per level)
const newLevel = Math.floor(this.score / 500) + 1;
```

### Visual Customization
- Modify colors in `styles.css` for different themes
- Adjust canvas size in `index.html` (width/height attributes)
- Change object types and properties in the `objectTypes` array

## 🏆 Tips for High Scores

1. **Stay Mobile:** Keep moving to avoid getting trapped
2. **Watch Patterns:** Objects spawn randomly but you can predict safe zones
3. **Use Full Screen:** Move to corners and edges when needed
4. **Level Strategy:** Higher levels = more points but increased difficulty
5. **Stay Calm:** Don't panic when objects cluster together

## 🐛 Troubleshooting

### Common Issues
- **Game won't start:** Ensure JavaScript is enabled in your browser
- **Controls not working:** Try clicking on the game canvas first
- **Mobile controls unresponsive:** Make sure you're touching the buttons directly
- **Performance issues:** Close other browser tabs or try a different browser

### Performance Optimization
- The game is optimized for 60 FPS gameplay
- Particle effects are automatically cleaned up
- Canvas rendering is efficient for smooth gameplay

## 🤝 Contributing

Want to improve the game? Here are some ideas:
- Add sound effects and background music
- Create power-ups (shields, slow-motion, etc.)
- Add different skier characters
- Implement online leaderboards
- Create different mountain environments
- Add weather effects (wind, storm)

## 📱 Mobile Experience

The game is fully responsive and includes:
- Touch-friendly controls
- Optimized layout for small screens
- Smooth performance on mobile devices
- Portrait and landscape orientation support

## 🎵 Future Enhancements

Planned features for future versions:
- Sound effects and background music
- Multiple character selection
- Different mountain themes
- Power-ups and special abilities
- Online multiplayer mode
- Achievement system

---

**Enjoy the game and try to beat your high score! 🏔️⛷️**

*Created with HTML5 Canvas, CSS3, and vanilla JavaScript - no frameworks required!*