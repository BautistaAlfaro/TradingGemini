// Silent no-op audio engine (audio disabled across entire site)

class SilentAudioEngine {
  public setMuted(_muted: boolean) {}
  public getMuted(): boolean {
    return true;
  }
  public toggleMute(): boolean {
    return true;
  }
  public playHoverSound() {}
  public playClickSound() {}
  public playCrystalResonance(_pitchMod?: number) {}
  public playKeySound() {}
}

export const audioEngine = new SilentAudioEngine();
