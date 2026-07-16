"use client";

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

const initAudio = () => {
  if (typeof window === "undefined") return;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
};

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  if (enabled) {
    initAudio();
  }
};

export const getSoundEnabled = () => {
  return soundEnabled;
};

// Helper: play a sine wave note
const playTone = (freq: number, duration: number, type: OscillatorType = "sine", gainVal = 0.1) => {
  if (!soundEnabled || !audioCtx) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    // Smooth decay
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error("Web Audio failed", e);
  }
};

export const playClick = () => {
  // Short high pitched tick sound
  playTone(1000, 0.04, "sine", 0.08);
};

export const playOpenWindow = () => {
  // Ascending arpeggio
  if (!soundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = audioCtx!.createOscillator();
      const gainNode = audioCtx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gainNode.gain.setValueAtTime(0.05, now + idx * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.15);
      osc.connect(gainNode);
      gainNode.connect(audioCtx!.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.15);
    });
  } catch (e) {}
};

export const playMinimizeWindow = () => {
  // Descending sweep
  if (!soundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const notes = [880, 659.25, 554.37, 440];
    notes.forEach((freq, idx) => {
      const osc = audioCtx!.createOscillator();
      const gainNode = audioCtx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gainNode.gain.setValueAtTime(0.05, now + idx * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.15);
      osc.connect(gainNode);
      gainNode.connect(audioCtx!.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.15);
    });
  } catch (e) {}
};

export const playStartup = () => {
  // Volume futuristic chords
  if (!soundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const baseNotes = [130.81, 164.81, 196.00, 261.63]; // C3, E3, G3, C4
    baseNotes.forEach((freq, idx) => {
      const osc = audioCtx!.createOscillator();
      const gainNode = audioCtx!.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      // Sweeping filter
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      osc.connect(gainNode);
      gainNode.connect(audioCtx!.destination);
      osc.start(now);
      osc.stop(now + 1.8);
    });

    // High bells arpeggio
    const treble = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    treble.forEach((freq, idx) => {
      const osc = audioCtx!.createOscillator();
      const gainNode = audioCtx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + 0.2 + idx * 0.1);
      gainNode.gain.setValueAtTime(0.04, now + 0.2 + idx * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2 + idx * 0.1 + 0.6);
      osc.connect(gainNode);
      gainNode.connect(audioCtx!.destination);
      osc.start(now + 0.2 + idx * 0.1);
      osc.stop(now + 0.2 + idx * 0.1 + 0.6);
    });
  } catch (e) {}
};

export const playError = () => {
  // Buzzing error sound
  if (!soundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    const frequencies = [150, 153];
    frequencies.forEach((freq) => {
      const osc = audioCtx!.createOscillator();
      const gainNode = audioCtx!.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.connect(gainNode);
      gainNode.connect(audioCtx!.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    });
  } catch (e) {}
};

export const playMessage = () => {
  // ICQ-like rapid double beep (uh-oh style arpeggio)
  if (!soundEnabled || !audioCtx) return;
  try {
    initAudio();
    const now = audioCtx.currentTime;
    // Note 1
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.08);

    // Note 2 (slightly higher, delayed)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1100, now + 0.06);
    gain2.gain.setValueAtTime(0.08, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.06 + 0.12);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.06 + 0.12);
  } catch (e) {}
};
