export class Powerup {
  public x: number;
  public y: number;
  public width = 30;
  public height = 30;
  private speed = 2;
  private rotation = 0;
  private rotationSpeed = 0.05;
  private pulse = 0;
  private pulseSpeed = 0.1;
  private type: 'shield' | 'speed' | 'points';

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.type = this.getRandomType();
  }

  private getRandomType(): 'shield' | 'speed' | 'points' {
    const types: ('shield' | 'speed' | 'points')[] = ['shield', 'speed', 'points'];
    return types[Math.floor(Math.random() * types.length)];
  }

  public update(deltaTime: number): void {
    // Move downward
    this.y += this.speed * (deltaTime / 16);
    
    // Rotate the powerup
    this.rotation += this.rotationSpeed * (deltaTime / 16);
    
    // Pulse effect
    this.pulse += this.pulseSpeed * (deltaTime / 16);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    const pulseScale = 1 + Math.sin(this.pulse) * 0.1;
    ctx.scale(pulseScale, pulseScale);

    switch (this.type) {
      case 'shield':
        this.renderShield(ctx);
        break;
      case 'speed':
        this.renderSpeed(ctx);
        break;
      case 'points':
        this.renderPoints(ctx);
        break;
    }

    ctx.restore();
  }

  private renderShield(ctx: CanvasRenderingContext2D): void {
    // Draw shield powerup
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
    gradient.addColorStop(0, '#4FC3F7');
    gradient.addColorStop(1, '#2196F3');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw shield icon
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  private renderSpeed(ctx: CanvasRenderingContext2D): void {
    // Draw speed powerup
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
    gradient.addColorStop(0, '#FF9800');
    gradient.addColorStop(1, '#F57C00');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw lightning bolt
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(-3, -8);
    ctx.lineTo(2, -2);
    ctx.lineTo(-1, 0);
    ctx.lineTo(3, 8);
    ctx.lineTo(-2, 2);
    ctx.lineTo(1, 0);
    ctx.closePath();
    ctx.fill();
  }

  private renderPoints(ctx: CanvasRenderingContext2D): void {
    // Draw points powerup
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#388E3C');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw star
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const x = Math.cos(angle) * 8;
      const y = Math.sin(angle) * 8;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  public getType(): 'shield' | 'speed' | 'points' {
    return this.type;
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