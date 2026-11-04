const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { chromium } = require('playwright');

async function renderFullVideo() {
  const duration = 15.0; // 15 seconds
  const fps = 60;
  const subframesPerFrame = 3;
  const totalSubframes = Math.round(duration * fps * subframesPerFrame); // 2700 subframes
  const subframeDuration = duration / totalSubframes;

  const tempDir = '/tmp/oxid_subframes';
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  const audioPath = path.resolve(__dirname, 'oxid-promo-120bpm.wav');
  const outputPath = path.resolve('/home/ilhammu29/AGENT-MINHAMMU29/projects/oxid-patreon-redesign/public/fashion/oxid-studio-promo.mp4');

  console.log(`Starting subframe capture: 2700 frames (180 fps input -> 60 fps tmix blend)...`);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const htmlPath = 'file://' + path.resolve(__dirname, 'promo-video.html');
  await page.goto(htmlPath, { waitUntil: 'load' });

  const batchSize = 45; // 45 subframes per batch = 0.25 seconds of video
  const startTime = Date.now();

  for (let i = 0; i < totalSubframes; i += batchSize) {
    const count = Math.min(batchSize, totalSubframes - i);
    const times = [];
    for (let k = 0; k < count; k++) {
      times.push((i + k) * subframeDuration);
    }

    const b64List = await page.evaluate((timeArray) => {
      const results = [];
      const canvasEl = document.getElementById('canvas');
      for (let idx = 0; idx < timeArray.length; idx++) {
        window.seek(timeArray[idx]);
        const dataUrl = canvasEl.toDataURL('image/jpeg', 0.92);
        results.push(dataUrl.slice(23)); // strip 'data:image/jpeg;base64,'
      }
      return results;
    }, times);

    // Save batch to disk
    const writePromises = b64List.map((b64, k) => {
      const frameIndex = i + k;
      const fileName = `frame_${String(frameIndex).padStart(5, '0')}.jpg`;
      const filePath = path.join(tempDir, fileName);
      return fs.promises.writeFile(filePath, Buffer.from(b64, 'base64'));
    });

    await Promise.all(writePromises);

    const rendered = i + count;
    if (rendered % 450 === 0 || rendered === totalSubframes) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const pct = ((rendered / totalSubframes) * 100).toFixed(1);
      console.log(`Captured ${rendered}/${totalSubframes} subframes (${pct}%) in ${elapsed}s...`);
    }
  }

  await browser.close();
  console.log(`All 2700 subframes captured. Blending with ffmpeg tmix and muxing audio...`);

  const ffmpegCmd = `ffmpeg -y -framerate 180 -i "${tempDir}/frame_%05d.jpg" -i "${audioPath}" ` +
    `-vf "tmix=frames=3:weights='1 2 1',fps=60" ` +
    `-c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p ` +
    `-c:a aac -b:a 320k -shortest "${outputPath}"`;

  execSync(ffmpegCmd, { stdio: 'inherit' });

  // Clean up temp subframes
  fs.rmSync(tempDir, { recursive: true, force: true });

  const stat = fs.statSync(outputPath);
  console.log(`DONE! Output video created: ${outputPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

renderFullVideo().catch(console.error);
