const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const screenshotsDir = '/home/ilhammu29/AGENT-MINHAMMU29/projects/oxid-patreon-redesign/screenshots';

  // 1. Desktop Loading Screen Mid-Progress
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3005');
  // Wait 1.1s so preloader is actively counting and strobing
  await page.waitForTimeout(1100);
  await page.screenshot({ path: path.join(screenshotsDir, 'loading-screen-active.png') });

  // Wait until loading finishes (total 3.2s)
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(screenshotsDir, 'loading-screen-finish.png') });
  await page.close();

  // 2. Mobile Loading Screen
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3005');
  await pageMobile.waitForTimeout(1100);
  await pageMobile.screenshot({ path: path.join(screenshotsDir, 'loading-screen-mobile.png') });
  await pageMobile.close();

  await browser.close();
  console.log('Loading screen screenshots captured successfully!');
})();
