export class UIManager {
  private scoreElement: HTMLElement | null;
  private livesElement: HTMLElement | null;
  private levelElement: HTMLElement | null;

  constructor() {
    this.scoreElement = document.getElementById('score');
    this.livesElement = document.getElementById('lives');
    this.levelElement = document.getElementById('level');
  }

  public updateScore(score: number): void {
    if (this.scoreElement) {
      this.scoreElement.textContent = score.toString();
    }
  }

  public updateLives(lives: number): void {
    if (this.livesElement) {
      this.livesElement.textContent = lives.toString();
      
      // Add visual feedback for low lives
      if (lives <= 1) {
        this.livesElement.style.color = '#FF4444';
        this.livesElement.style.textShadow = '0 0 10px #FF4444';
      } else {
        this.livesElement.style.color = 'white';
        this.livesElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
      }
    }
  }

  public updateLevel(level: number): void {
    if (this.levelElement) {
      this.levelElement.textContent = level.toString();
      
      // Add visual feedback for level up
      if (level > 1) {
        this.levelElement.style.color = '#FFD700';
        this.levelElement.style.textShadow = '0 0 10px #FFD700';
        
        // Reset color after a short delay
        setTimeout(() => {
          if (this.levelElement) {
            this.levelElement.style.color = 'white';
            this.levelElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
          }
        }, 1000);
      }
    }
  }

  public showMessage(message: string, duration: number = 2000): void {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      z-index: 25;
      animation: fadeInOut ${duration}ms ease-in-out;
    `;

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      }
    `;
    document.head.appendChild(style);

    const gameContainer = document.getElementById('gameContainer');
    if (gameContainer) {
      gameContainer.appendChild(messageElement);
      
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.parentNode.removeChild(messageElement);
        }
      }, duration);
    }
  }

  public showLevelUp(level: number): void {
    this.showMessage(`Level ${level}!`, 1500);
  }

  public showGameOver(score: number): void {
    const gameOverElement = document.getElementById('gameOver');
    const finalScoreElement = document.getElementById('finalScore');
    
    if (gameOverElement && finalScoreElement) {
      finalScoreElement.textContent = score.toString();
      gameOverElement.style.display = 'block';
    }
  }

  public hideGameOver(): void {
    const gameOverElement = document.getElementById('gameOver');
    if (gameOverElement) {
      gameOverElement.style.display = 'none';
    }
  }
}