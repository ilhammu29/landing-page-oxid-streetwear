const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

async function renderVideo() {
  const duration = 15.0; // 15 seconds
  const fps = 60;
  const subframes = 3;
  const totalSubframes = Math.round(duration * fps * subframes); // 2700 subframes
  const subframeDuration = duration / totalSubframes; // ~0.005555s

  const audioPath = path.resolve(__dirname, 'oxid-promo-120bpm.wav');
  const outputPath = path.resolve('/home/ilhammu29/AGENT-MINHAMMU29/projects/oxid-patreon-redesign/public/fashion/oxid-studio-promo.mp4');

  console.log(`Starting video render: ${duration}s, 60fps with 3x subframe motion blur (${totalSubframes} subframes)...`);
  console.log(`Audio: ${audioPath}`);
  console.log(`Output: ${outputPath}`);

  // FFmpeg process with tmix subframe motion blur blending
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-framerate', `${fps * subframes}`, // 180 fps input
    '-i', '-', // standard input
    '-i', audioPath, // 120 BPM audio track
    '-vf', 'tmix=frames=3:weights="1 2 1",fps=60', // 3 subframes blended with motion blur to 60fps
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '320k',
    '-shortest',
    outputPath
  ];

  const ffmpeg = spawn('ffmpeg', ffmpegArgs);

  ffmpeg.stderr.on('data', (data) => {
    // Optional debug if needed
  });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const htmlPath = 'file://' + path.resolve(__dirname, 'promo-video.html');
  await page.goto(htmlPath, { waitUntil: 'load' });

  // Stream subframes in batches
  const batchSize = 30;
  let renderedCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < totalSubframes; i += batchSize) {
    const count = Math.min(batchSize, totalSubframes - i);
    const times = [];
    for (let k = 0; k < count; k++) {
      times.push((i + k) * subframeDuration);
    }

    const base64List = await page.evaluate((timeArray) => {
      const results = [];
      const canvasEl = document.getElementById('canvas');
      for (const t of timeArray) {
        window.seek(t);
        // High quality JPEG buffer
        results.push(canvasEl.toDataURL('image/jpeg', 0.92).slice(23)); // remove 'data:image/jpeg;base64,'
      }
      return results;
    }, times);

    for (const b64 of base64List) {
      const buf = Buffer.from(b64, 'base64');
      const canWrite = ffmpeg.stdin.write(buf);
      if (!canWrite) {
        await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
      }
    }

    renderedCount += count;
    if (renderedCount % 300 === 0 || renderedCount === totalSubframes) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const pct = ((renderedCount / totalSubframes) * 100).toFixed(1);
      console.log(`Rendered ${renderedCount}/${totalSubframes} subframes (${pct}%) in ${elapsed}s...`);
    }
  }

  ffmpeg.stdin.end();
  await browser.close();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });

  const fileSize = fs.statSync(outputPath).size;
  console.log(`SUCCESS! Promo video rendered to ${outputPath} (${(fileSize / 1024 / 1024).toFixed(2)} MB)`);
}

renderVideo().catch(console.error);
