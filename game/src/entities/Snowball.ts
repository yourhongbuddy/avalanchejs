export class Snowball {
  public x: number;
  public y: number;
  public radius: number;
  private speed: number;
  private rotation = 0;
  private rotationSpeed: number;

  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.radius = 15 + Math.random() * 10; // Random size between 15-25
    this.speed = speed;
    this.rotationSpeed = (Math.random() - 0.5) * 0.1; // Random rotation
  }

  public update(deltaTime: number): void {
    // Move downward
    this.y += this.speed * (deltaTime / 16); // Normalize to 60 FPS
    
    // Rotate the snowball
    this.rotation += this.rotationSpeed * (deltaTime / 16);
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // Draw snowball with gradient
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.7, '#F0F8FF');
    gradient.addColorStop(1, '#E6E6FA');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Add some texture to make it look more like snow
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const x = Math.cos(angle) * (this.radius * 0.6);
      const y = Math.sin(angle) * (this.radius * 0.6);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.arc(2, 2, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  public getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    };
  }
}