import { Player } from '../Player';
import { InputManager } from '../../core/InputManager';

// Mock InputManager
jest.mock('../../core/InputManager');

describe('Player', () => {
  let player: Player;
  let mockInputManager: jest.Mocked<InputManager>;
  let mockCanvas: HTMLCanvasElement;

  beforeEach(() => {
    mockCanvas = {
      width: 800,
      height: 600,
    } as HTMLCanvasElement;

    mockInputManager = {
      getMovementInput: jest.fn(),
      isKeyPressed: jest.fn(),
      isKeyJustPressed: jest.fn(),
      isMouseButtonPressed: jest.fn(),
      getMousePosition: jest.fn(),
      reset: jest.fn(),
    } as any;

    player = new Player(400, 500);
  });

  describe('constructor', () => {
    it('should initialize player with correct position', () => {
      expect(player.x).toBe(400);
      expect(player.y).toBe(500);
    });
  });

  describe('update', () => {
    it('should update position based on input', () => {
      mockInputManager.getMovementInput.mockReturnValue({ x: 1, y: 0 });
      
      const initialX = player.x;
      player.update(16, mockInputManager, mockCanvas);
      
      expect(player.x).toBeGreaterThan(initialX);
    });

    it('should keep player within canvas bounds', () => {
      // Test left boundary
      player.x = 0;
      mockInputManager.getMovementInput.mockReturnValue({ x: -1, y: 0 });
      player.update(16, mockInputManager, mockCanvas);
      expect(player.x).toBeGreaterThanOrEqual(20); // width/2

      // Test right boundary
      player.x = 800;
      mockInputManager.getMovementInput.mockReturnValue({ x: 1, y: 0 });
      player.update(16, mockInputManager, mockCanvas);
      expect(player.x).toBeLessThanOrEqual(780); // canvas.width - width/2
    });
  });

  describe('checkCollision', () => {
    it('should detect collision with rectangular entity', () => {
      const entity = { x: 400, y: 500, width: 30, height: 30 };
      expect(player.checkCollision(entity)).toBe(true);
    });

    it('should detect collision with circular entity', () => {
      const entity = { x: 400, y: 500, radius: 20 };
      expect(player.checkCollision(entity)).toBe(true);
    });

    it('should not detect collision when entities are far apart', () => {
      const entity = { x: 100, y: 100, width: 30, height: 30 };
      expect(player.checkCollision(entity)).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset player to initial position', () => {
      player.x = 100;
      player.y = 100;
      
      player.reset();
      
      expect(player.x).toBe(400);
      expect(player.y).toBe(500);
    });
  });

  describe('getBounds', () => {
    it('should return correct bounds', () => {
      const bounds = player.getBounds();
      
      expect(bounds.x).toBe(380); // x - width/2
      expect(bounds.y).toBe(480); // y - height/2
      expect(bounds.width).toBe(40);
      expect(bounds.height).toBe(40);
    });
  });
});