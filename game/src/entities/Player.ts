import { InputManager } from '../core/InputManager';

export class Player {
  public x: number;
  public y: number;
  private width = 40;
  private height = 40;
  private speed = 300; // pixels per second
  private startX: number;
  private startY: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
  }

  public update(deltaTime: number, inputManager: InputManager, canvas: HTMLCanvasElement): void {
    const movement = inputManager.getMovementInput();
    const moveDistance = (this.speed * deltaTime) / 1000; // Convert to seconds

    // Update position based on input
    this.x += movement.x * moveDistance;
    this.y += movement.y * moveDistance;

    // Keep player within canvas bounds
    this.x = Math.max(this.width / 2, Math.min(canvas.width - this.width / 2, this.x));
    this.y = Math.max(this.height / 2, Math.min(canvas.height - this.height / 2, this.y));
  }

  public render(ctx: CanvasRenderingContext2D): void {
    // Draw player as a skier
    ctx.save();
    
    // Draw skier body
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    
    // Draw skier head
    ctx.fillStyle = '#FFE4B5';
    ctx.beginPath();
    ctx.arc(this.x, this.y - this.height / 2 - 10, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw skis
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x - 25, this.y + this.height / 2, 50, 8);
    
    // Draw ski poles
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x - 15, this.y - this.height / 2);
    ctx.lineTo(this.x - 15, this.y + this.height / 2 + 10);
    ctx.moveTo(this.x + 15, this.y - this.height / 2);
    ctx.lineTo(this.x + 15, this.y + this.height / 2 + 10);
    ctx.stroke();
    
    // Draw goggles
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.x - 5, this.y - this.height / 2 - 8, 3, 0, Math.PI * 2);
    ctx.arc(this.x + 5, this.y - this.height / 2 - 8, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  public checkCollision(entity: { x: number; y: number; width?: number; height?: number; radius?: number }): boolean {
    const entityWidth = entity.width || (entity.radius ? entity.radius * 2 : 0);
    const entityHeight = entity.height || (entity.radius ? entity.radius * 2 : 0);
    
    if (entityWidth && entityHeight) {
      // Rectangle collision
      return (
        this.x - this.width / 2 < entity.x + entityWidth / 2 &&
        this.x + this.width / 2 > entity.x - entityWidth / 2 &&
        this.y - this.height / 2 < entity.y + entityHeight / 2 &&
        this.y + this.height / 2 > entity.y - entityHeight / 2
      );
    } else if (entity.radius) {
      // Circle collision
      const dx = this.x - entity.x;
      const dy = this.y - entity.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < (this.width / 2 + entity.radius);
    }
    
    return false;
  }

  public reset(): void {
    this.x = this.startX;
    this.y = this.startY;
  }

  public getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }
}