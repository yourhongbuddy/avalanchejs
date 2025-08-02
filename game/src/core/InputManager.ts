export class InputManager {
  private keys: { [key: string]: boolean } = {};
  private mousePosition = { x: 0, y: 0 };
  private mouseButtons: { [button: number]: boolean } = {};

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Keyboard events
    document.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;
      event.preventDefault();
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
      event.preventDefault();
    });

    // Mouse events
    document.addEventListener('mousemove', (event) => {
      const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        this.mousePosition.x = event.clientX - rect.left;
        this.mousePosition.y = event.clientY - rect.top;
      }
    });

    document.addEventListener('mousedown', (event) => {
      this.mouseButtons[event.button] = true;
    });

    document.addEventListener('mouseup', (event) => {
      this.mouseButtons[event.button] = false;
    });

    // Prevent context menu
    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }

  public isKeyPressed(keyCode: string): boolean {
    return this.keys[keyCode] || false;
  }

  public isKeyJustPressed(keyCode: string): boolean {
    return this.keys[keyCode] || false;
  }

  public isMouseButtonPressed(button: number): boolean {
    return this.mouseButtons[button] || false;
  }

  public getMousePosition(): { x: number; y: number } {
    return { ...this.mousePosition };
  }

  public getMovementInput(): { x: number; y: number } {
    let x = 0;
    let y = 0;

    // Arrow keys
    if (this.isKeyPressed('ArrowLeft') || this.isKeyPressed('KeyA')) x -= 1;
    if (this.isKeyPressed('ArrowRight') || this.isKeyPressed('KeyD')) x += 1;
    if (this.isKeyPressed('ArrowUp') || this.isKeyPressed('KeyW')) y -= 1;
    if (this.isKeyPressed('ArrowDown') || this.isKeyPressed('KeyS')) y += 1;

    // Normalize diagonal movement
    if (x !== 0 && y !== 0) {
      x *= 0.707; // 1/√2
      y *= 0.707;
    }

    return { x, y };
  }

  public reset(): void {
    this.keys = {};
    this.mouseButtons = {};
  }
}