const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const screenshotsDir = '/home/ilhammu29/AGENT-MINHAMMU29/projects/oxid-patreon-redesign/screenshots';

  // 1. Desktop Initial Visit (Showing the Motion Video Opening Cinema)
  const context1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page1 = await context1.newPage();
  await page1.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(1500);
  await page1.screenshot({ path: path.join(screenshotsDir, 'desktop-opening-motion.png') });

  // 2. Click Skip on Intro Cinema to view Hero & Redesigned Navbar
  const skipBtn = page1.locator('button:has-text("Skip")');
  if (await skipBtn.count() > 0) {
    await skipBtn.click();
    await page1.waitForTimeout(1000);
  }
  await page1.screenshot({ path: path.join(screenshotsDir, 'desktop-navbar-hero.png') });

  // 3. Scroll to Section 2 (CreatorGrid lookbook cards)
  await page1.evaluate(() => {
    const el = document.getElementById('creator-grid');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page1.waitForTimeout(1500);
  await page1.screenshot({ path: path.join(screenshotsDir, 'desktop-section2-creatorgrid.png') });
  await context1.close();

  // 4. Tablet 768px (pre-set session storage so cinema doesn't block)
  const contextTablet = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const pageTablet = await contextTablet.newPage();
  await pageTablet.addInitScript(() => {
    sessionStorage.setItem('oxid_promo_seen_v2', 'true');
  });
  await pageTablet.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await pageTablet.waitForTimeout(1000);
  await pageTablet.screenshot({ path: path.join(screenshotsDir, 'tablet-oxid-768.png') });
  await contextTablet.close();

  // 5. Mobile 390px
  const contextMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.addInitScript(() => {
    sessionStorage.setItem('oxid_promo_seen_v2', 'true');
  });
  await pageMobile.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1000);
  await pageMobile.screenshot({ path: path.join(screenshotsDir, 'mobile-oxid-390.png') });
  await contextMobile.close();

  await browser.close();
  console.log('Screenshots successfully captured!');
})();
