import { Game } from './game/Game';
import { InputManager } from './core/InputManager';
import { AudioManager } from './core/AudioManager';

class AvalancheGame {
  private game: Game;
  private inputManager: InputManager;
  private audioManager: AudioManager;
  private isGameRunning = false;

  constructor() {
    this.initializeGame();
    this.setupEventListeners();
  }

  private initializeGame(): void {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('Canvas element not found');
    }

    this.audioManager = new AudioManager();
    this.inputManager = new InputManager();
    this.game = new Game(canvas, this.inputManager, this.audioManager);
  }

  private setupEventListeners(): void {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');

    if (startButton) {
      startButton.addEventListener('click', () => this.startGame());
    }

    if (restartButton) {
      restartButton.addEventListener('click', () => this.restartGame());
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.isGameRunning) {
        this.game.handleResize();
      }
    });
  }

  private startGame(): void {
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
      startScreen.style.display = 'none';
    }

    this.isGameRunning = true;
    this.game.start();
    this.audioManager.playBackgroundMusic();
  }

  private restartGame(): void {
    const gameOverScreen = document.getElementById('gameOver');
    if (gameOverScreen) {
      gameOverScreen.style.display = 'none';
    }

    this.game.reset();
    this.startGame();
  }

  public showGameOver(score: number): void {
    this.isGameRunning = false;
    this.audioManager.stopBackgroundMusic();
    this.audioManager.playGameOverSound();

    const gameOverScreen = document.getElementById('gameOver');
    const finalScoreElement = document.getElementById('finalScore');
    
    if (gameOverScreen && finalScoreElement) {
      finalScoreElement.textContent = score.toString();
      gameOverScreen.style.display = 'block';
    }
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const avalancheGame = new AvalancheGame();
  
  // Make it globally accessible for debugging
  (window as any).avalancheGame = avalancheGame;
});