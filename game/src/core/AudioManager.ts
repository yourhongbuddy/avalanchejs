import { Howl } from 'howler';

export class AudioManager {
  private sounds: { [key: string]: Howl } = {};
  private backgroundMusic?: Howl;
  private isMuted = false;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds(): void {
    // Create simple sound effects using Web Audio API since we don't have actual sound files
    this.createSoundEffect('background', 0.3);
    this.createSoundEffect('collision', 0.5);
    this.createSoundEffect('powerup', 0.4);
    this.createSoundEffect('gameOver', 0.6);
    this.createSoundEffect('score', 0.2);
  }

  private createSoundEffect(name: string, volume: number): void {
    // Create a simple tone using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    this.sounds[name] = {
      play: () => {
        if (this.isMuted) return;
        
        switch (name) {
          case 'background':
            // Continuous background tone
            break;
          case 'collision':
            createTone(200, 0.3, 'sawtooth');
            break;
          case 'powerup':
            createTone(800, 0.2, 'square');
            break;
          case 'gameOver':
            createTone(150, 0.5, 'triangle');
            setTimeout(() => createTone(100, 0.5, 'triangle'), 200);
            break;
          case 'score':
            createTone(600, 0.1, 'sine');
            break;
        }
      },
      stop: () => {},
      volume: () => volume,
      playing: () => false
    } as Howl;
  }

  public playBackgroundMusic(): void {
    if (this.isMuted) return;
    
    // Create a simple background loop
    const playBackgroundLoop = () => {
      if (!this.isMuted) {
        this.sounds.background.play();
        setTimeout(playBackgroundLoop, 2000); // Loop every 2 seconds
      }
    };
    
    playBackgroundLoop();
  }

  public stopBackgroundMusic(): void {
    // Background music will stop automatically when muted
  }

  public playCollisionSound(): void {
    this.sounds.collision.play();
  }

  public playPowerupSound(): void {
    this.sounds.powerup.play();
  }

  public playGameOverSound(): void {
    this.sounds.gameOver.play();
  }

  public playScoreSound(): void {
    this.sounds.score.play();
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBackgroundMusic();
    }
  }

  public setVolume(volume: number): void {
    // Volume control would be implemented here
  }

  public isMutedState(): boolean {
    return this.isMuted;
  }
}