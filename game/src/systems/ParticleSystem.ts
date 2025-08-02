interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];

  public createExplosion(x: number, y: number): void {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 3;
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        color: `hsl(${Math.random() * 60 + 15}, 70%, 60%)`, // Orange to red
        size: 3 + Math.random() * 4
      });
    }
  }

  public createPowerupEffect(x: number, y: number): void {
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 1 + Math.random() * 2;
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1, // Upward bias
        life: 1,
        maxLife: 1,
        color: `hsl(${Math.random() * 60 + 120}, 70%, 60%)`, // Green to blue
        size: 2 + Math.random() * 3
      });
    }
  }

  public createSnowTrail(x: number, y: number): void {
    // Create snow particles behind the player
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 1 + Math.random() * 2,
        life: 1,
        maxLife: 0.5,
        color: 'rgba(255, 255, 255, 0.8)',
        size: 1 + Math.random() * 2
      });
    }
  }

  public update(deltaTime: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update position
      particle.x += particle.vx * (deltaTime / 16);
      particle.y += particle.vy * (deltaTime / 16);
      
      // Update life
      particle.life -= (deltaTime / 16) / particle.maxLife;
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    for (const particle of this.particles) {
      const alpha = particle.life;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }

  public clear(): void {
    this.particles = [];
  }
}