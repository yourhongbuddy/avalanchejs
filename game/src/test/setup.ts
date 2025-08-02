// Mock canvas for testing
const mockCanvas = {
  getContext: jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    fillText: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    scale: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    arc: jest.fn(),
    createLinearGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
    createRadialGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    globalAlpha: 1,
  })),
  width: 800,
  height: 600,
  getBoundingClientRect: jest.fn(() => ({
    left: 0,
    top: 0,
    width: 800,
    height: 600,
  })),
};

// Mock HTML elements
Object.defineProperty(window, 'HTMLCanvasElement', {
  value: class {
    getContext = mockCanvas.getContext;
    width = mockCanvas.width;
    height = mockCanvas.height;
    getBoundingClientRect = mockCanvas.getBoundingClientRect;
  },
});

// Mock AudioContext
Object.defineProperty(window, 'AudioContext', {
  value: class {
    createOscillator = jest.fn(() => ({
      connect: jest.fn(),
      frequency: { setValueAtTime: jest.fn() },
      type: '',
      start: jest.fn(),
      stop: jest.fn(),
    }));
    createGain = jest.fn(() => ({
      connect: jest.fn(),
      gain: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
    }));
    destination = {};
    currentTime = 0;
  },
});

// Mock requestAnimationFrame
Object.defineProperty(window, 'requestAnimationFrame', {
  value: jest.fn((callback) => setTimeout(callback, 16)),
});

// Mock document methods
Object.defineProperty(document, 'getElementById', {
  value: jest.fn((id) => {
    const elements: { [key: string]: any } = {
      gameCanvas: mockCanvas,
      score: { textContent: '0' },
      lives: { textContent: '3', style: {} },
      level: { textContent: '1', style: {} },
      startButton: { addEventListener: jest.fn() },
      restartButton: { addEventListener: jest.fn() },
      startScreen: { style: { display: 'block' } },
      gameOver: { style: { display: 'none' } },
      finalScore: { textContent: '0' },
      gameContainer: { appendChild: jest.fn() },
    };
    return elements[id] || null;
  }),
});

// Mock addEventListener
Object.defineProperty(document, 'addEventListener', {
  value: jest.fn(),
});

// Mock window properties
Object.defineProperty(window, 'innerWidth', { value: 1024 });
Object.defineProperty(window, 'innerHeight', { value: 768 });