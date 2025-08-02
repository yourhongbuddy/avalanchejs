class AvalancheGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameOverlay = document.getElementById('gameOverlay');
        
        // Game state
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.speed = 2;
        
        // Player
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 80,
            width: 30,
            height: 40,
            speed: 5,
            color: '#e74c3c'
        };
        
        // Falling objects
        this.fallingObjects = [];
        this.objectSpawnRate = 0.02;
        this.objectTypes = [
            { type: 'snow', color: '#ecf0f1', size: 8, points: 10, speed: 1 },
            { type: 'ice', color: '#3498db', size: 12, points: 20, speed: 1.5 },
            { type: 'rock', color: '#7f8c8d', size: 16, points: 30, speed: 2 },
            { type: 'boulder', color: '#2c3e50', size: 24, points: 50, speed: 1.2 }
        ];
        
        // Particles for effects
        this.particles = [];
        
        // Input handling
        this.keys = {};
        this.setupEventListeners();
        
        // Game loop
        this.lastTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
        
        // Initialize UI
        this.updateUI();
        this.showMenu('startMenu');
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            if (e.code === 'Space') {
                e.preventDefault();
                this.togglePause();
            }
            
            if (e.code === 'KeyR') {
                this.restart();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Button controls
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('resumeBtn').addEventListener('click', () => this.resumeGame());
        document.getElementById('restartBtn').addEventListener('click', () => this.restart());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.restart());
        
        // Mobile controls
        document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowLeft'] = true;
        });
        document.getElementById('leftBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowLeft'] = false;
        });
        
        document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowRight'] = true;
        });
        document.getElementById('rightBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowRight'] = false;
        });
        
        document.getElementById('upBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowUp'] = true;
        });
        document.getElementById('upBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowUp'] = false;
        });
        
        document.getElementById('downBtn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys['ArrowDown'] = true;
        });
        document.getElementById('downBtn').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['ArrowDown'] = false;
        });
    }
    
    startGame() {
        this.gameState = 'playing';
        this.hideOverlay();
        requestAnimationFrame(this.gameLoop);
    }
    
    resumeGame() {
        this.gameState = 'playing';
        this.hideOverlay();
        requestAnimationFrame(this.gameLoop);
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.showMenu('pauseMenu');
        } else if (this.gameState === 'paused') {
            this.resumeGame();
        }
    }
    
    restart() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.speed = 2;
        this.player.x = this.canvas.width / 2;
        this.player.y = this.canvas.height - 80;
        this.fallingObjects = [];
        this.particles = [];
        this.objectSpawnRate = 0.02;
        this.updateUI();
        this.startGame();
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        this.showMenu('gameOverMenu');
        this.createExplosionEffect(this.player.x, this.player.y);
    }
    
    showMenu(menuId) {
        this.gameOverlay.classList.remove('hidden');
        document.querySelectorAll('.menu').forEach(menu => menu.classList.add('hidden'));
        document.getElementById(menuId).classList.remove('hidden');
    }
    
    hideOverlay() {
        this.gameOverlay.classList.add('hidden');
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lives').textContent = this.lives;
    }
    
    handleInput() {
        if (this.gameState !== 'playing') return;
        
        // Movement controls (Arrow keys or WASD)
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            this.player.x -= this.player.speed;
        }
        if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            this.player.x += this.player.speed;
        }
        if (this.keys['ArrowUp'] || this.keys['KeyW']) {
            this.player.y -= this.player.speed;
        }
        if (this.keys['ArrowDown'] || this.keys['KeyS']) {
            this.player.y += this.player.speed;
        }
        
        // Keep player within bounds
        this.player.x = Math.max(this.player.width / 2, 
                                Math.min(this.canvas.width - this.player.width / 2, this.player.x));
        this.player.y = Math.max(this.player.height / 2, 
                                Math.min(this.canvas.height - this.player.height / 2, this.player.y));
    }
    
    spawnFallingObject() {
        if (Math.random() < this.objectSpawnRate) {
            const objectType = this.objectTypes[Math.floor(Math.random() * this.objectTypes.length)];
            const obj = {
                x: Math.random() * (this.canvas.width - objectType.size),
                y: -objectType.size,
                width: objectType.size,
                height: objectType.size,
                speed: objectType.speed * this.speed,
                color: objectType.color,
                type: objectType.type,
                points: objectType.points,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.2
            };
            this.fallingObjects.push(obj);
        }
    }
    
    updateFallingObjects() {
        for (let i = this.fallingObjects.length - 1; i >= 0; i--) {
            const obj = this.fallingObjects[i];
            obj.y += obj.speed;
            obj.rotation += obj.rotationSpeed;
            
            // Remove objects that have fallen off screen
            if (obj.y > this.canvas.height + obj.height) {
                this.fallingObjects.splice(i, 1);
                this.score += 5; // Bonus points for dodging
            }
        }
    }
    
    checkCollisions() {
        for (let i = this.fallingObjects.length - 1; i >= 0; i--) {
            const obj = this.fallingObjects[i];
            
            // Simple rectangular collision detection
            if (this.player.x < obj.x + obj.width &&
                this.player.x + this.player.width > obj.x &&
                this.player.y < obj.y + obj.height &&
                this.player.y + this.player.height > obj.y) {
                
                // Collision detected
                this.fallingObjects.splice(i, 1);
                this.lives--;
                this.createImpactEffect(obj.x, obj.y);
                this.shakeScreen();
                
                if (this.lives <= 0) {
                    this.gameOver();
                    return;
                }
            }
        }
    }
    
    updateLevel() {
        const newLevel = Math.floor(this.score / 500) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.speed += 0.3;
            this.objectSpawnRate += 0.005;
            this.createLevelUpEffect();
        }
    }
    
    createImpactEffect(x, y) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 30,
                maxLife: 30,
                color: '#e74c3c',
                size: Math.random() * 4 + 2
            });
        }
    }
    
    createExplosionEffect(x, y) {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20,
                life: 60,
                maxLife: 60,
                color: ['#e74c3c', '#f39c12', '#e67e22'][Math.floor(Math.random() * 3)],
                size: Math.random() * 6 + 3
            });
        }
    }
    
    createLevelUpEffect() {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15,
                life: 40,
                maxLife: 40,
                color: '#f1c40f',
                size: Math.random() * 5 + 2
            });
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    shakeScreen() {
        this.canvas.classList.add('shake');
        setTimeout(() => {
            this.canvas.classList.remove('shake');
        }, 500);
    }
    
    draw() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#E0F6FF');
        gradient.addColorStop(1, '#FFFFFF');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw mountain silhouettes
        this.drawMountains();
        
        // Draw falling objects
        this.fallingObjects.forEach(obj => {
            this.ctx.save();
            this.ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.ctx.rotate(obj.rotation);
            
            this.ctx.fillStyle = obj.color;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            this.ctx.shadowBlur = 4;
            this.ctx.shadowOffsetY = 2;
            
            if (obj.type === 'snow') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, obj.width / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
            }
            
            this.ctx.restore();
        });
        
        // Draw player (skier)
        this.ctx.save();
        this.ctx.fillStyle = this.player.color;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.ctx.shadowBlur = 4;
        this.ctx.shadowOffsetY = 2;
        
        // Draw skier shape
        this.ctx.fillRect(this.player.x - this.player.width / 2, 
                         this.player.y - this.player.height / 2, 
                         this.player.width, this.player.height);
        
        // Draw skis
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(this.player.x - this.player.width / 2 - 2, 
                         this.player.y + this.player.height / 2, 
                         this.player.width + 4, 4);
        
        this.ctx.restore();
        
        // Draw particles
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
        
        // Draw UI elements on canvas
        this.drawSpeedLines();
    }
    
    drawMountains() {
        this.ctx.fillStyle = 'rgba(108, 122, 137, 0.6)';
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height * 0.7);
        this.ctx.lineTo(this.canvas.width * 0.3, this.canvas.height * 0.4);
        this.ctx.lineTo(this.canvas.width * 0.7, this.canvas.height * 0.6);
        this.ctx.lineTo(this.canvas.width, this.canvas.height * 0.3);
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawSpeedLines() {
        if (this.gameState !== 'playing') return;
        
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + 20, y + 40);
            this.ctx.stroke();
        }
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        this.handleInput();
        this.spawnFallingObject();
        this.updateFallingObjects();
        this.checkCollisions();
        this.updateParticles();
        this.updateLevel();
        this.updateUI();
    }
    
    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update();
        this.draw();
        
        if (this.gameState === 'playing' || this.gameState === 'paused') {
            requestAnimationFrame(this.gameLoop);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new AvalancheGame();
});