import { InputManager } from '../core/InputManager';
import { AudioManager } from '../core/AudioManager';
import { Player } from '../entities/Player';
import { Snowball } from '../entities/Snowball';
import { Powerup } from '../entities/Powerup';
import { ParticleSystem } from '../systems/ParticleSystem';
import { UIManager } from '../ui/UIManager';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private inputManager: InputManager;
  private audioManager: AudioManager;
  private uiManager: UIManager;
  private particleSystem: ParticleSystem;

  // Game entities
  private player: Player;
  private snowballs: Snowball[] = [];
  private powerups: Powerup[] = [];

  // Game state
  private isRunning = false;
  private score = 0;
  private lives = 3;
  private level = 1;
  private gameTime = 0;
  private lastTime = 0;

  // Game settings
  private readonly SNOWBALL_SPAWN_RATE = 60; // frames
  private readonly POWERUP_SPAWN_RATE = 300; // frames
  private readonly LEVEL_UP_SCORE = 1000;

  constructor(canvas: HTMLCanvasElement, inputManager: InputManager, audioManager: AudioManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.inputManager = inputManager;
    this.audioManager = audioManager;
    this.uiManager = new UIManager();
    this.particleSystem = new ParticleSystem();

    // Initialize player
    this.player = new Player(canvas.width / 2, canvas.height - 100);
  }

  public start(): void {
    this.isRunning = true;
    this.gameLoop();
  }

  public reset(): void {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.gameTime = 0;
    this.snowballs = [];
    this.powerups = [];
    this.player.reset();
    this.particleSystem.clear();
    this.uiManager.updateScore(this.score);
    this.uiManager.updateLives(this.lives);
    this.uiManager.updateLevel(this.level);
  }

  public handleResize(): void {
    // Handle canvas resize if needed
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  private gameLoop(currentTime = 0): void {
    if (!this.isRunning) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((time) => this.gameLoop(time));
  }

  private update(deltaTime: number): void {
    this.gameTime += deltaTime;

    // Update player
    this.player.update(deltaTime, this.inputManager, this.canvas);

    // Update snowballs
    this.updateSnowballs(deltaTime);

    // Update powerups
    this.updatePowerups(deltaTime);

    // Update particle system
    this.particleSystem.update(deltaTime);

    // Spawn new entities
    this.spawnEntities();

    // Check collisions
    this.checkCollisions();

    // Update UI
    this.uiManager.updateScore(this.score);
    this.uiManager.updateLives(this.lives);
    this.uiManager.updateLevel(this.level);
  }

  private updateSnowballs(deltaTime: number): void {
    for (let i = this.snowballs.length - 1; i >= 0; i--) {
      const snowball = this.snowballs[i];
      snowball.update(deltaTime);

      // Remove snowballs that are off screen
      if (snowball.y > this.canvas.height + 50) {
        this.snowballs.splice(i, 1);
      }
    }
  }

  private updatePowerups(deltaTime: number): void {
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const powerup = this.powerups[i];
      powerup.update(deltaTime);

      // Remove powerups that are off screen
      if (powerup.y > this.canvas.height + 50) {
        this.powerups.splice(i, 1);
      }
    }
  }

  private spawnEntities(): void {
    // Spawn snowballs
    if (this.gameTime % this.SNOWBALL_SPAWN_RATE < 16) { // 60 FPS
      const x = Math.random() * (this.canvas.width - 40) + 20;
      const speed = 2 + Math.random() * 3 + this.level * 0.5;
      this.snowballs.push(new Snowball(x, -50, speed));
    }

    // Spawn powerups
    if (this.gameTime % this.POWERUP_SPAWN_RATE < 16) {
      const x = Math.random() * (this.canvas.width - 40) + 20;
      this.powerups.push(new Powerup(x, -50));
    }
  }

  private checkCollisions(): void {
    // Check player-snowball collisions
    for (let i = this.snowballs.length - 1; i >= 0; i--) {
      const snowball = this.snowballs[i];
      if (this.player.checkCollision(snowball)) {
        this.snowballs.splice(i, 1);
        this.lives--;
        this.audioManager.playCollisionSound();
        this.particleSystem.createExplosion(snowball.x, snowball.y);
        
        if (this.lives <= 0) {
          this.gameOver();
        }
      }
    }

    // Check player-powerup collisions
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const powerup = this.powerups[i];
      if (this.player.checkCollision(powerup)) {
        this.powerups.splice(i, 1);
        this.score += 100;
        this.audioManager.playPowerupSound();
        this.particleSystem.createPowerupEffect(powerup.x, powerup.y);
      }
    }

    // Check for level up
    if (this.score >= this.level * this.LEVEL_UP_SCORE) {
      this.level++;
      this.audioManager.playScoreSound();
    }
  }

  private gameOver(): void {
    this.isRunning = false;
    // The main.ts will handle showing the game over screen
    (window as any).avalancheGame.showGameOver(this.score);
  }

  private render(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background
    this.drawBackground();

    // Draw entities
    this.player.render(this.ctx);
    this.snowballs.forEach(snowball => snowball.render(this.ctx));
    this.powerups.forEach(powerup => powerup.render(this.ctx));

    // Draw particle effects
    this.particleSystem.render(this.ctx);
  }

  private drawBackground(): void {
    // Create a gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(1, '#98FB98'); // Pale green
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw some snowflakes in the background
    this.drawSnowflakes();
  }

  private drawSnowflakes(): void {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 50; i++) {
      const x = (i * 17) % this.canvas.width;
      const y = (i * 23 + this.gameTime * 0.1) % this.canvas.height;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 1, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}