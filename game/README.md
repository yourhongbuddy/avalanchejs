# ❄️ Avalanche Survival Game ❄️

A fun and challenging HTML5 Canvas game built with TypeScript where you navigate through falling snowballs and collect powerups to survive as long as possible!

## 🎮 Game Features

- **Dynamic Gameplay**: Navigate through an avalanche of falling snowballs
- **Powerup System**: Collect different types of powerups (shield, speed, points)
- **Progressive Difficulty**: Game gets harder as you level up
- **Particle Effects**: Beautiful visual effects for collisions and powerups
- **Responsive Design**: Works on different screen sizes
- **Sound Effects**: Immersive audio feedback using Web Audio API

## 🎯 How to Play

1. **Movement**: Use arrow keys or WASD to move your skier
2. **Objective**: Avoid falling snowballs and collect powerups
3. **Scoring**: Collect powerups to earn points
4. **Lives**: You start with 3 lives - avoid snowball collisions!
5. **Levels**: Game gets progressively harder as you score more points

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14.18.0 or higher)
- npm or yarn

### Installation

1. Navigate to the game directory:
   ```bash
   cd game
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🛠️ Technology Stack

- **TypeScript**: For type-safe JavaScript development
- **HTML5 Canvas**: For 2D graphics rendering
- **Vite**: For fast development and building
- **Web Audio API**: For sound effects
- **CSS3**: For styling and animations

## 📁 Project Structure

```
game/
├── src/
│   ├── core/
│   │   ├── InputManager.ts    # Handles keyboard and mouse input
│   │   └── AudioManager.ts    # Manages sound effects and music
│   ├── entities/
│   │   ├── Player.ts          # Player character (skier)
│   │   ├── Snowball.ts        # Falling snowball obstacles
│   │   └── Powerup.ts         # Collectible powerups
│   ├── systems/
│   │   └── ParticleSystem.ts  # Visual effects system
│   ├── ui/
│   │   └── UIManager.ts       # User interface management
│   ├── game/
│   │   └── Game.ts            # Main game logic and loop
│   └── main.ts                # Application entry point
├── index.html                 # Main HTML file
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

## 🎨 Game Mechanics

### Player (Skier)
- Controlled with arrow keys or WASD
- Must avoid falling snowballs
- Can collect powerups for bonuses

### Snowballs
- Fall from the top of the screen
- Speed increases with level
- Collision results in life loss

### Powerups
- **Shield** (Blue): Provides temporary protection
- **Speed** (Orange): Increases movement speed
- **Points** (Green): Awards bonus points

### Scoring System
- Collect powerups: +100 points
- Level up every 1000 points
- Difficulty increases with level

## 🔧 Development

### Adding New Features

1. **New Entities**: Create new classes in the `entities/` directory
2. **New Effects**: Extend the `ParticleSystem` class
3. **New Sounds**: Add to the `AudioManager` class
4. **UI Elements**: Modify the `UIManager` class

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public methods
- Keep functions small and focused

### Testing

```bash
npm test
# or
yarn test
```

## 🎵 Audio Features

The game uses the Web Audio API to generate dynamic sound effects:
- Collision sounds (low frequency sawtooth)
- Powerup collection (high frequency square wave)
- Game over (descending triangle wave)
- Score sounds (sine wave)

## 🎨 Visual Effects

- **Particle System**: Explosions, powerup effects, snow trails
- **Gradient Backgrounds**: Sky to ground gradient
- **Animated Snowflakes**: Background atmospheric effect
- **Smooth Animations**: 60 FPS game loop

## 🚀 Performance Optimizations

- Efficient collision detection
- Particle system with automatic cleanup
- RequestAnimationFrame for smooth rendering
- Canvas optimization techniques

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 Have Fun!

Enjoy playing the Avalanche Survival Game! Try to beat your high score and challenge your friends to do better.

---

**Happy Gaming! 🎮❄️**