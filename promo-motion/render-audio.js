const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function renderAudio() {
  console.log('Rendering 15-second 120 BPM audio with OfflineAudioContext...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const wavBase64 = await page.evaluate(async () => {
    const sampleRate = 44100;
    const duration = 15.0; // 15 seconds
    const totalSamples = Math.ceil(sampleRate * duration);
    const ctx = new OfflineAudioContext(2, totalSamples, sampleRate);

    const bpm = 120;
    const beatSec = 60 / bpm; // 0.5s
    const sixteenth = beatSec / 4; // 0.125s
    const totalBeats = Math.floor(duration / beatSec); // 30 beats

    // Helper: Master Compressor / Limiter
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -8;
    compressor.knee.value = 10;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.15;
    compressor.connect(ctx.destination);

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.95;
    masterGain.connect(compressor);

    // 1. Kick Generator
    function triggerKick(time, intensity = 1.0) {
      if (time >= duration) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Pitch drop: 160Hz -> 36Hz
      osc.frequency.setValueAtTime(160, time);
      osc.frequency.exponentialRampToValueAtTime(38, time + 0.08);

      gain.gain.setValueAtTime(0.9 * intensity, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(time);
      osc.stop(time + 0.35);
    }

    // 2. Snare / Rimshot
    function triggerSnare(time, intensity = 1.0) {
      if (time >= duration) return;
      // White noise burst
      const bufferSize = sampleRate * 0.15;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1200;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6 * intensity, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);

      // Tonal snap
      const osc = ctx.createOscillator();
      const toneGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, time);
      osc.frequency.exponentialRampToValueAtTime(80, time + 0.06);

      toneGain.gain.setValueAtTime(0.5 * intensity, time);
      toneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      osc.connect(toneGain);
      toneGain.connect(masterGain);

      whiteNoise.start(time);
      whiteNoise.stop(time + 0.16);
      osc.start(time);
      osc.stop(time + 0.1);
    }

    // 3. Hi-Hat
    function triggerHat(time, isOpen = false, intensity = 0.7) {
      if (time >= duration) return;
      const bufferSize = Math.floor(sampleRate * (isOpen ? 0.25 : 0.04));
      const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 9000;
      filter.Q.value = 3;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4 * intensity, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + (isOpen ? 0.22 : 0.035));

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noise.start(time);
      noise.stop(time + (isOpen ? 0.25 : 0.05));
    }

    // 4. Bassline Stabs (driving 120 BPM acid techno groove)
    function triggerBass(time, freq = 55, dur = 0.2) {
      if (time >= duration) return;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);
      filter.frequency.exponentialRampToValueAtTime(280, time + dur);
      filter.Q.value = 5;

      gain.gain.setValueAtTime(0.65, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(time);
      osc.stop(time + dur + 0.02);
    }

    // 5. Mechanical Scene Click SFX
    function triggerClick(time) {
      if (time >= duration) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(2400, time);
      osc.frequency.exponentialRampToValueAtTime(400, time + 0.025);

      gain.gain.setValueAtTime(0.7, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.028);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(time);
      osc.stop(time + 0.035);
    }

    // Schedule Beat Sequence
    const bassNotes = [55, 55, 65, 73, 55, 55, 82, 73]; // A1, C2, D2, E2 etc.

    for (let beat = 0; beat < totalBeats; beat++) {
      const beatTime = beat * beatSec;
      const bar = Math.floor(beat / 4);
      const beatInBar = beat % 4;

      // Heavy 4-on-the-floor Kick
      triggerKick(beatTime, 1.0);

      // Scene change clicks on every 4 beats (Bar boundaries)
      if (beatInBar === 0) {
        triggerClick(beatTime);
      }

      // Snare on beats 2 and 4
      if (beatInBar === 1 || beatInBar === 3) {
        triggerSnare(beatTime, 0.9);
      }

      // Open hat on the off-beat
      triggerHat(beatTime + beatSec / 2, true, 0.45);

      // Driving 16th-note closed hi-hats
      for (let s = 0; s < 4; s++) {
        const sixteenthTime = beatTime + s * sixteenth;
        const vel = s === 0 ? 0.6 : s === 2 ? 0.45 : 0.3;
        triggerHat(sixteenthTime, false, vel);
      }

      // Bass notes on 8th notes
      const note1 = bassNotes[(beat * 2) % bassNotes.length];
      const note2 = bassNotes[(beat * 2 + 1) % bassNotes.length];
      triggerBass(beatTime, note1, 0.18);
      triggerBass(beatTime + beatSec / 2, note2, 0.18);
    }

    // Render AudioBuffer
    const renderedBuffer = await ctx.startRendering();

    // Convert AudioBuffer to 16-bit PCM WAV
    const numChannels = renderedBuffer.numberOfChannels;
    const length = renderedBuffer.length;
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = length * blockAlign;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF identifier
    function writeString(offset, str) {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    }

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // SubChunk1Size
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true); // 16 bits per sample
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    // Interleave channels
    const left = renderedBuffer.getChannelData(0);
    const right = renderedBuffer.getChannelData(1);
    let offset = 44;

    for (let i = 0; i < length; i++) {
      let l = Math.max(-1, Math.min(1, left[i]));
      let r = Math.max(-1, Math.min(1, right[i]));

      let sLeft = l < 0 ? l * 0x8000 : l * 0x7FFF;
      let sRight = r < 0 ? r * 0x8000 : r * 0x7FFF;

      view.setInt16(offset, sLeft, true);
      view.setInt16(offset + 2, sRight, true);
      offset += 4;
    }

    // Convert ArrayBuffer to base64
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i += 8192) {
      const slice = bytes.subarray(i, Math.min(i + 8192, len));
      binary += String.fromCharCode.apply(null, slice);
    }
    return btoa(binary);
  });

  await browser.close();

  const outPath = path.join(__dirname, 'oxid-promo-120bpm.wav');
  fs.writeFileSync(outPath, Buffer.from(wavBase64, 'base64'));
  console.log(`Audio successfully rendered to ${outPath} (${fs.statSync(outPath).size} bytes)`);
}

renderAudio().catch(console.error);
