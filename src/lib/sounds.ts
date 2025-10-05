"use client";

import * as Tone from 'tone';

let synth: Tone.Synth | null = null;
let metalSynth: Tone.MetalSynth | null = null;
let isInitialized = false;

async function initializeAudio() {
  if (typeof window === 'undefined' || isInitialized || Tone.context.state === 'running') {
    if (Tone.context.state === 'running') isInitialized = true;
    return;
  }
  try {
    await Tone.start();
    synth = new Tone.Synth().toDestination();
    metalSynth = new Tone.MetalSynth({
        frequency: 150,
        envelope: { attack: 0.001, decay: 0.4, release: 0.2 },
        harmonicity: 8.5,
        modulationIndex: 20,
        resonance: 4000,
        octaves: 0.5,
    }).toDestination();
    metalSynth.volume.value = -12;
    isInitialized = true;
  } catch (e) {
    console.error("Could not start audio context. User interaction might be needed.", e);
  }
}

function playSound(callback: () => void) {
  initializeAudio().then(() => {
    if (isInitialized && !Tone.Destination.mute) {
      callback();
    }
  });
}

export function playClickSound() {
  playSound(() => {
    if (metalSynth) {
      metalSynth.triggerAttackRelease("C4", "8n", Tone.now());
    }
  });
}

export function playUpgradeSound() {
  playSound(() => {
    if (synth) {
      synth.triggerAttackRelease("E5", "8n", Tone.now());
      synth.triggerAttackRelease("G5", "8n", Tone.now() + 0.1);
    }
  });
}

export function playCashoutSound() {
  playSound(() => {
    if (synth) {
      const now = Tone.now();
      synth.triggerAttackRelease("C5", "8n", now);
      synth.triggerAttackRelease("E5", "8n", now + 0.1);
      synth.triggerAttackRelease("G5", "8n", now + 0.2);
      synth.triggerAttackRelease("C6", "8n", now + 0.3);
    }
  });
}

export function toggleMute(mute: boolean) {
    if (!isInitialized) {
        initializeAudio();
    }
    Tone.Destination.mute = mute;
}
