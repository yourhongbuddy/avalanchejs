# Avalanche Game

An interactive blockchain-based game built on the Avalanche network. Experience the thrill of gaming with real blockchain integration, earning rewards, and competing on global leaderboards.

## 🎮 Features

- **Avalanche-themed Gameplay**: Navigate through falling snowflakes while collecting coins
- **Blockchain Integration**: Built on the Avalanche blockchain for fast, secure transactions
- **Wallet Integration**: Connect your wallet to earn and manage rewards
- **Global Leaderboards**: Compete with players worldwide
- **Real-time Scoring**: Track your progress and achievements
- **Responsive Design**: Beautiful UI that works on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14.18.0 or higher)
- npm or yarn package manager

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

## 🎯 How to Play

1. **Start the Game**: Click "Play" from the main menu
2. **Navigate**: Use arrow keys to move your character
3. **Collect Coins**: Avoid snowflakes and collect falling coins
4. **Earn Points**: Each coin collected gives you 10 points
5. **Stay Alive**: Don't let snowflakes hit your character
6. **Compete**: Try to beat your high score and climb the leaderboard

## 🏗️ Project Structure

```
game/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Home.tsx        # Landing page
│   │   ├── Game.tsx        # Main game component
│   │   ├── Leaderboard.tsx # Leaderboard display
│   │   └── Wallet.tsx      # Wallet management
│   ├── utils/
│   │   └── GameContext.tsx # Game state management
│   ├── types/              # TypeScript type definitions
│   ├── assets/             # Game assets
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── README.md              # This file
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons
- **React Router**: Client-side routing
- **Avalanche SDK**: Blockchain integration

## 🎨 Game Mechanics

### Scoring System
- **Coins**: +10 points each
- **Survival Time**: Points increase over time
- **High Score**: Best score is saved locally

### Difficulty Progression
- Snowflakes fall faster as time progresses
- More coins appear at higher levels
- Collision detection ensures fair gameplay

### Blockchain Features
- Wallet connection for rewards
- Transaction history tracking
- Token earning system
- NFT integration (planned)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Features

1. Create new components in `src/components/`
2. Add types in `src/types/`
3. Update game state in `src/utils/GameContext.tsx`
4. Add routes in `src/App.tsx`

### Styling Guidelines

- Use styled-components for component styling
- Follow the existing color scheme and design patterns
- Use Framer Motion for animations
- Ensure responsive design for all screen sizes

## 🌐 Blockchain Integration

The game integrates with the Avalanche blockchain:

- **Network**: Avalanche C-Chain (Ethereum-compatible)
- **Testnet**: Uses Fuji testnet for development
- **Mainnet**: Ready for mainnet deployment
- **Wallet Support**: MetaMask and other Web3 wallets

### Wallet Features
- Connect/disconnect wallet
- View transaction history
- Manage game tokens
- NFT marketplace (planned)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project
2. Upload the `dist/` folder to Netlify
3. Configure build settings if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Avalanche Labs for the blockchain infrastructure
- React team for the amazing framework
- Vite team for the fast build tool
- All contributors and testers

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy Gaming! 🎮⚡**