const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function renderBeatFrames() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  const htmlPath = 'file://' + path.resolve(__dirname, 'promo-video.html');
  await page.goto(htmlPath, { waitUntil: 'load' });

  const totalBeats = 30; // 15 seconds @ 120 BPM
  const framesDir = path.resolve(__dirname, 'frames');
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  console.log(`Rendering ${totalBeats} beat check frames...`);

  for (let b = 0; b < totalBeats; b++) {
    const t = b * 0.5;
    await page.evaluate((seekTime) => window.seek(seekTime), t);
    const framePath = path.join(framesDir, `beat_${String(b).padStart(2, '0')}.png`);
    await page.screenshot({ path: framePath });
  }

  await browser.close();
  console.log('Finished rendering beat frames!');
}

renderBeatFrames().catch(console.error);
