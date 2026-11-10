/**
 * Web Audio API Sound Service
 * Provides zero-external-dependency, procedural audio for Annapurna Heritage.
 * Includes gentle UI feedback (chimes, clicks, fanfares) and an ambient Himalayan soundscape.
 */

class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.4;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;
  private onAmbientStateChange?: (playing: boolean) => void;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(muted ? 0 : this.volume * 0.15, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx && !this.isMuted && this.isAmbientPlaying) {
      this.ambientGain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public subscribeAmbientState(cb: (playing: boolean) => void) {
    this.onAmbientStateChange = cb;
  }

  /**
   * Crystalline gentle chime for navigation and tab selections (tuned to harmonic 528Hz & 1056Hz)
   */
  public playChime() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(528, now); // Love frequency / soft chime
      osc1.frequency.exponentialRampToValueAtTime(792, now + 0.3);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1056, now);
      osc2.frequency.exponentialRampToValueAtTime(1056, now + 0.4);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.volume * 0.12, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    } catch {
      // Audio playback fails gracefully if user hasn't interacted
    }
  }

  /**
   * Warm wooden tap sound on hover and subtle interactions
   */
  public playWoodClick() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }

  /**
   * Royal celebration fanfare for reservation bookings & confirmed orders
   */
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0, noteStart);
        gain.gain.linearRampToValueAtTime(this.volume * 0.15, noteStart + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.8);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Tibetan singing bowl / Himalayan ambient soundscape
   * Procedurally generates a soothing, peaceful resonant drone
   */
  public toggleAmbientSound(): boolean {
    const ctx = this.initContext();
    if (!ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbientSound();
      return false;
    } else {
      this.startAmbientSound();
      return true;
    }
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }

  private startAmbientSound() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      this.stopAmbientSound(); // Clean up if any
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.volume * 0.12, now + 1.5);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Tibetan singing bowl fundamental and harmonic overtones (C# / 136.1 Hz Om tuning)
      const baseFreq = 136.1;
      const harmonics = [1, 2.76, 5.4, 8.1];

      this.ambientOscillators = harmonics.map((mult, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = i === 0 ? 'sine' : 'sine';
        osc.frequency.setValueAtTime(baseFreq * mult, now);

        // Subtle LFO for organic breathing vibration
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.15 + i * 0.05, now);
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(osc.frequency);
        lfo.start(now);

        const relativeVol = [0.6, 0.25, 0.15, 0.08][i] || 0.1;
        oscGain.gain.setValueAtTime(relativeVol, now);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        return osc;
      });

      this.isAmbientPlaying = true;
      if (this.onAmbientStateChange) {
        this.onAmbientStateChange(true);
      }
    } catch {
      this.isAmbientPlaying = false;
    }
  }

  public stopAmbientSound() {
    if (!this.ctx || !this.isAmbientPlaying) return;

    try {
      const now = this.ctx.currentTime;
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      }
      setTimeout(() => {
        this.ambientOscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.ambientOscillators = [];
        this.isAmbientPlaying = false;
        if (this.onAmbientStateChange) {
          this.onAmbientStateChange(false);
        }
      }, 850);
    } catch {
      this.isAmbientPlaying = false;
    }
  }
}

export const sound = new SoundService();
